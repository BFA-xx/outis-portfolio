"use client";

import { motion } from "framer-motion";
import { useSystemMode } from "../system/SystemModeProvider";
import { snappySpring } from "@/lib/motion";

// NORMAL / SYSTEM switch. Reads as a piece of system hardware: a sliding glass
// knob with a glow that intensifies in SYSTEM mode.
export function SystemModeToggle({ compact = false }: { compact?: boolean }) {
  const { isSystem, toggle } = useSystemMode();

  return (
    <button
      onClick={toggle}
      aria-pressed={isSystem}
      aria-label={`Switch to ${isSystem ? "normal" : "system"} mode`}
      className="group flex items-center gap-2.5 rounded-full glass px-2 py-1.5 transition-colors hover:border-white/20"
    >
      {!compact && (
        <span className="mono-label pl-1.5 text-[9px] text-ink-dim transition-colors">
          {isSystem ? "SYSTEM" : "NORMAL"}
        </span>
      )}
      <span
        className="relative h-5 w-9 rounded-full transition-colors duration-300"
        style={{
          background: isSystem
            ? "rgba(108,155,173,0.28)"
            : "rgba(255,255,255,0.08)",
          boxShadow: isSystem
            ? "inset 0 0 12px rgba(108,155,173,0.45), 0 0 16px rgba(108,155,173,0.35)"
            : "inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        <motion.span
          layout
          transition={snappySpring}
          className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white"
          style={{
            left: isSystem ? "calc(100% - 1.05rem)" : "0.2rem",
            boxShadow: isSystem ? "0 0 12px rgba(108,155,173,0.9)" : "none",
          }}
        />
      </span>
    </button>
  );
}
