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

export async function GET() {
  try {
    await connectDB();
    
    // Auto-seed if empty
    const count = await Problem.countDocuments();
    if (count === 0) {
      await Problem.insertMany(DUMMY_PROBLEMS);
    }
    
    const problems = await Problem.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ problems });
  } catch (error: any) {
    console.error('Practice API Error:', error);
    // Fallback to dummy problems if MongoDB fails (e.g. cluster paused/offline)
    return NextResponse.json({ problems: DUMMY_PROBLEMS });
  }
}
