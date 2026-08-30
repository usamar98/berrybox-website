"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Bot, Box, ChevronDown, Code2, Menu, Play, Share2, Sparkles, Trophy, Users, WandSparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatorRewards } from "@/components/creator-rewards";
import { HeroStockRewards } from "@/components/hero-stock-rewards";

const worlds = [
  { title: "FANTASY KINGDOM", tag: "OPEN WORLD", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85" },
  { title: "SPACE ODYSSEY", tag: "SCI-FI", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=85" },
  { title: "RACING LEAGUE", tag: "MULTIPLAYER", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=85" },
];

const features = [
  { icon: WandSparkles, title: "AI WORLD GENERATION", text: "Build complete environments, rules and atmosphere from a single creative prompt." },
  { icon: Users, title: "AI CHARACTER DESIGN", text: "Generate heroes, rivals and intelligent NPCs with distinctive personalities." },
  { icon: Code2, title: "AI GAMEPLAY SYSTEMS", text: "Create quests, progression, combat and interactions without writing code." },
  { icon: Share2, title: "PUBLISH & SHARE", text: "Launch instantly, invite players and evolve your game with community feedback." },
  { icon: Trophy, title: "EARN REWARDS", text: "Win games, launch worlds and publish templates to qualify for planned stock rewards." },
];

const agents = ["WORLD ARCHITECT", "CHARACTER DESIGNER", "GAMEPLAY DESIGNER", "QUEST WRITER", "AUDIO COMPOSER", "NPC INTELLIGENCE"];
const workflowSteps = ["DESCRIBE", "GENERATE", "CUSTOMIZE", "PUBLISH", "PLAY", "REWARDS"];
const roadmap = [["Q3", "AI GAME BUILDER"], ["Q4", "CREATOR MARKETPLACE"], ["Q1", "MULTIPLAYER PUBLISHING"], ["Q2", "CREATOR ECONOMY"]];
const faqs = [
  ["DO I NEED TO KNOW HOW TO CODE?", "No. Describe the experience you want and BerryBox turns the idea into a playable foundation you can customize visually."],
  ["CAN I BUILD MULTIPLAYER GAMES?", "Yes. Multiplayer publishing is part of the platform roadmap, with shared worlds and creator collaboration at its core."],
  ["CAN I SHARE OR SELL MY CREATIONS?", "You can publish and share worlds from the creator studio. Marketplace and creator-economy tools are planned as the platform expands."],
];

export function BerryBoxExperience() {
  const [menuOpen, setMenuOpen] = useState(false);

  return <div className="site">
    <header>
      <a className="logo" href="#top" aria-label="BerryBox home"><Image src="/berrybox.png" alt="BerryBox" width={220} height={82} priority /></a>
      <nav><a href="#workflow">WORKFLOW</a><a href="#worlds">WORLDS</a><a href="#studio">STUDIO</a><a href="#rewards">REWARDS</a><a href="#roadmap">ROADMAP</a></nav>
      <a className="cta desktop button-link" href="#join">START CREATING <ArrowUpRight /></a>
      <button className="mobile" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></button>
    </header>
    <div className={`mobile-nav ${menuOpen ? "open" : ""}`}><button aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></button>{[["WORKFLOW", "workflow"], ["WORLDS", "worlds"], ["STUDIO", "studio"], ["REWARDS", "rewards"], ["ROADMAP", "roadmap"]].map(([name, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{name}</a>)}</div>

    <main id="top">
      <section className="hero">
        <div className="grid" />
        <div className="hero-gallery" aria-hidden="true"><div className="hero-card hero-card-one" /><div className="hero-card hero-card-two" /><div className="hero-card hero-card-three" /></div>
        <div className="kicker"><span>AI-POWERED CREATION PLATFORM</span><span>IDEA TO PLAYABLE WORLD IN MINUTES</span></div>
        <div className="hero-content"><p className="eyebrow lime">BUILD WHAT&apos;S NEXT</p><h1><span className="hero-a">CREATE GAMES</span><span className="hero-b">WITH AI.</span></h1><HeroStockRewards /><div className="hero-bottom"><p>TURN IDEAS INTO PLAYABLE GAMES THROUGH AN AI-POWERED CREATION PLATFORM BUILT FOR THE NEXT GENERATION OF CREATORS.</p><div><a className="cta button-link" href="#studio">START CREATING <ArrowDownRight /></a><Button variant="outline" className="ghost"><Play /> WATCH DEMO</Button></div></div></div>
      </section>

      <section id="why" className="why"><p data-reveal className="eyebrow">01 - WHY BERRYBOX</p><h2 data-reveal>THE FUTURE ISN&apos;T PLAYED. <span>IT&apos;S CREATED.</span></h2><div className="why-grid"><p data-reveal>GAME CREATION HAS TRADITIONALLY REQUIRED CODING, COMPLEX ENGINES AND LARGE DEVELOPMENT TEAMS. BERRYBOX REMOVES THOSE BARRIERS, ENABLING ANYONE TO TRANSFORM IDEAS INTO INTERACTIVE EXPERIENCES WITH AI.</p><div className="features">{[["01", "NO CODE"], ["02", "AI NATIVE"], ["03", "MULTIPLAYER"], ["04", "ONE-CLICK PLAY"]].map(([number, label]) => <article data-reveal key={number}><small>{number}</small><Sparkles /><h3>{label}</h3></article>)}</div></div></section>

      <section id="workflow" className="workflow section-pad"><p data-reveal className="eyebrow lime">02 - AI CREATION WORKFLOW</p><h2 data-reveal>FROM THOUGHT TO <span>PLAYABLE.</span></h2><div className="workflow-line">{workflowSteps.map((step, index) => <article data-reveal key={step} className={step === "REWARDS" ? "reward-step" : undefined}><small>0{index + 1}</small><h3>{step}</h3><ArrowDownRight /></article>)}</div></section>

      <section id="worlds" className="worlds"><div className="marquee"><div>CREATED WITH BERRYBOX AI ✦ FANTASY ✦ SCI-FI ✦ RACING ✦ SANDBOX ✦ SURVIVAL ✦ CREATED WITH BERRYBOX AI ✦</div></div><div className="section-pad"><p data-reveal className="eyebrow lime">03 - FEATURED GAME WORLDS</p><h2 data-reveal>ANY IDEA. ANY <span>WORLD.</span></h2><div className="cards">{worlds.map((world, index) => <article data-reveal className="world-card" key={world.title}><div className="world-image" style={{ backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.9),rgba(0,0,0,.08)),url('${world.image}')` }} /><div className="world-copy"><div><span>0{index + 1}</span><span>{world.tag}</span></div><div><small>CREATED WITH BERRYBOX AI</small><h3>{world.title}</h3><button>EXPLORE WORLD <ArrowUpRight /></button></div></div></article>)}</div></div></section>

      <section className="platform section-pad"><p data-reveal className="eyebrow lime">04 - PLATFORM FEATURES</p><h2 data-reveal>ONE STUDIO. <span>EVERY SYSTEM.</span></h2><div className="platform-grid">{features.map(({ icon: Icon, title, text }, index) => <article data-reveal key={title} className={title === "EARN REWARDS" ? "reward-feature" : undefined}><small>0{index + 1}</small><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section id="studio" className="studio section-pad"><div className="studio-copy"><p data-reveal className="eyebrow lime">05 - CREATOR STUDIO</p><h2 data-reveal>DESCRIBE IT. <span>WATCH IT EXIST.</span></h2><p data-reveal>Your imagination is the interface. BerryBox agents turn your prompt into environments, characters, systems, quests and playable moments.</p></div><div data-reveal className="prompt-window"><div className="prompt-top"><span>NEW WORLD / PROMPT</span><span className="live-dot">AI ONLINE</span></div><p>&ldquo;CREATE A MULTIPLAYER SURVIVAL GAME WITH DYNAMIC WEATHER AND AI ENEMIES.&rdquo;</p><div className="generation"><i /><span>GENERATING WORLD ARCHITECTURE...</span></div><button><Sparkles /> GENERATE GAME</button></div></section>

      <section className="community section-pad"><div><p data-reveal className="eyebrow">06 - COMMUNITY & MARKETPLACE</p><h2 data-reveal>JOIN THOUSANDS OF <span>FUTURE CREATORS.</span></h2><p data-reveal>Share creations, explore games, follow creators and collaborate on worlds that keep evolving.</p><a className="ghost-link" href="#join">ENTER THE COMMUNITY <ArrowUpRight /></a></div><div className="market-grid">{["FANTASY", "SANDBOX", "SCI-FI", "PUZZLE", "SIMULATION", "SURVIVAL"].map((category, index) => <article data-reveal key={category}><small>0{index + 1}</small><Box /><h3>{category}</h3></article>)}</div></section>

      <section className="agents section-pad"><p data-reveal className="eyebrow lime">07 - YOUR AI CREATION TEAM</p><h2 data-reveal>SIX AGENTS. <span>ONE VISION.</span></h2><div className="agent-list">{agents.map((agent, index) => <article data-reveal key={agent}><small>0{index + 1}</small><Bot /><h3>{agent}</h3><span>ACTIVE</span></article>)}</div></section>

      <CreatorRewards />

      <section id="roadmap" className="roadmap section-pad"><p data-reveal className="eyebrow">09 - ROADMAP</p><h2 data-reveal>BUILDING THE <span>CREATOR ECONOMY.</span></h2><div className="roadmap-grid">{roadmap.map(([quarter, milestone], index) => <article data-reveal key={milestone} className={index === 0 ? "current" : ""}><small>{quarter}</small><i /><h3>{milestone}</h3><p>{index === 0 ? "IN DEVELOPMENT" : "UP NEXT"}</p></article>)}</div></section>

      <section className="faq section-pad"><p data-reveal className="eyebrow lime">10 - FAQ</p><h2 data-reveal>QUESTIONS, <span>ANSWERED.</span></h2><div className="faq-list">{faqs.map(([question, answer], index) => <details data-reveal key={question}><summary><span>0{index + 1} / {question}</span><ChevronDown /></summary><p>{answer}</p></details>)}</div></section>
    </main>

    <footer id="join"><p className="eyebrow">YOUR WORLD IS WAITING</p><h2 data-reveal>BUILD WHAT&apos;S NEXT. <span>CREATE YOUR FIRST AI-POWERED GAME IN MINUTES.</span></h2><a className="footer-cta" href="#studio">START CREATING <ArrowUpRight /></a><div className="signup"><p>GET PRODUCT DROPS, CREATOR STORIES AND NEW WORLD RELEASES IN YOUR INBOX.</p><form onSubmit={(event) => event.preventDefault()}><input aria-label="Email address" placeholder="YOUR EMAIL ADDRESS" type="email" /><button aria-label="Subscribe"><ArrowUpRight /></button></form></div><div className="foot-grid"><div><b className="footer-wordmark">BERRYBOX</b><p>CREATE. PLAY. BUILD.<br />THE AI-NATIVE HOME FOR THE NEXT GENERATION OF GAME CREATORS.</p></div><p><b>PLATFORM</b><br />WORKFLOW<br />CREATOR STUDIO<br />MARKETPLACE</p><div className="footer-socials"><b>FOLLOW</b><div><a href="https://t.me/berryboxofficial" target="_blank" rel="noreferrer" aria-label="Telegram"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 2.51 18.7 21.13c-.24 1.32-.88 1.64-1.79 1.02l-4.93-3.63-2.38 2.29c-.26.26-.48.48-.99.48l.35-5.02 9.14-8.26c.4-.35-.09-.55-.62-.2L6.18 14.93l-4.87-1.52c-1.06-.33-1.08-1.06.22-1.57L20.57 4.5c.88-.33 1.65.2 1.37 2.01Z" /></svg></a><a href="https://x.com/PlayBerrybox" target="_blank" rel="noreferrer" aria-label="X"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.74-8.85L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" /></svg></a></div></div></div><div className="copyright"><span>© 2026 BERRYBOX</span><span>THE FUTURE IS CREATED</span></div></footer>
  </div>;
}


