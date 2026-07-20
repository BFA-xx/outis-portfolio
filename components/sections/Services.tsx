"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Coins,
  LayoutDashboard,
  Send,
  MessageSquare,
  Wallet,
  Gift,
  Lock,
  SlidersHorizontal,
  BarChart3,
  Workflow,
  FileCode2,
  ArrowRight,
} from "lucide-react";
import { services, type Service } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { scrollToSection } from "../system/SmoothScroll";
import { fadeUp, stagger, spring } from "@/lib/motion";

// Icon registry - keeps lib/data.ts free of JSX.
const icons = {
  rocket: Rocket,
  coins: Coins,
  dashboard: LayoutDashboard,
  telegram: Send,
  discord: MessageSquare,
  wallet: Wallet,
  claim: Gift,
  staking: Lock,
  admin: SlidersHorizontal,
  analytics: BarChart3,
  automation: Workflow,
  contract: FileCode2,
} as const;

// "What I build" - the service menu, presented as selectable system modules so
// it reads as part of the OS rather than a price list.
export function Services() {
  return (
    <section
      id="services"
      className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 sm:py-32"
    >
      <SectionHeading
        index="02 // AVAILABLE MODULES"
        title="What I build."
        blurb="Pick a module. Each one ships production-ready, wired to your contracts, and handed over with the keys."
      />

      <motion.div
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </motion.div>

      {/* conversion rail */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl glass px-6 py-5 sm:flex-row sm:px-8"
      >
        <div>
          <p className="text-sm font-medium text-white sm:text-base">
            Need something that isn&apos;t listed?
          </p>
          <p className="mt-1 text-sm text-ink-dim">
            If it runs on the web or touches a chain, it can probably be built. Ask.
          </p>
        </div>
        <button
          onClick={() => scrollToSection("contact")}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-[#0b1316] transition-transform hover:scale-[1.03] active:scale-95"
          style={{ boxShadow: "0 12px 40px -14px rgba(108,155,173,0.7)" }}
        >
          Start a project
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.icon as keyof typeof icons] ?? Rocket;
  const accentRgb = service.accent === "cyan" ? "108,155,173" : "196,194,170";

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={spring}
      data-active={false}
      className={`ring-glow group relative overflow-hidden rounded-2xl glass p-5 transition-colors duration-300 hover:border-white/20 accent-${service.accent}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className="grid h-9 w-9 place-items-center rounded-xl transition-colors duration-300"
          style={{
            background: `rgba(${accentRgb},0.1)`,
            color: `rgb(${accentRgb})`,
            boxShadow: `inset 0 0 0 1px rgba(${accentRgb},0.25)`,
          }}
        >
          <Icon size={16} />
        </span>
        <span className="mono-label text-[9px] text-ink-faint">
          SVC-{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-base font-semibold leading-snug text-white">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-dim">{service.blurb}</p>
    </motion.div>
  );
}
