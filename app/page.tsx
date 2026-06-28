'use client';

import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, LineChart, Settings, BookOpen, Gamepad2, 
  Menu, User, Timer, Rocket, Landmark, RefreshCw, Mail, 
  TrendingUp, Activity, ChevronRight, X, Phone, Layers, Shield, Zap,
  Clock, ArrowRight
} from 'lucide-react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CapabilitiesMatrix from '../components/Capabilities';
import TrajectoryHubs from '../components/TrajectoryHubs';
import StrategicNetwork from '../components/StrategicNetwork';
import DataNexus from '../components/DataNexus';

// =========================================================================
// GLOBAL DATA SCHEMAS
// =========================================================================
const coreCompetencies = [
  { title: "Digital Operations Management", desc: "Directing end-to-end digital engineering and operational delivery frameworks.", icon: Layers, color: "text-blue-400" },
  { title: "FinTech Channel Ecosystems", desc: "Overseeing massive digital consumer channels including flagship mobile banking layers (KBZPay & KBZ Mobile Banking).", icon: Shield, color: "text-purple-400" },
  { title: "Strategic Product Engineering", desc: "Spearheading multi-phased product roadmaps from deep initial market ideation up to high-frequency deployment execution.", icon: Zap, color: "text-emerald-400" }
];

const operationalArchitecturePhases = [
  { phase: "Phase 01", title: "Discovery & Strategy", desc: "Architecting the foundational blueprint before a single line of code is written.", metrics: ["Market Analysis", "Roadmap Architecture"] },
  { phase: "Phase 02", title: "Operational Architecture", desc: "Translating strategy into execution. Structuring agile delivery frameworks.", metrics: ["Agile Delivery", "Process Optimization"] },
  { phase: "Phase 03", title: "QA & Compliance", desc: "Establishing non-negotiable quality and security standards.", metrics: ["Automated Testing", "Risk Mitigation"] },
  { phase: "Phase 04", title: "Ecosystem Scaling", desc: "Maximizing market impact and driving continuous user acquisition loops.", metrics: ["Growth Loops", "Data Analytics"] }
];

const paginatedExperience = {
  1: [
    {
      company: "digit7s", timeline: "Full-time • 1 yr 2 mos", type: "Hybrid",
      roles: [
        {
          title: "Head of Digital Operations", period: "Jan 2026 - Present • 6 mos", location: "Bangkok City, Thailand",
          desc: "Leading end-to-end digital operations across Product Management, Quality Assurance (QA), and Product Operations teams.",
          bullets: ["Managing product lifecycle from initial planning to release execution metrics.", "Overseeing complex QA processes, automated testing strategies."]
        }
      ]
    },
    {
      company: "KBZ Bank", timeline: "6 yrs 2 mos", type: "On-site / Full-time",
      roles: [
        {
          title: "Manager - Digital Channels", period: "Apr 2024 - Jan 2025 • 10 mos", location: "Yangon, Myanmar",
          desc: "Overseeing the primary Digital Channels (KBZPay & KBZ Mobile Banking) in order to drastically improve customer journeys.",
          bullets: ["Drove massive user base scale across both platforms to improve financial growth.", "Built and structured manual operational procedures."]
        }
      ]
    }
  ],
  2: [
    {
      company: "Freelance Consultancy", timeline: "Multi-Year Independent Track", type: "Contract / Project-Based",
      roles: [
        {
          title: "Coach & Consultant", period: "May 2022", location: "Yangon, Myanmar",
          desc: "Delivered premium instructional communication coaching, managed professional progress tracks.",
          bullets: ["Refined execution matrices for training delivery systems."]
        }
      ]
    }
  ]
};

const appBlogCache = [
  { id: 1, title: "Learning Through Experience is the Best Class for All Employees", desc: "Real-world execution metrics dictate operational scale parameters infinitely better than classroom frameworks.", time: "5 min read", category: "Product Strategy" },
  { id: 2, title: "The $300 Million Button: Refactoring Checkout Flow Friction", desc: "How a single semantic form adjustment rescued a platform from checkout cart abandonment loops.", time: "7 min read", category: "UX Testing" },
  { id: 3, title: "The Market Is Not Waiting: Why the AI Era Is Redefining Digital Product Success", desc: "Moving beyond static engineering timelines into an era where platforms compete purely on intelligence layers.", time: "6 min read", category: "Tech Strategy" }
];

const appGamesCache = [
  { id: 1, title: "Neural Decrypt Puzzle Engine", description: "A high-fidelity touch puzzle sandbox testing automated deductive logic capabilities and binary pattern alignment arrays.", specs: "Runtime Environment: WebGL" }
];

export default function HybridAppRouter() {
  // Environment State
  const [isApp, setIsApp] = useState(false);
  
  // Web States
  const [activeExperiencePage, setActiveExperiencePage] = useState(1);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // App States
  const [currentTab, setCurrentTab] = useState('home');
  const [activeArchitecturePhase, setActiveArchitecturePhase] = useState(1);
  const [isAppContactOpen, setIsAppContactOpen] = useState(false);

  useEffect(() => {
    // Advanced Native Framework Detection
    const isCapacitor = (window as any).Capacitor?.isNativePlatform?.();
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosWebview = /(iphone|ipod|ipad).*applewebkit(?!.*safari)/.test(ua);
    const isAndroidWebview = /android.*wv/.test(ua);

    if (isCapacitor || isStandalone || isIosWebview || isAndroidWebview) {
      setIsApp(true);
    }
  }, []);

  // =========================================================================
  // PARADIGM 1: STITCH AI NATIVE MOBILE APPLICATION UI
  // =========================================================================
  if (isApp) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#09090b] text-[#e5e1e4] flex flex-col font-sans antialiased overflow-hidden select-none pb-[env(safe-area-inset-bottom)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* TOP APP BAR */}
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-[calc(4rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] bg-[#131315]/80 backdrop-blur-xl border-b border-[#27272A]/50">
          <button className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform text-white">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-black text-white tracking-tight">KHNCO<span className="text-[#3B82F6]">.</span></h1>
          <button 
            onClick={() => setIsAppContactOpen(true)}
            className="w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <User className="w-5 h-5" />
          </button>
        </header>

        {/* MAIN VIEWPORT (Scrollable) */}
        <div className="flex-1 overflow-y-auto pt-[calc(4.5rem+env(safe-area-inset-top))] pb-[calc(5.5rem+env(safe-area-inset-bottom))] px-5 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* TAB 1: HOME DASHBOARD */}
          {currentTab === 'home' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Welcome Widget */}
              <div className="bg-[#18181B] rounded-xl border border-[#27272A] p-5 relative overflow-hidden group shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-transparent opacity-50 pointer-events-none" />
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Kaung Htet Nyein Chan Oo</h2>
                    <p className="text-sm text-[#c2c6d6]">Head of Digital Operations</p>
                  </div>
                </div>
                <div className="mt-6 inline-flex items-center space-x-2 bg-[#201f22] px-3 py-1.5 rounded-full border border-[#27272A]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live Node Connected</span>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Timer, val: "6+ Years", label: "Experience" },
                  { icon: Rocket, val: "digit7s", label: "Scale" },
                  { icon: Landmark, val: "FinTech", label: "Domain" },
                  { icon: RefreshCw, val: "Agile", label: "Framework" }
                ].map((kpi, i) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={i} className="bg-[#18181B] rounded-xl border border-[#27272A] p-4 flex flex-col justify-between h-32 active:scale-95 transition-transform duration-200">
                      <Icon className="text-[#3B82F6] w-5 h-5" />
                      <div>
                        <p className="text-lg font-bold text-white truncate">{kpi.val}</p>
                        <p className="text-[10px] text-[#c2c6d6] uppercase tracking-widest font-semibold">{kpi.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quick Actions (Horizontal Scroll) */}
              <div className="space-y-3">
                <h3 className="text-[10px] text-[#c2c6d6] uppercase tracking-widest font-bold px-1">Command Center</h3>
                <div className="flex overflow-x-auto space-x-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <button onClick={() => setIsAppContactOpen(true)} className="bg-[#3B82F6] text-white flex-shrink-0 flex items-center space-x-2 px-6 py-3.5 rounded-lg text-xs font-bold active:scale-95 transition-transform duration-200 shadow-lg shadow-[#3B82F6]/20">
                    <Mail className="w-4 h-4" />
                    <span>Initiate Consultation</span>
                  </button>
                  <button onClick={() => setCurrentTab('journey')} className="bg-[#131315] border border-[#27272A] text-white flex-shrink-0 flex items-center space-x-2 px-6 py-3.5 rounded-lg text-xs font-bold active:scale-95 transition-transform duration-200">
                    <TrendingUp className="w-4 h-4" />
                    <span>View Trajectory</span>
                  </button>
                </div>
              </div>

              {/* Featured Insight */}
              <div className="space-y-3">
                <h3 className="text-[10px] text-[#c2c6d6] uppercase tracking-widest font-bold px-1">Featured Intel</h3>
                <div onClick={() => setCurrentTab('insights')} className="bg-[#18181B] rounded-xl border border-[#27272A] overflow-hidden active:scale-95 transition-transform duration-200 cursor-pointer flex">
                  <div className="w-1/3 bg-gradient-to-br from-[#3B82F6]/20 to-purple-500/20 relative border-r border-[#27272A]" />
                  <div className="p-4 flex-1">
                    <div className="inline-flex items-center space-x-1 bg-[#3B82F6]/10 text-[#3B82F6] px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest mb-2 border border-[#3B82F6]/20 font-bold">
                      <span>Article</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1 leading-tight">Learning Through Experience</h4>
                    <p className="text-[11px] text-[#c2c6d6] line-clamp-2 leading-relaxed">Iterative operational scaling and strategic deployment methodologies.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: JOURNEY (CAREER) */}
          {currentTab === 'journey' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex bg-[#18181B] p-1 rounded-xl border border-[#27272A]">
                <button className="flex-1 text-center py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#3B82F6] text-white shadow">Professional</button>
                <button className="flex-1 text-center py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-zinc-500">Educational</button>
              </div>

              <div className="relative border-l border-[#27272A] pl-5 space-y-6 ml-2">
                {[...paginatedExperience[1], ...paginatedExperience[2]].map((block, idx) => (
                  <div key={idx} className="relative bg-[#18181B] border border-[#27272A] rounded-xl p-5 space-y-3">
                    <div className="absolute -left-[26px] top-4 w-3 h-3 rounded-full bg-[#09090b] border-[3px] border-[#3B82F6]" />
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-bold text-white">{block.company}</h4>
                        <p className="text-xs text-[#3B82F6] font-mono mt-0.5">{block.timeline}</p>
                      </div>
                    </div>
                    {block.roles.map((role, rIdx) => (
                      <div key={rIdx} className="space-y-2 pt-2 border-t border-[#27272A]/50">
                        <h5 className="text-sm font-bold text-white">{role.title}</h5>
                        <p className="text-[11px] text-[#c2c6d6] leading-relaxed">{role.desc}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: OPS (MATRIX & CAPABILITIES) */}
          {currentTab === 'ops' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              <div className="space-y-4">
                <h3 className="text-[10px] text-[#c2c6d6] uppercase tracking-widest font-bold px-1">Operational Architecture</h3>
                <div className="flex overflow-x-auto space-x-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {operationalArchitecturePhases.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveArchitecturePhase(idx + 1)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg text-[10px] font-bold tracking-wider uppercase border ${activeArchitecturePhase === idx + 1 ? 'bg-[#3B82F6] border-[#3B82F6] text-white' : 'bg-[#18181B] border-[#27272A] text-zinc-500'}`}
                    >
                      {p.phase}
                    </button>
                  ))}
                </div>
                <div className="bg-[#18181B] border border-[#27272A] p-5 rounded-xl space-y-3">
                  <h4 className="text-sm font-bold text-white">{operationalArchitecturePhases[activeArchitecturePhase - 1].title}</h4>
                  <p className="text-[11px] text-[#c2c6d6] leading-relaxed">{operationalArchitecturePhases[activeArchitecturePhase - 1].desc}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {operationalArchitecturePhases[activeArchitecturePhase - 1].metrics.map((m, mIdx) => (
                      <span key={mIdx} className="bg-[#09090b] text-zinc-400 px-2 py-1 rounded text-[9px] font-mono border border-[#27272A]">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-[10px] text-[#c2c6d6] uppercase tracking-widest font-bold px-1">Core Matrix</h3>
                <div className="grid grid-cols-1 gap-4">
                  {coreCompetencies.map((comp, idx) => {
                    const Icon = comp.icon;
                    return (
                      <div key={idx} className="bg-[#18181B] border border-[#27272A] p-5 rounded-xl space-y-3 flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-[#09090b] border border-[#27272A] flex items-center justify-center shrink-0 ${comp.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">{comp.title}</h4>
                          <p className="text-[10px] text-[#c2c6d6] leading-relaxed">{comp.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: INSIGHTS (BLOG) */}
          {currentTab === 'insights' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-[10px] text-[#c2c6d6] uppercase tracking-widest font-bold px-1">Insight Ledger</h3>
              <div className="space-y-4">
                {appBlogCache.map((post) => (
                  <div key={post.id} className="bg-[#18181B] border border-[#27272A] p-5 rounded-xl flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{post.category}</span>
                      <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                    </div>
                    <h4 className="text-base font-bold text-white leading-tight">{post.title}</h4>
                    <p className="text-xs text-[#c2c6d6] line-clamp-2 leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ARCADE (GAMES) */}
          {currentTab === 'arcade' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-[10px] text-[#c2c6d6] uppercase tracking-widest font-bold px-1">Simulation Hub</h3>
              {appGamesCache.map((game) => (
                <div key={game.id} className="bg-[#18181B] border border-[#27272A] rounded-xl overflow-hidden flex flex-col">
                  <div className="h-32 bg-gradient-to-br from-purple-900/40 to-[#09090b] flex items-center justify-center border-b border-[#27272A]">
                    <Gamepad2 className="w-12 h-12 text-purple-500 opacity-50" />
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">{game.title}</h4>
                      <p className="text-xs text-[#c2c6d6] leading-relaxed">{game.description}</p>
                    </div>
                    <button className="w-full bg-[#3B82F6] text-white py-3.5 rounded-lg text-xs font-bold active:scale-95 transition-transform shadow-lg shadow-[#3B82F6]/20">
                      Initialize Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* BOTTOM NAVIGATION BAR */}
        <nav className="fixed bottom-0 left-0 w-full h-[calc(4.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-[#131315]/90 backdrop-blur-xl border-t border-[#27272A]/50 flex justify-around items-center px-2 z-50">
          {[
            { id: 'home', label: 'Home', icon: HomeIcon },
            { id: 'journey', label: 'Journey', icon: LineChart },
            { id: 'ops', label: 'Ops', icon: Settings },
            { id: 'insights', label: 'Insights', icon: BookOpen },
            { id: 'arcade', label: 'Arcade', icon: Gamepad2 }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isSelected = currentTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className="flex flex-col items-center justify-center w-16 h-14 rounded-xl active:scale-95 transition-transform"
              >
                <IconComponent className={`w-5 h-5 mb-1 ${isSelected ? 'text-[#3B82F6] fill-[#3B82F6]/20' : 'text-[#c2c6d6]'}`} />
                <span className={`text-[9px] font-bold ${isSelected ? 'text-[#3B82F6]' : 'text-[#c2c6d6]'}`}>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* BOTTOM SHEET MODAL: CONTACT */}
        {isAppContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#18181B] border-t border-[#27272A] w-full rounded-t-3xl p-6 space-y-6 animate-in slide-in-from-bottom duration-300 pb-10 shadow-2xl">
              <div className="w-12 h-1.5 bg-[#27272A] rounded-full mx-auto" onClick={() => setIsAppContactOpen(false)} />
              <div className="flex justify-between items-center">
                <h5 className="text-lg font-bold text-white">Direct Engagement</h5>
                <button onClick={() => setIsAppContactOpen(false)} className="text-xs font-bold text-[#c2c6d6] bg-[#27272A] px-3 py-1.5 rounded-full">Close</button>
              </div>
              <div className="space-y-3">
                <a href="mailto:jimmykg.spacex@gmail.com" className="flex items-center gap-4 p-4 bg-[#09090b] border border-[#27272A] rounded-xl active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]"><Mail className="w-5 h-5" /></div>
                  <div><p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Secure Email</p><p className="text-sm font-bold text-white">jimmykg.spacex@gmail.com</p></div>
                </a>
                <a href="tel:+66620983201" className="flex items-center gap-4 p-4 bg-[#09090b] border border-[#27272A] rounded-xl active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Phone className="w-5 h-5" /></div>
                  <div><p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Voice Terminal</p><p className="text-sm font-bold text-white">+66 62 098 3201</p></div>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // PARADIGM 2: PREMIUM LONG-SCROLL WEBSITE LAYOUT (DESKTOP & MOBILE WEB)
  // =========================================================================
  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-4 relative z-20">
      
      {/* 1. Hero Module Layer */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden mb-16 rounded-3xl bg-gray-50 dark:bg-[#09090b] border border-gray-200 dark:border-white/5">
        <DataNexus />
        <div className="relative z-10 w-full pointer-events-none">
          <div className="pointer-events-auto">
            <Hero />
          </div>
        </div>
      </div>

      {/* 2. Interactive Matrix Anchor Wrapper */}
      <div id="expertise" className="scroll-mt-24">
        <CapabilitiesMatrix />
      </div>

      {/* 3. Trajectory Cluster */}
      <TrajectoryHubs />

      {/* 4. Strategic Networks Map */}
      <StrategicNetwork />

      {/* 5. Professional Detailed Track Record Module */}
      <section id="experience" className="py-16 max-w-7xl mx-auto relative z-20 pointer-events-auto scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 border-b border-zinc-300/80 dark:border-zinc-800 pb-8">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#4d8eff] dark:text-[#adc6ff] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">timeline</span> Track Record
            </h2>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Professional Trajectory</h3>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <button 
              onClick={() => setActiveExperiencePage(1)} 
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeExperiencePage === 1 ? 'bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] shadow-lg' : 'bg-zinc-200/60 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-300/40 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10'}`}
            >
              Page 1: Executive Operations
            </button>
            <button 
              onClick={() => setActiveExperiencePage(2)} 
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeExperiencePage === 2 ? 'bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] shadow-lg' : 'bg-zinc-200/60 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-300/40 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10'}`}
            >
              Page 2: Strategic Advisory
            </button>
          </div>
        </div>

        <div className="space-y-12 transition-all duration-500">
          {paginatedExperience[activeExperiencePage as 1 | 2].map((block, idx) => (
            <div key={idx} className="glass-card p-6 md:p-10 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
              <div className="md:col-span-1 space-y-2">
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{block.company}</h4>
                <div className="space-y-1">
                  <p className="text-xs font-mono text-[#4d8eff] dark:text-[#adc6ff]">{block.timeline}</p>
                  <span className="inline-block bg-zinc-200/40 dark:bg-white/5 border border-zinc-300/40 dark:border-white/10 px-2 py-0.5 rounded text-[10px] font-mono uppercase text-zinc-600 dark:text-zinc-300">{block.type}</span>
                </div>
              </div>

              <div className="md:col-span-3 space-y-12 border-l border-zinc-300 dark:border-zinc-800 pl-6 md:pl-10">
                {block.roles.map((role, rIdx) => (
                  <div key={rIdx} className="space-y-4 relative group/role">
                    <div className="absolute -left-[31px] md:-left-[47px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-800 border-2 border-[#4d8eff] dark:border-[#adc6ff] group-hover/role:bg-[#adc6ff] transition-colors duration-300" />
                    
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h5 className="text-xl font-semibold text-zinc-900 dark:text-white group-hover/role:text-[#4d8eff] dark:group-hover/role:text-[#adc6ff] transition-colors duration-300">{role.title}</h5>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tracking-wide">{role.location}</span>
                      </div>
                      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">{role.period}</p>
                    </div>

                    <p className="text-sm font-light text-zinc-700 dark:text-zinc-300 leading-relaxed">{role.desc}</p>
                    
                    <ul className="space-y-2.5 pt-2">
                      {role.bullets?.map((bullet, bIdx) => ( 
                        <li key={bIdx} className="text-sm text-zinc-600 dark:text-zinc-300 font-light flex items-start gap-2.5 leading-relaxed">
                          <span className="text-[#4d8eff] dark:text-[#adc6ff] text-xs mt-1.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Website Deployment Ecosystem Metrics Container */}
      <div className="mt-12 space-y-8">
        <section id="download" className="py-8 relative z-20 pointer-events-auto scroll-mt-20">
          <div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-200/50 dark:border-white/5 bg-gradient-to-r from-[#4d8eff]/5 to-transparent dark:from-[#adc6ff]/5 dark:to-transparent hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
            <div className="max-w-xl space-y-4 text-center md:text-left">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#4d8eff] dark:text-[#adc6ff] flex items-center justify-center md:justify-start gap-2">
                <span className="material-symbols-outlined text-base">system_update</span> Native Ecosystem
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Access the Mobile App.</h3>
              <p className="text-zinc-600 dark:text-zinc-300 font-light text-sm leading-relaxed">Experience this portfolio as a fully native application. Android users can install the APK directly, while iOS users can access the beta build instantly via Apple TestFlight.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
              <a href="/khnco.apk" download="KHNCO_App.apk" className="group flex items-center justify-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
                <span className="material-symbols-outlined text-xl text-[#3DDC84] group-hover:animate-bounce">android</span>
                <span>Download APK</span>
              </a>
              <a href="https://testflight.apple.com/join/BzAg9XQ2" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
                <span className="material-symbols-outlined text-xl text-zinc-900 dark:text-white">phone_iphone</span>
                <span>iOS TestFlight</span>
              </a>
            </div>
          </div>
        </section>

        {/* 7. Strategic Contact Anchor */}
        <section id="contact" className="py-8 relative z-20 pointer-events-auto scroll-mt-20">
          <div className="glass-card rounded-3xl p-12 md:p-20 text-center overflow-hidden bg-gradient-to-br from-zinc-50 to-transparent dark:from-white/[0.02] dark:to-transparent hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
            <h4 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">Let's Orchestrate What's Next.</h4>
            <p className="text-zinc-600 dark:text-zinc-300 font-light text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">I am open to strategic technology partnerships, digital banking ecosystem consulting, and senior enterprise operations leadership roles.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-30">
              <button onClick={() => setIsContactOpen(true)} className="cursor-pointer bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg text-white dark:text-[#002e6a]">rocket_launch</span> Initiate Consultation
              </button>
              <button onClick={() => setIsMapOpen(true)} className="cursor-pointer bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg text-zinc-900 dark:text-white">route</span> Review Trajectory Map
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* WEB OVERLAY DIALOG 1: CONTACT PANEL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-xl">
          <div className="bg-white dark:bg-[#131315] border border-zinc-200 dark:border-white/10 w-full max-w-lg rounded-2xl p-8 relative shadow-2xl space-y-6 text-zinc-900 dark:text-white">
            <div className="flex justify-between items-start pb-4 border-b border-zinc-100 dark:border-white/5">
              <div>
                <h5 className="text-xl font-bold tracking-tight">Direct Engagement Channels</h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Senior Digital Operations Leadership Coordination</p>
              </div>
              <button onClick={() => setIsContactOpen(false)} className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white material-symbols-outlined p-1 cursor-pointer">close</button>
            </div>
            <div className="space-y-4">
              <a href="mailto:jimmykg.spacex@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-[#4d8eff] dark:hover:border-[#adc6ff]/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="material-symbols-outlined text-[#002e6a] dark:text-[#adc6ff] text-2xl">mail</span>
                <div className="text-left"><p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Secure Email Link</p><p className="text-sm font-medium group-hover:text-[#4d8eff] dark:group-hover:text-[#adc6ff]">jimmykg.spacex@gmail.com</p></div>
              </a>
            </div>
            <button onClick={() => setIsContactOpen(false)} className="w-full py-3 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-800 dark:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors border border-zinc-200 dark:border-white/5 cursor-pointer">Dismiss Gateway</button>
          </div>
        </div>
      )}

      {/* WEB OVERLAY DIALOG 2: TRAJECTORY MAP */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-xl overflow-y-auto">
          <div className="bg-white dark:bg-[#131315] border border-zinc-200 dark:border-white/10 w-full max-w-3xl rounded-2xl p-6 md:p-10 relative shadow-2xl my-8 space-y-8 text-zinc-900 dark:text-white">
            <div className="flex justify-between items-start pb-4 border-b border-zinc-100 dark:border-white/5">
              <div>
                <h5 className="text-2xl font-bold tracking-tight">Strategic Trajectory Blueprint</h5>
                <p className="text-sm text-[#4d8eff] dark:text-[#adc6ff] font-mono mt-1">Cross-Functional Transition Map</p>
              </div>
              <button onClick={() => setIsMapOpen(false)} className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white material-symbols-outlined p-1 cursor-pointer">close</button>
            </div>
            <div className="relative pl-6 md:pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] md:before:left-[15px] before:top-2 before:bottom-2 before:width-[2px] before:bg-gradient-to-b before:from-[#4d8eff] before:via-[#c0c1ff] before:to-zinc-200 dark:before:to-zinc-800">
              <div className="p-4 text-sm text-zinc-400 text-center">Trajectory Visualization Loaded</div>
            </div>
            <button onClick={() => setIsMapOpen(false)} className="w-full py-4 bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer">Close Blueprint View</button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}