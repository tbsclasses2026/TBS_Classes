'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Filter, Search, FileText, Bookmark, Flame, BookOpen } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function PYQBankPage() {
  const [pyqs, setPyqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const [filters, setFilters] = useState({
    university: '',
    branch: '',
    semester: '',
    year: ''
  });

  const fetchPYQs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/pyqs?${queryParams}`);
      const data = await res.json();
      setPyqs(data.pyqs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPYQs();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-navy mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10 text-primary" />
            Previous Year Question Bank
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access past exam papers, detailed solutions, and structured question banks highlighting the most repeated topics.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
          <div className="flex items-center gap-2 mb-4 text-navy font-semibold border-b border-gray-100 pb-3">
            <Filter className="w-5 h-5 text-primary" />
            Filter PYQs
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select name="university" value={filters.university} onChange={handleFilterChange} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border">
              <option value="">All Universities</option>
              <option value="Delhi Technological University">Delhi Technological University (DTU)</option>
              <option value="NSUT">NSUT</option>
              <option value="IPU">IP University</option>
            </select>

            <select name="branch" value={filters.branch} onChange={handleFilterChange} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border">
              <option value="">All Branches</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics & Comm.</option>
              <option value="MECH">Mechanical</option>
            </select>

            <select name="semester" value={filters.semester} onChange={handleFilterChange} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border">
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s.toString()}>Semester {s}</option>)}
            </select>

            <select name="year" value={filters.year} onChange={handleFilterChange} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border">
              <option value="">All Years</option>
              {[2023, 2022, 2021, 2020].map(y => <option key={y} value={y.toString()}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : pyqs.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-xl border border-gray-100">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No PYQs found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your filters to find more question papers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pyqs.map((pyq) => {
              // Calculate if it has highly repeated questions
              const hasRepeatedQuestions = pyq.structuredQuestions?.some((q: any) => q.repeatCount >= 3);
              const totalQuestions = pyq.structuredQuestions?.length || 0;

              return (
                <div key={pyq._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/50 transition-all overflow-hidden flex flex-col">
                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pyq.questionType === 'end-sem' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        {pyq.questionType === 'end-sem' ? 'End Semester' : 'Mid Semester'}
                      </span>
                      {hasRepeatedQuestions && (
                        <span className="inline-flex items-center px-2 py-1 rounded bg-orange-100 text-orange-800 text-xs font-bold gap-1 shadow-sm">
                          <Flame className="w-3 h-3 text-orange-600" />
                          High Repeat Rate
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-navy mb-1 line-clamp-2">{pyq.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{pyq.universityName} • {pyq.branch} • Sem {pyq.semester}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-auto">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-gray-400" />
                        {totalQuestions > 0 ? `${totalQuestions} Questions` : 'PDF Only'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Bookmark className="w-4 h-4 text-gray-400" />
                        Save for later
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 p-4 bg-gray-50 mt-auto">
                    <Link href={`/pyqs/${pyq._id}`} className="w-full inline-flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-navy bg-primary hover:bg-primary-hover transition-colors">
                      View Paper & Analysis
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
