import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { language, code, stdin = '' } = await req.json();

    const SUPPORTED = ['javascript', 'python', 'java', 'c', 'cpp'];
    if (!SUPPORTED.includes(language)) {
      return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
    }
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        version: '*',
        files: [{ content: code }],
        stdin,
        compile_timeout: 10000,
        run_timeout: 5000,
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Piston API Error:', errText);
      throw new Error(`Execution Failed: ${errText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Execution API Error:', error);
    return NextResponse.json({ error: error.message || 'Code execution service unavailable.' }, { status: 500 });
  }
}
