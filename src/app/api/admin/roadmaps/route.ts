import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Roadmap } from "@/models/Roadmap";

export async function GET() {
  try {
    await connectToDatabase();
    const roadmaps = await Roadmap.find().sort({ createdAt: -1 });
    return NextResponse.json(roadmaps);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    const { title, description, link } = body;

    if (!title || !description || !link) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const roadmap = await Roadmap.create({ title, description, link });
    return NextResponse.json(roadmap, { status: 201 });
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
    await Roadmap.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting' }, { status: 500 });
  }
}
