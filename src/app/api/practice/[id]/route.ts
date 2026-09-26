import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Problem } from '@/lib/models/Problem';

const DUMMY_PROBLEMS = [
  {
    _id: 'dummy1',
    title: 'Hello World in C',
    description: 'Write a C program that prints "Hello, World!" to the standard output.',
    difficulty: 'Easy',
    subject: 'C Programming',
    topic: 'Basics',
    starterCode: {
      c: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}'
    },
    testCases: [
      { input: '', expectedOutput: 'Hello, World!', isHidden: false }
    ]
  },
  {
    _id: 'dummy2',
    title: 'Sum of Two Numbers',
    description: 'Write a program that takes two integers as input (separated by space) and prints their sum.',
    difficulty: 'Easy',
    subject: 'C Programming',
    topic: 'Operators',
    starterCode: {
      c: '#include <stdio.h>\n\nint main() {\n    int a, b;\n    // Read input and print sum\n    return 0;\n}'
    },
    testCases: [
      { input: '5 7', expectedOutput: '12', isHidden: false },
      { input: '-3 8', expectedOutput: '5', isHidden: true }
    ]
  }
];

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const problem = await Problem.findById(params.id);
    if (!problem) {
      // Check dummy problems
      const dummy = DUMMY_PROBLEMS.find(p => p._id === params.id || params.id.includes('dummy'));
      if (dummy) return NextResponse.json({ problem: dummy });
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }
    return NextResponse.json({ problem });
  } catch (error: any) {
    console.error('Practice ID API Error:', error);
    // Fallback
    const dummy = DUMMY_PROBLEMS.find(p => p._id === params.id || params.id.includes('dummy'));
    if (dummy) return NextResponse.json({ problem: dummy });
    return NextResponse.json({ error: 'Failed to fetch problem' }, { status: 500 });
  }
}
