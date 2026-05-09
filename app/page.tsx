'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Twitter, Mail, MessageCircle, Send, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navOpacity = Math.min(scrollY / 200, 1);

  const socialLinks = [
    { icon: Twitter, label: "X (Twitter)", handle: "@Tosincrypt", url: "https://x.com/Tosincrypt" },
    { icon: Mail, label: "Email", handle: "theonlyrealoutis@gmail.com", url: "mailto:theonlyrealoutis@gmail.com" },
    { icon: MessageCircle, label: "Discord", handle: "Outis__", url: "#" },
    { icon: Send, label: "Telegram", handle: "@realoutis", url: "https://t.me/realoutis" }
  ];

  const contentFormats = [
    { tag: "01", title: "Research Threads", desc: "Long-form breakdowns on Privacy, DePIN, and AI infrastructure. Written for people who want to understand, not just ape in." },
    { tag: "02", title: "Project Reviews", desc: "Honest takes on early-stage crypto projects. No paid promotions. Just research and a clear opinion." },
    { tag: "03", title: "Short Takes", desc: "High signal, low noise. What's happening in crypto and why it matters, in a few sentences." },
    { tag: "04", title: "Memes & Culture", desc: "Web3 is a culture game too. I play it seriously." },
  ];

  const services = [
    { title: "Content Strategy", desc: "Positioning, messaging, format mix and posting cadence for your crypto project." },
    { title: "Thread Writing", desc: "Research-backed long-form threads that educate your audience and drive real engagement on X." },
    { title: "Community Alpha", desc: "Project reviews and targeted alpha pushed to an engaged Web3 audience across X and Discord." },
  ];

  const featuredWork = [
    { label: "Thread", title: "Why DePIN is the most underrated narrative in crypto right now", url: "https://x.com/Tosincrypt" },
    { label: "Research", title: "Privacy is not optional. A breakdown of ZK infrastructure in 2024", url: "https://x.com/Tosincrypt" },
    { label: "Alpha", title: "KOSLabs ecosystem report. Projects worth watching this cycle", url: "https://x.com/Tosincrypt" },
  ];

  return (
    <div style={{ fontFamily: "'Arial', sans-serif" }} className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* Nav */}
      <nav style={{ backgroundColor: `rgba(0,0,0,${navOpacity})`, backdropFilter: 'blur(10px)' }}
        className="fixed top-0 w-full z-50 transition-all duration-500 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">
          <a href="#" className="text-white font-bold tracking-[0.3em] text-sm uppercase">OUTIS</a>
          <div className="hidden md:flex gap-10 text-xs tracking-[0.2em] uppercase text-gray-400">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#hire" className="hover:text-white transition-colors">Hire Me</a>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-white/10">
            <div className="px-8 py-6 flex flex-col gap-6 text-xs tracking-[0.2em] uppercase text-gray-400">
              <a href="#work" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Work</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">About</a>
              <a href="#hire" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Hire Me</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-16 overflow-hidden">
        {/* Banner */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div style={{ width: '55%', height: '90%', backgroundImage: 'url(/banner.jpg)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.85 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,1) 100%)' }} />
        </div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative max-w-6xl mx-auto w-full px-8 md:px-16">
          {/* Profile */}
          <div className="mb-8 mt-24 flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border border-white/30 overflow-hidden bg-gray-900">
                <img src="/profile.jpg" alt="Outis" className="w-full h-full object-cover" />
              </div>
              {/* Checkmark badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-500 border-2 border-black flex items-center justify-center">
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div>
              <p className="text-white font-bold tracking-widest text-xs uppercase">Outis</p>
              <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">Crypto Content Creator</p>
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', fontWeight: '700', lineHeight: '1.15', letterSpacing: '-0.02em' }}
            className="text-white mb-6 max-w-2xl">
            Crypto research, real talk, and content that actually lands.
          </h1>

          <p className="text-gray-400 text-base max-w-lg leading-relaxed mb-3">
            I write about Privacy, DePIN, and AI infrastructure for people who care about the tech, not just the price.
          </p>
          <p className="text-gray-500 text-sm max-w-lg leading-relaxed mb-10">
            Food engineering student. Co-founder at KOSLabs. Living in both worlds and writing from that edge.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#hire"
              className="inline-flex items-center gap-3 bg-white text-black text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-gray-200 transition-all duration-300">
              Work With Me <ArrowUpRight size={14} />
            </a>
            <a href="https://x.com/Tosincrypt" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-white transition-all duration-300">
              Follow on X <Twitter size={14} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-[0.3em] uppercase text-gray-600">Scroll</span>
          <ChevronDown size={16} className="text-gray-600" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-8 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "4+", label: "Years in Crypto" },
            { value: "4", label: "Content Formats" },
            { value: "Web3", label: "Native Voice" },
            { value: "1", label: "Lab Co-founded" },
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '700', letterSpacing: '-0.02em' }} className="text-white">{s.value}</p>
              <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What I Create */}
      <section id="work" className="py-28 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-500 mb-4">What I Create</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.1' }}
              className="text-white max-w-md">Four formats. One consistent signal.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {contentFormats.map((item, idx) => (
              <div key={idx} className="group bg-black p-10 hover:bg-white/[0.03] transition-all duration-500">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">{item.tag}</span>
                  <ArrowUpRight size={14} className="text-gray-700 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-8 px-8 md:px-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-500 mb-10">Featured Work</p>
          <div className="flex flex-col gap-px bg-white/10">
            {featuredWork.map((item, idx) => (
              <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer"
                className="group bg-black px-8 py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.03] transition-all duration-300">
                <div className="flex items-start md:items-center gap-5">
                  <span className="border border-white/20 text-gray-500 text-xs tracking-[0.2em] uppercase px-3 py-1 shrink-0">{item.label}</span>
                  <p className="text-white text-sm font-medium leading-relaxed group-hover:text-gray-300 transition-colors">{item.title}</p>
                </div>
                <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white shrink-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
              </a>
            ))}
          </div>
          <div className="mt-8">
            <a href="https://x.com/Tosincrypt" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors">
              See everything on X <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 px-8 md:px-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-500 mb-16">About</p>
          <div className="grid md:grid-cols-2 gap-16">

            {/* Web3 Side */}
            <div className="flex flex-col gap-px bg-white/10">
              <div className="bg-black p-8">
                <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4">Web3</p>
                <h3 className="text-white text-xl font-bold mb-4">Crypto researcher and content creator</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  I've been in crypto long enough to know what hype looks like and what real infrastructure looks like. I write about the latter. My focus areas are Privacy, DePIN, and AI infrastructure because that's where the durable value is being built.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Co-founder of KOSLabs, a Web3 collaboration and research lab that helps early and scaling protocols connect with the right partners and communities.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Privacy", "DePIN", "AI Infra", "KOSLabs", "CT Native"].map((t, i) => (
                    <span key={i} className="border border-white/10 text-gray-600 text-xs tracking-[0.15em] uppercase px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Web2 / Real World Side */}
            <div className="flex flex-col gap-px bg-white/10">
              <div className="bg-black p-8">
                <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4">Real World</p>
                <h3 className="text-white text-xl font-bold mb-4">Food engineering student with a production edge</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Studying food engineering and working at a top food production company gives me a different lens than most crypto creators. I understand how real-world systems are designed, how quality is controlled at scale, and how processes break under pressure.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  That background shapes how I think about protocol design, infrastructure reliability, and why decentralization actually matters beyond the narrative.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Food Engineering", "Production Systems", "Quality Control", "Process Design", "Systems Thinking"].map((t, i) => (
                    <span key={i} className="border border-white/10 text-gray-600 text-xs tracking-[0.15em] uppercase px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hire Me */}
      <section id="hire" className="py-28 px-8 md:px-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-500 mb-4">Work With Me</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.1' }}
              className="text-white max-w-md">
              Got a project worth talking about?
            </h2>
            <p className="text-gray-500 text-sm mt-4 max-w-md leading-relaxed">
              I work with crypto projects that have something real to say. If your project is building in Privacy, DePIN, or AI infrastructure, let's talk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 mb-px">
            {services.map((s, i) => (
              <div key={i} className="bg-black p-8 hover:bg-white/[0.03] transition-all duration-300">
                <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Block */}
          <div className="bg-white/[0.02] border-x border-b border-white/10 p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="text-white font-bold text-xl mb-1">Ready to work together?</p>
              <p className="text-gray-500 text-sm">Reach out directly. I respond fast.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:theonlyrealoutis@gmail.com"
                className="inline-flex items-center gap-2 bg-white text-black text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-gray-200 transition-all duration-300">
                Email Me <Mail size={13} />
              </a>
              <a href="https://x.com/Tosincrypt" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-6 py-3 hover:border-white transition-all duration-300">
                DM on X <Twitter size={13} />
              </a>
            </div>
          </div>

          {/* Social Grid */}
          <div className="grid sm:grid-cols-2 gap-px bg-white/10 mt-12">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="group bg-black p-6 flex items-center justify-between hover:bg-white transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <Icon size={16} className="text-gray-500 group-hover:text-black transition-colors" />
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-gray-600 group-hover:text-gray-500 mb-1">{link.label}</p>
                      <p className="text-white text-sm font-medium group-hover:text-black transition-colors">{link.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-gray-700 group-hover:text-black transition-all group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 text-xs tracking-[0.2em] uppercase">2025 Outis. All Rights Reserved.</p>
          <p className="text-gray-700 text-xs tracking-[0.2em] uppercase">realoutis.com</p>
        </div>
      </footer>
    </div>
  );
}