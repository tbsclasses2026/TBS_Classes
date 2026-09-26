import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import connectDB from '@/lib/db';
import { PYQ } from '@/lib/models/PYQ';

const DUMMY_PYQS = [
  {
    _id: 'pyq1',
    title: 'Operating Systems - End Sem 2023',
    subject: 'Operating Systems',
    universityName: 'Delhi Technological University',
    branch: 'CSE',
    semester: '4',
    year: 2023,
    questionType: 'end-sem',
    fileUrl: '/dummy-pdf.pdf',
    structuredQuestions: [
      { _id: 'sq1', text: 'Explain the difference between paging and segmentation.', marks: 10, repeatCount: 4, isImportant: true },
      { _id: 'sq2', text: 'What is a deadlock? Explain the four necessary conditions for deadlock.', marks: 15, repeatCount: 5, isImportant: true },
      { _id: 'sq3', text: 'Write the Peterson\'s solution for the critical section problem.', marks: 8, repeatCount: 2, isImportant: false }
    ],
    createdAt: new Date().toISOString()
  },
  {
    _id: 'pyq2',
    title: 'Data Structures - Mid Sem 2022',
    subject: 'Data Structures',
    universityName: 'Delhi Technological University',
    branch: 'CSE',
    semester: '3',
    year: 2022,
    questionType: 'mid-sem',
    fileUrl: null, // text-only example
    structuredQuestions: [
      { _id: 'sq4', text: 'Write an algorithm to reverse a linked list in O(n) time.', marks: 10, repeatCount: 6, isImportant: true },
      { _id: 'sq5', text: 'Explain AVL tree rotations with examples.', marks: 12, repeatCount: 3, isImportant: true }
    ],
    createdAt: new Date().toISOString()
  }
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const university = searchParams.get('university');
    const branch = searchParams.get('branch');
    const semester = searchParams.get('semester');
    const subject = searchParams.get('subject');
    const year = searchParams.get('year');

    const filter: any = {};
    if (university) filter.universityName = university;
    if (branch) filter.branch = branch;
    if (semester) filter.semester = semester;
    if (subject) filter.subject = subject;
    if (year) filter.year = Number(year);

    await connectDB();
    const pyqs = await PYQ.find(filter).sort({ year: -1, createdAt: -1 }).lean();
    
    // Return dummy data if DB is empty to showcase the feature
    if (pyqs.length === 0 && Object.keys(filter).length === 0) {
      return NextResponse.json({ pyqs: DUMMY_PYQS });
    }

    return NextResponse.json({ pyqs });
  } catch (error) {
    console.error('PYQ API Error:', error);
    return NextResponse.json({ pyqs: DUMMY_PYQS });
  }
}
