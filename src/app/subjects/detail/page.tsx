import { PlayCircle, FileText, FileQuestion, FileCode, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SubjectDetailPage() {
  const units = [
    {
      unit: "Unit 1: Quantum Mechanics",
      topics: ["Introduction to Quantum Physics", "Wave-particle duality", "Schrödinger Equation", "Particle in a box"]
    },
    {
      unit: "Unit 2: Wave Optics",
      topics: ["Interference of Light", "Diffraction", "Polarization", "Optical Instruments"]
    },
    {
      unit: "Unit 3: Lasers and Fiber Optics",
      topics: ["Properties of Lasers", "Einstein Coefficients", "Types of Lasers", "Optical Fibers"]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-navy py-12 md:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="bg-gray-800 text-gray-300 text-sm font-medium px-3 py-1 rounded-full">Semester 1</span>
              <span className="bg-primary/20 text-primary text-sm font-medium px-3 py-1 rounded-full">Engineering Physics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Engineering Physics</h1>
            <p className="text-lg text-gray-300">
              Fundamentals of quantum mechanics, optics, and solid-state physics for B.Tech students.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Main Syllabus Area */}
        <div className="lg:w-2/3">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-navy">Syllabus & Materials</h2>
            <div className="text-sm font-medium text-gray-500">Progress: 0%</div>
          </div>
          
          <div className="space-y-6">
            {units.map((unit, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-navy text-lg">{unit.unit}</h3>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-6">
                    {unit.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{topic}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 sm:ml-8 pl-8 sm:pl-0">
                          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                            <PlayCircle className="w-4 h-4" /> Lecture
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                            <FileText className="w-4 h-4" /> Notes
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-orange-50 text-orange-600 rounded-md hover:bg-orange-100 transition-colors">
                            <FileQuestion className="w-4 h-4" /> PYQ
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sidebar Resources */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-navy mb-4">Quick Resources</h3>
            <div className="space-y-3">
              <Link href="#" className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><FileText className="w-5 h-5" /></div>
                  <span className="font-medium text-navy text-sm">Complete Notes PDF</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><FileQuestion className="w-5 h-5" /></div>
                  <span className="font-medium text-navy text-sm">Top 50 Important Qs</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><FileCode className="w-5 h-5" /></div>
                  <span className="font-medium text-navy text-sm">Last 5 Years PYQs</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
