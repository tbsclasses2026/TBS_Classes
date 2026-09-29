import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get the path to our JSON DB
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'notes.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const notes = JSON.parse(fileContents);
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Read existing
    let notes = [];
    try {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      notes = JSON.parse(fileContents);
    } catch (e) {
      // If file doesn't exist or is empty
      notes = [];
    }

    // Add new note
    const newNote = {
      id: Date.now().toString(),
      title: body.title,
      category: body.category,
      subject: body.subject,
      semester: body.semester,
      type: body.type,
      createdAt: new Date().toISOString()
    };
    
    // Prepend to array
    notes.unshift(newNote);
    
    // Write back
    fs.writeFileSync(dataFilePath, JSON.stringify(notes, null, 2));

    return NextResponse.json({ success: true, note: newNote });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
