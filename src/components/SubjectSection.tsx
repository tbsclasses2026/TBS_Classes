import Link from 'next/link';
import { ChevronRight, Cpu, Zap, Beaker, Calculator, Binary, Database, Globe } from 'lucide-react';

const SubjectCard = ({ title, description, icon: Icon, topics, semester }: any) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/50 transition-all group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
          Semester {semester}
        </span>
      </div>
      
      <h3 className="font-bold text-lg text-navy mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 flex-grow">{description}</p>
      
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Topics</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic: string, i: number) => (
            <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">
              {topic}
            </span>
          ))}
        </div>
      </div>
      
      <Link href="/subjects/detail" className="mt-auto inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
        View Subject
        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

const SubjectSection = () => {
  const subjects = [
    {
      title: "Engineering Mathematics",
      description: "Calculus, Linear Algebra, and Differential Equations for engineering applications.",
      icon: Calculator,
      topics: ["Matrices", "Calculus", "Vector Algebra"],
      semester: 1
    },
    {
      title: "Engineering Physics",
      description: "Fundamentals of quantum mechanics, optics, and solid-state physics.",
      icon: Zap,
      topics: ["Quantum Physics", "Optics", "Lasers"],
      semester: 1
    },
    {
      title: "Basic Electrical",
      description: "DC/AC circuits, transformers, and basic electrical machines.",
      icon: Cpu,
      topics: ["DC Circuits", "AC Circuits", "Transformers"],
      semester: 2
    },
    {
      title: "Data Structures",
      description: "Core concepts of organizing and manipulating data efficiently.",
      icon: Database,
      topics: ["Arrays", "Linked Lists", "Trees", "Graphs"],
      semester: 3
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Engineering Subjects</h2>
          <p className="text-gray-600">
            Understand concepts clearly and prepare effectively for your semester examinations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((sub, idx) => (
            <SubjectCard key={idx} {...sub} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/subjects" className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 font-semibold rounded-xl text-navy hover:border-primary hover:text-primary transition-colors">
            View All Subjects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubjectSection;
