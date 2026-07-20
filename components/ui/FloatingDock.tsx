"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Boxes, GitBranch, BookOpen, LayoutGrid } from "lucide-react";
import { navItems } from "@/lib/data";
import { scrollToSection } from "../system/SmoothScroll";
import { SystemModeToggle } from "./SystemModeToggle";
import { spring } from "@/lib/motion";

const icons = {
  core: Home,
  services: LayoutGrid,
  modules: Boxes,
  timeline: GitBranch,
  journal: BookOpen,
} as const;

// A floating glass control bar - a UI layer, not a website menu. It tracks the
// active section via an IntersectionObserver and highlights it with a shared
// layout pill. Each item expands its label on hover with a spring.
export function FloatingDock() {
  const [active, setActive] = useState<string>("core");
  const [hovered, setHovered] = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  // Hide the dock while a full-screen overlay (module / log) is open. Overlays
  // toggle the `overlay-open` class on <body>; watch it with a MutationObserver.
  useEffect(() => {
    const sync = () => setOverlayOpen(document.body.classList.contains("overlay-open"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: overlayOpen ? -28 : 0, opacity: overlayOpen ? 0 : 1 }}
      transition={{ ...spring, delay: overlayOpen ? 0 : 0.4 }}
      style={{ pointerEvents: overlayOpen ? "none" : "auto" }}
      className="system-dock fixed left-1/2 top-4 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full glass-strong p-1.5 pr-2">
        {/* callsign tab */}
        <button
          onClick={() => scrollToSection("core")}
          className="mono-label hidden rounded-full px-3 py-2 text-[10px] text-cyan transition-colors hover:text-white sm:block"
        >
          OUTIS
        </button>
        <span className="mx-0.5 hidden h-5 w-px bg-white/10 sm:block" />

        {navItems.map((item) => {
          const Icon = icons[item.id as keyof typeof icons];
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex items-center rounded-full px-3 py-2 outline-none"
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  transition={spring}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(108,155,173,0.14)",
                    boxShadow: "inset 0 0 0 1px rgba(108,155,173,0.3)",
                  }}
                />
              )}
              <Icon
                size={15}
                className={`relative z-10 transition-colors ${
                  isActive ? "text-cyan" : "text-ink-dim"
                }`}
              />
              <AnimatePresence>
                {(hovered === item.id || isActive) && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                    transition={spring}
                    className={`relative z-10 overflow-hidden whitespace-nowrap text-[12px] ${
                      isActive ? "text-white" : "text-ink-dim"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}

        <span className="mx-0.5 h-5 w-px bg-white/10" />
        <SystemModeToggle compact />
      </div>
    </motion.nav>
  );
}
