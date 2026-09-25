"use client";

import { useState, useEffect, useRef } from 'react';
import { Cloud, ArrowRight, Plane } from 'lucide-react';

const CommunitySection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section comes into view, trigger the takeoff!
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 } // Triggers when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden cursor-default"
      // Added manual hover fallback just in case they want to replay it
      onMouseEnter={() => setInView(true)}
    >

      {/* Decorative Clouds */}
      <div className="absolute top-12 left-10 md:left-32 text-white opacity-80 animate-[bounce_8s_infinite]">
        <Cloud className="w-24 h-24 fill-white" />
      </div>
      <div className="absolute top-32 right-10 md:right-40 text-white opacity-60 animate-[bounce_10s_infinite_reverse]">
        <Cloud className="w-32 h-32 fill-white" />
      </div>
      <div className="absolute bottom-10 left-1/4 text-white opacity-70 animate-[bounce_9s_infinite]">
        <Cloud className="w-16 h-16 fill-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* The Path & Aeroplane */}
        <div className="relative h-40 md:h-56 max-w-5xl mx-auto mb-4">

          <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
            {/* Dashed Path */}
            <path
              d="M 50,180 Q 400,250 700,80 T 950,20"
              fill="none"
              stroke="#FFB800"
              strokeWidth="6"
              strokeDasharray="15 15"
              strokeLinecap="round"
              className="opacity-50 drop-shadow-md"
            />

            {/* The Plane using native SVG animateMotion to perfectly trace the path */}
            <g transform={!inView ? "translate(50, 180) rotate(-15)" : "translate(0, 0)"}>
              {inView && (
                <animateMotion
                  dur="3.5s"
                  fill="freeze"
                  path="M 50,180 Q 400,250 700,80 T 950,20"
                  rotate="auto"
                />
              )}
              {/* Center the object so its center traces the path */}
              <foreignObject x="-150" y="-80" width="300" height="160" className="overflow-visible">
                {/* 
                  The container for Plane + Banner + Smoke.
                  Lucide Plane points diagonally (45deg). rotate-[45deg] aligns its nose to the right. 
                */}
                <div className="w-full h-full flex items-center justify-center relative rotate-[45deg]">

                  {/* Thrust Smoke / Fire Effect */}
                  {inView && (
                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-80 z-0">
                      <div className="w-6 h-6 bg-gradient-to-r from-transparent to-gray-200 rounded-full animate-[ping_0.8s_infinite] delay-100"></div>
                      <div className="w-5 h-5 bg-orange-300 rounded-full animate-[ping_0.6s_infinite] delay-75"></div>
                      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-[ping_0.4s_infinite] shadow-[0_0_15px_#fbbf24]"></div>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}

                  {/* The TBS Classes Banner trailing behind */}
                  <div className="absolute -left-[140px] top-1/2 -translate-y-1/2 flex items-center z-0">
                    {/* Banner Text */}
                    <div className="bg-red-600 text-white font-black tracking-widest px-4 py-2 text-sm border-2 border-red-700 shadow-2xl rounded-sm whitespace-nowrap transform -skew-x-12 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 w-1/2 transform skew-x-12"></div>
                      TBS CLASSES
                    </div>
                    {/* Ropes connecting banner to plane */}
                    <div className="w-8 h-px bg-gray-400 rotate-12 origin-left"></div>
                    <div className="absolute right-0 top-1/2 w-8 h-px bg-gray-400 -rotate-12 origin-left"></div>
                  </div>

                  {/* The Aeroplane itself */}
                  <div className="relative z-10 ml-8">
                    {/* 3D shadows */}
                    <div className="absolute inset-0 translate-y-3 translate-x-2 blur-sm bg-black/20 rounded-full"></div>
                    <div className="absolute inset-0 translate-y-1 bg-primary-hover rounded-full blur-[2px]"></div>
                    <Plane className="w-16 h-16 md:w-20 md:h-20 text-white fill-primary relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] filter" />
                  </div>

                </div>
              </foreignObject>
            </g>
          </svg>

        </div>

        {/* Text Content */}
        <div className="relative mt-12">
          <h2 className="text-5xl md:text-7xl font-extrabold text-navy tracking-tight drop-shadow-sm">
            Let's fly <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">together!</span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
            Elevate your engineering career to new heights. Join thousands of students soaring towards success.
          </p>

          <div className="mt-12">
            <button className="bg-navy text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-primary hover:text-navy transition-all shadow-xl hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center gap-3 mx-auto group">
              Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CommunitySection;
