'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import CodeEditor from '@/components/CodeEditor';
import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const langQuery = searchParams.get('lang');
  
  // Mapping the ID from cards to the language ID expected by CodeEditor
  let defaultLanguage = 'python';
  if (langQuery === 'c') defaultLanguage = 'c';
  if (langQuery === 'cpp') defaultLanguage = 'cpp';
  if (langQuery === 'java') defaultLanguage = 'java';
  if (langQuery === 'web') defaultLanguage = 'javascript'; // Fallback for JS/Web

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/practice" className="text-slate-500 hover:text-navy transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-navy leading-tight">Interactive Playground</h1>
              <p className="text-xs text-slate-500 font-medium">Free form coding environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 p-4 lg:p-6">
        <CodeEditor 
          defaultLanguage={defaultLanguage} 
          storageKey="playground_draft" 
        />
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <PlaygroundContent />
    </Suspense>
  );
}
