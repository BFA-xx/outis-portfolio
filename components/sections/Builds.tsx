"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { recentBuilds, type Build } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { fadeUp, stagger, spring } from "@/lib/motion";

// Recent deployments. Designed to grow: add an entry to `recentBuilds` in
// lib/data.ts and it appears here. A thumbnail is optional, so a build can be
// published the moment it ships without waiting on artwork.
export function Builds() {
  return (
    <section
      id="builds"
      className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 sm:py-32"
    >
      <SectionHeading
        index="06 // RECENT DEPLOYMENTS"
        title="Latest builds."
        blurb="Things that are shipped and reachable. Click through and use them."
      />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {recentBuilds.map((build) => (
          <BuildCard key={build.id} build={build} />
        ))}
      </motion.div>
    </section>
  );
}

function BuildCard({ build }: { build: Build }) {
  const accentRgb = build.accent === "cyan" ? "108,155,173" : "196,194,170";

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5 }}
      transition={spring}
      className={`ring-glow group relative flex flex-col overflow-hidden rounded-3xl glass transition-colors duration-300 hover:border-white/20 accent-${build.accent}`}
    >
      {/* thumbnail, or a generated plate when no artwork exists yet */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-white/10">
        {build.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={build.image}
            alt={build.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `radial-gradient(120% 100% at 50% 0%, rgba(${accentRgb},0.16), transparent 70%)`,
            }}
          >
            <span
              className="mono-label text-[11px]"
              style={{ color: `rgb(${accentRgb})` }}
            >
              {build.title}
            </span>
          </div>
        )}
        <span
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-md"
          style={{
            background: `rgba(${accentRgb},0.14)`,
            color: `rgb(${accentRgb})`,
            boxShadow: `inset 0 0 0 1px rgba(${accentRgb},0.3)`,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: `rgb(${accentRgb})`, boxShadow: `0 0 8px rgb(${accentRgb})` }}
          />
          {build.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-white">{build.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{build.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {build.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-ink-faint"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {build.liveUrl && (
            <a
              href={build.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-transform hover:scale-[1.04] active:scale-95"
              style={{ background: `rgb(${accentRgb})`, color: "#0b1316" }}
            >
              Open live
              <ExternalLink size={13} />
            </a>
          )}
          {build.repoUrl && (
            <a
              href={build.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-ink-dim transition-colors hover:text-white"
            >
              <Github size={13} />
              Code
            </a>
          )}
          {build.liveUrl && (
            <span className="mono-label text-[10px] text-ink-faint">
              {build.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
