import { PlayCircle, CheckCircle, Code } from 'lucide-react';
import Link from 'next/link';

export default function CodingDetailPage() {
  const topics = [
    "Python Basics",
    "Variables & Data Types",
    "Conditions",
    "Loops",
    "Functions",
    "OOP",
    "File Handling",
    "Libraries",
    "Projects"
  ];

  return (
    <div className="bg-white">
      {/* Detail Hero */}
      <div className="bg-navy py-12 md:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="max-w-2xl text-white">
              <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4">
                Beginner Friendly
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Python Programming</h1>
              <p className="text-lg text-gray-300 mb-8">
                Master Python from scratch. Learn fundamentals, object-oriented programming, and build real-world projects.
              </p>
              <button className="bg-primary text-navy font-bold px-8 py-3.5 rounded-xl hover:bg-primary-hover transition-colors shadow-lg">
                Start Learning
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-6 w-full md:w-80 shadow-2xl border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Course Overview</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Prerequisites: None</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Practice Exercises</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> 3 Real-world Projects</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Interview Questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-navy mb-8">Curriculum Topics</h2>
        
        <div className="space-y-4">
          {topics.map((topic, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 hover:shadow-sm transition-all group">
              <div className="flex items-center gap-4">
                <div className="bg-white shadow-sm w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-400 group-hover:text-primary transition-colors">
                  {idx + 1}
                </div>
                <h3 className="font-semibold text-navy text-lg">{topic}</h3>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Watch Video">
                  <PlayCircle className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Practice Code">
                  <Code className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
