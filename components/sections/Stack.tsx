"use client";

import { motion } from "framer-motion";
import { Link2, Monitor, Server, Blocks, Cloud } from "lucide-react";
import { stackGroups, type StackGroup } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { fadeUp, stagger, spring } from "@/lib/motion";

const icons = {
  chain: Link2,
  frontend: Monitor,
  backend: Server,
  onchain: Blocks,
  infra: Cloud,
} as const;

// The stack, grouped and presented as system modules. Purely credibility: a
// founder should be able to scan it and see their chain and their tools.
export function Stack() {
  return (
    <section
      id="stack"
      className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 sm:py-32"
    >
      <SectionHeading
        index="02 // DEPLOYMENT STACK"
        title="What it runs on."
        blurb="The chains and tooling I build with day to day. If your project already runs on something here, we start from a running start."
      />

      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {stackGroups.map((group) => (
          <StackCard key={group.id} group={group} />
        ))}
      </motion.div>
    </section>
  );
}

function StackCard({ group }: { group: StackGroup }) {
  const Icon = icons[group.icon as keyof typeof icons] ?? Blocks;
  const accentRgb = group.accent === "cyan" ? "108,155,173" : "196,194,170";
  // Long groups (the chains) keep the same card size as the others but pack
  // their items into two compact columns so the card isn't a tall tower.
  const twoCol = group.items.length >= 10;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={spring}
      className={`ring-glow group relative overflow-hidden rounded-2xl glass p-5 transition-colors duration-300 hover:border-white/20 accent-${group.accent}`}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span
          className="grid h-9 w-9 place-items-center rounded-xl"
          style={{
            background: `rgba(${accentRgb},0.1)`,
            color: `rgb(${accentRgb})`,
            boxShadow: `inset 0 0 0 1px rgba(${accentRgb},0.25)`,
          }}
        >
          <Icon size={16} />
        </span>
        <span className="mono-label text-[10px] text-ink-dim">{group.label}</span>
      </div>

      <ul className={twoCol ? "grid grid-cols-2 gap-x-3 gap-y-2" : "space-y-2"}>
        {group.items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-ink-dim">
            <span
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ background: `rgb(${accentRgb})` }}
            />
            <span className="truncate">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
