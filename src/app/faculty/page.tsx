import { GraduationCap, Lock, ShieldAlert } from 'lucide-react';

export default function FacultyPage() {
  // Placeholder faculty data just for the blurred background
  const faculties = [1, 2, 3, 4, 5, 6];

  return (
    <div className="bg-gray-50 pb-20 min-h-screen">
      <div className="bg-navy py-16 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Faculty</h1>
          <p className="text-xl text-gray-300">
            Learn from educators focused on clear explanations and practical understanding.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        
        {/* Unrevealed Overlay for the entire page */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center mt-10">
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white max-w-lg w-full flex flex-col items-center">
            <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mb-6 shadow-lg shadow-navy/20">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold text-navy mb-4">Faculty Unrevealed!</h2>
            <p className="text-gray-600 text-lg mb-8 font-medium">
              We are finalizing our expert faculty lineup. The profiles are currently locked and will be revealed very soon!
            </p>
            <button className="bg-primary text-navy font-bold px-8 py-3.5 rounded-xl hover:bg-primary-hover transition-all w-full shadow-sm">
              Notify Me
            </button>
          </div>
        </div>

        {/* Blurred Background Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-40 blur-sm select-none pointer-events-none">
          {faculties.map((_, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[400px]">
              <div className="h-32 bg-gray-100 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-primary/20 to-blue-500/20"></div>
                <div className="absolute -bottom-12 w-24 h-24 bg-white rounded-full p-1 shadow-md">
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                    <GraduationCap className="w-10 h-10" />
                  </div>
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-6 flex flex-col flex-grow text-center">
                <div className="w-3/4 h-6 bg-gray-200 rounded-md mx-auto mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-100 rounded-md mx-auto mb-6"></div>
                
                <div className="flex flex-col gap-2 mb-6">
                  <div className="bg-gray-50 h-8 rounded-md w-full"></div>
                  <div className="bg-gray-50 h-8 rounded-md w-full"></div>
                </div>
                
                <div className="space-y-2 mt-auto">
                  <div className="w-full h-3 bg-gray-100 rounded-full"></div>
                  <div className="w-5/6 h-3 bg-gray-100 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
