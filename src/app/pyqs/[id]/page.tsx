'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, ArrowLeft, Bookmark, Download, Flame, CheckCircle, ExternalLink } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function PYQDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [pyq, setPyq] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);

  useEffect(() => {
    const fetchPYQ = async () => {
      try {
        // Here we just fetch from the general list and filter for demo, 
        // in a real app you'd hit a dedicated /api/pyqs/[id] endpoint
        const res = await fetch(`/api/pyqs`);
        const data = await res.json();
        const found = data.pyqs.find((p: any) => p._id === params.id);
        
        if (found) {
          setPyq(found);
          // Normally we'd check if `found._id` is in `session.user.bookmarkedPYQs`
        } else {
          router.push('/pyqs');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPYQ();
  }, [params.id, router]);

  const handleBookmark = async () => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    
    setBookmarking(true);
    try {
      const res = await fetch('/api/pyqs/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pyqId: pyq._id })
      });
      const data = await res.json();
      if (res.ok) {
        setIsBookmarked(data.bookmarked);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBookmarking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pyq) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link href="/pyqs" className="inline-flex items-center text-sm text-gray-500 hover:text-navy mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to PYQ Bank
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${pyq.questionType === 'end-sem' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                  {pyq.questionType === 'end-sem' ? 'End Semester' : 'Mid Semester'}
                </span>
                <span className="text-gray-500 text-sm font-medium">{pyq.year}</span>
              </div>
              <h1 className="text-3xl font-extrabold text-navy mb-2">{pyq.title}</h1>
              <p className="text-gray-600 font-medium">
                {pyq.universityName} • {pyq.branch} • Semester {pyq.semester}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {pyq.fileUrl && (
                <button className="inline-flex items-center px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 font-semibold transition-all">
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </button>
              )}
              <button 
                onClick={handleBookmark}
                disabled={bookmarking}
                className={`inline-flex items-center px-4 py-2 border-2 rounded-lg font-semibold transition-all disabled:opacity-50
                  ${isBookmarked 
                    ? 'bg-primary/10 border-primary text-navy' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-primary text-primary' : ''}`} /> 
                {isBookmarked ? 'Saved to Revision List' : 'Save for Revision'}
              </button>
            </div>
          </div>
        </div>

        {/* Structured Questions Analysis */}
        {pyq.structuredQuestions && pyq.structuredQuestions.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Structured Question Analysis
            </h2>
            <p className="text-gray-600 mb-4">
              We've extracted the questions from this paper and analyzed them against the past 10 years to highlight exactly what you need to focus on.
            </p>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {pyq.structuredQuestions.map((q: any, index: number) => (
                  <li key={q._id || index} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-bold text-lg">
                        Q{index + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {q.marks && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-800">
                              {q.marks} Marks
                            </span>
                          )}
                          {q.repeatCount >= 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-xs font-bold gap-1 border border-orange-200">
                              <Flame className="w-3 h-3 text-orange-600" />
                              Repeated {q.repeatCount} Times
                            </span>
                          )}
                          {q.isImportant && q.repeatCount < 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800 text-xs font-bold border border-green-200">
                              Important Concept
                            </span>
                          )}
                        </div>
                        <p className="text-gray-900 text-lg leading-relaxed whitespace-pre-wrap">{q.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">PDF Scan Available</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              This paper hasn't been structurally analyzed yet, but you can view or download the original PDF scan.
            </p>
            {pyq.fileUrl ? (
              <a href={pyq.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center px-6 py-3 bg-primary text-navy font-bold rounded-lg hover:bg-primary-hover transition-colors">
                Open PDF Paper <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            ) : (
              <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-md">File not uploaded yet</span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
