import { ArrowRight } from 'lucide-react';

const CommunitySection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50 border-t border-gray-100 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
          Let's fly <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">together!</span>
        </h2>
        
        <p className="mt-4 text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
          Elevate your engineering career to new heights. Join thousands of students soaring towards success.
        </p>

        <div className="mt-8">
          <button className="bg-navy text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-primary hover:text-navy transition-all shadow-md hover:shadow-lg hover:-translate-y-1 inline-flex items-center justify-center gap-2 group">
            Start Your Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CommunitySection;
