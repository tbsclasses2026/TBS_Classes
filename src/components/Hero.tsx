import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code2, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white pt-0 lg:pt-2 pb-24 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:pt-12 items-center gap-16">

          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy leading-[1.15] mb-6">
              Your Complete{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 pb-1 inline-block">
                Educational Ecosystem
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl font-medium leading-relaxed">
              Combine academic learning, AI assistance, exam prep, coding practice, and career roadmaps all in one professional platform designed for college students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/subjects"
                className="inline-flex items-center justify-center gap-2 bg-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-primary hover:text-navy transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-base"
              >
                Explore Subjects
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/notes"
                className="inline-flex items-center justify-center gap-2 bg-white text-navy border-2 border-gray-200 font-bold px-8 py-4 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-base"
              >
                Browse Notes
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm"></div> AI Assistant
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"></div> Code Practice
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm"></div> Roadmaps
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">

            <div className="aspect-square lg:aspect-[4/5] w-full flex items-center justify-center relative overflow-visible group">
              <Image
                src="/images/students-normal.jpg"
                alt="Engineering Students"
                fill
                priority
                className="object-contain scale-[1.2] md:scale-[1.25] origin-bottom brightness-110 contrast-105 transition-opacity duration-300 opacity-100 group-hover:opacity-0 z-10"
              />
              <Image
                src="/images/students-smile.jpg"
                alt="Engineering Students Smiling"
                fill
                priority
                className="object-contain scale-[1.2] md:scale-[1.25] origin-bottom brightness-110 contrast-105 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
