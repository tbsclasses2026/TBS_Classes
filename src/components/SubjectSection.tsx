import Link from 'next/link';
import { ChevronRight, Cpu, Zap, Beaker, Calculator, Binary, Database, Globe } from 'lucide-react';

const SubjectSection = () => {
  const subjects = [
    "Engineering Mathematics", "Data Structures", "Engineering Physics", 
    "Basic Electrical", "Computer Networks", "Operating Systems",
    "Database Management", "Software Engineering", "Digital Logic Design", 
    "Analog Electronics", "Object Oriented Programming", "Microprocessors"
  ];

  return (
    <section className="py-12 bg-slate-900 overflow-hidden relative border-y border-slate-800">
      {/* Subtle radial gradient for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div className="text-center">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
            Core Curriculum
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Explore Popular Subjects
          </h2>
        </div>
      </div>
      
      {/* Inline styles for the marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="relative w-full overflow-hidden z-10 py-4">
        {/* Left and right fading edges for a smooth look */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none"></div>

        <div className="flex w-max gap-8 px-4 animate-marquee">
          {[...subjects, ...subjects, ...subjects].map((sub, idx) => (
            <Link 
              href="/subjects" 
              key={idx}
              className="group flex items-center gap-4 whitespace-nowrap bg-slate-800/40 backdrop-blur-md border border-slate-700/50 text-slate-300 hover:text-white hover:border-primary/60 hover:bg-slate-800 transition-all duration-300 px-8 py-4 rounded-full font-semibold text-base hover:shadow-[0_0_20px_-3px_rgba(255,184,0,0.4)] hover:-translate-y-1"
            >
              <span className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-primary transition-colors shadow-[0_0_8px_0_transparent] group-hover:shadow-[0_0_8px_0_rgba(255,184,0,0.8)]"></span>
              {sub}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectSection;
