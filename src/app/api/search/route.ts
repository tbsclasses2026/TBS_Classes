import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import connectDB from '@/lib/db';
import { Subject } from '@/models/Subject';
import { Note } from '@/models/Note';
import { Problem } from '@/lib/models/Problem';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ subjects: [], notes: [], coding: [] });
    }

    await connectDB();

    const regex = new RegExp(query, 'i');

    // Query across all three collections simultaneously
    const [subjects, notes, coding] = await Promise.all([
      Subject.find({ name: regex }).limit(3).lean(),
      Note.find({ title: regex }).populate('subjectId', 'name').limit(3).lean(),
      Problem.find({ 
        $or: [
          { title: regex },
          { description: regex }
        ] 
      }).limit(3).lean()
    ]);

    return NextResponse.json({
      subjects: subjects.map((s: any) => ({ _id: s._id.toString(), title: s.name, type: 'subject' })),
      notes: notes.map((n: any) => ({ _id: n._id.toString(), title: n.title, type: 'note', subject: n.subjectId?.name })),
      coding: coding.map((c: any) => ({ _id: c._id.toString(), title: c.title, type: 'coding' }))
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 });
  }
}
