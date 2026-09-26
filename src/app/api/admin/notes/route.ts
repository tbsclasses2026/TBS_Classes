import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Note } from "@/models/Note";
import { Subject } from "@/models/Subject";
import { createClient } from "@supabase/supabase-js";
const pdfParse = require("pdf-parse");
import { getPineconeClient } from "@/lib/pinecone";
import { getEmbeddings } from "@/lib/embeddings";
import { notifyNewContent } from "@/lib/notifications";

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    await connectToDatabase();
    const notes = await Note.find().populate("subjectId").sort({ createdAt: -1 });
    return NextResponse.json(notes);
  } catch (error: any) {
    console.error("GET Notes Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await req.formData();
    
    const file = formData.get("file") as File;
    const subjectId = formData.get("subjectId") as string;
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const unitNumber = formData.get("unitNumber") as string;

    if (!file || !subjectId || !title) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) return NextResponse.json({ message: "Subject not found" }, { status: 404 });

    // 1. Upload to Supabase Storage
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("notes")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Supabase Error:", uploadError);
      return NextResponse.json({ message: "Failed to upload file to Supabase." }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("notes")
      .getPublicUrl(fileName);
    const fileUrl = publicUrlData.publicUrl;

    // 2. Extract Text from PDF for AI
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let pdfText = "";
    try {
      const pdfData = await pdfParse(buffer);
      pdfText = pdfData.text;
    } catch (err) {
      console.error("Failed to parse PDF text", err);
      // We continue even if parsing fails, but AI won't learn it.
    }

    // 3. Chunk Text & Embed into Pinecone (if text exists)
    if (pdfText.trim().length > 0 && process.env.PINECONE_INDEX_NAME) {
      try {
        const pinecone = getPineconeClient();
        const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
        
        // Simple chunking (e.g. by paragraphs or every 1000 chars)
        const chunkSize = 1500;
        const chunks = [];
        for (let i = 0; i < pdfText.length; i += chunkSize) {
          chunks.push(pdfText.substring(i, i + chunkSize));
        }

        // Process chunks in small batches to avoid HuggingFace rate limits
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          if (chunk.trim().length < 50) continue; // Skip tiny chunks

          const embedding = await getEmbeddings(chunk);
          
          await index.upsert([
            {
              id: `${subjectId}-${fileName}-chunk-${i}`,
              values: embedding,
              metadata: {
                subject: subject.name,
                title: title,
                text: chunk,
              }
            }
          ]);
        }
      } catch (embedError) {
        console.error("Embedding Error:", embedError);
        // Continue to save DB record even if AI embedding fails partially
      }
    }

    const note = await Note.create({
      subjectId,
      title,
      type,
      fileUrl,
      unitNumber: unitNumber ? parseInt(unitNumber) : undefined,
    });

    // Fire webhook notifications for WhatsApp / Telegram
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    notifyNewContent('Note', subject.name, title, `${appUrl}/notes`);

    return NextResponse.json(note);
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ message: error.message || "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

    await connectToDatabase();
    await Note.findByIdAndDelete(id);
    // Note: We are skipping deleting the file from Supabase and vectors from Pinecone here for simplicity,
    // but in a production app, you'd want to delete those resources too.

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting' }, { status: 500 });
  }
}
