import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Quiz } from "@/models/Quiz";

export async function GET() {
  try {
    await connectToDatabase();
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    return NextResponse.json(quizzes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    const { title, topic, difficulty, link } = body;

    if (!title || !topic || !link) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const quiz = await Quiz.create({ title, topic, difficulty, link });
    return NextResponse.json(quiz, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

    await connectToDatabase();
    await Quiz.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting' }, { status: 500 });
  }
}
