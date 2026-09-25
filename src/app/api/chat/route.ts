import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getPineconeClient } from '@/lib/pinecone';
import { getEmbeddings } from '@/lib/embeddings';
import connectToDatabase from '@/lib/db';
import { ChatLog } from '@/models/ChatLog';
import { rateLimit } from '@/lib/rate-limit';

// Edge runtime is usually preferred for chat, but Mongoose (MongoDB) requires Node.js runtime.
// So we keep the default Node.js runtime.

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'anonymous';
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const { success } = await rateLimit.limit(ip);
      if (!success) {
        return NextResponse.json({ error: 'Rate limit exceeded. Try again in an hour.' }, { status: 429 });
      }
    }

    // 2. Parse Request
    const { messages, subject } = await req.json();
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    // Get the last user message to query the vector DB
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // 3. Generate Embeddings for the Query
    let contextText = '';
    if (process.env.PINECONE_API_KEY && process.env.PINECONE_INDEX_NAME) {
      try {
        const queryEmbedding = await getEmbeddings(userQuery);
        
        // 4. Query Pinecone for relevant context
        const pinecone = getPineconeClient();
        const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
        
        const searchResults = await index.query({
          vector: queryEmbedding,
          topK: 5,
          includeMetadata: true,
          // Optional: filter by subject if provided
          filter: subject ? { subject: { $eq: subject } } : undefined
        });

        // Combine retrieved chunks
        if (searchResults.matches && searchResults.matches.length > 0) {
          contextText = searchResults.matches
            .map((match: any) => match.metadata?.text || '')
            .join('\n\n---\n\n');
        }
      } catch (err) {
        console.error('Vector DB search error:', err);
        // Fallback to empty context if DB fails
      }
    }

    // 5. Build System Prompt with Context
    const systemPrompt = `You are a helpful AI study assistant for TBS Classes. 
Your goal is to answer student questions STRICTLY based on the provided notes/syllabus context below.
Do not use outside knowledge. If the answer is not present in the context below, you must reply exactly with: 
"This isn't covered in our current notes for this subject" and do not attempt to guess.

CONTEXT FROM NOTES:
${contextText || 'No specific notes found for this query.'}
`;

    // 6. Keep only last 5 messages for context
    const recentMessages = messages.slice(-5);
    
    // Format messages for Anthropic
    const anthropicMessages = recentMessages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // 7. Call Anthropic API
    const responseStream = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      system: systemPrompt,
      messages: anthropicMessages,
      max_tokens: 1024,
      stream: true,
    });

    // 8. Stream the response back to the client
    // We create a custom ReadableStream to parse Anthropic stream to plain text stream
    let fullResponse = '';
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of responseStream) {
          if (chunk.type === 'content_block_delta' && chunk.delta?.text) {
            const text = chunk.delta.text;
            fullResponse += text;
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
        
        // 9. Log the Q&A to MongoDB asynchronously after streaming is complete
        try {
          if (process.env.MONGODB_URI) {
            await connectToDatabase();
            const logMessages = [
              ...recentMessages,
              { role: 'assistant', content: fullResponse }
            ];
            await ChatLog.create({
              userId: ip,
              subject: subject || 'General',
              messages: logMessages
            });
          }
        } catch (logErr) {
          console.error('Error logging to MongoDB:', logErr);
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
