"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldAlert,
  Cloud,
  Smartphone,
  Apple,
  KeyRound,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

// A standalone field guide, published as a Technocore contribution. It lives on
// its own route so the main system page is untouched: no new nav entry, no new
// data in lib/data.ts, nothing rewired.
const DID = "did:key:z6Mkpk4BnkfUb7opwXmtPakygVytqNmC9ckpgseNNnJrFFAy";

// Tap and hold selects the whole command on a phone, which is the only way most
// readers of this page will be copying anything.
function Cmd({ children }: { children: string }) {
  return (
    <pre className="select-all overflow-x-auto rounded-lg border border-[var(--edge)] bg-black/40 px-4 py-3 font-mono text-[12px] leading-relaxed text-ink sm:text-[13px]">
      {children}
    </pre>
  );
}

function Out({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border-l-2 border-[var(--edge-strong)] py-1 pl-3 font-mono text-[11px] leading-relaxed text-ink-faint sm:text-[12px]">
      {children}
    </pre>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <motion.li variants={fadeUp} className="grid grid-cols-[2rem_1fr] gap-x-4">
      <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--edge-strong)] font-mono text-[11px] text-cyan">
        {n}
      </span>
      <div className="flex flex-col gap-3">{children}</div>
    </motion.li>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-ink-dim">{children}</p>;
}

// Visually identical to the shared SectionHeading, minus the scroll-triggered
// reveal. A guide has to be readable the instant it loads, including on a deep
// link, so nothing here waits on an IntersectionObserver.
function GuideHeading({
  index,
  title,
  blurb,
}: {
  index: string;
  title: string;
  blurb?: string;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
        <span className="mono-label text-[10px] text-cyan">{index}</span>
      </div>
      <h2 className="max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {blurb && (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-dim sm:text-base">
          {blurb}
        </p>
      )}
    </div>
  );
}

export function TechnocoreGuide() {
  return (
    <section className="relative mx-auto max-w-[820px] px-5 py-24 sm:px-8 sm:py-32">
      <Link
        href="/"
        className="mono-label mb-10 inline-flex items-center gap-2 text-[10px] text-ink-faint transition-colors hover:text-cyan"
      >
        <ArrowLeft size={12} />
        Back to system core
      </Link>

      <GuideHeading
        index="TECHNOCORE // FIELD GUIDE"
        title="Technocore without a laptop."
        blurb="Create your own Technocore DID and publish a signed message using nothing but a phone."
      />

      <div className="flex flex-col gap-14">
        {/* Identity strip: makes the page verifiably mine. */}
        <motion.div
          variants={fadeUp}
          initial="show"
          whileInView="show"
          viewport={{ once: true }}
          className="glass rounded-xl px-5 py-4"
        >
          <div className="mono-label mb-2 text-[9px] text-cyan">
            Published by
          </div>
          <div className="overflow-x-auto font-mono text-[11px] whitespace-nowrap text-ink-dim sm:text-xs">
            {DID}
          </div>
        </motion.div>

        {/* Read this first */}
        <motion.div
          variants={stagger(0.08)}
          initial="show"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="glass flex flex-col gap-3 rounded-xl px-5 py-5 sm:px-6"
        >
          <motion.h3
            variants={fadeUp}
            className="text-lg font-semibold text-white"
          >
            Read this first
          </motion.h3>
          <motion.p variants={fadeUp} className="text-sm leading-relaxed text-ink-dim">
            A Technocore DID is a cryptographic identity backed by a private key.
            The entire point is that you hold it.
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm leading-relaxed text-ink-dim">
            Nobody should create a DID for you. Not a friend, not a group admin,
            not an AI. A key somebody else generated and sent you is a key they
            have already seen. Fifteen minutes on your own phone is worth more
            than an identity handed to you.
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm leading-relaxed text-ink-dim">
            This is a community process, not an official one, and no{" "}
            <span className="font-mono text-purple">$FLOP</span> reward is
            promised or guaranteed. Do it because you want a signed identity, not
            because you are counting on a payout.
          </motion.p>
        </motion.div>

        {/* Routes */}
        <div className="flex flex-col gap-5">
          <GuideHeading
            index="01 // CHOOSE A ROUTE"
            title="Three ways in, one real difference."
            blurb="The routes differ in exactly one way that matters: where your private key is born. Everything after that is identical."
          />

          <motion.div
            variants={stagger(0.06)}
            initial="show"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 sm:grid-cols-3"
          >
            <RouteCard
              icon={<Cloud size={16} />}
              name="Codespaces"
              tag="Key born remote"
              tone="purple"
              best="Any phone, iPhone or Android. Needs a free GitHub account. Most reliable, so start here if unsure."
            />
            <RouteCard
              icon={<Smartphone size={16} />}
              name="Termux"
              tag="Key stays on device"
              tone="cyan"
              best="Android only. A real Linux shell on your phone, and the most private of the three."
            />
            <RouteCard
              icon={<Apple size={16} />}
              name="iPhone, local"
              tag="Not recommended"
              tone="dim"
              best="iOS shells cannot reliably install the cryptography package. Use Codespaces from Safari instead."
            />
          </motion.div>
        </div>

        {/* Route A */}
        <div className="flex flex-col gap-6">
          <GuideHeading
            index="02 // ROUTE A"
            title="Codespaces, from any phone."
          />
          <motion.ol
            variants={stagger(0.06)}
            initial="show"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex list-none flex-col gap-7 p-0"
          >
            <Step n={1}>
              <Body>
                Sign in at github.com, open github.com/codespaces, and create a
                new codespace on the starter repo{" "}
                <span className="font-mono text-xs text-ink">
                  zunmax/technocore-did-starter
                </span>
                . First boot takes a minute or two.
              </Body>
            </Step>
            <Step n={2}>
              <Body>Install the one dependency it needs.</Body>
              <Cmd>pip install -r requirements.txt</Cmd>
              <Body>
                Python and Git are already there. You do not need Python 3.12
                despite what the starter says. Anything 3.10 or newer works.
              </Body>
            </Step>
            <Step n={3}>
              <Body>Confirm the tool runs.</Body>
              <Cmd>python technocore_agent.py --version</Cmd>
              <Out>1.0.0</Out>
            </Step>
            <Step n={4}>
              <Body>
                After you run init in section 04, download{" "}
                <span className="font-mono text-xs text-ink">identity.pem</span>{" "}
                immediately. Long press the file in the sidebar and choose
                Download. Codespaces are deleted after 30 days idle, and if the
                container goes before you saved that file, the identity is gone
                permanently.
              </Body>
            </Step>
          </motion.ol>
        </div>

        {/* Route B */}
        <div className="flex flex-col gap-6">
          <GuideHeading
            index="03 // ROUTE B"
            title="Termux, entirely on your Android."
          />
          <motion.ol
            variants={stagger(0.06)}
            initial="show"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex list-none flex-col gap-7 p-0"
          >
            <Step n={1}>
              <Body>
                Install Termux from F-Droid, not the Play Store. The Play build
                is deprecated and its packages will fail on you.
              </Body>
              <Cmd>pkg update &amp;&amp; pkg install python git</Cmd>
            </Step>
            <Step n={2}>
              <Body>
                Install cryptography from the Termux repo rather than with pip.
                Pip would try to compile it from source and fail without a Rust
                toolchain.
              </Body>
              <Cmd>pkg install python-cryptography</Cmd>
            </Step>
            <Step n={3}>
              <Body>Get the starter and step into it.</Body>
              <Cmd>{`git clone https://github.com/zunmax/technocore-did-starter
cd technocore-did-starter`}</Cmd>
            </Step>
            <Step n={4}>
              <Body>
                Check it runs. Skip the requirements install entirely, since you
                already have what it needs.
              </Body>
              <Cmd>python technocore_agent.py --version</Cmd>
              <Out>1.0.0</Out>
            </Step>
          </motion.ol>
        </div>

        {/* Shared */}
        <div className="flex flex-col gap-6">
          <GuideHeading
            index="04 // EVERYONE"
            title="Make your identity."
          />
          <motion.ol
            variants={stagger(0.06)}
            initial="show"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex list-none flex-col gap-7 p-0"
          >
            <Step n={1}>
              <Body>Run this exactly once, ever.</Body>
              <Cmd>python technocore_agent.py init</Cmd>
              <Out>{`New identity passphrase (12+ characters):
Confirm identity passphrase:`}</Out>
              <Body>
                Nothing appears on screen as you type. That is normal. Keep
                typing and press enter.
              </Body>
            </Step>
            <Step n={2}>
              <Body>
                It prints your public DID. Save it somewhere you will not lose.
              </Body>
              <Out>did:key:z6Mk...</Out>
            </Step>
            <Step n={3}>
              <Body>
                Prove the identity loads back. Enter your passphrase when asked.
              </Body>
              <Cmd>python technocore_agent.py did</Cmd>
              <Body>
                Same DID as step 2 means you are done. Anything else, stop and
                check before going further.
              </Body>
            </Step>
            <Step n={4}>
              <Body>Publish your first signed message.</Body>
              <Cmd>{`python technocore_agent.py say lobby "your own words here"`}</Cmd>
              <Body>
                Write your own sentence instead of pasting a template. Dozens of
                identical messages is the pattern that gets a batch of identities
                flagged, not rewarded.
              </Body>
            </Step>
          </motion.ol>
        </div>

        {/* Never share */}
        <motion.div
          variants={stagger(0.08)}
          initial="show"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="glass-strong flex flex-col gap-3 rounded-xl px-5 py-5 sm:px-6"
          style={{ borderColor: "rgba(196,194,170,0.35)" }}
        >
          <motion.div
            variants={fadeUp}
            className="mono-label flex items-center gap-2 text-[10px] text-purple"
          >
            <ShieldAlert size={13} />
            Never share
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm leading-relaxed text-ink-dim">
            <span className="font-mono text-ink">identity.pem</span> and your
            passphrase. Not in Discord, not in Telegram, not in a DM, and not to
            anyone offering to help recover or verify them.
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm leading-relaxed text-ink-dim">
            Both together are what sign as you. The file alone is useless without
            the passphrase, and the passphrase is useless without the file.
            Anyone holding both becomes you. There is no recovery and no reset
            link.
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm leading-relaxed text-ink-dim">
            Your <span className="font-mono text-ink">did:key:</span> string is
            the part built to be public. Share that freely.
          </motion.p>
        </motion.div>

        {/* Contribution */}
        <div className="flex flex-col gap-6">
          <GuideHeading
            index="05 // THEN"
            title="Make something worth pointing at."
            blurb="The contribution step does not need code. A tutorial, a translation, a video, an explainer for your own community: all of it counts."
          />
          <motion.div
            variants={stagger(0.06)}
            initial="show"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-3"
          >
            <motion.div variants={fadeUp}>
              <Body>
                Publish it publicly, put your DID in it so the link is visible in
                both directions, then record it.
              </Body>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Cmd>{`python technocore_agent.py say technocore "I published a Technocore contribution: YOUR_URL"`}</Cmd>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Body>
                A walkthrough in a language the docs do not cover is worth more
                to the community than another English thread, and it is harder to
                mistake for farming.
              </Body>
            </motion.div>
          </motion.div>
        </div>

        {/* Save */}
        <motion.div
          variants={fadeUp}
          initial="show"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <div className="mono-label flex items-center gap-2 text-[10px] text-cyan">
            <KeyRound size={13} />
            Keep a note like this
          </div>
          <pre className="glass overflow-x-auto rounded-xl px-5 py-4 font-mono text-[11px] leading-loose text-ink-dim sm:text-xs">
{`public DID ......  did:key:z6Mk...
first room .....  lobby
first seq ......
first nonce ....
contribution ...  https://...
record room ....  technocore
record seq .....
record nonce ...`}
          </pre>
          <p className="text-xs leading-relaxed text-ink-faint">
            All of the above is public participation data and is safe in ordinary
            notes. The passphrase and identity.pem are the only secrets.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="show"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-2 border-t border-[var(--edge)] pt-6 text-xs leading-relaxed text-ink-faint"
        >
          <p>
            Based on the community starter zunmax/technocore-did-starter (MIT).
            Not affiliated with or endorsed by FLOP Labs.
          </p>
          <p>
            Participation is not an allocation. Treat any $FLOP reward as
            speculative.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function RouteCard({
  icon,
  name,
  tag,
  tone,
  best,
}: {
  icon: React.ReactNode;
  name: string;
  tag: string;
  tone: "cyan" | "purple" | "dim";
  best: string;
}) {
  const toneClass =
    tone === "cyan"
      ? "text-cyan"
      : tone === "purple"
        ? "text-purple"
        : "text-ink-faint";

  return (
    <motion.div
      variants={fadeUp}
      className="glass ring-glow flex flex-col gap-3 rounded-xl px-5 py-5"
    >
      <div className={`flex items-center gap-2 ${toneClass}`}>
        {icon}
        <span className="text-sm font-semibold text-white">{name}</span>
      </div>
      <span className={`mono-label text-[9px] ${toneClass}`}>{tag}</span>
      <p className="text-xs leading-relaxed text-ink-dim">{best}</p>
    </motion.div>
  );
}
