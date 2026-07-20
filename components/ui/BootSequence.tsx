"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSystemMode } from "../system/SystemModeProvider";

interface BootSequenceProps {
  name: string;
  accent: "cyan" | "purple";
  onComplete: () => void;
}

// The "module boot" - a short terminal sequence shown when a module opens:
//   Initializing module…  Loading architecture…  Access granted
// Honors reduced-motion by completing instantly.
export function BootSequence({ name, accent, onComplete }: BootSequenceProps) {
  const { reduceMotion } = useSystemMode();
  const [step, setStep] = useState(0);

  const lines = [
    `> initializing module: ${name}`,
    "> loading architecture…",
    "> verifying integrity…",
    "> access granted",
  ];
  const accentRgb = accent === "cyan" ? "108,155,173" : "196,194,170";

  useEffect(() => {
    if (reduceMotion) {
      onComplete();
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 260 * (i + 1)));
    });
    timers.push(setTimeout(onComplete, 260 * lines.length + 520));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduceMotion) return null;

  return (
    <div className="scanline flex h-full w-full flex-col items-center justify-center px-8">
      <div className="w-full max-w-md font-mono text-sm">
        <div className="mb-6 flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: `rgb(${accentRgb})`, boxShadow: `0 0 14px rgb(${accentRgb})` }}
          />
          <span className="mono-label text-[10px] text-ink-dim">SYSTEM BOOT</span>
        </div>
        {lines.slice(0, step).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2 leading-relaxed"
            style={{
              color: i === lines.length - 1 ? `rgb(${accentRgb})` : "var(--ink-dim)",
            }}
          >
            {line}
            {i === step - 1 && <span className="cursor-blink ml-1">▋</span>}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
