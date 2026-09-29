import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Note } from "@/models/Note";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await connectToDatabase();
    await Note.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
