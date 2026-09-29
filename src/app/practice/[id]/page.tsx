'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CodeEditor from '@/components/CodeEditor';
import { Loader2, ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function PracticeEnvironment() {
  const params = useParams();
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/practice/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setProblem(data.problem);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center text-white">
        <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
        <Link href="/practice" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Practice
        </Link>
      </div>
    );
  }

  // Get default language based on subject if possible, or fallback to C
  const defaultLang = problem.subject.toLowerCase().includes('python') ? 'python' : 
                      problem.subject.toLowerCase().includes('java') ? 'java' : 'c';

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-slate-300 overflow-hidden">
      {/* Mini header */}
      <div className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/practice" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold text-white">{problem.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {problem.difficulty}
          </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Description */}
        <div className="w-1/3 min-w-[300px] border-r border-slate-800 p-6 overflow-y-auto bg-slate-900">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
            <p className="text-slate-300 leading-relaxed">{problem.description}</p>
            
            <div className="mt-8">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Test Cases
              </h3>
              <div className="space-y-4">
                {problem.testCases.filter((tc: any) => !tc.isHidden).map((tc: any, idx: number) => (
                  <div key={idx} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="mb-2">
                      <div className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">Input:</div>
                      <code className="bg-black px-2 py-1 rounded text-sm text-green-400 block break-all">
                        {tc.input || '(Empty)'}
                      </code>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">Expected Output:</div>
                      <code className="bg-black px-2 py-1 rounded text-sm text-green-400 block break-all">
                        {tc.expectedOutput}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Code Editor */}
        <div className="w-2/3 flex-1 flex flex-col h-full bg-black p-2">
          <CodeEditor 
            defaultLanguage={defaultLang}
            initialCode={problem.starterCode?.[defaultLang]}
            storageKey={`prob_${problem._id}`} 
          />
        </div>
      </div>
    </div>
  );
}
