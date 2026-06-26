// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM DATA — single source of truth for the OUTIS operating system.
// Everything the interface renders (identity, modules, evolution log, captain
// logs) is derived from this file so content stays consistent across the system.
// ─────────────────────────────────────────────────────────────────────────────

export type Accent = "cyan" | "purple";

export interface Identity {
  callsign: string;
  role: string;
  location: string;
  manifesto: string[];
  status: string;
  avatar: string;
}

export const identity: Identity = {
  callsign: "OUTIS",
  role: "Systems & Automation Engineer · Web3 Builder",
  location: "Operating remotely · GMT+1",
  status: "ONLINE",
  avatar: "/profile.jpg",
  manifesto: [
    "I build systems that run when no one is watching.",
    "Bots that move real money on Ethereum mainnet. Infrastructure that survives production. Automation that turns noise into signal.",
    "Engineering discipline from the physical world — applied to the on-chain one.",
  ],
};

export interface SocialLink {
  label: string;
  handle: string;
  url: string;
  kind: "x" | "mail" | "discord" | "telegram";
}

export const socials: SocialLink[] = [
  { label: "X", handle: "@Tosincrypt", url: "https://x.com/Tosincrypt", kind: "x" },
  { label: "Telegram", handle: "@realoutis", url: "https://t.me/realoutis", kind: "telegram" },
  { label: "Discord", handle: "Outis__", url: "#", kind: "discord" },
  { label: "Email", handle: "theonlyrealoutis@gmail.com", url: "mailto:theonlyrealoutis@gmail.com", kind: "mail" },
];

export interface CoreStat {
  value: string;
  label: string;
}

export const coreStats: CoreStat[] = [
  { value: "24/7", label: "Mainnet uptime" },
  { value: "100%", label: "Simulated before spend" },
  { value: "200", label: "Wallet farm capacity" },
  { value: "2", label: "Live systems shipped" },
];

// ── MODULES ──────────────────────────────────────────────────────────────────

export interface ModuleMeta {
  label: string;
  value: string;
}

export interface ModuleSection {
  heading: string;
  body: string;
}

export interface ProjectModule {
  id: string;
  codename: string;
  name: string;
  category: string;
  status: string;
  accent: Accent;
  tagline: string;
  summary: string;
  meta: ModuleMeta[];
  problem: string;
  architecture: string;
  capabilities: string[];
  stack: string[];
  impact: ModuleMeta[];
}

export const modules: ProjectModule[] = [
  {
    id: "mintooor",
    codename: "MOD-01 · MINTOOOR",
    name: "Mintooor",
    category: "Mint Automation Engine",
    status: "LIVE · MAINNET",
    accent: "cyan",
    tagline: "Real-money NFT minting — automated, and simulated before every spend.",
    summary:
      "A Telegram-native minting engine running live on Ethereum mainnet with real funds. Paste a contract or a link; it reads the drop, checks eligibility, snipes the open, and broadcasts — while refusing to spend on a transaction it can't first simulate clean.",
    meta: [
      { label: "Surface", value: "Telegram bot + web dashboard" },
      { label: "Chain", value: "Ethereum mainnet" },
      { label: "Runtime", value: "AWS EC2 · pm2 · 24/7" },
    ],
    problem:
      "Competitive NFT drops are won on speed and lost on mistakes. Manual minting is slow, error-prone, and one malicious contract can drain a wallet. Mintooor collapses detection, eligibility, timing and safety into a single paste-and-go flow — without ever trusting a transaction it hasn't proven safe.",
    architecture:
      "A pnpm monorepo: a NestJS API for chain logic, a grammY Telegram bot for the interface, and a Next.js read-only dashboard. viem drives the chain with a resilient multi-RPC fallback; seaport-js powers listings and sweeps. State lives in Postgres + Redis; the whole stack runs 24/7 on AWS EC2 under pm2 with persisted snipe / copy / reminder rules that survive every restart.",
    capabilities: [
      "Auto-detects SeaDrop, direct-mint and launchpad contracts — including free-then-paid and bonding-curve pricing.",
      "Phase-aware sniping with deterministic turbo timing that arms exactly at open, not a tick late.",
      "Copy-minting: watch lead wallets on-chain and auto-mint what they mint, matched quantity and gas.",
      "Auto-flip, floor sweeper and a Seaport listing engine — mint, list and take profit in one loop.",
      "Per-wallet × per-phase eligibility matrix, cross-checked against a project's own allowlist checker.",
      "Drainer / approval simulation on every spend — wrong data fails the sim and never touches the chain.",
    ],
    stack: ["TypeScript", "NestJS", "Next.js", "grammY", "viem", "seaport-js", "PostgreSQL", "Redis", "pm2", "AWS EC2"],
    impact: [
      { label: "Status", value: "Live on mainnet, real NFTs minted" },
      { label: "Safety", value: "Every spend simulated first" },
      { label: "Scale", value: "Up to 200 managed wallets" },
    ],
  },
  {
    id: "kos-wl",
    codename: "MOD-02 · KOS-WL",
    name: "KOS Whitelist Engine",
    category: "Discord Raffle Infrastructure",
    status: "FEATURE-COMPLETE",
    accent: "purple",
    tagline: "Provably-fair whitelist raffles for Discord, with a control dashboard.",
    summary:
      "A premium whitelist raffle system for NFT communities. Discord-native entry, a verifiable draw nobody can rig, encrypted wallet handling, and exportable proof — wired to a web dashboard that can reroll or end a raffle with a live announcement.",
    meta: [
      { label: "Surface", value: "Discord bot + web dashboard" },
      { label: "Org", value: "KOSLabs infrastructure" },
      { label: "Fairness", value: "Verifiable HMAC draw" },
    ],
    problem:
      "Whitelist raffles depend on trust — and most are a black box. KOS replaces 'trust me' with proof: a committed random seed, an HMAC-verifiable winner draw, and downloadable artifacts so any entrant can confirm the result was never tampered with.",
    architecture:
      "A pnpm monorepo: a Prisma + Postgres data package, a discord.js v14 bot, and a Next.js dashboard. The scheduler is sweep-based and crash-safe — it recomputes pending draws straight from the database on boot. The bot exposes a localhost-only internal API so the dashboard can trigger reroll / end actions that surface as live Discord announcements.",
    capabilities: [
      "Verifiable winner draw — HMAC over a committed random seed, auditable after the fact.",
      "Wallet addresses encrypted at rest with AES-256-GCM.",
      "Proof pipeline: PDF report, generated winner-card image, and CSV export.",
      "Crash-safe scheduler that rebuilds raffle state from the database.",
      "Dashboard control: reroll or end a raffle with a live, in-server announcement.",
    ],
    stack: ["TypeScript", "discord.js v14", "Next.js", "Prisma", "PostgreSQL", "pdfkit", "@napi-rs/canvas"],
    impact: [
      { label: "Status", value: "Feature-complete, builds clean" },
      { label: "Trust", value: "Draw verifiable end-to-end" },
      { label: "Output", value: "PDF · image · CSV proof" },
    ],
  },
];

// ── SYSTEM EVOLUTION LOG (timeline) ───────────────────────────────────────────

export interface TimelineEntry {
  id: string;
  stamp: string;
  title: string;
  detail: string;
  tag: string;
  accent: Accent;
}

export const timeline: TimelineEntry[] = [
  {
    id: "t0",
    stamp: "ORIGIN",
    title: "Systems thinking, the hard way",
    detail:
      "Food engineering and time inside a real production line. Learned how systems are designed for scale, how quality is controlled, and exactly how processes break under pressure. That lens never left.",
    tag: "FOUNDATION",
    accent: "purple",
  },
  {
    id: "t1",
    stamp: "WEB3",
    title: "Into crypto — research first",
    detail:
      "Years deep in the space researching privacy, DePIN and AI infrastructure. Co-founded KOSLabs, a Web3 collaboration and research lab connecting protocols with the right communities.",
    tag: "RESEARCH",
    accent: "purple",
  },
  {
    id: "t2",
    stamp: "2026·06·14",
    title: "Mintooor goes 24/7 on mainnet",
    detail:
      "The mint engine moves off the laptop and onto AWS EC2 under pm2 — boot-persistent, real funds, real drops. The 'bot keeps stopping' era ends.",
    tag: "DEPLOY",
    accent: "cyan",
  },
  {
    id: "t3",
    stamp: "2026·06·19",
    title: "Copy-mint + listing engine ship",
    detail:
      "On-chain lead-wallet watching auto-mints what others mint. A Seaport listing engine lands so the same system that mints can also list and sell.",
    tag: "FEATURE",
    accent: "cyan",
  },
  {
    id: "t4",
    stamp: "2026·06·20",
    title: "Eligibility matrix + auto-flip",
    detail:
      "A per-wallet × per-phase eligibility grid replaces guesswork. Auto-flip and a parallel floor sweeper close the loop from mint to profit.",
    tag: "FEATURE",
    accent: "cyan",
  },
  {
    id: "t5",
    stamp: "2026·06·22",
    title: "KOS whitelist engine built",
    detail:
      "A provably-fair Discord raffle system with a verifiable HMAC draw, encrypted wallets, and a proof pipeline — feature-complete and compiling clean.",
    tag: "BUILD",
    accent: "purple",
  },
  {
    id: "t6",
    stamp: "NOW",
    title: "Scaling the operating system",
    detail:
      "More systems, more automation, more surface. The work compounds — each module makes the next one faster to build.",
    tag: "ACTIVE",
    accent: "cyan",
  },
];

// ── CAPTAIN LOGS (journal) ────────────────────────────────────────────────────

export interface CaptainLog {
  id: string;
  index: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string;
}

export const logs: CaptainLog[] = [
  {
    id: "log-001",
    index: "LOG 001",
    date: "Field note",
    title: "Building automation systems",
    excerpt: "The best system is the one you stop thinking about. It just runs.",
    body: [
      "Automation isn't about doing things faster. It's about removing yourself from the loop so the system keeps its promise whether or not you're awake.",
      "Mintooor started as a way to mint one drop without fat-fingering a contract address. It became a 24/7 engine that snipes, copies, lists and sweeps — because every time I solved one manual step, the next one became the bottleneck.",
      "The lesson: build the boring reliability first. Persistence, restarts, failover. The flashy feature is worthless if the process dies overnight.",
    ],
  },
  {
    id: "log-002",
    index: "LOG 002",
    date: "Field note",
    title: "Simulate before you spend",
    excerpt: "In production, optimism is a liability. Prove it, then send it.",
    body: [
      "Every mint Mintooor makes is simulated before a single wei leaves a wallet — including a detector for drainer and approval side-effects. If the data is wrong, the simulation fails and nothing is broadcast.",
      "This came straight out of food production thinking: you don't taste-test the whole batch, you validate the process so the bad batch never ships. Same instinct, different chain.",
      "It's the one invariant I will never trade for speed. Fast is good. Fast and wrong is how you lose real money.",
    ],
  },
  {
    id: "log-003",
    index: "LOG 003",
    date: "Field note",
    title: "Scaling Discord infrastructure",
    excerpt: "Fairness only counts if anyone can check it.",
    body: [
      "KOS taught me that trust is a feature you have to engineer, not assume. A raffle that says 'trust me, it's random' is worth nothing.",
      "So the draw is verifiable: an HMAC over a committed random seed, with a PDF, an image and a CSV anyone can audit. The scheduler is crash-safe — it rebuilds its state from the database, because a server can and will restart at the worst moment.",
      "Community infrastructure lives or dies on perceived fairness. Make the proof downloadable and the arguments disappear.",
    ],
  },
  {
    id: "log-004",
    index: "LOG 004",
    date: "Field note",
    title: "Systems thinking from engineering",
    excerpt: "A protocol is a production line. Things break under load — design for it.",
    body: [
      "Studying food engineering and working a production floor gave me a different lens than most people building in crypto. I think in throughput, failure modes and quality control.",
      "When an RPC endpoint hit its daily limit and took every read down with it, the fix wasn't a patch — it was a resilient fallback across multiple providers so one dead node can't break everything. That's process design, not crypto.",
      "Decentralization, reliability, simulation-before-spend — they all rhyme with the same idea: build the system so it holds when conditions don't.",
    ],
  },
];

export const navItems = [
  { id: "core", label: "Home" },
  { id: "modules", label: "Projects" },
  { id: "timeline", label: "Timeline" },
  { id: "journal", label: "Journal" },
] as const;
