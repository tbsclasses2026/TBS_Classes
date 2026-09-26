import Link from 'next/link';
import { ArrowRight, Terminal, Code2, Database, Layout, Sparkles } from 'lucide-react';

const CodingCard = ({ id, title, description, level, icon: Icon, tags, colorTheme }: any) => {
  // Dynamic color classes based on the theme
  const themeClasses: Record<string, any> = {
    blue: {
      bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hoverBg: 'group-hover:bg-blue-600', hoverText: 'group-hover:text-white', lightBg: 'bg-blue-100/50'
    },
    orange: {
      bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hoverBg: 'group-hover:bg-orange-600', hoverText: 'group-hover:text-white', lightBg: 'bg-orange-100/50'
    },
    purple: {
      bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hoverBg: 'group-hover:bg-purple-600', hoverText: 'group-hover:text-white', lightBg: 'bg-purple-100/50'
    },
    emerald: {
      bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', hoverBg: 'group-hover:bg-emerald-600', hoverText: 'group-hover:text-white', lightBg: 'bg-emerald-100/50'
    }
  };

  const theme = themeClasses[colorTheme] || themeClasses.blue;

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
      {/* Decorative top gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${theme.bg} ${theme.hoverBg} transition-colors duration-300`}></div>

      <div className="flex justify-between items-start mb-4 mt-1">
        <div className={`p-2.5 rounded-lg ${theme.bg} ${theme.text} transition-colors duration-300`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded border ${theme.lightBg} ${theme.border} ${theme.text}`}>
          {level}
        </span>
      </div>
      
      <h3 className="font-extrabold text-lg text-navy mb-1.5 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">{description}</p>
      
      <Link 
        href={`/coding/${id}`} 
        className={`w-full inline-flex items-center justify-between bg-gray-50/80 border border-gray-100 font-bold px-4 py-2.5 rounded-lg text-sm text-navy transition-all duration-300 ${theme.hoverBg} ${theme.hoverText} mt-auto group-hover:border-transparent group-hover:shadow-sm`}
      >
        <span>Start Learning</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

const CodingSection = () => {
  const codingCourses = [
    {
      id: "c-programming",
      title: "C Programming",
      description: "Master the fundamentals of programming. Perfect for absolute beginners.",
      level: "Beginner",
      icon: Terminal,
      tags: ["Syntax", "Pointers", "Memory"],
      colorTheme: "blue"
    },
    {
      id: "java",
      title: "Java",
      description: "Object-oriented programming concepts and enterprise application basics.",
      level: "Intermediate",
      icon: Code2,
      tags: ["OOPs", "Collections", "Multithreading"],
      colorTheme: "orange"
    },
    {
      id: "data-structures",
      title: "Data Structures",
      description: "Build a strong foundation in DSA for technical interviews.",
      level: "Intermediate",
      icon: Database,
      tags: ["Arrays", "Trees", "Graphs"],
      colorTheme: "purple"
    },
    {
      id: "python",
      title: "Python Programming",
      description: "Learn Python from scratch. Master syntax, OOPs, and build real projects.",
      level: "Beginner",
      icon: Terminal, // Re-using Terminal or you can import a specific icon
      tags: ["Basics", "OOP", "Projects"],
      colorTheme: "blue" // Using blue for python as requested
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "Learn HTML, CSS, JavaScript, and modern frontend frameworks.",
      level: "Beginner to Adv",
      icon: Layout,
      tags: ["HTML/CSS", "React", "Next.js"],
      colorTheme: "emerald"
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100 relative">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-50 to-white pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Master In-Demand Skills
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy mb-4 tracking-tight">Build Your Coding Skills</h2>
            <p className="text-gray-500 text-lg md:text-xl">
              Start with programming fundamentals and progress toward real-world software development.
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-3 p-2 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-4 py-2 rounded-xl bg-white shadow-sm text-sm font-bold text-navy flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
              Learn
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300" />
            <div className="px-4 py-2 rounded-xl bg-white shadow-sm text-sm font-bold text-navy flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span>
              Practice
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300" />
            <div className="px-4 py-2 rounded-xl bg-primary text-white shadow-sm shadow-primary/30 text-sm font-bold flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">3</span>
              Build
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {codingCourses.map((course, idx) => (
            <CodingCard key={idx} {...course} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/coding" className="inline-flex items-center justify-center px-8 py-4 bg-navy hover:bg-navy-light text-white font-bold rounded-xl shadow-lg shadow-navy/20 transition-all hover:-translate-y-1">
            Explore All Courses <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CodingSection;
