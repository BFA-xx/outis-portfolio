"use client";

import { motion } from "framer-motion";
import { availability } from "@/lib/data";
import { fadeUp } from "@/lib/motion";

// A terminal-style status readout. Sits beside the contact copy so the
// commercial questions (are you free, how fast, how much) are answered before
// the visitor has to ask them.
export function AvailabilityPanel() {
  return (
    <motion.div
      variants={fadeUp}
      className="scanline relative overflow-hidden rounded-2xl glass p-5 sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="mono-label text-[10px] text-ink-faint">SYSTEM STATUS</span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium"
          style={{
            background: "rgba(108,155,173,0.12)",
            color: "rgb(108,155,173)",
            boxShadow: "inset 0 0 0 1px rgba(108,155,173,0.3)",
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan"
              style={{ boxShadow: "0 0 8px rgb(108,155,173)" }}
            />
          </span>
          {availability.status}
        </span>
      </div>

      <p className="text-sm font-medium text-white sm:text-base">{availability.headline}</p>

      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10">
        {availability.slots.map((slot) => (
          <div key={slot.label} className="bg-white/[0.03] px-4 py-3">
            <p className="mono-label text-[9px] text-ink-faint">{slot.label}</p>
            <p className="mt-1 font-mono text-xs text-white">{slot.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 border-t border-white/10 pt-4 text-xs text-ink-faint">
        {availability.pricing}
      </p>
    </motion.div>
  );
}
