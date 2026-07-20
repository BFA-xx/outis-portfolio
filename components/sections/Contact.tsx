"use client";

import { motion } from "framer-motion";
import { Send, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { socials, identity } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";

// X glyph (lucide dropped the Twitter bird; render the X mark inline).
function XGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

const iconFor = {
  x: <XGlyph size={16} />,
  telegram: <Send size={16} />,
  discord: <MessageCircle size={16} />,
  mail: <Mail size={16} />,
} as const;

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-12 sm:py-32">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="ring-glow relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-12"
        data-active="true"
      >
        {/* ambient accent */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(108,155,173,0.18), transparent 65%)" }}
        />

        <motion.div variants={fadeUp} className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
          <span className="mono-label text-[10px] text-cyan">06 // OPEN A CHANNEL</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
        >
          Launching a token, an NFT drop or a Web3 product?
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-lg text-sm leading-relaxed text-ink-dim sm:text-base">
          I build the sites, dashboards, portals and bots crypto teams launch with, from a one-page
          token site to a full admin platform with onchain automation behind it. Tell me what
          you&apos;re shipping and when, and you&apos;ll get a straight answer on scope and timing.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 grid gap-3 sm:grid-cols-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl glass px-5 py-4 transition-all hover:border-white/25"
            >
              <div className="flex items-center gap-3.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.04] text-ink-dim transition-colors group-hover:text-cyan">
                  {iconFor[s.kind]}
                </span>
                <div>
                  <p className="mono-label text-[9px] text-ink-faint">{s.label}</p>
                  <p className="text-sm font-medium text-white">{s.handle}</p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan"
              />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 sm:flex-row">
        <p className="mono-label text-[10px] text-ink-faint">
          © {new Date().getFullYear()} {identity.callsign}
        </p>
        <p className="mono-label text-[10px] text-ink-faint">realoutis.com · SYSTEM v2</p>
      </footer>
    </section>
  );
}
