import { Search, Filter, Download, BookOpen, FileQuestion, FileText, Code2, Beaker, ClipboardList } from 'lucide-react';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default function ResourcesPage() {
  const categories = [
    { name: "Notes", icon: BookOpen },
    { name: "Important Questions", icon: FileQuestion },
    { name: "Previous Year Questions", icon: FileText },
    { name: "Coding Resources", icon: Code2 },
    { name: "Lab Resources", icon: Beaker },
    { name: "Assignments", icon: ClipboardList }
  ];

  // Fetch from the local database
  let dynamicResources = [];
  try {
    const dataFilePath = path.join(process.cwd(), 'src', 'data', 'notes.json');
    if (fs.existsSync(dataFilePath)) {
      dynamicResources = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading resources DB:", error);
  }

  // Combine with initial static dummy ones or just use the dynamic ones
  const staticResources = [
    { title: "Basic Electrical 2025 PYQ", category: "Previous Year Questions", subject: "Basic Electrical", semester: "Sem 2", type: "PDF" },
    { title: "C Programming Setup Guide", category: "Coding Resources", subject: "C Programming", semester: "Sem 1", type: "Link" },
    { title: "Chemistry Lab Manual", category: "Lab Resources", subject: "Engineering Chemistry", semester: "Sem 1", type: "PDF" },
    { title: "Maths II Assignment 1", category: "Assignments", subject: "Engineering Mathematics", semester: "Sem 2", type: "PDF" },
  ];

  const allResources = [...dynamicResources, ...staticResources];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-navy py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Resource Library</h1>
          <p className="text-xl text-gray-300">
            All your academic resources in one place.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-navy mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat, idx) => {
                  const count = allResources.filter(r => r.category === cat.name).length;
                  return (
                    <li key={idx}>
                      <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-primary transition-colors text-sm font-medium">
                        <span className="flex items-center gap-2">
                          <cat.icon className="w-4 h-4" />
                          {cat.name}
                        </span>
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 divide-y divide-gray-100">
                {allResources.map((res: any, idx) => (
                  <div key={idx} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary mt-1 sm:mt-0">
                        {res.type === 'PDF' ? <FileText className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-navy text-lg">{res.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            {res.category}
                          </span>
                          <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded">
                            {res.subject}
                          </span>
                          <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-600 rounded">
                            {res.semester}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-navy hover:text-primary hover:border-primary transition-all font-semibold text-sm shadow-sm">
                      <Download className="w-4 h-4" /> View / Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
