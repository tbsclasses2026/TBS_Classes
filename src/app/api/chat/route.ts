import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPineconeClient } from '@/lib/pinecone';
import { getEmbeddings } from '@/lib/embeddings';
import connectToDatabase from '@/lib/db';
import { ChatLog } from '@/models/ChatLog';
import { rateLimit } from '@/lib/rate-limit';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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
          filter: subject ? { subject: { $eq: subject } } : undefined
        });

        if (searchResults.matches && searchResults.matches.length > 0) {
          contextText = searchResults.matches
            .map((match: any) => match.metadata?.text || '')
            .join('\n\n---\n\n');
        }
      } catch (err) {
        console.error('Vector DB search error:', err);
      }
    }

    // 5. Build System Prompt with Context
    const systemInstruction = `You are a helpful AI study assistant for TBS Classes. 
Your goal is to answer student questions STRICTLY based on the provided notes/syllabus context below.
Do not use outside knowledge. If the answer is not present in the context below, you must reply exactly with: 
"This isn't covered in our current notes for this subject" and do not attempt to guess.

CONTEXT FROM NOTES:
${contextText || 'No specific notes found for this query.'}`;

    // 6. Keep only last 5 messages for context
    const recentMessages = messages.slice(-5);
    
    // Format messages for Gemini (Gemini uses 'user' and 'model' roles)
    const geminiHistory = recentMessages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // 7. Call Gemini API
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction 
    });

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessageStream(userQuery);

    // 8. Stream the response back to the client
    let fullResponse = '';
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          fullResponse += chunkText;
          controller.enqueue(new TextEncoder().encode(chunkText));
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
