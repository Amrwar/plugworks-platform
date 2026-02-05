"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-plug-electric/10 rounded-full blur-glow" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-plug-spark/10 rounded-full blur-glow" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block font-display text-sm text-plug-electric uppercase tracking-[0.3em] mb-4">
              Get in Touch
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-plug-light leading-tight mb-6">
              Ready to
              <span className="block gradient-text">Plug In?</span>
            </h2>
            <p className="font-body text-lg text-plug-light/60 leading-relaxed mb-10">
              Have a project in mind? Let&apos;s spark a conversation. 
              Whether you&apos;re looking for a creative partner or want to 
              explore possibilities, we&apos;re all ears.
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-plug-electric/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-plug-electric" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-sm text-plug-light/40">Email us</p>
                  <p className="font-body text-plug-light">hello@plugworks.co</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-plug-spark/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-plug-spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-sm text-plug-light/40">Offices</p>
                  <p className="font-body text-plug-light">Cairo, Egypt • Dubai, UAE</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-plug-glow/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-plug-glow" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-sm text-plug-light/40">Follow us</p>
                  <div className="flex gap-3">
                    <a href="#" className="font-body text-plug-light hover:text-plug-electric transition-colors">Instagram</a>
                    <span className="text-plug-light/20">•</span>
                    <a href="#" className="font-body text-plug-light hover:text-plug-electric transition-colors">LinkedIn</a>
                    <span className="text-plug-light/20">•</span>
                    <a href="#" className="font-body text-plug-light hover:text-plug-electric transition-colors">Behance</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact form */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="gradient-border p-8 md:p-10">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-body text-sm text-plug-light/60 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-plug-black/50 border border-white/10 rounded-xl text-plug-light font-body focus:border-plug-electric focus:outline-none focus:ring-1 focus:ring-plug-electric transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-sm text-plug-light/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-plug-black/50 border border-white/10 rounded-xl text-plug-light font-body focus:border-plug-electric focus:outline-none focus:ring-1 focus:ring-plug-electric transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block font-body text-sm text-plug-light/60 mb-2">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 bg-plug-black/50 border border-white/10 rounded-xl text-plug-light font-body focus:border-plug-electric focus:outline-none focus:ring-1 focus:ring-plug-electric transition-all"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block font-body text-sm text-plug-light/60 mb-2">
                    What are you looking for?
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 bg-plug-black/50 border border-white/10 rounded-xl text-plug-light font-body focus:border-plug-electric focus:outline-none focus:ring-1 focus:ring-plug-electric transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option value="brand-experiences">Brand Experiences</option>
                    <option value="content-production">Content Production</option>
                    <option value="event-production">Event Production</option>
                    <option value="campaign-strategy">Campaign Strategy</option>
                    <option value="creative-direction">Creative Direction</option>
                    <option value="digital-experiences">Digital Experiences</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-body text-sm text-plug-light/60 mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-plug-black/50 border border-white/10 rounded-xl text-plug-light font-body focus:border-plug-electric focus:outline-none focus:ring-1 focus:ring-plug-electric transition-all resize-none"
                    placeholder="Share your vision..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-electric px-8 py-4 bg-gradient-to-r from-plug-electric to-plug-glow text-plug-black font-display font-bold rounded-xl hover:shadow-lg hover:shadow-plug-electric/30 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
