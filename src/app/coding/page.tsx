"use client";

import Link from 'next/link';
import { Search, Code2, Terminal, Database, Globe, Smartphone, PlayCircle, Star, ChevronRight } from 'lucide-react';

export default function CodingPage() {
  const tracks = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      desc: 'Master HTML, CSS, JavaScript, and React to build beautiful web apps.',
      icon: Globe,
      color: 'bg-pink-100 text-pink-600',
      level: 'Beginner to Advanced',
      rating: 4.8
    },
    {
      id: 'backend',
      title: 'Backend Engineering',
      desc: 'Learn Node.js, Express, databases, and APIs for robust servers.',
      icon: Database,
      color: 'bg-blue-100 text-blue-600',
      level: 'Intermediate',
      rating: 4.9
    },
    {
      id: 'dsa',
      title: 'Data Structures & Algo',
      desc: 'Crack technical interviews with comprehensive DSA problem solving.',
      icon: Code2,
      color: 'bg-green-100 text-green-600',
      level: 'Advanced',
      rating: 4.9
    },
    {
      id: 'python',
      title: 'Python Masterclass',
      desc: 'From basic syntax to automation, data science, and scripting.',
      icon: Terminal,
      color: 'bg-yellow-100 text-yellow-600',
      level: 'Beginner Friendly',
      rating: 4.7
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-navy py-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="bg-primary/20 text-primary font-bold px-4 py-1.5 rounded-full text-sm inline-block mb-6 border border-primary/30">
            Learn By Doing
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">The Developer Hub</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Master the most in-demand programming languages and frameworks with our structured coding paths.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-primary text-navy font-bold px-8 py-4 rounded-xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Start Coding Journey
            </button>
            <button className="bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all">
              View Roadmaps
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-2">Learning Tracks</h2>
            <p className="text-gray-500">Pick a track and start building real-world projects.</p>
          </div>
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks.map((track, idx) => (
            <Link key={idx} href={`/coding/${track.id}`} className="group">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col md:flex-row gap-6 items-start relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-10 group-hover:bg-primary/5 transition-colors"></div>
                
                <div className={`p-5 rounded-2xl shrink-0 ${track.color}`}>
                  <track.icon className="w-10 h-10" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-md">
                      {track.level}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" /> {track.rating}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-navy mb-2 group-hover:text-primary transition-colors">{track.title}</h3>
                  <p className="text-gray-500 mb-6">{track.desc}</p>
                  
                  <div className="flex items-center text-primary font-bold text-sm">
                    View Course Details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
