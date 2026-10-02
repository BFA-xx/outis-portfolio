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
  { value: "1,200+", label: "Wallets under automation" },
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
    items: [
      "Ethereum",
      "Base",
      "Arbitrum",
      "Optimism",
      "Polygon",
      "BNB Chain",
      "opBNB",
      "Linea",
      "Blast",
      "Scroll",
      "Zora",
      "Shape",
      "Stable",
      "Robinhood Chain",
      "Abstract",
      "Ink",
      "Unichain",
      "HyperEVM",
      "Arc",
      "NEAR",
    ],
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
    items: ["viem", "ethers.js", "wagmi", "WalletConnect", "Seaport", "Solidity", "EIP-7702"],
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
  solution: string;
  impact: ModuleMeta[];
  capabilities: string[];
  whyBuilt: string;
  /** Rendered under the "Engineering" heading. */
  architecture: string;
  stack: string[];
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
      "Production multichain NFT minting platform with sub-second launch execution, a 1,200-wallet farm, AI drop research and full Telegram control.",
    summary:
      "Built for teams and collectors who need to mint reliably when it actually counts. Paste a contract or a link and the platform reads the drop, works out which wallets are eligible, times the open to the block, and executes, while refusing to spend on any transaction it can't first prove safe. An AI layer reads each drop and says whether it is worth minting, a ledger shows whether minting actually paid, and a companion Mini App puts the whole account in one tap. Runs on its own always-on infrastructure.",
    liveUrl: "https://mint.koslabs.app/",
    meta: [
      { label: "Interface", value: "Telegram bot, Mini App + web dashboard" },
      { label: "Networks", value: "19 EVM chains + NEAR, live on mainnet" },
      { label: "Hosting", value: "Dedicated server · 24/7" },
    ],
    problem:
      "Competitive drops are decided in seconds, and a single wrong contract, wrong price or malicious approval costs real money. Doing it by hand loses the drop. Doing it wrong loses the wallet.",
    solution:
      "One paste-and-go flow. The platform finds the right contract, checks every wallet for eligibility, waits for the exact open, and executes across chains. Nothing is signed until a simulation proves it safe. When a sale opens, a stream of pre-signed transactions is already queued across the flip, and a factory contract fits dozens of mints into one transaction. A collector runs an entire wallet farm from a Telegram chat, with every flow living on a single message they can step back through.",
    architecture:
      "A pnpm monorepo: a NestJS API for chain logic, a grammY Telegram bot for the interface, and a Next.js dashboard. viem drives the chain with a resilient multi-RPC fallback; seaport-js powers listings and sweeps. State lives in Postgres and Redis. The whole stack runs 24/7 on a dedicated server under pm2, with snipe, copy and reminder rules that survive every restart. Wallet keys are sealed with AWS KMS and escrowed nightly, an off-box watchdog checks production every two minutes, and Claude powers the drop takes and deep research with live web search and X reads.",
    whyBuilt:
      "It started as a way to mint one drop without fat-fingering a contract address. Every manual step I removed exposed the next one, so it grew into a full engine. It has handled real money on mainnet since day one.",
    capabilities: [
      "Runs across 19 EVM chains plus NEAR, including Ethereum, Base, Arbitrum, Robinhood Chain, Abstract, Ink, HyperEVM and Arc.",
      "Reads any drop automatically, including standard mints, launchpads, free-then-paid, bonding curves, proof-of-work and timed free lanes it proves by simulation.",
      "Fires a pipelined stream of pre-signed transactions across the sale flip, so the shot is already in the queue when the open lands.",
      "A mint factory contract and EIP-7702 batching put many mints in one transaction and one queue slot.",
      "Briefs every race before it opens and writes an autopsy after, naming exactly why a mint was won or lost.",
      "AI takes and deep research on any drop: what it is, who is behind it, and a MINT / WATCH / SKIP verdict with sources.",
      "A profit ledger marks every mint against live offers, and alerts the holder when one is worth selling. It never sells on its own.",
      "Mint calendar, allowlist radar, smart-money tracking and a daily recap, all from the chat.",
      "Mirrors chosen wallets onchain and buys the same assets automatically, matching quantity and speed.",
      "Lists and sells acquired assets from the same system, including bulk floor purchasing.",
      "Shows exactly which of your wallets qualify for each phase before the sale goes live.",
      "Simulates every transaction and blocks malicious approvals, and holds any price change for the user's yes, so bad data never reaches the chain.",
    ],
    stack: ["TypeScript", "NestJS", "Next.js", "grammY", "viem", "seaport-js", "Solidity", "Claude API", "PostgreSQL", "Redis", "pm2", "AWS EC2", "AWS KMS"],
    impact: [
      { label: "Status", value: "Live on mainnet, 20 networks" },
      { label: "Reliability", value: "24/7, watched off-box" },
      { label: "Scale", value: "1,200+ wallets, 77 members" },
    ],
  },
  {
    id: "mintooor-app",
    codename: "MOD-02 · MINTOOOR APP",
    name: "Mintooor Mini App",
    category: "Telegram Mini App · Portfolio & Control",
    status: "LIVE · IN TELEGRAM",
    accent: "purple",
    tagline:
      "The whole Mintooor account in one tap: wallets, NFTs at live offers, snipes, profit and radars, inside Telegram.",
    summary:
      "A companion app that opens from the Open App button beside every member's message box. It shows every chain's balance, every NFT priced at what it would actually sell for right now, armed snipes with live countdowns, the mint calendar and a real profit view. Anything that moves money hands back to the chat for an explicit approval, so the app is fast to browse and impossible to fat-finger.",
    liveUrl: "https://t.me/MintooorBot",
    meta: [
      { label: "Surface", value: "Telegram Mini App" },
      { label: "Access", value: "Members only, signed by Telegram" },
      { label: "Theme", value: "Follows Telegram, dark and light" },
    ],
    problem:
      "A chat bot is great for doing things and bad for seeing things. Checking balances across twenty networks, what a bag of NFTs is worth, or whether last month's mints paid meant scrolling through a dozen commands and messages.",
    solution:
      "Put the read side of the platform in a real app that lives inside Telegram. One tap opens a terminal-style dashboard with Wallet, NFTs, Snipes, Radar, Calendar, History and Profit. It opens instantly from a local copy and refreshes every tab in parallel, while sends, mints and listings are staged in the app and approved in the chat.",
    impact: [
      { label: "Status", value: "Live for every member" },
      { label: "Speed", value: "Opens instantly, tabs in seconds" },
      { label: "Safety", value: "No money moves without the chat" },
    ],
    capabilities: [
      "Wallet tab with every chain's balance, a USD total and a per-wallet breakdown across the farm.",
      "NFTs valued at the live collection-offer book, not the floor, with search, chain filters and rarity rank.",
      "Profit tab over 24H, 7D, 30D and all time: spend against what the NFTs fetch now, ROI, win rate and failed gas.",
      "Shareable PnL cards for the whole account or a single collection, rendered on the server and posted to the chat.",
      "Armed snipes with live T-minus countdowns, plus a mint calendar marked with the lists your wallets are on.",
      "Send NFTs, mint, list or sell by staging it in the app; the bot posts Approve or Cancel and re-checks ownership onchain.",
      "Theme follows Telegram's dark or light mode, and a toggle pins it per device.",
    ],
    whyBuilt:
      "Members were asking the bot the same questions every morning: what do I hold, what is it worth, what opens today. A screen answers that faster than any message, and keeping money moves in the chat meant the app could be quick without being risky.",
    architecture:
      "One self-contained page served by the Mintooor NestJS API under a strict content security policy. Every request is authenticated by Telegram's signed initData, verified by HMAC against the bot token with a 24 hour limit, and gated to approved members. Balances come from one Multicall3 read per chain, NFT values from a shared offer-book cache, and history names are memoised and read in parallel. Hand-offs to the chat go through an outbox the bot polls every second, replayed as the member's own tap so the full chat flow runs.",
    stack: ["TypeScript", "Telegram Mini Apps", "NestJS", "grammY", "viem", "Multicall3", "OpenSea API", "Canvas"],
  },
  {
    id: "kos-raffles",
    codename: "MOD-03 · KOS-RAFFLES",
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
      "Whitelist raffles run on trust, and communities are quick to shout rigged. Every draw the team can't prove is a fight waiting to happen.",
    solution:
      "Members enter from Discord. The winner draw is verifiable after the fact, so no one can claim it was fixed. Entries are encrypted at rest, and every campaign exports a clean winner list plus proof the team can post. Rerolls and closes run from a dashboard, not a database.",
    architecture:
      "A pnpm monorepo: a Prisma and Postgres data package, a discord.js v14 bot, and a Next.js dashboard. The scheduler is sweep-based and crash-safe, recomputing pending draws straight from the database on boot. The bot exposes a localhost-only internal API so the dashboard can trigger reroll and end actions that surface as live Discord announcements.",
    whyBuilt:
      "Communities shout rigged the moment a raffle ends. I built the proof in so the argument never starts, and gave the team controls so no one has to touch a database to run a campaign.",
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
  {
    id: "godpull",
    codename: "MOD-04 · GODPULL",
    name: "GodPull",
    category: "Interactive Launch Experience",
    status: "LIVE",
    accent: "cyan",
    tagline:
      "An interactive browser experience built to make a launch impossible to scroll past.",
    summary:
      "A cinematic ritual you play in the browser instead of a landing page you skim. It turns a launch into an event: procedural visuals, generative sound and a pull mechanic that people replay and share. Built to spread on its own before launch day, and live right now.",
    liveUrl: "https://the-ritual-awaits.vercel.app",
    meta: [
      { label: "Surface", value: "Browser, mobile and desktop" },
      { label: "Type", value: "Launch marketing experience" },
      { label: "Assets", value: "Fully procedural, none loaded" },
    ],
    problem:
      "A launch lives or dies on attention. A static landing page states facts and gets scrolled past. Nothing about it makes someone stop, play, or send it to a friend before the product is even live.",
    solution:
      "Turn the launch into something you do, not something you read. An interactive ritual with cinematic animation, sound and a pull mechanic that rewards curiosity and returns a result worth sharing. The experience is the marketing.",
    impact: [
      { label: "Status", value: "Live and playable" },
      { label: "Weight", value: "No image or audio downloads" },
      { label: "Reach", value: "Every result is shareable" },
    ],
    capabilities: [
      "Interactive browser gameplay with a pull mechanic built to be replayed.",
      "Cinematic animation generated live in the browser, not pre-rendered video.",
      "Procedural visuals and audio, so there is nothing heavy to download.",
      "Generated share cards that carry the experience out into social feeds.",
      "Holds its atmosphere across mobile and desktop without dropping frames.",
      "Deployed to production on its own domain and playable today.",
    ],
    whyBuilt:
      "Most launch pages are forgettable. I wanted to prove a launch could be something people choose to play and share, and build the frontend craft to carry it.",
    architecture:
      "A Next.js App Router frontend in strict TypeScript. Every omen, sigil, sound and share card is generated at runtime, so there are no external assets and nothing to wait on. Framer Motion drives the cinematic sequencing, and the render path is tuned to stay smooth on a phone. Shipped to production on Vercel.",
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Canvas", "Web Audio", "Vercel"],
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
    stamp: "2026·09·20",
    title: "Rebuilt launch execution for sub-second opens",
    detail:
      "Studied how hot drops are actually won, then rebuilt the engine around it: pre-signed transaction streams across the flip, a mint factory contract that fits many mints in one transaction, and a written autopsy for every race.",
    tag: "ENGINE",
    accent: "cyan",
  },
  {
    id: "t7",
    stamp: "2026·10·01",
    title: "Added an AI intelligence layer",
    detail:
      "Claude now reads each drop's site, contract and X activity and gives a verdict, with a deep research mode that searches the web and cites its sources. Alongside it shipped a profit ledger, sell alerts and a mint calendar.",
    tag: "AI",
    accent: "purple",
  },
  {
    id: "t8",
    stamp: "2026·10·02",
    title: "Launched the Mintooor Mini App",
    detail:
      "A Telegram Mini App that puts wallets, NFTs at live offers, snipes and profit one tap away for every member, with money moves still approved in the chat.",
    tag: "LAUNCH",
    accent: "cyan",
  },
  {
    id: "t9",
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
  {
    id: "log-005",
    index: "LOG 005",
    date: "Field note",
    title: "A race is decided in one block",
    excerpt: "If you send when the sale opens, you are already late.",
    body: [
      "I pulled apart a hot open on Robinhood Chain block by block. The supply was gone within five blocks, and every winner had a transaction sitting in the queue before the sale flipped.",
      "So Mintooor stopped reacting to the open. It now streams pre-signed transactions across the exact moment, and a small factory contract lets one queue slot carry many mints.",
      "Every race also gets an autopsy afterwards that names why it was won or lost. Guessing is how you lose the same race twice.",
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
      "Multichain NFT minting platform with sub-second launch execution, AI drop research and a Telegram control surface.",
    stack: ["NestJS", "viem", "Solidity", "Claude API"],
    status: "LIVE",
    accent: "cyan",
    liveUrl: "https://mint.koslabs.app/",
  },
  {
    id: "build-mintooor-app",
    title: "Mintooor Mini App",
    description:
      "A Telegram Mini App for wallets, NFTs at live offers, snipes and profit, with every money move approved back in the chat.",
    stack: ["Telegram Mini Apps", "NestJS", "viem", "Canvas"],
    status: "LIVE",
    accent: "purple",
    liveUrl: "https://t.me/MintooorBot",
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
    id: "build-godpull",
    title: "GodPull",
    description:
      "An interactive launch experience for the browser. Cinematic, fully procedural, and built to be replayed and shared.",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Canvas"],
    status: "LIVE",
    accent: "cyan",
    liveUrl: "https://the-ritual-awaits.vercel.app",
  },
  {
    id: "build-koslabs",
    title: "KOS Labs",
    description:
      "The primary marketing site for the KOS ecosystem. Introduces the products, sets the brand and routes users into the apps.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    status: "LIVE",
    accent: "purple",
    liveUrl: "https://koslabs.app",
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
