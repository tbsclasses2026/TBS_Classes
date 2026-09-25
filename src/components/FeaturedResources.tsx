import Link from 'next/link';
import { BookOpen, FileQuestion, FileText, Code2, Beaker, ArrowRight } from 'lucide-react';

const ResourceCard = ({ title, icon: Icon, color, bgColor }: any) => {
  return (
    <Link href="/resources" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${bgColor} ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-navy group-hover:text-primary transition-colors">{title}</h3>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </Link>
  );
};

const FeaturedResources = () => {
  const resources = [
    { title: "Complete Unit Notes", icon: BookOpen, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Important Questions", icon: FileQuestion, color: "text-orange-600", bgColor: "bg-orange-50" },
    { title: "Previous Year Questions", icon: FileText, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "Programming Notes", icon: Code2, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "Practical/Lab Resources", icon: Beaker, color: "text-pink-600", bgColor: "bg-pink-50" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Featured Study Resources</h2>
          <p className="text-gray-600">
            Access curated materials designed to help you score better in your examinations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {resources.map((resource, idx) => (
            <ResourceCard key={idx} {...resource} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;
