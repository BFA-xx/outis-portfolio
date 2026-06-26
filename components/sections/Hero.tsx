"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Boxes, Activity, ShieldCheck, Cpu } from "lucide-react";
import { identity, coreStats } from "@/lib/data";
import { scrollToSection } from "../system/SmoothScroll";
import { useSystemMode } from "../system/SystemModeProvider";
import { fadeUp, stagger, softSpring } from "@/lib/motion";

export function Hero() {
  const { isSystem, reduceMotion } = useSystemMode();
  const ref = useRef<HTMLDivElement>(null);

  // Pointer-driven parallax for the floating panels.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, softSpring);
  const sy = useSpring(my, softSpring);

  const depth = reduceMotion ? 0 : isSystem ? 1 : 0.5;

  const handleMove = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  // Layered transforms — different magnitudes create depth. Hooks must be
  // called unconditionally at the top level, so each axis is declared inline.
  const farX = useTransform(sx, [-1, 1], [-18 * depth, 18 * depth]);
  const farY = useTransform(sy, [-1, 1], [-18 * depth, 18 * depth]);
  const midX = useTransform(sx, [-1, 1], [-30 * depth, 30 * depth]);
  const midY = useTransform(sy, [-1, 1], [-30 * depth, 30 * depth]);
  const nearX = useTransform(sx, [-1, 1], [-44 * depth, 44 * depth]);
  const nearY = useTransform(sy, [-1, 1], [-44 * depth, 44 * depth]);
  const farPanel = { x: farX, y: farY };
  const midPanel = { x: midX, y: midY };
  const nearPanel = { x: nearX, y: nearY };

  return (
    <section
      id="core"
      ref={ref}
      onMouseMove={handleMove}
      className="relative flex min-h-[100svh] items-center justify-center px-5 pt-28 pb-20 sm:px-8"
    >
      <motion.div
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl text-center"
      >
        {/* status line */}
        <motion.div variants={fadeUp} className="mb-7 flex justify-center">
          <div className="flex items-center gap-2.5 rounded-full glass px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="mono-label text-[10px] text-ink-dim">
              SYSTEM {identity.status} · {identity.location}
            </span>
          </div>
        </motion.div>

        {/* operator avatar */}
        <motion.div variants={fadeUp} className="mb-7 flex justify-center">
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-full opacity-70 blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(108,155,173,0.55), transparent 70%)" }}
            />
            <div
              className="relative h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28"
              style={{ boxShadow: "0 0 0 1px rgba(108,155,173,0.45), 0 16px 50px -10px rgba(108,155,173,0.5)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={identity.avatar} alt="OUTIS" className="h-full w-full object-cover" />
            </div>
            <span
              className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full border-2 border-[#0b1316] bg-cyan"
              style={{ boxShadow: "0 0 10px rgba(108,155,173,0.9)" }}
            />
          </div>
        </motion.div>

        {/* callsign */}
        <motion.h1
          variants={fadeUp}
          className="text-glow-cyan bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-[14vw] font-bold leading-[0.85] tracking-tighter text-transparent sm:text-[10vw] lg:text-[7.5rem]"
        >
          OUTIS
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mono-label mt-4 text-[11px] text-cyan sm:text-xs"
        >
          {identity.role}
        </motion.p>

        {/* manifesto */}
        <motion.div variants={fadeUp} className="mx-auto mt-8 max-w-2xl space-y-3">
          <p className="text-balance text-lg font-medium text-ink sm:text-xl">
            {identity.manifesto[0]}
          </p>
          <p className="text-balance text-sm leading-relaxed text-ink-dim sm:text-base">
            {identity.manifesto[1]}
          </p>
          <p className="text-balance text-sm leading-relaxed text-ink-faint">
            {identity.manifesto[2]}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={() => scrollToSection("modules")}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cyan px-7 py-3.5 text-sm font-semibold text-[#0b1316] transition-transform hover:scale-[1.03] active:scale-95"
            style={{ boxShadow: "0 12px 50px -12px rgba(108,155,173,0.7)" }}
          >
            <span className="relative z-10">Enter System</span>
            <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-500 group-hover:translate-x-full" />
          </button>
          <button
            onClick={() => scrollToSection("modules")}
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-medium text-ink transition-all hover:border-white/25 hover:text-white"
          >
            <Boxes size={16} className="text-purple" />
            View Projects
          </button>
        </motion.div>

        {/* core stats */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {coreStats.map((s) => (
            <div key={s.label} className="rounded-2xl glass px-4 py-4 text-left">
              <p className="text-glow-cyan text-2xl font-bold text-white sm:text-3xl">
                {s.value}
              </p>
              <p className="mono-label mt-1 text-[8.5px] text-ink-faint sm:text-[9px]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* floating glass HUD panels — decorative, parallaxed, desktop only */}
      <motion.div
        style={farPanel}
        className="pointer-events-none absolute left-[6%] top-[24%] hidden lg:block"
      >
        <FloatingChip icon={<Cpu size={13} />} title="MINT ENGINE" line="mainnet · live" accent="cyan" />
      </motion.div>
      <motion.div
        style={nearPanel}
        className="pointer-events-none absolute right-[7%] top-[30%] hidden lg:block"
      >
        <FloatingChip icon={<ShieldCheck size={13} />} title="SAFETY" line="simulate · then send" accent="cyan" />
      </motion.div>
      <motion.div
        style={midPanel}
        className="pointer-events-none absolute bottom-[16%] right-[12%] hidden lg:block"
      >
        <FloatingChip icon={<Activity size={13} />} title="UPTIME" line="24/7 · pm2" accent="purple" />
      </motion.div>
    </section>
  );
}

function FloatingChip({
  icon,
  title,
  line,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  line: string;
  accent: "cyan" | "purple";
}) {
  return (
    <div className="rounded-2xl glass-strong px-4 py-3">
      <div className="flex items-center gap-2">
        <span className={accent === "cyan" ? "text-cyan" : "text-purple"}>{icon}</span>
        <span className="mono-label text-[9px] text-ink-dim">{title}</span>
      </div>
      <p className="mt-1.5 font-mono text-xs text-white/80">{line}</p>
    </div>
  );
}
