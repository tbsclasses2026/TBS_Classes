"use client";

import { useState, useEffect } from "react";
import { Search, Download, FileText, Eye, X } from "lucide-react";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), { ssr: false });

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterSem, setFilterSem] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterType, setFilterType] = useState("");

  const [previewNote, setPreviewNote] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/notes")
      .then(r => r.ok ? r.json() : [])
      .then(data => setNotes(Array.isArray(data) ? data : []))
      .catch(console.error);
      
    fetch("/api/admin/subjects")
      .then(r => r.ok ? r.json() : [])
      .then(data => setSubjects(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handleDownload = async (note: any) => {
    window.open(note.fileUrl, "_blank");
    fetch("/api/notes/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: note._id }),
    });
  };

  const filteredNotes = notes.filter((n: any) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.subjectId?.name.toLowerCase().includes(search.toLowerCase());
    const matchBranch = filterBranch ? n.subjectId?.branch === filterBranch : true;
    const matchSem = filterSem ? n.subjectId?.semester === filterSem : true;
    const matchSubject = filterSubject ? n.subjectId?._id === filterSubject : true;
    const matchType = filterType ? n.type === filterType : true;
    return matchSearch && matchBranch && matchSem && matchSubject && matchType;
  });

  const uniqueBranches = Array.from(new Set(subjects.map((s: any) => s.branch)));
  const uniqueSems = Array.from(new Set(subjects.map((s: any) => s.semester)));

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-navy text-center">Study Materials</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              placeholder="Search by note title or subject..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:ring-0 rounded-xl py-3 pl-12 pr-4 outline-none transition"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              {subjects.map((s: any) => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full border p-3 rounded-xl bg-gray-50 outline-none">
              <option value="">All Types</option>
              <option value="Notes">Notes</option>
              <option value="PYQ">PYQ</option>
              <option value="Important Questions">Important Questions</option>
            </select>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note: any) => (
            <div key={note._id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    {note.type}
                  </span>
                  <span className="text-gray-400 text-xs">{note.downloadCount || 0} downloads</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{note.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{note.subjectId?.name} • {note.subjectId?.semester}</p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setPreviewNote(note)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition font-medium"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
                <button 
                  onClick={() => handleDownload(note)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-xl hover:bg-navy transition font-medium"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>
          ))}
          {filteredNotes.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No study materials found for these filters.</p>
            </div>
          )}
        </div>
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
              <PDFViewer fileUrl={previewNote.fileUrl} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
