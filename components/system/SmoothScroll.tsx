"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useSystemMode } from "./SystemModeProvider";

// Lenis smooth scroll. Disabled when the user prefers reduced motion so the
// page falls back to native, accessible scrolling. Exposes the instance on
// window so anchor navigation can drive it.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  const { reduceMotion } = useSystemMode();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    window.__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduceMotion]);

  return null;
}

// Smoothly scroll to a section id via Lenis when available, native otherwise.
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
