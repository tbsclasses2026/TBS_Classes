'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BookOpen, Code, Trophy, Target, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy">Welcome back, {session.user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-gray-600 mt-2">Ready to crush your learning goals today?</p>
          </div>
          <div className="flex bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Current Streak</p>
              <p className="text-2xl font-bold text-navy">0 Days</p>
            </div>
          </div>
        </div>

        {/* Quick Actions / Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">0 Notes</span>
            </div>
            <h3 className="font-bold text-lg text-navy mb-1">Recent Notes</h3>
            <p className="text-sm text-gray-500 mb-4">You haven't saved any notes yet.</p>
            <Link href="/notes" className="text-primary font-medium text-sm flex items-center group-hover:underline">
              Browse Notes <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <Code className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">0 Codes</span>
            </div>
            <h3 className="font-bold text-lg text-navy mb-1">Saved Codes</h3>
            <p className="text-sm text-gray-500 mb-4">You haven't saved any code snippets.</p>
            <Link href="/practice" className="text-primary font-medium text-sm flex items-center group-hover:underline">
              Start Coding <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded-full">0 Quizzes</span>
            </div>
            <h3 className="font-bold text-lg text-navy mb-1">Quiz History</h3>
            <p className="text-sm text-gray-500 mb-4">Take a quiz to test your knowledge.</p>
            <Link href="/quizzes" className="text-primary font-medium text-sm flex items-center group-hover:underline">
              Explore Quizzes <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            Recent Activity
          </h2>
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-navy">No activity yet</h3>
            <p className="text-gray-500 mt-1 max-w-sm mx-auto">
              Your recent learning activities like reading notes, running code, and completing quizzes will appear here.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
