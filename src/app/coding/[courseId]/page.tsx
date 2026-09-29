import { PlayCircle, CheckCircle, Code } from 'lucide-react';
import Link from 'next/link';

const COURSE_DATA: Record<string, any> = {
  "python": {
    title: "Python Programming",
    level: "Beginner Friendly",
    description: "Master Python from scratch. Learn fundamentals, object-oriented programming, and build real-world projects.",
    topics: ["Python Basics", "Variables & Data Types", "Conditions", "Loops", "Functions", "OOP", "File Handling", "Libraries", "Projects"],
    overview: ["Prerequisites: None", "Practice Exercises", "3 Real-world Projects", "Interview Questions"]
  },
  "c-programming": {
    title: "C Programming",
    level: "Beginner Friendly",
    description: "Master the fundamentals of programming. Perfect for absolute beginners starting their coding journey.",
    topics: ["Introduction to C", "Variables & Data Types", "Operators", "Control Flow", "Functions", "Arrays & Strings", "Pointers", "Structures & Unions", "File I/O"],
    overview: ["Prerequisites: None", "Memory Management Concepts", "Practice Exercises", "Pointer Deep Dive"]
  },
  "java": {
    title: "Java Programming",
    level: "Intermediate",
    description: "Object-oriented programming concepts, core Java, and enterprise application basics.",
    topics: ["Java Basics", "OOP Concepts", "Inheritance & Polymorphism", "Interfaces", "Exception Handling", "Collections Framework", "Multithreading", "File Handling", "JDBC Basics"],
    overview: ["Prerequisites: Basic Programming", "Core Java Concepts", "Mini Projects", "Enterprise readiness"]
  },
  "data-structures": {
    title: "Data Structures",
    level: "Intermediate",
    description: "Build a strong foundation in Data Structures and Algorithms for technical interviews and competitive programming.",
    topics: ["Time/Space Complexity", "Arrays & Strings", "Linked Lists", "Stacks & Queues", "Trees & BST", "Heaps", "Graphs", "Hashing", "Advanced Algorithms"],
    overview: ["Prerequisites: C/C++/Java", "Algorithmic thinking", "Interview problems", "Complexity analysis"]
  },
  "web-development": {
    title: "Web Development",
    level: "Beginner to Advanced",
    description: "Learn HTML, CSS, JavaScript, and modern frontend frameworks to build beautiful web applications.",
    topics: ["HTML5 & CSS3", "Responsive Design", "JavaScript ES6+", "DOM Manipulation", "React Basics", "React Hooks", "State Management", "Next.js Intro", "Full-Stack Basics"],
    overview: ["Prerequisites: None", "UI/UX Best Practices", "Live Projects", "Portfolio building"]
  }
};

export default function CodingDetailPage({ params }: { params: { courseId: string } }) {
  const course = COURSE_DATA[params.courseId];

  // Fallback if course not found
  if (!course) {
    return (
      <div className="bg-white min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy mb-4">Course Not Found</h1>
          <Link href="/coding" className="text-primary hover:underline">Return to Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Detail Hero */}
      <div className="bg-navy py-8 md:py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="max-w-2xl text-white">
              <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4">
                {course.level}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
              <p className="text-base md:text-lg text-gray-300 mb-6">
                {course.description}
              </p>
              <button className="bg-primary text-navy font-bold px-8 py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-lg">
                Start Learning
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-6 w-full md:w-80 shadow-2xl border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Course Overview</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                {course.overview.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-navy mb-8">Curriculum Topics</h2>
        
        <div className="space-y-4">
          {course.topics.map((topic: string, idx: number) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 hover:shadow-sm transition-all group">
              <div className="flex items-center gap-4">
                <div className="bg-white shadow-sm w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-400 group-hover:text-primary transition-colors">
                  {idx + 1}
                </div>
                <h3 className="font-semibold text-navy text-lg">{topic}</h3>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Watch Video">
                  <PlayCircle className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Practice Code">
                  <Code className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
