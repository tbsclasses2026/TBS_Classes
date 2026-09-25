import { Brain, Code, Target, Map } from 'lucide-react';

const Stats = () => {
  const statItems = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Study Assistant",
      description: "Instant help & personalized study plans",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Live Code Compiler",
      description: "Practice Python, Java, C++ & more",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Interactive Quizzes",
      description: "Test your knowledge instantly",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Career Roadmaps",
      description: "Guided paths for placements",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ];

  return (
    <section className="bg-gray-50 py-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors duration-300">
              <div className={`p-3 rounded-lg ${item.bgColor} ${item.color} flex-shrink-0`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
