"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { logs, type CaptainLog } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { cinematic, fadeUp, stagger } from "@/lib/motion";

// Captain logs - short field notes. Each opens a focused glass modal.
export function Journal() {
  const [open, setOpen] = useState<CaptainLog | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("overlay-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("overlay-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="journal" className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 sm:py-32">
      <SectionHeading
        index="05 // CAPTAIN LOGS"
        title="How I work."
        blurb="Short notes on how I build and what I refuse to compromise on. Useful if you're deciding who to trust with a launch."
      />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {logs.map((log) => (
          <motion.button
            key={log.id}
            variants={fadeUp}
            onClick={() => setOpen(log)}
            className="ring-glow group relative overflow-hidden rounded-2xl glass p-6 text-left transition-colors hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <span className="mono-label text-[10px] text-cyan">{log.index}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                {log.date}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{log.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{log.excerpt}</p>
            <div className="mt-5 flex items-center gap-1.5 text-ink-faint transition-colors group-hover:text-cyan">
              <span className="mono-label text-[10px]">OPEN LOG</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            <button
              aria-label="Close log"
              onClick={() => setOpen(null)}
              className="absolute inset-0 bg-[#06090b]/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.95, y: 18, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 10, opacity: 0 }}
              transition={{ duration: 0.45, ease: cinematic }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-strong"
              style={{ boxShadow: "0 40px 140px -40px rgba(108,155,173,0.4)" }}
            >
              <div
                className="h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent, rgb(108,155,173), transparent)" }}
              />
              <div data-lenis-prevent className="max-h-[85vh] overflow-y-auto overscroll-contain p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="mono-label text-[10px] text-cyan">{open.index}</span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {open.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    className="shrink-0 rounded-full glass p-2.5 text-ink-dim transition-colors hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-6 space-y-4">
                  {open.body.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-dim sm:text-base">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-2 border-t border-white/10 pt-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" style={{ boxShadow: "0 0 8px rgb(108,155,173)" }} />
                  <span className="mono-label text-[10px] text-ink-faint">END OF LOG · OUTIS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
