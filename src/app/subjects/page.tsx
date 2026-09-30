"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Calculator, Cpu, Database, Network, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Map icon strings to actual Lucide components
const iconMap: Record<string, any> = {
  Calculator: Calculator,
  BookOpen: BookOpen,
  Cpu: Cpu,
  Database: Database,
  Network: Network,
};

export default function SubjectsPage() {
  const [activeSem, setActiveSem] = useState('All');
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const semesters = ['All', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
  
  useEffect(() => {
    async function fetchSubjects() {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('semester', { ascending: true });
        
      if (data && !error) {
        setSubjects(data);
      } else {
        console.error('Error fetching subjects:', error);
      }
      setLoading(false);
    }
    
    fetchSubjects();
  }, []);

  const filtered = activeSem === 'All' ? subjects : subjects.filter(s => s.semester === activeSem);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-navy py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Engineering Subjects</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Comprehensive curriculum, unit-wise syllabus, and complete study materials for your semester exams.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for a subject (e.g., Mathematics, Data Structures)..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-primary/30 shadow-lg"
            />
          </div>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Semester Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {semesters.map(sem => (
            <button
              key={sem}
              onClick={() => setActiveSem(sem)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${
                activeSem === sem 
                  ? 'bg-primary text-navy border-2 border-primary' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {sem}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-semibold text-lg animate-pulse">Loading subjects...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-semibold text-lg">No subjects found for this semester.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((sub, idx) => {
              const IconComponent = iconMap[sub.icon] || BookOpen;
              
              return (
                <Link key={idx} href={`/subjects/${sub.slug}`} className="group block h-full">
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-primary/5 transition-colors"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-2xl ${sub.color || 'bg-gray-100 text-gray-600'}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                        {sub.semester}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-navy mb-2 group-hover:text-primary transition-colors">{sub.name}</h3>
                    <p className="text-gray-500 mb-8 flex-grow">
                      Master the core concepts of {(sub.name || '').toLowerCase()} with our structured {sub.topics_count || 0}-unit curriculum.
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                      <span className="text-sm font-semibold text-gray-400">{sub.topics_count} Topics Available</span>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-navy text-gray-400 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
