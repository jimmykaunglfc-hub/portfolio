'use client';

import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, LineChart, Settings, BookOpen, Gamepad2, 
  User, Mail, Link as LinkIcon, Send, MessageCircle, Phone, ArrowRight, 
  ArrowLeft, Clock, Layers, Shield, Zap, X, ChevronRight, 
  Activity, MessageSquare, Network
} from 'lucide-react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CapabilitiesMatrix from '../components/Capabilities';
import TrajectoryHubs from '../components/TrajectoryHubs';
import StrategicNetwork from '../components/StrategicNetwork';
import DataNexus from '../components/DataNexus';

// =========================================================================
// TYPESCRIPT DEFINITIONS
// =========================================================================
type Role = {
  title: string;
  period: string;
  location: string;
  desc: string;
  bullets: string[];
  skills?: string[];
};

type CompanyBlock = {
  company: string;
  timeline: string;
  type: string;
  roles: Role[];
};

type ExperienceData = {
  [key: number]: CompanyBlock[];
};

// =========================================================================
// GLOBAL DATA SCHEMAS
// =========================================================================
const paginatedExperience: ExperienceData = {
  1: [
    {
      company: "digit7s",
      timeline: "Full-time • 1 yr 2 mos",
      type: "Hybrid",
      roles: [
        {
          title: "Head of Digital Operations",
          period: "Jan 2026 - Present • 6 mos",
          location: "Bangkok City, Thailand",
          desc: "Leading end-to-end digital operations across Product Management, Quality Assurance (QA), and Product Operations teams to ensure efficient product delivery.",
          bullets: [
            "Managing product lifecycle from initial planning to release execution metrics.",
            "Overseeing complex QA processes, automated testing strategies, and high-standard release protocols.",
            "Driving operational workflows, process optimization, and close cross-functional collaboration loops."
          ]
        },
        {
          title: "Product Development Manager",
          period: "Apr 2025 - Present • 1 yr 3 mos",
          location: "Chiang Mai, Thailand",
          desc: "Directed the strategic development and execution of comprehensive product roadmaps, ensuring alignment with company vision.",
          bullets: [
            "Supervised the full product lifecycle, from deep ideation to launch and optimization.",
            "Championed user experience (UX) and design initiatives for engaging product interfaces."
          ]
        }
      ]
    },
    {
      company: "KBZ Bank",
      timeline: "6 yrs 2 mos",
      type: "On-site / Full-time",
      roles: [
        {
          title: "Manager - Digital Channels",
          period: "Apr 2024 - Jan 2025 • 10 mos",
          location: "Yangon, Myanmar",
          desc: "Overseeing primary Digital Channels (KBZPay & KBZ Mobile Banking) to drastically improve customer journeys and channel security.",
          bullets: [
            "Drove massive user base scale across both platforms to improve financial growth.",
            "Built and structured manual operational procedures for handling customer experiences."
          ]
        },
        {
          title: "Deputy Manager & Assistant Manager",
          period: "Apr 2019 - May 2024 • 5 yrs 1 mo",
          location: "Yangon, Myanmar",
          desc: "Pivotal operational track record optimizing corporate execution workflows and expanding regional ecosystem footprints.",
          bullets: [
            "Formulated foundational channel operating procedures adopted bank-wide.",
            "Managed tactical sprint tracking and cross-departmental delivery governance."
          ]
        }
      ]
    }
  ],
  2: [
    {
      company: "Educational & Freelance Consultancy",
      timeline: "Multi-Year Independent Track",
      type: "Contract / Project-Based",
      roles: [
        {
          title: "Instructional Coach",
          period: "Wall Street English Myanmar • May 2022",
          location: "Yangon, Myanmar",
          desc: "Delivered premium instructional communication coaching and optimized adult corporate learning frameworks.",
          bullets: ["Refined execution matrices for training delivery systems.", "Cultivated professional cross-cultural organizational communication standards."]
        },
        {
          title: "Freelance Translator & Guide",
          period: "Dec 2014 - Oct 2017",
          location: "Myanmar",
          desc: "Orchestrated large-scale localization and fast-turnaround media subtitle translations for regional broadcast networks.",
          bullets: ["Maintained high accuracy under strict broadcast timeline windows.", "Simultaneously balanced operational logic across localized educational programs."]
        }
      ]
    },
    {
      company: "Institutional Liaison Frameworks",
      timeline: "Institutional Tracks",
      type: "Liaison / Advisory",
      roles: [
        {
          title: "State Liaison Officer",
          period: "Myanmar Gov & Football Federation • 2013 - 2016",
          location: "Myanmar",
          desc: "Managed key international communication links, protocol workflows, and logistics management for cross-border events.",
          bullets: ["Facilitated state-level athletic delegation schedules and inter-departmental operations."]
        }
      ]
    }
  ]
};

const coreCompetencies = [
  { title: "Digital Operations Management", desc: "Directing end-to-end digital engineering and operational delivery frameworks across product divisions.", icon: Layers, color: "text-blue-400 border-blue-400/20 bg-blue-500/5", tags: ["Agile Delivery", "KPIs"] },
  { title: "FinTech Channel Ecosystems", desc: "Overseeing massive digital consumer channels including flagship mobile banking layers.", icon: Shield, color: "text-purple-400 border-purple-400/20 bg-purple-500/5", tags: ["Ecosystem Scale", "Compliance"] },
  { title: "Strategic Product Engineering", desc: "Spearheading multi-phased product roadmaps from deep initial market ideation to high-frequency deployment.", icon: Zap, color: "text-emerald-400 border-emerald-400/20 bg-emerald-500/5", tags: ["Roadmaps", "UX/UI Focus"] }
];

const appBlogCache = [
  { id: 1, title: "Learning Through Experience is the Best Class", desc: "Real-world execution metrics dictate operational scale parameters infinitely better than classroom frameworks.", time: "5 min read", category: "Strategy" },
  { id: 2, title: "The $300 Million Button: Refactoring Checkout", desc: "How a single semantic form adjustment rescued a platform from checkout cart abandonment loops.", time: "7 min read", category: "UX Testing" },
  { id: 3, title: "The Market Is Not Waiting: The AI Era", desc: "Moving beyond static engineering timelines into an era where platforms compete purely on intelligence layers.", time: "6 min read", category: "Tech" }
];

const appGamesCache = [
  { id: 1, title: "Neural Decrypt Puzzle Engine", description: "A high-fidelity touch puzzle sandbox testing automated deductive logic capabilities and binary pattern alignment.", specs: "WebGL Engine" }
];

export default function HybridAppRouter() {
  // Global Environment
  const [isApp, setIsApp] = useState(false);
  
  // App Specific States
  const [currentTab, setCurrentTab] = useState('home');
  const [journeySegment, setJourneySegment] = useState<'professional' | 'educational'>('professional');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeBlogDetail, setActiveBlogDetail] = useState<any | null>(null);
  const [activeGameDetail, setActiveGameDetail] = useState<any | null>(null);

  // Web Specific States
  const [activeExperiencePage, setActiveExperiencePage] = useState(1);
  const [isWebContactOpen, setIsWebContactOpen] = useState(false);
  const [isWebMapOpen, setIsWebMapOpen] = useState(false);

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
  // PARADIGM 1: PREMIUM NATIVE MOBILE APPLICATION UI
  // =========================================================================
  if (isApp) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#09090b] text-[#e5e1e4] flex flex-col font-sans antialiased overflow-hidden select-none pb-[env(safe-area-inset-bottom)]">
        
        {/* TOP APP BAR */}
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-[calc(4rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] bg-[#131315]/90 backdrop-blur-xl border-b border-[#27272A]/80">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse" />
            <h1 className="text-sm font-black text-white tracking-widest uppercase">KHNCO<span className="text-blue-500">.</span></h1>
          </div>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="w-9 h-9 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all shadow-sm"
          >
            <User className="w-4 h-4" />
          </button>
        </header>

        {/* MAIN VIEWPORT */}
        <div className="flex-1 overflow-y-auto pt-[calc(4.5rem+env(safe-area-inset-top))] pb-[calc(6rem+env(safe-area-inset-bottom))] px-5 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* TAB 1: HOME (EXECUTIVE DASHBOARD) */}
          {currentTab === 'home' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Executive Hero Profile */}
              <div className="bg-[#18181B] rounded-2xl border border-[#27272A] p-6 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full" />
                <span className="text-[9px] font-bold tracking-widest uppercase bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">Executive Profile</span>
                <h2 className="text-2xl font-black text-white tracking-tight mt-4 leading-tight">Kaung Htet Nyein Chan Oo</h2>
                <p className="text-sm text-zinc-400 font-medium mt-1">Head of Digital Operations</p>
                
                <p className="text-xs text-zinc-500 font-light mt-4 leading-relaxed border-t border-[#27272A] pt-4">
                  Driving end-to-end product lifecycles, optimizing operational infrastructure, and leading cross-functional teams to deliver secure, market-leading enterprise systems.
                </p>
              </div>

              {/* Domain Movement Highlight Map */}
              <div className="bg-[#18181B] rounded-2xl border border-[#27272A] p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Domain Evolution</h3>
                  <Network className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                
                {/* Visual Node Map */}
                <div className="relative flex justify-between items-center mt-2 mb-2 px-2 before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-0.5 before:bg-zinc-800 before:mx-6">
                  <div className="z-10 bg-[#09090b] p-2 rounded-full border-2 border-zinc-600 shadow-[0_0_10px_rgba(82,82,91,0.2)]"><MessageSquare className="w-3.5 h-3.5 text-zinc-400" /></div>
                  <div className="z-10 bg-[#09090b] p-2 rounded-full border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]"><Shield className="w-3.5 h-3.5 text-purple-400" /></div>
                  <div className="z-10 bg-[#09090b] p-2 rounded-full border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]"><Layers className="w-3.5 h-3.5 text-blue-400" /></div>
                </div>
                <div className="flex justify-between text-[9px] font-bold tracking-wider uppercase mt-3 px-1">
                  <span className="w-16 text-center text-zinc-500 leading-tight">Comms &<br/>Liaison</span>
                  <span className="w-16 text-center text-purple-400 leading-tight">FinTech<br/>Ecosystems</span>
                  <span className="w-16 text-center text-blue-400 leading-tight">Digital<br/>Operations</span>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#18181B] rounded-xl border border-[#27272A] p-4 flex flex-col justify-between h-24">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Track Record</span>
                  <span className="text-xl font-black text-white">6+ Years</span>
                </div>
                <div className="bg-[#18181B] rounded-xl border border-[#27272A] p-4 flex flex-col justify-between h-24">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Global Scale</span>
                  <span className="text-sm font-bold text-blue-400">Enterprise Ready</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: JOURNEY (CAREER & EDUCATION) */}
          {currentTab === 'journey' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* iOS Style Segmented Control */}
              <div className="flex bg-[#18181B] p-1 rounded-xl border border-[#27272A]">
                <button 
                  onClick={() => setJourneySegment('professional')}
                  className={`flex-1 text-center py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${journeySegment === 'professional' ? 'bg-[#3B82F6] text-white shadow-md' : 'text-zinc-500'}`}
                >
                  Professional
                </button>
                <button 
                  onClick={() => setJourneySegment('educational')}
                  className={`flex-1 text-center py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${journeySegment === 'educational' ? 'bg-[#3B82F6] text-white shadow-md' : 'text-zinc-500'}`}
                >
                  Educational
                </button>
              </div>

              {/* Timeline Feed */}
              <div className="relative border-l border-[#27272A] pl-5 space-y-6 ml-2">
                {paginatedExperience[journeySegment === 'professional' ? 1 : 2].map((block, idx) => (
                  <div key={idx} className="relative bg-[#18181B] border border-[#27272A] rounded-xl p-5 space-y-4 shadow-sm">
                    <div className="absolute -left-[26px] top-5 w-3 h-3 rounded-full bg-[#09090b] border-[3px] border-[#3B82F6]" />
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-black text-white">{block.company}</h4>
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mt-1">{block.timeline}</p>
                      </div>
                    </div>
                    {block.roles.map((role, rIdx) => (
                      <div key={rIdx} className="space-y-2 pt-3 border-t border-[#27272A]/60">
                        <h5 className="text-sm font-bold text-white">{role.title}</h5>
                        <p className="text-[10px] text-zinc-500 font-mono">{role.period}</p>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-light mt-1">{role.desc}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: OPS (CAPABILITIES MATRIX) */}
          {currentTab === 'ops' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="pb-2 border-b border-[#27272A]">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">Execution Frameworks</span>
                <h2 className="text-lg font-black text-white mt-0.5">Capabilities Matrix</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {coreCompetencies.map((comp, idx) => {
                  const Icon = comp.icon;
                  return (
                    <div key={idx} className="bg-[#18181B] border border-[#27272A] p-5 rounded-xl space-y-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${comp.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight">{comp.title}</h4>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{comp.desc}</p>
                      <div className="flex gap-2 pt-1">
                        {comp.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="bg-[#09090b] border border-[#27272A] text-[9px] font-bold text-zinc-500 uppercase tracking-wider px-2 py-1 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 4: INSIGHTS (BLOG POSTS) */}
          {currentTab === 'insights' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="pb-2 border-b border-[#27272A]">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-bold">Knowledge Base</span>
                <h2 className="text-lg font-black text-white mt-0.5">Insight Ledger</h2>
              </div>

              <div className="space-y-4">
                {appBlogCache.map((post) => (
                  <div 
                    key={post.id} 
                    onClick={() => setActiveBlogDetail(post)}
                    className="bg-[#18181B] border border-[#27272A] p-5 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform cursor-pointer shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{post.category}</span>
                      <span className="text-[10px] text-zinc-500 font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{post.title}</h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-light">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ARCADE (GAMES) */}
          {currentTab === 'arcade' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="pb-2 border-b border-[#27272A]">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">Interactive Sandbox</span>
                <h2 className="text-lg font-black text-white mt-0.5">Simulation Arcade</h2>
              </div>

              {appGamesCache.map((game) => (
                <div key={game.id} className="bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-36 bg-gradient-to-br from-[#18181B] to-[#27272A] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <Gamepad2 className="w-16 h-16 text-purple-500 opacity-20" />
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{game.title}</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{game.description}</p>
                    </div>
                    <button 
                      onClick={() => setActiveGameDetail(game)}
                      className="w-full bg-white text-zinc-950 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider active:scale-95 transition-transform"
                    >
                      Initialize WebGL Node
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* BOTTOM TAB BAR */}
        <nav className="fixed bottom-0 left-0 w-full h-[calc(4.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-[#131315]/95 backdrop-blur-2xl border-t border-[#27272A] flex justify-around items-center px-2 z-50">
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
                className="flex flex-col items-center justify-center w-[20%] h-14 rounded-xl active:scale-90 transition-transform"
              >
                <IconComponent className={`w-5 h-5 mb-1 ${isSelected ? 'text-blue-500 stroke-[2.5px]' : 'text-zinc-500 stroke-2'}`} />
                <span className={`text-[8px] font-bold tracking-wider uppercase ${isSelected ? 'text-blue-500' : 'text-zinc-500'}`}>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* MODAL: PROFILE & CONTACT (BOTTOM SHEET) */}
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#18181B] border-t border-[#27272A] w-full rounded-t-3xl p-6 space-y-6 animate-in slide-in-from-bottom duration-300 pb-10 shadow-2xl">
              <div className="w-12 h-1.5 bg-[#27272A] rounded-full mx-auto" onClick={() => setIsContactModalOpen(false)} />
              <div className="flex justify-between items-center">
                <h5 className="text-lg font-black text-white tracking-tight">Executive Network</h5>
                <button onClick={() => setIsContactModalOpen(false)} className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-[#27272A]/50 px-3 py-1.5 rounded-full">Close</button>
              </div>
              
              <div className="space-y-3">
                {/* Email */}
                <a href="mailto:jimmykg.spacex@gmail.com" className="flex items-center gap-4 p-4 bg-[#09090b] border border-[#27272A] rounded-xl active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400"><Mail className="w-4 h-4" /></div>
                  <div><p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Secure Email</p><p className="text-xs font-bold text-white mt-0.5">jimmykg.spacex@gmail.com</p></div>
                </a>
                
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/kaung-htet-nyein-chan-oo-593952167/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-[#09090b] border border-[#27272A] rounded-xl active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500"><LinkIcon className="w-4 h-4" /></div>
                  <div><p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">LinkedIn Profile</p><p className="text-xs font-bold text-white mt-0.5">Connect Network</p></div>
                </a>

                {/* Phone */}
                <a href="tel:+66620983201" className="flex items-center gap-4 p-4 bg-[#09090b] border border-[#27272A] rounded-xl active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Phone className="w-4 h-4" /></div>
                  <div><p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Voice Terminal</p><p className="text-xs font-bold text-white mt-0.5">+66 62 098 3201</p></div>
                </a>

                {/* Telegram & Facebook (Side by side) */}
                <div className="flex gap-3">
                  <a href="https://t.me/jimmykg" target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center gap-2 p-4 bg-[#09090b] border border-[#27272A] rounded-xl active:scale-95 transition-transform">
                    <Send className="w-5 h-5 text-sky-400" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Telegram</span>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center gap-2 p-4 bg-[#09090b] border border-[#27272A] rounded-xl active:scale-95 transition-transform">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: BLOG READER */}
        {activeBlogDetail && (
          <div className="fixed inset-0 z-[110] bg-[#09090b] flex flex-col font-sans animate-in slide-in-from-right duration-200">
            <header className="h-[calc(4.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b border-[#27272A] bg-[#131315]/90 backdrop-blur-xl px-5 flex items-center justify-between shrink-0">
              <button onClick={() => setActiveBlogDetail(null)} className="flex items-center gap-1.5 text-xs font-bold text-blue-400 active:opacity-70">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{activeBlogDetail.category}</span>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 text-left [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <h1 className="text-xl font-black text-white leading-tight">{activeBlogDetail.title}</h1>
              <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 pb-4 border-b border-[#27272A]">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeBlogDetail.time}</span>
              </div>
              <p className="text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line pt-2">{activeBlogDetail.content || activeBlogDetail.desc}</p>
            </div>
          </div>
        )}

        {/* MODAL: ARCADE RUNTIME */}
        {activeGameDetail && (
          <div className="fixed inset-0 z-[110] bg-black flex flex-col font-sans animate-in slide-in-from-right duration-200">
            <header className="h-[calc(4.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b border-[#27272A] bg-[#09090b]/90 backdrop-blur-md px-5 flex items-center justify-between shrink-0">
              <button onClick={() => setActiveGameDetail(null)} className="flex items-center gap-1.5 text-xs font-bold text-purple-400 active:opacity-70">
                <ArrowLeft className="w-4 h-4" /> Terminate
              </button>
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">WebGL Layer</span>
            </header>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
                <Activity className="w-8 h-8 animate-pulse" />
              </div>
              <h2 className="text-lg font-black text-white">{activeGameDetail.title}</h2>
              <p className="text-xs text-zinc-400 max-w-xs leading-relaxed font-light">Compiling simulation modules. The responsive interface pipeline will link instantly to your execution parameters.</p>
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
          {paginatedExperience[activeExperiencePage].map((block: CompanyBlock, idx: number) => (
            <div key={idx} className="glass-card p-6 md:p-10 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
              <div className="md:col-span-1 space-y-2">
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{block.company}</h4>
                <div className="space-y-1">
                  <p className="text-xs font-mono text-[#4d8eff] dark:text-[#adc6ff]">{block.timeline}</p>
                  <span className="inline-block bg-zinc-200/40 dark:bg-white/5 border border-zinc-300/40 dark:border-white/10 px-2 py-0.5 rounded text-[10px] font-mono uppercase text-zinc-600 dark:text-zinc-300">{block.type}</span>
                </div>
              </div>

              <div className="md:col-span-3 space-y-12 border-l border-zinc-300 dark:border-zinc-800 pl-6 md:pl-10">
                {block.roles.map((role: Role, rIdx: number) => (
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
                      {role.bullets.map((bullet: string, bIdx: number) => ( 
                        <li key={bIdx} className="text-sm text-zinc-600 dark:text-zinc-300 font-light flex items-start gap-2.5 leading-relaxed">
                          <span className="text-[#4d8eff] dark:text-[#adc6ff] text-xs mt-1.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {role.skills && (
                      <div className="flex flex-wrap gap-2 pt-3">
                        {role.skills.map((skill: string, sIdx: number) => (
                          <span key={sIdx} className="bg-zinc-200/40 dark:bg-blue-500/5 text-[#4d8eff] dark:text-[#adc6ff] border border-zinc-300/40 dark:border-[#adc6ff]/10 px-2.5 py-1 rounded text-xs font-mono">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
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
              <button onClick={() => setIsWebContactOpen(true)} className="cursor-pointer bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg text-white dark:text-[#002e6a]">rocket_launch</span> Initiate Consultation
              </button>
              <button onClick={() => setIsWebMapOpen(true)} className="cursor-pointer bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg text-zinc-900 dark:text-white">route</span> Review Trajectory Map
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* WEB OVERLAY DIALOG 1: CONTACT PANEL */}
      {isWebContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-xl">
          <div className="bg-white dark:bg-[#131315] border border-zinc-200 dark:border-white/10 w-full max-w-lg rounded-2xl p-8 relative shadow-2xl space-y-6 text-zinc-900 dark:text-white">
            <div className="flex justify-between items-start pb-4 border-b border-zinc-100 dark:border-white/5">
              <div>
                <h5 className="text-xl font-bold tracking-tight">Direct Engagement Channels</h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Senior Digital Operations Leadership Coordination</p>
              </div>
              <button onClick={() => setIsWebContactOpen(false)} className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white material-symbols-outlined p-1 cursor-pointer">close</button>
            </div>
            <div className="space-y-4">
              <a href="mailto:jimmykg.spacex@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-[#4d8eff] dark:hover:border-[#adc6ff]/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="material-symbols-outlined text-[#002e6a] dark:text-[#adc6ff] text-2xl">mail</span>
                <div className="text-left"><p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Secure Email Link</p><p className="text-sm font-medium group-hover:text-[#4d8eff] dark:group-hover:text-[#adc6ff]">jimmykg.spacex@gmail.com</p></div>
              </a>
              <a href="https://www.linkedin.com/in/kaung-htet-nyein-chan-oo-593952167/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-[#4d8eff] dark:hover:border-[#c0c1ff]/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="material-symbols-outlined text-[#002e6a] dark:text-[#c0c1ff] text-2xl">share</span>
                <div className="text-left"><p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">LinkedIn Network</p><p className="text-sm font-medium group-hover:text-[#4d8eff] dark:group-hover:text-[#c0c1ff]">kaung-htet-nyein-chan-oo</p></div>
              </a>
            </div>
            <button onClick={() => setIsWebContactOpen(false)} className="w-full py-3 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-800 dark:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors border border-zinc-200 dark:border-white/5 cursor-pointer">Dismiss Gateway</button>
          </div>
        </div>
      )}

      {/* WEB OVERLAY DIALOG 2: TRAJECTORY MAP */}
      {isWebMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-xl overflow-y-auto">
          <div className="bg-white dark:bg-[#131315] border border-zinc-200 dark:border-white/10 w-full max-w-3xl rounded-2xl p-6 md:p-10 relative shadow-2xl my-8 space-y-8 text-zinc-900 dark:text-white">
            <div className="flex justify-between items-start pb-4 border-b border-zinc-100 dark:border-white/5">
              <div>
                <h5 className="text-2xl font-bold tracking-tight">Strategic Trajectory Blueprint</h5>
                <p className="text-sm text-[#4d8eff] dark:text-[#adc6ff] font-mono mt-1">Cross-Functional Transition Map</p>
              </div>
              <button onClick={() => setIsWebMapOpen(false)} className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white material-symbols-outlined p-1 cursor-pointer">close</button>
            </div>
            <div className="relative pl-6 md:pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] md:before:left-[15px] before:top-2 before:bottom-2 before:width-[2px] before:bg-gradient-to-b before:from-[#4d8eff] before:via-[#c0c1ff] before:to-zinc-200 dark:before:to-zinc-800">
              <div className="p-4 text-sm text-zinc-400 text-center">Trajectory Visualization Loaded</div>
            </div>
            <button onClick={() => setIsWebMapOpen(false)} className="w-full py-4 bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer">Close Blueprint View</button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}