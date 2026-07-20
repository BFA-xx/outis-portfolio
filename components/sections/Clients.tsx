"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Gem,
  Building2,
  CandlestickChart,
  Rocket,
  Sparkles,
  MessageSquare,
  Send,
} from "lucide-react";
import { clientTypes, type ClientType } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { fadeUp, stagger, spring } from "@/lib/motion";

const icons = {
  flame: Flame,
  gem: Gem,
  startup: Building2,
  trading: CandlestickChart,
  launchpad: Rocket,
  creators: Sparkles,
  discord: MessageSquare,
  telegram: Send,
} as const;

// "Who I build for" - the self-identification step. A visitor should find their
// own project in this grid and stop wondering whether I'm a fit.
export function Clients() {
  return (
    <section
      id="clients"
      className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 sm:py-32"
    >
      <SectionHeading
        index="08 // TARGET DEPLOYMENTS"
        title="Who I build for."
        blurb="If your project looks like one of these, we already speak the same language."
      />

      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {clientTypes.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </motion.div>
    </section>
  );
}

function ClientCard({ client }: { client: ClientType }) {
  const Icon = icons[client.icon as keyof typeof icons] ?? Rocket;
  const accentRgb = client.accent === "cyan" ? "108,155,173" : "196,194,170";

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={spring}
      className={`ring-glow group relative overflow-hidden rounded-2xl glass p-5 transition-colors duration-300 hover:border-white/20 accent-${client.accent}`}
    >
      <span
        className="mb-4 grid h-9 w-9 place-items-center rounded-xl"
        style={{
          background: `rgba(${accentRgb},0.1)`,
          color: `rgb(${accentRgb})`,
          boxShadow: `inset 0 0 0 1px rgba(${accentRgb},0.25)`,
        }}
      >
        <Icon size={16} />
      </span>

      <h3 className="text-base font-semibold leading-snug text-white">{client.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-dim">{client.blurb}</p>
    </motion.div>
  );
}
