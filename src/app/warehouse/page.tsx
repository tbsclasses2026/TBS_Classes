"use client";

import { useState, useEffect } from 'react';
import { Upload, Database, PlusCircle, CheckCircle2, Lock, KeyRound } from 'lucide-react';

export default function WarehousePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [notes, setNotes] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Notes',
    subject: '',
    semester: 'Sem 1',
    type: 'PDF'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'tbsadmin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password! Access denied.');
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      setNotes(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowSuccess(true);
        setFormData({ ...formData, title: '', subject: '' }); // reset some fields
        fetchNotes(); // refresh list
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">Warehouse Access</h2>
          <p className="text-gray-500 mb-8">Please enter the admin password to access the content upload panel.</p>

          <form onSubmit={handleLogin}>
            <div className="relative mb-6">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-navy text-white font-semibold py-3 rounded-xl hover:bg-navy-light transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-navy py-12 text-center shadow-lg relative">
        <button
          onClick={() => setIsAuthenticated(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-sm font-medium bg-white/10 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
          <Database className="w-8 h-8 text-primary" />
          Warehouse (Admin Panel)
        </h1>
        <p className="text-gray-300 mt-2">Upload and manage daily content for TBS Classes</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">

        {/* Upload Form */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload New Content
            </h2>

            {showSuccess && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Content uploaded successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text" required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Unit 3 Full Notes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text" required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Engineering Physics"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={`Sem ${s}`}>Sem {s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Link">Link</option>
                    <option value="Video">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                >
                  <option value="Notes">Notes</option>
                  <option value="Important Questions">Important Questions</option>
                  <option value="Previous Year Questions">Previous Year Questions</option>
                  <option value="Coding Resources">Coding Resources</option>
                  <option value="Lab Resources">Lab Resources</option>
                  <option value="Assignments">Assignments</option>
                </select>
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full mt-4 bg-navy text-white font-semibold py-3 rounded-lg hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Uploading...' : <><PlusCircle className="w-5 h-5" /> Publish to Live Site</>}
              </button>
            </form>
          </div>
        </div>

        {/* Live Content List */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-navy mb-6 flex items-center justify-between">
              <span>Live Uploaded Content</span>
              <span className="text-sm font-normal bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{notes.length} items</span>
            </h2>

            {notes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No content uploaded yet.</p>
            ) : (
              <div className="space-y-4">
                {notes.map((note: any) => (
                  <div key={note.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div>
                      <h4 className="font-bold text-navy">{note.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs font-medium px-2 py-1 bg-white text-gray-600 rounded border border-gray-200">
                          {note.category}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded">
                          {note.subject}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-600 rounded">
                          {note.semester}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 text-xs text-gray-400 font-medium">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
