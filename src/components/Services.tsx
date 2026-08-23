"use client";

import type { ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";


import { SERVICES } from "@/data/services";

/** The illustration for each service, keyed by its id in the data module. */
const ICONS: Record<string, ReactNode> = {
  "brand-experiences": (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" strokeWidth="2" />
        <path d="M4 14l20 10 20-10" stroke="currentColor" strokeWidth="2" />
        <path d="M24 24v20" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="14" r="4" fill="currentColor" />
      </svg>
  ),
  "content-production": (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <rect x="4" y="8" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M18 20l8 6-8 6V20z" fill="currentColor" />
        <path d="M4 36l10-8 6 4 8-6 6 4 10-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
  ),
  "event-production": (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
        <path d="M24 4v8M24 36v8M4 24h8M36 24h8" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
  ),
  "campaign-strategy": (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <path d="M8 12h32v24H8z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 4v8M36 4v8" stroke="currentColor" strokeWidth="2" />
        <path d="M16 20h16M16 26h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="32" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M36 28v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
  ),
  "creative-direction": (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <path d="M24 4l6 12 14 2-10 10 2 14-12-6-12 6 2-14L4 18l14-2 6-12z" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="6" fill="currentColor" />
      </svg>
  ),
  "digital-experiences": (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <rect x="4" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="26" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="4" y="26" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M26 26h18v18H26z" stroke="currentColor" strokeWidth="2" />
        <path d="M35 31v8M31 35h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
  ),
};

export default function Services() {
  const { ref: sectionRef, isVisible } = useReveal<HTMLElement>(0.1);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-plug-glow/5 rounded-full blur-glow" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block font-display text-sm text-plug-electric uppercase tracking-[0.3em] mb-4">
            What We Do
          </span>
          <h2
 id="services-heading"
 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-plug-light mb-6">
            Services That
            <span className="gradient-text"> Spark</span>
          </h2>
          <p className="max-w-2xl mx-auto font-body text-lg text-plug-light/60">
            We offer a full spectrum of creative and production services, 
            each designed to plug your vision into powerful experiences.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-plug-dark/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-${service.color}/30 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`relative text-${service.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                {ICONS[service.id]}
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-plug-light mb-3 group-hover:text-plug-electric transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-body text-plug-light/60 leading-relaxed">
                {service.description}
              </p>

              {/* Arrow indicator */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg aria-hidden="true" className={`w-6 h-6 text-${service.color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-display font-semibold text-plug-electric hover:text-plug-light transition-colors duration-300 group"
          >
            <span>Let&apos;s discuss your project</span>
            <svg aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
