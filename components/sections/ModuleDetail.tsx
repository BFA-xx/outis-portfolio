"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Cpu,
  AlertTriangle,
  Zap,
  Layers,
  Sparkles,
  Compass,
  BarChart3,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Send,
} from "lucide-react";
import { modules, type ProjectModule } from "@/lib/data";
import { BootSequence } from "../ui/BootSequence";
import { scrollToSection } from "../system/SmoothScroll";
import { cinematic, fadeUp, stagger } from "@/lib/motion";

const rgbOf = (accent: ProjectModule["accent"]) =>
  accent === "cyan" ? "108,155,173" : "196,194,170";

// Full-screen glass detail view for a module. Opens with a boot sequence, then
// runs a fixed case-study order:
//   Hero → Problem → Solution → Impact → Capabilities → Why It Was Built →
//   Engineering → Tech Stack → Final CTA → Related.
// Navigating between projects (prev / next / related) swaps content instantly,
// without replaying the boot sequence.
export function ModuleDetail({
  module,
  onClose,
  onNavigate,
}: {
  module: ProjectModule | null;
  onClose: () => void;
  onNavigate: (m: ProjectModule) => void;
}) {
  const [booted, setBooted] = useState(false);
  const openedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isOpen = !!module;
  const accentRgb = module ? rgbOf(module.accent) : "108,155,173";

  // Lock body scroll while any module is open. Depends only on open/closed so
  // navigating between projects doesn't flash the dock back in.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("overlay-open");
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("overlay-open");
    };
  }, [isOpen]);

  // Boot on a fresh open; skip it when navigating between projects. Reset the
  // scroll position on every module change.
  useEffect(() => {
    if (!module) {
      openedRef.current = false;
      return;
    }
    if (openedRef.current) {
      setBooted(true);
    } else {
      openedRef.current = true;
      setBooted(false);
    }
    scrollRef.current?.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module?.id]);

  // Escape to close.
  useEffect(() => {
    if (!module) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [module, onClose]);

  const idx = module ? modules.findIndex((m) => m.id === module.id) : -1;
  const prevMod = idx >= 0 ? modules[(idx - 1 + modules.length) % modules.length] : null;
  const nextMod = idx >= 0 ? modules[(idx + 1) % modules.length] : null;
  const related = module ? modules.filter((m) => m.id !== module.id).slice(0, 2) : [];

  const launchWithMe = () => {
    onClose();
    setTimeout(() => scrollToSection("contact"), 420);
  };

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
                <div
                  key="content"
                  ref={scrollRef}
                  data-lenis-prevent
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

                  {/* prev / next project navigation */}
                  {prevMod && nextMod && (
                    <div className="flex items-center justify-between gap-3 border-b border-white/5 px-6 py-3 sm:px-9">
                      <button
                        onClick={() => onNavigate(prevMod)}
                        className="group flex min-w-0 items-center gap-2 text-ink-dim transition-colors hover:text-white"
                      >
                        <ArrowLeft
                          size={15}
                          className="shrink-0 transition-transform group-hover:-translate-x-0.5"
                        />
                        <span className="mono-label hidden text-[9px] text-ink-faint sm:inline">
                          PREV
                        </span>
                        <span className="truncate text-sm">{prevMod.name}</span>
                      </button>
                      <button
                        onClick={() => onNavigate(nextMod)}
                        className="group flex min-w-0 items-center justify-end gap-2 text-ink-dim transition-colors hover:text-white"
                      >
                        <span className="truncate text-sm">{nextMod.name}</span>
                        <span className="mono-label hidden text-[9px] text-ink-faint sm:inline">
                          NEXT
                        </span>
                        <ArrowRight
                          size={15}
                          className="shrink-0 transition-transform group-hover:translate-x-0.5"
                        />
                      </button>
                    </div>
                  )}

                  <motion.div
                    key={module.id}
                    variants={stagger(0.05, 0.04)}
                    initial="hidden"
                    animate="show"
                    className="space-y-8 px-6 py-7 sm:px-9 sm:py-9"
                  >
                    {/* Hero: tagline + summary */}
                    <motion.div variants={fadeUp}>
                      <p
                        className="text-lg font-medium sm:text-xl"
                        style={{ color: `rgb(${accentRgb})` }}
                      >
                        {module.tagline}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-dim sm:text-base">
                        {module.summary}
                      </p>
                    </motion.div>

                    {/* live product link */}
                    {module.liveUrl && (
                      <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center gap-x-4 gap-y-2"
                      >
                        <a
                          href={module.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-95"
                          style={{
                            background: `rgb(${accentRgb})`,
                            color: "#0b1316",
                            boxShadow: `0 12px 40px -14px rgba(${accentRgb},0.7)`,
                          }}
                        >
                          Visit live site
                          <ExternalLink
                            size={15}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                        <span className="font-mono text-xs text-ink-faint">
                          {module.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </span>
                      </motion.div>
                    )}

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

                    <Block icon={<AlertTriangle size={15} />} title="Problem" accentRgb={accentRgb}>
                      <p className="text-sm leading-relaxed text-ink-dim">{module.problem}</p>
                    </Block>

                    <Block icon={<Zap size={15} />} title="Solution" accentRgb={accentRgb}>
                      <p className="text-sm leading-relaxed text-ink-dim">{module.solution}</p>
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

                    <Block icon={<Compass size={15} />} title="Why it was built" accentRgb={accentRgb}>
                      <p className="text-sm leading-relaxed text-ink-dim">{module.whyBuilt}</p>
                    </Block>

                    <Block icon={<Layers size={15} />} title="Engineering" accentRgb={accentRgb}>
                      <p className="text-sm leading-relaxed text-ink-dim">{module.architecture}</p>
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

                    {/* Final CTA */}
                    <motion.div
                      variants={fadeUp}
                      className="ring-glow relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
                      data-active="true"
                    >
                      <div
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
                        style={{ background: `radial-gradient(circle, rgba(${accentRgb},0.16), transparent 65%)` }}
                      />
                      <h3 className="text-xl font-bold tracking-tight text-white">
                        Need something like this?
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-dim">
                        Whether you&apos;re launching a token, an NFT collection or a Web3 startup, I
                        build the software behind the launch: sites, dashboards, bots, automation and
                        the infrastructure underneath.
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                          onClick={launchWithMe}
                          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-95"
                          style={{
                            background: `rgb(${accentRgb})`,
                            color: "#0b1316",
                            boxShadow: `0 12px 40px -14px rgba(${accentRgb},0.7)`,
                          }}
                        >
                          Launch With Me
                          <ArrowRight size={15} />
                        </button>
                        <a
                          href="https://t.me/realoutis"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-ink transition-colors hover:text-white"
                        >
                          <Send size={15} className="text-purple" />
                          Message on Telegram
                        </a>
                      </div>
                    </motion.div>

                    {/* Related projects */}
                    <motion.div variants={fadeUp} className="border-t border-white/10 pt-7">
                      <div className="mb-4 flex items-center gap-2.5">
                        <span style={{ color: `rgb(${accentRgb})` }}>
                          <Layers size={15} />
                        </span>
                        <h3 className="mono-label text-[11px] text-white">Related modules</h3>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {related.map((r) => {
                          const rRgb = rgbOf(r.accent);
                          return (
                            <button
                              key={r.id}
                              onClick={() => onNavigate(r)}
                              className="group flex items-center justify-between gap-3 rounded-2xl glass px-5 py-4 text-left transition-colors hover:border-white/20"
                            >
                              <div className="min-w-0">
                                <p className="mono-label text-[9px] text-ink-faint">{r.codename}</p>
                                <p className="mt-1 truncate text-sm font-semibold text-white">
                                  {r.name}
                                </p>
                                <p className="truncate text-xs text-ink-dim">{r.category}</p>
                              </div>
                              <ArrowRight
                                size={16}
                                className="shrink-0 transition-transform group-hover:translate-x-0.5"
                                style={{ color: `rgb(${rRgb})` }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
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
