import { Target, Lightbulb, Code2, BookOpen } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      title: "Clear Concepts",
      description: "Understand difficult topics through simple explanations.",
      icon: Lightbulb,
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      title: "Exam Focused",
      description: "Prepare with notes, important questions, and relevant study resources.",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Practical Coding",
      description: "Learn programming through practice and real-world examples.",
      icon: Code2,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Student Resources",
      description: "Access organized notes, PYQs, assignments, and learning materials.",
      icon: BookOpen,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="bg-white pb-20">
      {/* Hero Section */}
      <div className="bg-navy py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About TBS Classes</h1>
          <p className="text-xl text-gray-300 text-balance">
            TBS Classes is a student-focused educational platform created to make engineering education and technical learning simpler, clearer, and more accessible.
          </p>
        </div>
      </div>

      {/* Mission & Focus */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              To help students understand concepts, strengthen fundamentals, and develop practical skills alongside their academic education.
            </p>
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-navy mb-4 text-lg">Focus Areas:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full"></div> Engineering education</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full"></div> Semester preparation</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full"></div> Programming</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full"></div> Coding</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full"></div> Practical technical skills</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full"></div> Study resources</li>
              </ul>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square md:aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center p-8">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                   <div className="bg-primary/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-primary text-2xl font-bold">1</div>
                   <h4 className="font-semibold text-navy">Understand</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm text-center translate-y-8">
                   <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-blue-600 text-2xl font-bold">2</div>
                   <h4 className="font-semibold text-navy">Practice</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why TBS Classes */}
      <div className="bg-gray-50 py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy">Why TBS Classes</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`${feature.bgColor} ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
