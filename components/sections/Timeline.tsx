"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { timeline } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { fadeUp, spring } from "@/lib/motion";

// Scroll-driven evolution log. A central rail fills as you scroll; each entry is
// a glowing node that can expand into its detail. Reads as a system changelog.
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="timeline" className="relative mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-12 sm:py-32">
      <SectionHeading
        index="03 // SYSTEM EVOLUTION LOG"
        title="How the system grew."
        blurb="A changelog of the build — from production-floor foundations to live mainnet automation."
      />

      <div ref={ref} className="relative">
        {/* rail */}
        <div className="absolute left-[18px] top-2 h-full w-px bg-white/10 sm:left-[22px]" />
        <motion.div
          className="absolute left-[18px] top-2 w-px origin-top sm:left-[22px]"
          style={{
            scaleY: fill,
            height: "100%",
            background: "linear-gradient(180deg, rgba(108,155,173,0.9), rgba(196,194,170,0.6))",
            boxShadow: "0 0 14px rgba(108,155,173,0.6)",
          }}
        />

        <div className="space-y-3">
          {timeline.map((entry) => (
            <TimelineRow key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ entry }: { entry: (typeof timeline)[number] }) {
  const [open, setOpen] = useState(false);
  const accentRgb = entry.accent === "cyan" ? "108,155,173" : "196,194,170";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative pl-12 sm:pl-16"
    >
      {/* node */}
      <span className="absolute left-[12px] top-3.5 sm:left-[16px]">
        <span
          className="block h-3.5 w-3.5 rounded-full border-2"
          style={{
            borderColor: `rgb(${accentRgb})`,
            background: "#0d171b",
            boxShadow: `0 0 0 4px rgba(${accentRgb},0.12), 0 0 14px rgba(${accentRgb},0.6)`,
          }}
        />
      </span>

      <button
        onClick={() => setOpen((o) => !o)}
        data-active={open}
        className="ring-glow group w-full overflow-hidden rounded-2xl glass px-5 py-4 text-left transition-colors hover:border-white/20"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mono-label text-[10px]" style={{ color: `rgb(${accentRgb})` }}>
              {entry.stamp}
            </span>
            <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-ink-faint">
              {entry.tag}
            </span>
          </div>
          <ChevronDown
            size={16}
            className="shrink-0 text-ink-faint transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </div>

        <h3 className="mt-2 text-base font-semibold text-white sm:text-lg">{entry.title}</h3>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={spring}
          className="overflow-hidden"
        >
          <p className="pt-3 text-sm leading-relaxed text-ink-dim">{entry.detail}</p>
        </motion.div>
      </button>
    </motion.div>
  );
}
