"use client";

import { useState, useEffect } from "react";
import { Upload, Plus, Trash2, FileText, Loader2, BookOpen, Map, BrainCircuit } from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  
  const [isUploading, setIsUploading] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", semester: "", branch: "" });
  const [newQuiz, setNewQuiz] = useState({ title: "", topic: "", difficulty: "Medium", link: "" });
  const [newRoadmap, setNewRoadmap] = useState({ title: "", description: "", link: "" });
  
  const [uploadData, setUploadData] = useState({
    subjectId: "",
    title: "",
    type: "Notes",
    unitNumber: "",
    file: null as File | null
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubjects();
      fetchNotes();
      fetchQuizzes();
      fetchRoadmaps();
    }
  }, [isAuthenticated]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "tbsadmin2026") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Password");
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await fetch("/api/admin/subjects");
      if (res.ok) setSubjects(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/admin/notes");
      if (res.ok) setNotes(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchQuizzes = async () => {
    try {
      const res = await fetch("/api/admin/quizzes");
      if (res.ok) setQuizzes(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchRoadmaps = async () => {
    try {
      const res = await fetch("/api/admin/roadmaps");
      if (res.ok) setRoadmaps(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSubject),
    });
    if (res.ok) {
      fetchSubjects();
      setNewSubject({ name: "", semester: "", branch: "" });
      alert("Subject Created!");
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuiz),
    });
    if (res.ok) {
      fetchQuizzes();
      setNewQuiz({ title: "", topic: "", difficulty: "Medium", link: "" });
      alert("Quiz Added Successfully!");
    }
  };

  const handleCreateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/roadmaps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRoadmap),
    });
    if (res.ok) {
      fetchRoadmaps();
      setNewRoadmap({ title: "", description: "", link: "" });
      alert("Roadmap Added Successfully!");
    }
  };

  const handleUploadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.file || !uploadData.subjectId) return alert("Please fill required fields");
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", uploadData.file);
    formData.append("subjectId", uploadData.subjectId);
    formData.append("title", uploadData.title);
    formData.append("type", uploadData.type);
    formData.append("unitNumber", uploadData.unitNumber);

    try {
      const res = await fetch("/api/admin/notes", { method: "POST", body: formData });
      if (res.ok) {
        alert("Note Uploaded & Vectorized Successfully!");
        fetchNotes();
        setUploadData({ subjectId: "", title: "", type: "Notes", unitNumber: "", file: null });
      } else {
        const error = await res.json();
        alert("Upload Failed: " + error.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
    setIsUploading(false);
  };

  const handleDeleteSubject = async (id: string) => {
    if (!confirm("Delete this subject? This might break associated notes.")) return;
    const res = await fetch(`/api/admin/subjects?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchSubjects();
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    const res = await fetch(`/api/admin/notes?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchNotes();
  };

  const handleDeleteQuiz = async (id: string) => {
    if (!confirm("Delete this quiz?")) return;
    const res = await fetch(`/api/admin/quizzes?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchQuizzes();
  };

  const handleDeleteRoadmap = async (id: string) => {
    if (!confirm("Delete this roadmap?")) return;
    const res = await fetch(`/api/admin/roadmaps?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchRoadmaps();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={login} className="bg-white p-8 rounded-xl shadow-lg w-96 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center text-navy">Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-primary"
          />
          <button type="submit" className="bg-primary text-white p-3 rounded-lg font-semibold hover:bg-navy transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-navy text-center mb-8">Data Management Dashboard</h1>
        
        {/* ADD DATA FORMS GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Create Subject */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-blue-500"/> Add Subject</h2>
            <form onSubmit={handleCreateSubject} className="space-y-4">
              <input required placeholder="Subject Name (e.g. Data Structures)" value={newSubject.name} onChange={e => setNewSubject({...newSubject, name: e.target.value})} className="w-full border p-3 rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Semester" value={newSubject.semester} onChange={e => setNewSubject({...newSubject, semester: e.target.value})} className="w-full border p-3 rounded-lg" />
                <input required placeholder="Branch" value={newSubject.branch} onChange={e => setNewSubject({...newSubject, branch: e.target.value})} className="w-full border p-3 rounded-lg" />
              </div>
              <button type="submit" className="w-full bg-navy text-white p-3 rounded-lg hover:bg-primary transition">Create Subject</button>
            </form>
          </div>

          {/* Upload Note */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Upload className="w-5 h-5 text-green-500"/> Upload Notes / PDF</h2>
            <form onSubmit={handleUploadNote} className="space-y-4">
              <select required value={uploadData.subjectId} onChange={e => setUploadData({...uploadData, subjectId: e.target.value})} className="w-full border p-3 rounded-lg">
                <option value="">Select Subject</option>
                {subjects.map((s: any) => <option key={s._id} value={s._id}>{s.name} ({s.branch})</option>)}
              </select>
              <input required placeholder="Title (e.g. Trees and Graphs)" value={uploadData.title} onChange={e => setUploadData({...uploadData, title: e.target.value})} className="w-full border p-3 rounded-lg" />
              
              <div className="flex gap-4">
                <select required value={uploadData.type} onChange={e => setUploadData({...uploadData, type: e.target.value})} className="w-full border p-3 rounded-lg">
                  <option value="Notes">Notes</option>
                  <option value="PYQ">PYQ</option>
                  <option value="Important Questions">Important Questions</option>
                </select>
                <input placeholder="Unit No (Optional)" type="number" value={uploadData.unitNumber} onChange={e => setUploadData({...uploadData, unitNumber: e.target.value})} className="w-full border p-3 rounded-lg" />
              </div>

              <input required type="file" accept=".pdf" onChange={e => setUploadData({...uploadData, file: e.target.files?.[0] || null})} className="w-full border p-3 rounded-lg" />
              
              <button disabled={isUploading} type="submit" className="w-full bg-primary text-white p-3 rounded-lg hover:bg-navy transition disabled:opacity-50 flex justify-center items-center gap-2">
                {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Vectorizing...</> : 'Upload & Train AI'}
              </button>
            </form>
          </div>
          
          {/* Create Quiz */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-purple-500"/> Add Quiz Link</h2>
            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <input required placeholder="Quiz Title" value={newQuiz.title} onChange={e => setNewQuiz({...newQuiz, title: e.target.value})} className="w-full border p-3 rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Topic/Subject" value={newQuiz.topic} onChange={e => setNewQuiz({...newQuiz, topic: e.target.value})} className="w-full border p-3 rounded-lg" />
                <select required value={newQuiz.difficulty} onChange={e => setNewQuiz({...newQuiz, difficulty: e.target.value})} className="w-full border p-3 rounded-lg">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <input required placeholder="Quiz URL (e.g. Google Form Link)" type="url" value={newQuiz.link} onChange={e => setNewQuiz({...newQuiz, link: e.target.value})} className="w-full border p-3 rounded-lg" />
              <button type="submit" className="w-full bg-navy text-white p-3 rounded-lg hover:bg-primary transition">Add Quiz</button>
            </form>
          </div>

          {/* Create Roadmap */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-orange-500"/> Add Roadmap Link</h2>
            <form onSubmit={handleCreateRoadmap} className="space-y-4">
              <input required placeholder="Roadmap Title (e.g. DevOps Engineer)" value={newRoadmap.title} onChange={e => setNewRoadmap({...newRoadmap, title: e.target.value})} className="w-full border p-3 rounded-lg" />
              <textarea required placeholder="Short Description" value={newRoadmap.description} onChange={e => setNewRoadmap({...newRoadmap, description: e.target.value})} className="w-full border p-3 rounded-lg h-24" />
              <input required placeholder="Roadmap URL (e.g. PDF link or website)" type="url" value={newRoadmap.link} onChange={e => setNewRoadmap({...newRoadmap, link: e.target.value})} className="w-full border p-3 rounded-lg" />
              <button type="submit" className="w-full bg-navy text-white p-3 rounded-lg hover:bg-primary transition">Add Roadmap</button>
            </form>
          </div>
        </div>

        <hr className="border-gray-200" />
        <h2 className="text-3xl font-extrabold text-navy text-center mb-4">Existing Database Records</h2>

        {/* DATA TABLES GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Subjects Table */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-500"/> Subjects Database</h3>
            <div className="overflow-y-auto max-h-64 border rounded-xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Branch</th>
                    <th className="p-3 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((sub: any) => (
                    <tr key={sub._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{sub.name}</td>
                      <td className="p-3 text-gray-500">{sub.branch}</td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteSubject(sub._id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes Table */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-green-500"/> Uploaded Materials</h3>
            <div className="overflow-y-auto max-h-64 border rounded-xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Type</th>
                    <th className="p-3 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note: any) => (
                    <tr key={note._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold truncate max-w-[150px]">{note.title}</td>
                      <td className="p-3"><span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs">{note.type}</span></td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteNote(note._id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quizzes Table */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-purple-500"/> Quizzes</h3>
            <div className="overflow-y-auto max-h-64 border rounded-xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Difficulty</th>
                    <th className="p-3 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz: any) => (
                    <tr key={quiz._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{quiz.title}</td>
                      <td className="p-3 text-gray-500">{quiz.difficulty}</td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteQuiz(quiz._id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Roadmaps Table */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Map className="w-5 h-5 text-orange-500"/> Roadmaps</h3>
            <div className="overflow-y-auto max-h-64 border rounded-xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {roadmaps.map((roadmap: any) => (
                    <tr key={roadmap._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{roadmap.title}</td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteRoadmap(roadmap._id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
