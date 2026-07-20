// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM DATA - single source of truth for the OUTIS operating system.
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
  role: "Web3 Developer · Launch Sites, Dashboards, Bots & Onchain Tooling",
  location: "Available for freelance · Remote",
  status: "ONLINE",
  avatar: "/profile.jpg",
  manifesto: [
    "I build the production software crypto projects launch on.",
    "Launch sites, token pages, dashboards, admin panels, claim and staking portals, Telegram and Discord bots, wallet integrations. Scoped, built and shipped by one engineer, usually in days rather than months.",
    "Live on mainnet across multiple chains with real money moving through it. Currently accepting 2 new client projects.",
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
  { value: "LIVE", label: "Multichain, live on mainnet" },
  { value: "24/7", label: "Always-on infrastructure" },
  { value: "200+", label: "Wallets under automation" },
  { value: "100%", label: "Transactions simulated first" },
];

// ── DEPLOYMENT STACK ─────────────────────────────────────────────────────────

export interface StackGroup {
  id: string;
  label: string;
  /** Icon key resolved to a lucide component in the Stack section. */
  icon: string;
  accent: Accent;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    id: "chains",
    label: "Chains",
    icon: "chain",
    accent: "cyan",
    items: ["Ethereum", "Base", "Polygon", "Arbitrum"],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "frontend",
    accent: "purple",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "backend",
    accent: "cyan",
    items: ["NestJS", "Node.js", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    id: "onchain",
    label: "Onchain",
    icon: "onchain",
    accent: "purple",
    items: ["viem", "ethers.js", "wagmi", "WalletConnect", "Seaport"],
  },
  {
    id: "infra",
    label: "Infrastructure",
    icon: "infra",
    accent: "cyan",
    items: ["Vercel", "AWS EC2", "Docker", "PM2", "GitHub Actions", "Railway"],
  },
];

// ── SERVICES (what I build) ──────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  blurb: string;
  /** Icon key resolved to a lucide component in the Services section. */
  icon: string;
  accent: Accent;
}

export const services: Service[] = [
  {
    id: "launch-sites",
    title: "Launch Websites",
    blurb: "The site your project launches behind. Fast, polished, and built to hold up on mint day.",
    icon: "rocket",
    accent: "cyan",
  },
  {
    id: "token-pages",
    title: "Token Landing Pages",
    blurb: "A single page that sells the token: tokenomics, chart embeds, contract address and buy links.",
    icon: "coins",
    accent: "purple",
  },
  {
    id: "dashboards",
    title: "Dashboard Applications",
    blurb: "Live onchain data, wallet state and account activity in one interface your users understand.",
    icon: "dashboard",
    accent: "cyan",
  },
  {
    id: "telegram-bots",
    title: "Telegram Bots",
    blurb: "Command-driven bots for mints, alerts, sales and verification. Anything you'd rather not do by hand.",
    icon: "telegram",
    accent: "purple",
  },
  {
    id: "discord-bots",
    title: "Discord Bots",
    blurb: "Verification, roles, raffles and community automation that runs without a moderator awake.",
    icon: "discord",
    accent: "cyan",
  },
  {
    id: "wallet",
    title: "Wallet Integrations",
    blurb: "Connect, sign and transact, with wiring that handles the messy wallet and network edge cases properly.",
    icon: "wallet",
    accent: "purple",
  },
  {
    id: "claim",
    title: "Claim Portals",
    blurb: "Airdrop and allowlist claim flows with eligibility checks and gas-aware transactions.",
    icon: "claim",
    accent: "cyan",
  },
  {
    id: "staking",
    title: "Staking Interfaces",
    blurb: "Stake, unstake and rewards screens wired straight to your contracts with live position data.",
    icon: "staking",
    accent: "purple",
  },
  {
    id: "admin",
    title: "Admin Panels",
    blurb: "A private control panel so your team can run the product without touching a terminal.",
    icon: "admin",
    accent: "cyan",
  },
  {
    id: "analytics",
    title: "Analytics Dashboards",
    blurb: "Holders, volume, mint progress and revenue, pulled onchain and rendered in real time.",
    icon: "analytics",
    accent: "purple",
  },
  {
    id: "automation",
    title: "Custom Automation",
    blurb: "Monitors, schedulers and execution bots that keep working while your team sleeps.",
    icon: "automation",
    accent: "cyan",
  },
  {
    id: "contract-frontends",
    title: "Smart Contract Frontends",
    blurb: "A clean interface on top of your contracts, with simulation before anything gets signed.",
    icon: "contract",
    accent: "purple",
  },
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
  /** Public URL of the running product, shown as a live link. */
  liveUrl?: string;
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
    category: "NFT Launch & Minting Platform",
    status: "LIVE · MULTICHAIN",
    accent: "cyan",
    tagline:
      "Production multichain NFT minting platform with automated execution, multi-wallet management and full Telegram control.",
    summary:
      "Built for teams and collectors who need to mint reliably when it actually counts. Paste a contract or a link and the platform reads the drop, works out which wallets are eligible, times the open to the second, and executes, while refusing to spend on any transaction it can't first prove safe. Runs on its own always-on infrastructure.",
    liveUrl: "https://mint.koslabs.app/",
    meta: [
      { label: "Interface", value: "Telegram bot + web dashboard" },
      { label: "Networks", value: "Multichain, live on mainnet" },
      { label: "Hosting", value: "Dedicated server · 24/7" },
    ],
    problem:
      "Competitive drops are decided in seconds, and a single wrong contract, wrong price or malicious approval costs real money. This platform removes the manual steps that lose drops: it finds the right contract, confirms eligibility across every wallet, fires the moment the sale opens, and never signs anything it hasn't simulated first.",
    architecture:
      "A pnpm monorepo: a NestJS API for chain logic, a grammY Telegram bot for the interface, and a Next.js read-only dashboard. viem drives the chain with a resilient multi-RPC fallback; seaport-js powers listings and sweeps. State lives in Postgres + Redis; the whole stack runs 24/7 on AWS EC2 under pm2 with persisted snipe / copy / reminder rules that survive every restart.",
    capabilities: [
      "Runs across multiple chains rather than being locked to a single network.",
      "Reads any drop automatically, including standard mints, launchpads, free-then-paid and bonding-curve pricing.",
      "Times the sale opening precisely so a mint isn't lost to a few seconds of delay.",
      "Mirrors chosen wallets onchain and buys the same assets automatically, matching quantity and speed.",
      "Lists and sells acquired assets from the same system, including bulk floor purchasing.",
      "Shows exactly which of your wallets qualify for each phase before the sale goes live.",
      "Simulates every transaction and blocks malicious approvals, so bad data never reaches the chain.",
    ],
    stack: ["TypeScript", "NestJS", "Next.js", "grammY", "viem", "seaport-js", "PostgreSQL", "Redis", "pm2", "AWS EC2"],
    impact: [
      { label: "Status", value: "Live on mainnet, multichain" },
      { label: "Reliability", value: "24/7, survives restarts" },
      { label: "Scale", value: "Up to 200 wallets managed" },
    ],
  },
  {
    id: "kos-raffles",
    codename: "MOD-02 · KOS-RAFFLES",
    name: "KOS Raffles",
    category: "Community Raffle & Whitelist Platform",
    status: "LIVE",
    accent: "purple",
    tagline:
      "Run whitelist campaigns, raffles and giveaways your community can actually trust, end to end from Discord.",
    summary:
      "Gives a project team a way to run whitelist and giveaway campaigns without the usual accusations. Members enter from Discord, winners are drawn by a method anyone can check afterwards, wallet addresses are stored encrypted, and every campaign exports a clean winner list plus shareable proof. A web dashboard lets the team reroll or close a campaign and announce the result live.",
    liveUrl: "https://raffle.koslabs.app/",
    meta: [
      { label: "Interface", value: "Discord bot + web dashboard" },
      { label: "Built for", value: "NFT & token communities" },
      { label: "Fairness", value: "Independently verifiable draw" },
    ],
    problem:
      "Whitelist raffles run on trust, and communities are quick to shout rigged. This replaces 'trust us' with evidence: a draw anyone can verify after the fact, an encrypted record of every entry, and downloadable proof the team can post, so the result stops being an argument and the team gets back to launching.",
    architecture:
      "A pnpm monorepo: a Prisma + Postgres data package, a discord.js v14 bot, and a Next.js dashboard. The scheduler is sweep-based and crash-safe, recomputing pending draws straight from the database on boot. The bot exposes a localhost-only internal API so the dashboard can trigger reroll / end actions that surface as live Discord announcements.",
    capabilities: [
      "Winner selection anyone can verify afterwards, with no way for the team to quietly pick favourites.",
      "Entrant wallet addresses encrypted at rest, so a leak doesn't expose your community.",
      "Every campaign exports a PDF report, a shareable winner card and a CSV for the allowlist.",
      "Survives server restarts mid-campaign and picks up exactly where it left off.",
      "Team dashboard to reroll or close a campaign, announced live in the server.",
    ],
    stack: ["TypeScript", "discord.js v14", "Next.js", "Prisma", "PostgreSQL", "pdfkit", "@napi-rs/canvas"],
    impact: [
      { label: "Status", value: "Live and running" },
      { label: "Trust", value: "Draw verifiable by entrants" },
      { label: "Handover", value: "Winner list + proof export" },
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
    title: "Engineering foundation",
    detail:
      "Formal engineering training and time on a real production floor, designing for throughput, quality control and failure under load. The same discipline goes into every system I ship for a client.",
    tag: "FOUNDATION",
    accent: "purple",
  },
  {
    id: "t1",
    stamp: "WEB3",
    title: "Moved into Web3 full-time",
    detail:
      "Spent years researching privacy, DePIN and AI infrastructure, then co-founded KOSLabs, connecting protocols with the right communities. Client work grew out of knowing this industry from the inside.",
    tag: "RESEARCH",
    accent: "purple",
  },
  {
    id: "t2",
    stamp: "2026·06·14",
    title: "Shipped first production minting platform",
    detail:
      "Took the NFT minting platform from prototype to always-on production infrastructure, running continuously and handling real funds on mainnet.",
    tag: "LAUNCH",
    accent: "cyan",
  },
  {
    id: "t3",
    stamp: "2026·06·19",
    title: "Added automated wallet execution",
    detail:
      "Extended the platform so it can mirror onchain activity and execute automatically, plus an integrated listing engine, so the same system that acquires assets can now sell them.",
    tag: "FEATURE",
    accent: "cyan",
  },
  {
    id: "t4",
    stamp: "2026·06·20",
    title: "Expanded platform capabilities",
    detail:
      "Added multi-wallet eligibility checking, automated profit-taking and bulk purchasing, turning a single-purpose tool into a full operations platform.",
    tag: "FEATURE",
    accent: "cyan",
  },
  {
    id: "t5",
    stamp: "2026·06·22",
    title: "Launched Discord whitelist infrastructure",
    detail:
      "Delivered a verifiable raffle and whitelist platform for community launches, with encrypted entries, a team control dashboard and exportable proof for every campaign.",
    tag: "LAUNCH",
    accent: "purple",
  },
  {
    id: "t6",
    stamp: "NOW",
    title: "Available for client projects",
    detail:
      "Taking on new Web3 builds: launch sites, dashboards, claim and staking portals, bots and custom automation. Bring a scope and a deadline and I'll tell you straight whether it's doable.",
    tag: "AVAILABLE",
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
      "Mintooor started as a way to mint one drop without fat-fingering a contract address. It became a 24/7 engine that snipes, copies, lists and sweeps, because every time I solved one manual step, the next one became the bottleneck.",
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
      "Every mint Mintooor makes is simulated before anything leaves a wallet, including a detector for drainer and approval side-effects. If the data is wrong, the simulation fails and nothing is broadcast.",
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
      "So the draw is verifiable: an HMAC over a committed random seed, with a PDF, an image and a CSV anyone can audit. The scheduler is crash-safe and rebuilds its state from the database, because a server can and will restart at the worst moment.",
      "Community infrastructure lives or dies on perceived fairness. Make the proof downloadable and the arguments disappear.",
    ],
  },
  {
    id: "log-004",
    index: "LOG 004",
    date: "Field note",
    title: "Systems thinking from engineering",
    excerpt: "A protocol is a production line. Things break under load, so design for it.",
    body: [
      "Studying food engineering and working a production floor gave me a different lens than most people building in crypto. I think in throughput, failure modes and quality control.",
      "When an RPC endpoint hit its daily limit and took every read down with it, the fix wasn't a patch but a resilient fallback across multiple providers, so one dead node can't break everything. That's process design, not crypto.",
      "Decentralization, reliability and simulation-before-spend all rhyme with the same idea: build the system so it holds when conditions don't.",
    ],
  },
];

// ── WHO I BUILD FOR ──────────────────────────────────────────────────────────

export interface ClientType {
  id: string;
  title: string;
  blurb: string;
  /** Icon key resolved to a lucide component in the Clients section. */
  icon: string;
  accent: Accent;
}

export const clientTypes: ClientType[] = [
  {
    id: "memecoin",
    title: "Memecoin Projects",
    blurb: "A token page, buy links and a bot running the community while the chart moves.",
    icon: "flame",
    accent: "cyan",
  },
  {
    id: "nft",
    title: "NFT Collections",
    blurb: "Mint pages, allowlist and claim flows, plus the raffle tooling behind the whitelist.",
    icon: "gem",
    accent: "purple",
  },
  {
    id: "startups",
    title: "Crypto Startups",
    blurb: "Real product surfaces: dashboards, admin panels and the backend that keeps them fed.",
    icon: "startup",
    accent: "cyan",
  },
  {
    id: "trading",
    title: "Trading Platforms",
    blurb: "Live data, wallet connection and execution interfaces that stay responsive under load.",
    icon: "trading",
    accent: "purple",
  },
  {
    id: "launchpads",
    title: "Launchpads",
    blurb: "Multi-project sale phases and admin controls your team can run without a developer on call.",
    icon: "launchpad",
    accent: "cyan",
  },
  {
    id: "creators",
    title: "Creator Communities",
    blurb: "Token-gated access, claim portals and automation that rewards the people who show up.",
    icon: "creators",
    accent: "purple",
  },
  {
    id: "discord",
    title: "Discord Communities",
    blurb: "Verification, roles, raffles and giveaways handled by a bot instead of a moderator.",
    icon: "discord",
    accent: "cyan",
  },
  {
    id: "telegram",
    title: "Telegram Communities",
    blurb: "Command-driven bots for mints, alerts, sales and whatever the group asks for on repeat.",
    icon: "telegram",
    accent: "purple",
  },
];

// ── RECENT DEPLOYMENTS ───────────────────────────────────────────────────────
// Add a new object here to publish another build. `image` is optional: drop a
// file in /public and reference it (e.g. "/builds/my-project.jpg"), or leave it
// out and the card renders a clean codename plate instead.

export interface Build {
  id: string;
  title: string;
  description: string;
  stack: string[];
  status: string;
  accent: Accent;
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
}

export const recentBuilds: Build[] = [
  {
    id: "build-mintooor",
    title: "Mintooor",
    description:
      "Multichain NFT minting platform with automated execution, multi-wallet management and a Telegram control surface.",
    stack: ["Next.js", "NestJS", "viem", "PostgreSQL"],
    status: "LIVE",
    accent: "cyan",
    liveUrl: "https://mint.koslabs.app/",
  },
  {
    id: "build-kos-raffles",
    title: "KOS Raffles",
    description:
      "Whitelist and giveaway platform for Discord communities, with a verifiable draw and a team control dashboard.",
    stack: ["Next.js", "discord.js", "Prisma", "PostgreSQL"],
    status: "LIVE",
    accent: "purple",
    liveUrl: "https://raffle.koslabs.app/",
  },
  {
    id: "build-outis",
    title: "OUTIS System Core",
    description:
      "This site. An interactive operating system built as a single continuous surface, with a reactive canvas background.",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    status: "LIVE",
    accent: "cyan",
    liveUrl: "https://realoutis.com",
  },
];

// ── AVAILABILITY ─────────────────────────────────────────────────────────────

export interface AvailabilitySlot {
  label: string;
  value: string;
}

export const availability = {
  status: "AVAILABLE",
  headline: "Currently accepting 2 new client projects.",
  pricing: "Projects typically start from $500 USD.",
  slots: [
    { label: "Average reply", value: "Under 12 hours" },
    { label: "Typical delivery", value: "3 to 14 days" },
    { label: "Location", value: "Remote" },
    { label: "Timezone", value: "GMT+1" },
  ] as AvailabilitySlot[],
};

export const navItems = [
  { id: "core", label: "Home" },
  { id: "services", label: "Services" },
  { id: "modules", label: "Projects" },
  { id: "timeline", label: "Timeline" },
  { id: "journal", label: "Journal" },
] as const;
