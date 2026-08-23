"use client";

import { useState, useEffect } from "react";

import { NAV_LINKS } from "@/data/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-12 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-plug-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <div className="relative w-10 h-10">
              {/* Plug icon */}
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <defs>
                  <linearGradient id="plugGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="50%" stopColor="#7B61FF" />
                    <stop offset="100%" stopColor="#FF6B35" />
                  </linearGradient>
                </defs>
                <rect x="12" y="4" width="4" height="12" rx="1" fill="url(#plugGradient)" />
                <rect x="24" y="4" width="4" height="12" rx="1" fill="url(#plugGradient)" />
                <rect x="8" y="14" width="24" height="14" rx="3" fill="url(#plugGradient)" />
                <rect x="16" y="28" width="8" height="8" rx="2" fill="url(#plugGradient)" />
              </svg>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-plug-electric/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">
              <span className="text-plug-light">PLUG</span>
              <span className="gradient-text">WORKS</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-body text-sm text-plug-light/70 hover:text-plug-light transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-plug-electric to-plug-glow group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="btn-electric px-6 py-2.5 bg-gradient-to-r from-plug-electric to-plug-glow text-plug-black font-display font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-plug-electric/30 transition-all duration-300"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-plug-light"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-plug-dark/95 backdrop-blur-xl border-b border-white/5 animate-slide-up">
            <div className="px-6 py-8 space-y-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-display text-2xl text-plug-light hover:text-plug-electric transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-block btn-electric px-8 py-3 bg-gradient-to-r from-plug-electric to-plug-glow text-plug-black font-display font-semibold rounded-full"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
