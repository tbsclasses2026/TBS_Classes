"use client";

import { useState, useEffect } from "react";
import { Upload, Plus, Trash2, FileText, Loader2, BookOpen, Map, BrainCircuit, Youtube, PlayCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [subjects, setSubjects] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  
  const [isUploading, setIsUploading] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", semester: "", branch: "", slug: "", icon: "BookOpen", topics_count: 10 });
  const [newQuiz, setNewQuiz] = useState({ title: "", topic: "", difficulty: "Medium", link: "" });
  const [newRoadmap, setNewRoadmap] = useState({ title: "", description: "", link: "" });
  const [newVideo, setNewVideo] = useState({ title: "", youtube_url: "" });
  
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
      fetchVideos();
    }
  }, [isAuthenticated]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "tbsadmin" && password === "tbsadmin2026") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid ID or Password");
    }
  };

  const fetchSubjects = async () => {
    const { data } = await supabase.from('subjects').select('*').order('created_at', { ascending: false });
    if (data) setSubjects(data);
  };

  const fetchNotes = async () => {
    const { data } = await supabase.from('notes').select('*, subjects(*)').order('created_at', { ascending: false });
    if (data) setNotes(data);
  };

  const fetchQuizzes = async () => {
    const { data } = await supabase.from('quizzes').select('*').order('created_at', { ascending: false });
    if (data) setQuizzes(data);
  };

  const fetchRoadmaps = async () => {
    const { data } = await supabase.from('roadmaps').select('*').order('created_at', { ascending: false });
    if (data) setRoadmaps(data);
  };

  const fetchVideos = async () => {
    const { data } = await supabase.from('youtube_videos').select('*').order('created_at', { ascending: false });
    if (data) setVideos(data);
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newSubject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { error } = await supabase.from('subjects').insert([{ ...newSubject, slug }]);
    
    if (!error) {
      fetchSubjects();
      setNewSubject({ name: "", semester: "", branch: "", slug: "", icon: "BookOpen", topics_count: 10 });
      alert("Subject Created!");
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('quizzes').insert([newQuiz]);
    if (!error) {
      fetchQuizzes();
      setNewQuiz({ title: "", topic: "", difficulty: "Medium", link: "" });
      alert("Quiz Added Successfully!");
    } else alert("Error: " + error.message);
  };

  const handleCreateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('roadmaps').insert([newRoadmap]);
    if (!error) {
      fetchRoadmaps();
      setNewRoadmap({ title: "", description: "", link: "" });
      alert("Roadmap Added Successfully!");
    } else alert("Error: " + error.message);
  };

  const handleCreateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract Video ID
    let videoId = "";
    if (newVideo.youtube_url.includes("v=")) {
      videoId = newVideo.youtube_url.split("v=")[1]?.split("&")[0];
    } else if (newVideo.youtube_url.includes("youtu.be/")) {
      videoId = newVideo.youtube_url.split("youtu.be/")[1]?.split("?")[0];
    }
    
    if (!videoId) return alert("Invalid YouTube URL");
    
    const thumbnail_url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    const { error } = await supabase.from('youtube_videos').insert([{
      title: newVideo.title,
      youtube_url: newVideo.youtube_url,
      thumbnail_url
    }]);
    
    if (!error) {
      fetchVideos();
      setNewVideo({ title: "", youtube_url: "" });
      alert("YouTube Video Added Successfully!");
    } else alert("Error: " + error.message);
  };

  const handleUploadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.file || !uploadData.subjectId) return alert("Please fill required fields");
    
    setIsUploading(true);
    
    try {
      // 1. Upload file to Supabase Storage
      const fileExt = uploadData.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('notes')
        .upload(filePath, uploadData.file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from('notes')
        .getPublicUrl(filePath);

      // 3. Insert into Database
      const { error: dbError } = await supabase.from('notes').insert([{
        title: uploadData.title + (uploadData.unitNumber ? ` (Unit ${uploadData.unitNumber})` : ''),
        subject_id: uploadData.subjectId,
        type: uploadData.type,
        file_url: publicUrlData.publicUrl
      }]);

      if (dbError) throw dbError;

      alert("Note Uploaded Successfully!");
      fetchNotes();
      setUploadData({ subjectId: "", title: "", type: "Notes", unitNumber: "", file: null });
      
    } catch (err: any) {
      console.error(err);
      alert("Upload Failed: " + (err.message || 'Unknown error'));
    }
    setIsUploading(false);
  };

  const handleDeleteSubject = async (id: string) => {
    if (!confirm("Delete this subject?")) return;
    const { error } = await supabase.from('subjects').delete().eq('id', id);
    if (!error) fetchSubjects();
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (!error) fetchNotes();
  };

  const handleDeleteQuiz = async (id: string) => {
    if (!confirm("Delete this quiz?")) return;
    const { error } = await supabase.from('quizzes').delete().eq('id', id);
    if (!error) fetchQuizzes();
  };

  const handleDeleteRoadmap = async (id: string) => {
    if (!confirm("Delete this roadmap?")) return;
    const { error } = await supabase.from('roadmaps').delete().eq('id', id);
    if (!error) fetchRoadmaps();
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    const { error } = await supabase.from('youtube_videos').delete().eq('id', id);
    if (!error) fetchVideos();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={login} className="bg-white p-8 rounded-xl shadow-lg w-96 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center text-navy">Admin Access</h2>
          <input 
            type="text" 
            placeholder="Enter Admin ID" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-primary"
          />
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
      <div className="max-w-[1600px] mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-navy text-center mb-8">Data Management Dashboard</h1>
        
        {/* ADD DATA FORMS GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Create Subject */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-blue-500"/> Add Subject</h2>
            <form onSubmit={handleCreateSubject} className="space-y-4">
              <input required placeholder="Subject Name (e.g. Data Structures)" value={newSubject.name} onChange={e => setNewSubject({...newSubject, name: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Semester (e.g. Sem 1)" value={newSubject.semester} onChange={e => setNewSubject({...newSubject, semester: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
                <input required placeholder="Branch (e.g. All)" value={newSubject.branch} onChange={e => setNewSubject({...newSubject, branch: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              </div>
              <button type="submit" className="w-full bg-navy text-white p-3 rounded-lg hover:bg-primary transition">Create Subject</button>
            </form>
          </div>

          {/* Upload Note */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Upload className="w-5 h-5 text-green-500"/> Upload Notes / PDF</h2>
            <form onSubmit={handleUploadNote} className="space-y-4">
              <select required value={uploadData.subjectId} onChange={e => setUploadData({...uploadData, subjectId: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary">
                <option value="">Select Subject</option>
                {subjects.map((s: any) => <option key={s.id} value={s.id}>{s.name} ({s.branch})</option>)}
              </select>
              <input required placeholder="Title (e.g. Trees and Graphs)" value={uploadData.title} onChange={e => setUploadData({...uploadData, title: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              
              <div className="flex gap-4">
                <select required value={uploadData.type} onChange={e => setUploadData({...uploadData, type: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary">
                  <option value="Notes">Notes</option>
                  <option value="PYQ">PYQ</option>
                  <option value="Important Questions">Important Questions</option>
                </select>
                <input placeholder="Unit No (Optional)" type="number" value={uploadData.unitNumber} onChange={e => setUploadData({...uploadData, unitNumber: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              </div>

              <input required type="file" accept=".pdf" onChange={e => setUploadData({...uploadData, file: e.target.files?.[0] || null})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              
              <button disabled={isUploading} type="submit" className="w-full bg-primary text-white p-3 rounded-lg hover:bg-navy transition disabled:opacity-50 flex justify-center items-center gap-2 font-bold">
                {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Uploading to Cloud...</> : 'Upload Note'}
              </button>
            </form>
          </div>
          
          {/* Create Quiz */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-purple-500"/> Add Quiz Link</h2>
            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <input required placeholder="Quiz Title" value={newQuiz.title} onChange={e => setNewQuiz({...newQuiz, title: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Topic/Subject" value={newQuiz.topic} onChange={e => setNewQuiz({...newQuiz, topic: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
                <select required value={newQuiz.difficulty} onChange={e => setNewQuiz({...newQuiz, difficulty: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <input required placeholder="Quiz URL (e.g. Google Form Link)" type="url" value={newQuiz.link} onChange={e => setNewQuiz({...newQuiz, link: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              <button type="submit" className="w-full bg-navy text-white p-3 rounded-lg hover:bg-primary transition">Add Quiz</button>
            </form>
          </div>

          {/* Create Roadmap */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-orange-500"/> Add Roadmap Link</h2>
            <form onSubmit={handleCreateRoadmap} className="space-y-4">
              <input required placeholder="Roadmap Title (e.g. DevOps Engineer)" value={newRoadmap.title} onChange={e => setNewRoadmap({...newRoadmap, title: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              <textarea required placeholder="Short Description" value={newRoadmap.description} onChange={e => setNewRoadmap({...newRoadmap, description: e.target.value})} className="w-full border p-3 rounded-lg h-24 outline-none focus:border-primary" />
              <input required placeholder="Roadmap URL (e.g. PDF link or website)" type="url" value={newRoadmap.link} onChange={e => setNewRoadmap({...newRoadmap, link: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              <button type="submit" className="w-full bg-navy text-white p-3 rounded-lg hover:bg-primary transition">Add Roadmap</button>
            </form>
          </div>

          {/* Add YouTube Video */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Youtube className="w-5 h-5 text-red-500"/> Add YouTube Video</h2>
            <form onSubmit={handleCreateVideo} className="space-y-4">
              <input required placeholder="Video Title" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              <input required placeholder="YouTube URL (e.g. https://youtu.be/...)" type="url" value={newVideo.youtube_url} onChange={e => setNewVideo({...newVideo, youtube_url: e.target.value})} className="w-full border p-3 rounded-lg outline-none focus:border-primary" />
              <button type="submit" className="w-full bg-navy text-white p-3 rounded-lg hover:bg-primary transition">Add Video</button>
            </form>
          </div>

          {/* YouTube Video Live Preview */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-500"><PlayCircle className="w-5 h-5"/> Live Thumbnail Preview</h2>
            {(() => {
              let videoId = "";
              if (newVideo.youtube_url.includes("v=")) {
                videoId = newVideo.youtube_url.split("v=")[1]?.split("&")[0];
              } else if (newVideo.youtube_url.includes("youtu.be/")) {
                videoId = newVideo.youtube_url.split("youtu.be/")[1]?.split("?")[0];
              }
              
              if (videoId) {
                return (
                  <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-md border border-gray-200">
                    <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="Preview" className="w-full aspect-video object-cover" />
                    {newVideo.title && <div className="p-3 bg-gray-50 font-semibold text-navy truncate">{newVideo.title}</div>}
                  </div>
                );
              }
              
              return (
                <div className="w-full max-w-sm aspect-video bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                  Paste URL to see preview
                </div>
              );
            })()}
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
                    <tr key={sub.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{sub.name}</td>
                      <td className="p-3 text-gray-500">{sub.branch}</td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteSubject(sub.id)} className="text-red-500 hover:text-red-700">
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
                    <tr key={note.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold truncate max-w-[150px]">{note.title}</td>
                      <td className="p-3"><span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs">{note.type}</span></td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteNote(note.id)} className="text-red-500 hover:text-red-700">
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
                    <tr key={quiz.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{quiz.title}</td>
                      <td className="p-3 text-gray-500">{quiz.difficulty}</td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteQuiz(quiz.id)} className="text-red-500 hover:text-red-700">
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
                    <tr key={roadmap.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{roadmap.title}</td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteRoadmap(roadmap.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* YouTube Videos Table */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><PlayCircle className="w-5 h-5 text-red-500"/> YouTube Videos</h3>
            <div className="overflow-y-auto max-h-64 border rounded-xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video: any) => (
                    <tr key={video.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{video.title}</td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteVideo(video.id)} className="text-red-500 hover:text-red-700">
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
