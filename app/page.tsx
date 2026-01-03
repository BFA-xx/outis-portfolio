'use client';

import React, { useState, useEffect } from 'react';
import { Twitter, Mail, MessageCircle, Send, ArrowUpRight, Menu, X } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const researchAreas = [
    {
      title: "Privacy",
      description: "Zero-knowledge proofs, confidential transactions, and privacy-preserving protocols"
    },
    {
      title: "DePIN",
      description: "Decentralized physical infrastructure networks and real-world asset integration"
    },
    {
      title: "AI Infrastructure",
      description: "Decentralized compute, model training, and inference infrastructure"
    },
    {
      title: "Vibe Coding",
      description: "Experimental protocols, creative smart contract patterns, and on-chain experiments"
    }
  ];

  const experience = [
    {
      role: "Co-founder",
      company: "KOSLabs",
      handle: "@koslabs",
      period: "2023 - Present",
      description: "Web3 collaboration and research lab focused on crypto project strategy, collaboration management, ecosystem growth, and security-oriented research. Helping early and scaling protocols connect with the right partners and communities."
    }
  ];

  const socialLinks = [
    { icon: Twitter, label: "X (Twitter)", handle: "@Tosincrypt", url: "https://x.com/Tosincrypt" },
    { icon: Mail, label: "Email", handle: "theonlyrealoutis@gmail.com", url: "mailto:theonlyrealoutis@gmail.com" },
    { icon: MessageCircle, label: "Discord", handle: "Outis__", url: "#" },
    { icon: Send, label: "Telegram", handle: "@realoutis", url: "https://t.me/realoutis" }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold tracking-tight hover:text-purple-400 transition-colors">
            Outis
          </a>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-8 text-sm">
            <a href="#research" className="text-gray-400 hover:text-white transition-colors">Research</a>
            <a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a>
            <a href="#connect" className="text-gray-400 hover:text-white transition-colors">Connect</a>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-4">
              <a href="#research" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors">Research</a>
              <a href="#experience" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors">Experience</a>
              <a href="#connect" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors">Connect</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl w-full">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm text-purple-400 font-mono border border-purple-400/30 px-3 py-1 rounded-full">
                Builder & Researcher
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Bridging crypto research with real-world systems thinking
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl">
              Crypto researcher and builder focused on Privacy, DePIN, AI infrastructure, and vibe coding. 
              Food engineering background brings production systems expertise to Web3.
            </p>

            <div className="pt-4">
              <a 
                href="#connect" 
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all hover:scale-105"
              >
                Get in touch
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus */}
      <section id="research" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Focus</h2>
          <p className="text-gray-400 mb-12">Core areas of exploration and building</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {researchAreas.map((area, idx) => (
              <div 
                key={idx}
                className="group p-6 border border-gray-800 rounded-lg hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-purple-400">⚡</span> Food Engineering Edge
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Background in food engineering provides a unique lens for Web3 development: 
              <span className="text-purple-400 font-medium"> real-world production systems</span>, 
              <span className="text-purple-400 font-medium"> quality control frameworks</span>, and 
              <span className="text-purple-400 font-medium"> process optimization</span> methodologies. 
              This foundation informs approaches to protocol design, system reliability, and scalable infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-gray-400 mb-12">Building at the intersection of research and execution</p>
          
          {experience.map((exp, idx) => (
            <div key={idx} className="border border-gray-800 rounded-lg p-8 hover:border-purple-500/50 transition-all">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">{exp.role}</h3>
                  <p className="text-purple-400 font-medium mt-1">
                    {exp.company} <span className="text-gray-500">{exp.handle}</span>
                  </p>
                </div>
                <span className="text-gray-500 text-sm mt-2 md:mt-0">{exp.period}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect</h2>
          <p className="text-gray-400 mb-12">Let's build together</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-6 border border-gray-800 rounded-lg hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-purple-600/20 transition-colors">
                    <Icon size={24} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{link.label}</p>
                    <p className="font-medium group-hover:text-purple-400 transition-colors">
                      {link.handle}
                    </p>
                  </div>
                  <ArrowUpRight size={20} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Outis. Building in Web3.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-purple-400 transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}