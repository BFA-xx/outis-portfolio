"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { modules, type ProjectModule } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { ModuleDetail } from "./ModuleDetail";
import { useSystemMode } from "../system/SystemModeProvider";
import { fadeUp, stagger } from "@/lib/motion";

export function Projects() {
  const [open, setOpen] = useState<ProjectModule | null>(null);

  return (
    <section id="modules" className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 sm:py-32">
      <SectionHeading
        index="04 // DEPLOYED SYSTEMS"
        title="Systems, not screenshots."
        blurb="Real platforms in production, with real money and real communities running through them. Activate a module for the full breakdown."
      />

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {modules.map((m, i) => (
          <ModuleCard key={m.id} module={m} index={i} onOpen={() => setOpen(m)} />
        ))}
      </motion.div>

      <ModuleDetail module={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}

function ModuleCard({
  module,
  index,
  onOpen,
}: {
  module: ProjectModule;
  index: number;
  onOpen: () => void;
}) {
  const { isSystem, reduceMotion } = useSystemMode();
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);

  const accentRgb = module.accent === "cyan" ? "108,155,173" : "196,194,170";

  // 3D tilt that follows the pointer across the card.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const tiltMax = reduceMotion ? 0 : isSystem ? 9 : 5;
  const rotX = useSpring(useTransform(py, [0, 1], [tiltMax, -tiltMax]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(px, [0, 1], [-tiltMax, tiltMax]), { stiffness: 200, damping: 20 });
  // Glow follows the cursor.
  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    setHover(false);
  };

  return (
    <motion.button
      ref={ref}
      variants={fadeUp}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      onClick={onOpen}
      data-active={hover}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      className={`ring-glow group relative block w-full overflow-hidden rounded-3xl glass p-7 text-left transition-shadow duration-500 accent-${module.accent}`}
    >
      {/* cursor-tracking glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(${accentRgb},0.18), transparent 60%)`
          ),
        }}
      />

      {/* index watermark */}
      <span className="pointer-events-none absolute -right-2 -top-5 select-none font-mono text-[7rem] font-bold leading-none text-white/[0.03]">
        0{index + 1}
      </span>

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <span className="mono-label text-[10px] text-ink-faint">{module.codename}</span>
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
            {module.status}
          </span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {module.name}
        </h3>
        <p className="mt-1.5 text-sm text-ink-dim">{module.category}</p>

        <p className="mt-5 text-sm leading-relaxed text-ink-dim">{module.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {module.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-ink-faint"
            >
              {tech}
            </span>
          ))}
          {module.stack.length > 5 && (
            <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-ink-faint">
              +{module.stack.length - 5}
            </span>
          )}
        </div>

        <div
          className="mt-7 flex items-center justify-between gap-3 text-sm font-medium transition-colors"
          style={{ color: hover ? `rgb(${accentRgb})` : "var(--ink-dim)" }}
        >
          <span className="flex items-center gap-2">
            <span className="mono-label text-[11px]">ACTIVATE MODULE</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          {module.liveUrl && (
            <span className="mono-label truncate text-[10px] text-ink-faint">
              {module.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
