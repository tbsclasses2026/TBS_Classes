import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Subject } from "@/models/Subject";

export async function GET() {
  try {
    await connectToDatabase();
    const subjects = await Subject.find().sort({ createdAt: -1 });
    return NextResponse.json(subjects);
  } catch (error: any) {
    console.error("GET Subjects Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const subject = await Subject.create(body);
  return NextResponse.json(subject);
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

    await connectToDatabase();
    await Subject.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting' }, { status: 500 });
  }
}
