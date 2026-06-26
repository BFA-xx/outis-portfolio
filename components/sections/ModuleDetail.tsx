"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, AlertTriangle, Layers, Sparkles, BarChart3 } from "lucide-react";
import type { ProjectModule } from "@/lib/data";
import { BootSequence } from "../ui/BootSequence";
import { cinematic, fadeUp, stagger } from "@/lib/motion";

// Full-screen glass detail view for a module. Opens with a boot sequence, then
// reveals overview → problem → architecture → capabilities → stack → impact.
export function ModuleDetail({
  module,
  onClose,
}: {
  module: ProjectModule | null;
  onClose: () => void;
}) {
  const [booted, setBooted] = useState(false);
  const accentRgb = module?.accent === "cyan" ? "108,155,173" : "196,194,170";

  // Reset boot state whenever a new module opens; lock body scroll while open.
  useEffect(() => {
    if (module) {
      setBooted(false);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.body.classList.add("overlay-open");
      return () => {
        document.body.style.overflow = prev;
        document.body.classList.remove("overlay-open");
      };
    }
  }, [module]);

  // Escape to close.
  useEffect(() => {
    if (!module) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [module, onClose]);

  return (
    <AnimatePresence>
      {module && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-stretch justify-center p-0 sm:p-4 lg:p-8"
        >
          {/* backdrop */}
          <button
            aria-label="Close module"
            onClick={onClose}
            className="absolute inset-0 bg-[#06090b]/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, y: 12, opacity: 0 }}
            transition={{ duration: 0.5, ease: cinematic }}
            className={`relative flex w-full max-w-4xl flex-col overflow-hidden rounded-none glass-strong sm:rounded-3xl accent-${module.accent}`}
            style={{ boxShadow: `0 40px 140px -40px rgba(${accentRgb},0.5)` }}
          >
            {/* top accent line */}
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(90deg, transparent, rgb(${accentRgb}), transparent)`,
              }}
            />

            <AnimatePresence mode="wait">
              {!booted ? (
                <motion.div
                  key="boot"
                  exit={{ opacity: 0 }}
                  className="flex h-[60vh] items-center justify-center"
                >
                  <BootSequence
                    name={module.name}
                    accent={module.accent}
                    onComplete={() => setBooted(true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  data-lenis-prevent
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex max-h-[100svh] flex-col overflow-y-auto overscroll-contain sm:max-h-[88vh]"
                >
                  {/* header */}
                  <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#0d171b]/70 px-6 py-5 backdrop-blur-xl sm:px-9">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="mono-label text-[10px] text-ink-faint">
                          {module.codename}
                        </span>
                        <StatusPill status={module.status} accentRgb={accentRgb} />
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {module.name}
                      </h2>
                      <p className="mt-1 text-sm text-ink-dim">{module.category}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="shrink-0 rounded-full glass p-2.5 text-ink-dim transition-colors hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <motion.div
                    variants={stagger(0.06, 0.05)}
                    initial="hidden"
                    animate="show"
                    className="space-y-8 px-6 py-7 sm:px-9 sm:py-9"
                  >
                    {/* tagline + summary */}
                    <motion.div variants={fadeUp}>
                      <p
                        className="text-lg font-medium text-white sm:text-xl"
                        style={{ color: `rgb(${accentRgb})` }}
                      >
                        {module.tagline}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-dim sm:text-base">
                        {module.summary}
                      </p>
                    </motion.div>

                    {/* meta strip */}
                    <motion.div
                      variants={fadeUp}
                      className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-3"
                    >
                      {module.meta.map((m) => (
                        <div key={m.label} className="bg-white/[0.03] px-4 py-3">
                          <p className="mono-label text-[9px] text-ink-faint">{m.label}</p>
                          <p className="mt-1 text-sm font-medium text-white">{m.value}</p>
                        </div>
                      ))}
                    </motion.div>

                    <Block icon={<AlertTriangle size={15} />} title="Problem solved" accentRgb={accentRgb}>
                      <p className="text-sm leading-relaxed text-ink-dim">{module.problem}</p>
                    </Block>

                    <Block icon={<Layers size={15} />} title="Architecture" accentRgb={accentRgb}>
                      <p className="text-sm leading-relaxed text-ink-dim">{module.architecture}</p>
                    </Block>

                    <Block icon={<Sparkles size={15} />} title="Capabilities" accentRgb={accentRgb}>
                      <ul className="space-y-2.5">
                        {module.capabilities.map((c, i) => (
                          <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: `rgb(${accentRgb})`, boxShadow: `0 0 8px rgb(${accentRgb})` }}
                            />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </Block>

                    <Block icon={<Cpu size={15} />} title="Tech stack" accentRgb={accentRgb}>
                      <div className="flex flex-wrap gap-2">
                        {module.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-ink-dim"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Block>

                    <Block icon={<BarChart3 size={15} />} title="Impact" accentRgb={accentRgb}>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {module.impact.map((m) => (
                          <div
                            key={m.label}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                          >
                            <p className="mono-label text-[9px] text-ink-faint">{m.label}</p>
                            <p className="mt-1.5 text-sm font-semibold text-white">{m.value}</p>
                          </div>
                        ))}
                      </div>
                    </Block>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusPill({ status, accentRgb }: { status: string; accentRgb: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium"
      style={{
        background: `rgba(${accentRgb},0.12)`,
        color: `rgb(${accentRgb})`,
        boxShadow: `inset 0 0 0 1px rgba(${accentRgb},0.3)`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: `rgb(${accentRgb})`, boxShadow: `0 0 8px rgb(${accentRgb})` }}
      />
      {status}
    </span>
  );
}

function Block({
  icon,
  title,
  accentRgb,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accentRgb: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp}>
      <div className="mb-3 flex items-center gap-2.5">
        <span style={{ color: `rgb(${accentRgb})` }}>{icon}</span>
        <h3 className="mono-label text-[11px] text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
