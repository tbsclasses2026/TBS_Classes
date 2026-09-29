import connectToDatabase from "@/lib/db";
import { Roadmap } from "@/models/Roadmap";
import Link from "next/link";
import { ExternalLink, Map, Route, Compass } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function RoadmapsPage() {
  await connectToDatabase();
  const roadmaps = await Roadmap.find().sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-2xl mb-4 text-purple-600">
            <Map className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-4">Career Roadmaps</h1>
          <p className="text-lg text-gray-600">
            Step-by-step guides and learning paths to achieve your dream career in tech.
          </p>
        </div>

        {roadmaps.length === 0 ? (
          <div className="text-center text-gray-500 bg-white p-12 rounded-3xl border border-gray-100 shadow-sm">
            No roadmaps available right now. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap) => (
              <div key={roadmap._id.toString()} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                
                <h3 className="text-2xl font-bold text-navy mb-3">{roadmap.title}</h3>
                <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">
                  {roadmap.description}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    href={roadmap.link} 
                    target="_blank"
                    className="w-full inline-flex items-center justify-between bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 font-bold px-6 py-4 rounded-xl transition-colors group/btn"
                  >
                    View Roadmap <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
