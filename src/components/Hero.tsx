"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-plug-electric/20 rounded-full blur-glow animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-plug-glow/20 rounded-full blur-glow animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-plug-spark/10 rounded-full blur-glow animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Radial glow center */}
      <div className="absolute inset-0 radial-glow" />

      {/* Floating wire/circuit elements */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1440 900">
        <defs>
          <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 450 Q 360 300 720 450 T 1440 450"
          fill="none"
          stroke="url(#wireGradient)"
          strokeWidth="2"
          strokeDasharray="10 20"
          className="animate-wire-flow"
          style={{ strokeDashoffset: 1000 }}
        />
        <path
          d="M0 500 Q 360 650 720 500 T 1440 500"
          fill="none"
          stroke="url(#wireGradient)"
          strokeWidth="1"
          strokeDasharray="5 15"
          className="animate-wire-flow"
          style={{ strokeDashoffset: 1000, animationDelay: '0.5s' }}
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Tagline */}
        <div className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-plug-gray/50 backdrop-blur-sm border border-white/10 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-plug-electric opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-plug-electric"></span>
            </span>
            <span className="font-body text-sm text-plug-light/80">Egypt & UAE</span>
          </span>
        </div>

        {/* Main Headline */}
        <h1 className={`font-display font-bold leading-[0.95] mb-8 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-plug-light">
            Where Ideas
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            <span className="gradient-text">Are Plugged</span>
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-plug-light">
            Into Reality
          </span>
        </h1>

        {/* Subheadline */}
        <p className={`max-w-2xl mx-auto font-body text-lg md:text-xl text-plug-light/60 mb-12 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          A creative and production house transforming bold concepts into unforgettable experiences. 
          We don&apos;t just create—we <span className="text-plug-electric">electrify</span>.
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-plug-light text-plug-black font-display font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-plug-electric/20"
          >
            <span className="relative z-10">Start a Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-plug-electric to-plug-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0 z-10 flex items-center justify-center font-display font-semibold text-plug-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Start a Project
            </span>
          </a>
          <a
            href="#services"
            className="group px-8 py-4 border border-white/20 text-plug-light font-display font-semibold rounded-full hover:border-plug-electric/50 hover:bg-plug-electric/5 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Explore Services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col items-center gap-2 text-plug-light/40">
            <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-plug-electric rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-40 left-20 w-3 h-3 bg-plug-electric rounded-full animate-float opacity-60" />
      <div className="absolute top-60 right-40 w-2 h-2 bg-plug-spark rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-40 w-4 h-4 bg-plug-glow rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-60 right-20 w-2 h-2 bg-plug-electric rounded-full animate-float opacity-60" style={{ animationDelay: '0.5s' }} />
    </section>
  );
}
