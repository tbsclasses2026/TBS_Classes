"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Start fading out after 10 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Remove from DOM after transition completes (500ms)
      setTimeout(() => setShow(false), 500);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0'}`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="max-w-[250px] md:max-w-[350px] object-contain"
      >
        <source src="/preloader.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
