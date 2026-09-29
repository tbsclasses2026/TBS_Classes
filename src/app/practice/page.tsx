'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Code, Loader2, Play, Terminal, Braces, LayoutTemplate } from 'lucide-react';

const languages = [
  { id: 'python', name: 'Python', icon: <Terminal className="w-8 h-8 text-blue-500" />, desc: 'Interactive Python 3 environment', color: 'bg-blue-50 hover:border-blue-300' },
  { id: 'java', name: 'Java', icon: <Code className="w-8 h-8 text-orange-500" />, desc: 'Compile & Run Java programs', color: 'bg-orange-50 hover:border-orange-300' },
  { id: 'c', name: 'C', icon: <Braces className="w-8 h-8 text-indigo-500" />, desc: 'Standard C compiler (GCC)', color: 'bg-indigo-50 hover:border-indigo-300' },
  { id: 'cpp', name: 'C++', icon: <Braces className="w-8 h-8 text-purple-500" />, desc: 'Advanced C++ compiler (G++)', color: 'bg-purple-50 hover:border-purple-300' },
  { id: 'web', name: 'HTML / JS', icon: <LayoutTemplate className="w-8 h-8 text-yellow-500" />, desc: 'Frontend Web Editor', color: 'bg-yellow-50 hover:border-yellow-400' },
];

export default function PracticePage() {
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/practice')
      .then(res => res.json())
      .then(data => {
        setProblems(data.problems || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-navy flex items-center justify-center gap-3 mb-4">
            <Code className="w-10 h-10 text-primary" />
            Coding Playground & Practice
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose a language to write code from scratch, or solve our curated algorithmic problems.
          </p>
        </div>

        {/* Playgrounds Section */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" />
            Open Playgrounds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {languages.map(lang => (
              <Link href={`/practice/playground?lang=${lang.id}`} key={lang.id} className={`p-6 rounded-xl border-2 border-transparent shadow-sm bg-white hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer ${lang.color.split(' ')[1]}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${lang.color.split(' ')[0]}`}>
                  {lang.icon}
                </div>
                <h3 className="font-bold text-navy text-lg">{lang.name}</h3>
                <p className="text-sm text-slate-500 mt-2">{lang.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <hr className="border-gray-200 mb-10" />

        {/* Curated Problems Section */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Curated Problem Sets
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((prob) => (
              <div key={prob._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      prob.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      prob.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {prob.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
                      {prob.subject}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2 line-clamp-1">{prob.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">{prob.description}</p>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                  <Link 
                    href={`/practice/${prob._id}`}
                    className="w-full bg-white border border-slate-200 hover:border-primary hover:text-primary text-slate-700 font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Solve Problem
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
