import Link from 'next/link';
import { BookOpen, FileQuestion, FileText, Code2, Beaker, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

const ResourceCard = ({ title, icon: Icon, color, bgColor, ringColor }: any) => {
  return (
    <Link href="/resources" className={`bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex items-center justify-between hover:-translate-y-1 relative overflow-hidden gap-3`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${bgColor} transition-all duration-300 group-hover:w-full -z-10 opacity-0 group-hover:opacity-100`}></div>
      <div className="flex items-center gap-3 z-10">
        <div className={`p-2.5 rounded-xl ${bgColor} ${color} ring-1 ${ringColor} transition-transform duration-300 group-hover:scale-110 group-hover:bg-white`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-navy group-hover:text-navy transition-colors text-sm leading-tight">{title}</h3>
      </div>
      <ArrowRight className={`w-4 h-4 text-gray-300 flex-shrink-0 ${color} group-hover:translate-x-1 transition-all z-10`} />
    </Link>
  );
};

const FeaturedResources = () => {
  const resources = [
    { title: "Complete Unit Notes", icon: BookOpen, color: "text-blue-600", bgColor: "bg-blue-50", ringColor: "ring-blue-100" },
    { title: "Important Questions", icon: FileQuestion, color: "text-orange-600", bgColor: "bg-orange-50", ringColor: "ring-orange-100" },
    { title: "Previous Year Questions", icon: FileText, color: "text-purple-600", bgColor: "bg-purple-50", ringColor: "ring-purple-100" },
    { title: "Programming Notes", icon: Code2, color: "text-emerald-600", bgColor: "bg-emerald-50", ringColor: "ring-emerald-100" },
    { title: "Practical/Lab Resources", icon: Beaker, color: "text-pink-600", bgColor: "bg-pink-50", ringColor: "ring-pink-100" },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-bold tracking-wider uppercase text-xs mb-3 block">
            Exams made easy
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy mb-4 tracking-tight">Featured Study Resources</h2>
          <p className="text-gray-500 text-lg">
            Access premium curated materials designed to help you score better in your examinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {resources.map((resource, idx) => (
            <ResourceCard key={idx} {...resource} />
          ))}
        </div>

        {/* TAMAN Promotional Banner */}
        <div className="max-w-6xl mx-auto mt-12 relative overflow-hidden rounded-3xl shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-slate-800 to-indigo-950"></div>

          {/* Animated Background Gradients */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-primary rounded-full text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-4 h-4" /> Exclusive Opportunity
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3">
                Engg. Students ho aur skills sikhna chahte ho?
              </h3>
              <p className="text-slate-300 text-base md:text-lg">
                Colleges ke assignments, lab records se fursat nahi hai ya phir kuch paisa kamana hai... then join <span className="text-primary font-bold">TAMAN</span>!
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <Link
                href="https://taman-kappa.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-white text-navy font-extrabold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,184,0,0.5)] hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.7)] hover:-translate-y-1"
              >
                Join TAMAN Now
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedResources;
