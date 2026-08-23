"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals a section the first time it scrolls into view.
 *
 * Four sections were each carrying their own copy of this observer, with the
 * threshold drifting between them; this is the one implementation they now
 * share. It reveals ONCE and then disconnects — a section that has been read
 * should not fade out again when the reader scrolls back up.
 *
 * Anyone who has asked their system for less motion gets the revealed state
 * immediately, with no observer at all.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/** Whether the reader has asked for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
