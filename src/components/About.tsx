"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "2", label: "Countries" },
    { value: "100%", label: "Passion" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-plug-electric/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-block font-display text-sm text-plug-electric uppercase tracking-[0.3em] mb-4">
                About Us
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-plug-light leading-tight mb-6">
                We Turn
                <span className="block gradient-text">Creative Sparks</span>
                Into Power
              </h2>
            </div>

            <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="font-body text-lg text-plug-light/70 leading-relaxed">
                Plugworks is where imagination meets execution. Based in the heart of 
                <span className="text-plug-spark"> Egypt</span> and the 
                <span className="text-plug-electric"> UAE</span>, we&apos;re a dynamic creative 
                and production house that specializes in plugging brilliant ideas into 
                tangible, electrifying experiences.
              </p>
              <p className="font-body text-lg text-plug-light/70 leading-relaxed">
                From concept to completion, we bring an unmatched energy to every project. 
                Whether it&apos;s brand activations, immersive events, content production, 
                or digital experiences—we make sure your vision doesn&apos;t just come to 
                life, it comes alive.
              </p>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-8 mt-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="font-display font-bold text-4xl md:text-5xl gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="font-body text-sm text-plug-light/50 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative aspect-square">
              {/* Main visual element - abstract plug */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  {/* Outer ring */}
                  <div className="absolute inset-0 border-2 border-plug-electric/30 rounded-full animate-pulse-slow" />
                  <div className="absolute inset-4 border border-plug-glow/20 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                  
                  {/* Center plug icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <svg className="w-40 h-40" viewBox="0 0 160 160">
                        <defs>
                          <linearGradient id="plugIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00E5FF" />
                            <stop offset="50%" stopColor="#7B61FF" />
                            <stop offset="100%" stopColor="#FF6B35" />
                          </linearGradient>
                        </defs>
                        {/* Plug prongs */}
                        <rect x="50" y="20" width="12" height="40" rx="4" fill="url(#plugIconGradient)" />
                        <rect x="98" y="20" width="12" height="40" rx="4" fill="url(#plugIconGradient)" />
                        {/* Plug body */}
                        <rect x="35" y="55" width="90" height="50" rx="10" fill="url(#plugIconGradient)" />
                        {/* Cable */}
                        <rect x="65" y="105" width="30" height="35" rx="8" fill="url(#plugIconGradient)" />
                      </svg>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-plug-electric/20 blur-3xl animate-glow" />
                    </div>
                  </div>

                  {/* Floating sparks */}
                  <div className="absolute top-10 right-10 w-3 h-3 bg-plug-electric rounded-full animate-spark" />
                  <div className="absolute bottom-20 left-10 w-2 h-2 bg-plug-spark rounded-full animate-spark" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-plug-glow rounded-full animate-spark" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>

              {/* Decorative lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
                <line x1="0" y1="200" x2="80" y2="200" stroke="#00E5FF" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="320" y1="200" x2="400" y2="200" stroke="#00E5FF" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="0" x2="200" y2="80" stroke="#7B61FF" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="320" x2="200" y2="400" stroke="#7B61FF" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
