import connectToDatabase from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import Link from "next/link";
import { ExternalLink, BrainCircuit, Trophy, Target } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function QuizzesPage() {
  await connectToDatabase();
  const quizzes = await Quiz.find().sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4 text-blue-600">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-4">Practice Quizzes</h1>
          <p className="text-lg text-gray-600">
            Test your knowledge and prepare for exams with our curated quizzes.
          </p>
        </div>

        {quizzes.length === 0 ? (
          <div className="text-center text-gray-500 bg-white p-12 rounded-3xl border border-gray-100 shadow-sm">
            No quizzes available right now. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz._id.toString()} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                    {quiz.topic}
                  </span>
                  <span className={`font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                    quiz.difficulty === 'Easy' ? 'bg-green-50 text-green-600' :
                    quiz.difficulty === 'Hard' ? 'bg-red-50 text-red-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-navy mb-2 line-clamp-2">{quiz.title}</h3>
                
                <div className="mt-auto pt-8">
                  <Link 
                    href={quiz.link} 
                    target="_blank"
                    className="w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-primary hover:text-navy text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                  >
                    Start Quiz <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
