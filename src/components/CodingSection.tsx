import Link from 'next/link';
import { ArrowRight, Terminal, Code2, Database, Layout } from 'lucide-react';

const CodingCard = ({ title, description, level, icon: Icon, tags }: any) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:bg-white transition-all group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-white p-3 rounded-xl shadow-sm text-navy group-hover:text-primary transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium px-2.5 py-1 bg-white border border-gray-200 text-gray-600 rounded-md">
          {level}
        </span>
      </div>
      
      <h3 className="font-bold text-lg text-navy mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 flex-grow">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag: string, i: number) => (
          <span key={i} className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      
      <Link href="/coding/detail" className="w-full inline-flex items-center justify-center gap-2 bg-white border border-gray-200 font-semibold px-4 py-2.5 rounded-lg text-navy hover:border-primary hover:text-primary transition-all group-hover:shadow-sm mt-auto">
        Start Learning
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

const CodingSection = () => {
  const codingCourses = [
    {
      title: "C Programming",
      description: "Master the fundamentals of programming. Perfect for absolute beginners.",
      level: "Beginner",
      icon: Terminal,
      tags: ["Syntax", "Pointers", "Memory"]
    },
    {
      title: "Java",
      description: "Object-oriented programming concepts and enterprise application basics.",
      level: "Intermediate",
      icon: Code2,
      tags: ["OOPs", "Collections", "Multithreading"]
    },
    {
      title: "Data Structures",
      description: "Build a strong foundation in DSA for technical interviews.",
      level: "Intermediate",
      icon: Database,
      tags: ["Arrays", "Trees", "Graphs"]
    },
    {
      title: "Web Development",
      description: "Learn HTML, CSS, JavaScript, and modern frontend frameworks.",
      level: "Beginner to Adv",
      icon: Layout,
      tags: ["HTML/CSS", "React", "Next.js"]
    }
  ];

  return (
    <section className="py-20 bg-gray-light border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Build Your Coding Skills</h2>
            <p className="text-gray-600 text-lg">
              Start with programming fundamentals and progress toward real-world development.
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-sm font-semibold text-gray-500">
            <span className="flex items-center gap-1">Learn <ArrowRight className="w-4 h-4" /></span>
            <span className="flex items-center gap-1">Practice <ArrowRight className="w-4 h-4" /></span>
            <span className="text-primary">Build</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {codingCourses.map((course, idx) => (
            <CodingCard key={idx} {...course} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/coding" className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-200 font-semibold rounded-xl text-navy">
            Explore All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CodingSection;
