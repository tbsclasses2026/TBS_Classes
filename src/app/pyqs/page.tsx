"use client";

import { useState, useEffect } from "react";
import { Search, Download, FileText, Eye, X, BookOpen, Filter } from "lucide-react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), { ssr: false });

export default function PYQBankPage() {
  const [pyqs, setPyqs] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterSem, setFilterSem] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const [previewNote, setPreviewNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: subData } = await supabase.from('subjects').select('*');
      if (subData) setSubjects(subData);

      const { data: pyqData } = await supabase.from('notes').select('*, subjects(*)').eq('type', 'PYQ');
      if (pyqData) setPyqs(pyqData);
      
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleDownload = async (pyq: any) => {
    window.open(pyq.file_url, "_blank");
  };

  const filteredPYQs = pyqs.filter((n: any) => {
    const sub = n.subjects || {};
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || (sub.name || "").toLowerCase().includes(search.toLowerCase());
    const matchBranch = filterBranch ? sub.branch === filterBranch : true;
    const matchSem = filterSem ? sub.semester === filterSem : true;
    const matchSubject = filterSubject ? sub.id === filterSubject : true;
    return matchSearch && matchBranch && matchSem && matchSubject;
  });

  const uniqueBranches = Array.from(new Set(subjects.map((s: any) => s.branch)));
  const uniqueSems = Array.from(new Set(subjects.map((s: any) => s.semester)));

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-6">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-navy mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10 text-primary" />
            Previous Year Question Bank
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access past exam papers to highlight the most repeated topics and patterns.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-2 mb-4 text-navy font-semibold border-b border-gray-100 pb-3">
            <Filter className="w-5 h-5 text-primary" />
            Filter PYQs
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              placeholder="Search by PYQ title or subject..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-0 rounded-xl py-3 pl-12 pr-4 outline-none transition"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="w-full border p-3 rounded-xl bg-gray-50 outline-none">
              <option value="">All Branches</option>
              {uniqueBranches.map((b: any) => <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={filterSem} onChange={e => setFilterSem(e.target.value)} className="w-full border p-3 rounded-xl bg-gray-50 outline-none">
              <option value="">All Semesters</option>
              {uniqueSems.map((s: any) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)} className="w-full border p-3 rounded-xl bg-gray-50 outline-none">
              <option value="">All Subjects</option>
              {subjects.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        {/* PYQs Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500 animate-pulse font-semibold">Loading PYQs...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPYQs.map((pyq: any) => (
              <div key={pyq.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                      PYQ Paper
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">{pyq.title}</h3>
                  <p className="text-gray-500 text-sm mb-6">{pyq.subjects?.name} • {pyq.subjects?.semester}</p>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setPreviewNote(pyq)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition font-medium"
                  >
                    <Eye className="w-4 h-4" /> Preview
                  </button>
                  <button 
                    onClick={() => handleDownload(pyq)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-xl hover:bg-navy transition font-medium"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            ))}
            {filteredPYQs.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No Previous Year Questions found for these filters.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PDF Preview Modal */}
      {previewNote && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-navy">{previewNote.title}</h3>
              <div className="flex gap-4">
                <button onClick={() => handleDownload(previewNote)} className="text-primary hover:text-navy flex items-center gap-2">
                  <Download className="w-5 h-5" /> Download
                </button>
                <button onClick={() => setPreviewNote(null)} className="text-gray-500 hover:text-gray-800">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-gray-100 p-4 flex justify-center">
              <PDFViewer fileUrl={previewNote.file_url} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
