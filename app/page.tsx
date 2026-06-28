'use client';

import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, Layers, BookOpen, Gamepad2, User, Mail, 
  ArrowRight, Clock, ChevronRight, Sparkles, CheckCircle2, 
  Briefcase, MessageSquare, MapPin, Activity, Shield, Zap, 
  ArrowLeft, Phone, Calendar, X
} from 'lucide-react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CapabilitiesMatrix from '../components/Capabilities';
import TrajectoryHubs from '../components/TrajectoryHubs';
import StrategicNetwork from '../components/StrategicNetwork';
import DataNexus from '../components/DataNexus';

// Global Web Experience Schema - Moved here to prevent initialization order errors
const paginatedExperience = {
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
          desc: "Leading end-to-end digital operations across Product Management, Quality Assurance (QA), and Product Operations teams to ensure efficient product delivery, operational excellence, and continuous platform improvement.",
          bullets: [
            "Managing product lifecycle from initial planning to release execution metrics.",
            "Overseeing complex QA processes, automated testing strategies, and high-standard release quality protocols.",
            "Driving operational workflows, process optimization, and close cross-functional collaboration loops."
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
          desc: "Overseeing the primary Digital Channels (KBZPay & KBZ Mobile Banking) in order to drastically improve customer journeys, accessibility parameters, and financial channel security.",
          bullets: [
            "Drove massive user base scale across both platforms to improve financial growth through primary digital systems.",
            "Built and structured manual operational procedures for handling customer experiences across digital platforms."
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
          title: "Coach",
          period: "Wall Street English Myanmar • May 2022",
          location: "Yangon, Myanmar",
          desc: "Delivered premium instructional communication coaching, managed professional progress tracks, and optimized adult corporate learning frameworks.",
          bullets: [
            "Refined execution matrices for training delivery systems.", 
            "Cultivated professional cross-cultural organizational communication standards."
          ]
        }
      ]
    }
  ]
};

export default function HybridAppRouter() {
  const [isApp, setIsApp] = useState(false);
  const [currentTab, setCurrentTab] = useState('home');
  const [activeExperiencePage, setActiveExperiencePage] = useState(1);
  const [activeArchitecturePhase, setActiveArchitecturePhase] = useState(1);
  
  // App UI Interactive Expanders & Modals
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [activeBlogDetail, setActiveBlogDetail] = useState<any | null>(null);
  const [activeGameDetail, setActiveGameDetail] = useState<any | null>(null);

  useEffect(() => {
    // Advanced Native Framework & Viewport Detection Engine
    const isCapacitor = (window as any).Capacitor?.isNativePlatform?.();
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosWebview = /(iphone|ipod|ipad).*applewebkit(?!.*safari)/.test(ua);
    const isAndroidWebview = /android.*wv/.test(ua);

    if (isCapacitor || isStandalone || isIosWebview || isAndroidWebview) {
      setIsApp(true);
    }
  }, []);

  // Structural Datasets for Clean App Feeds
  const coreCompetencies = [
    {
      title: "Digital Operations Management",
      desc: "Directing end-to-end digital engineering and operational delivery frameworks across Product Management, Quality Assurance (QA), and Product Operations divisions to guarantee continuous platform optimization.",
      badges: ["Agile Delivery", "Operational KPIs", "Cross-Functional Sync"]
    },
    {
      title: "FinTech Channel Ecosystems",
      desc: "Overseeing massive digital consumer channels including flagship mobile banking layers (KBZPay & KBZ Mobile Banking), maximizing customer journeys, core usability metrics, and regulatory alignment.",
      badges: ["Ecosystem Scale", "UX Testing", "Compliance Governance"]
    },
    {
      title: "Strategic Product Engineering",
      desc: "Spearheading multi-phased product roadmaps from deep initial market ideation up to high-frequency deployment execution, ensuring absolute harmonization with corporate vision.",
      badges: ["Roadmap Architecture", "UX/UI Focus", "Market Analysis"]
    }
  ];

  const operationalArchitecturePhases = [
    { phase: "Phase 01", title: "Discovery & Strategy", desc: "Architecting the foundational blueprint. Bridging the gap between initial market ideation and corporate vision, mapping out comprehensive product roadmaps before a single line of code is written.", metrics: ["Market Analysis", "Roadmap Architecture", "Stakeholder Alignment"] },
    { phase: "Phase 02", title: "Operational Architecture", desc: "Translating strategy into execution. Structuring agile delivery frameworks, optimizing internal cross-functional synchronization, and ensuring engineering teams have clear, unblocked pathways.", metrics: ["Agile Delivery", "Process Optimization", "Cross-Functional Sync"] },
    { phase: "Phase 03", title: "QA & Compliance", desc: "Establishing non-negotiable quality and security standards. Implementing robust automated testing strategies and rigorous operational risk frameworks to deliver secure, market-leading platforms.", metrics: ["Automated Testing", "Risk Mitigation", "Regulatory Alignment"] },
    { phase: "Phase 04", title: "Ecosystem Scaling", desc: "Maximizing market impact. Driving continuous user acquisition loops, continuous integration streams, and data-driven optimization passes to scale applications globally.", metrics: ["Growth Loops", "Data Analytics", "Performance Tracking"] }
  ];

  const visualTrajectoryMap = [
    { year: "2025 - Present", company: "digit7s", role: "Head of Digital Operations & Product Development", context: "Orchestrating multi-tiered product workflows, agile scaling configurations, and cross-functional engineering management inside major tech hubs across Thailand." },
    { year: "2018 - 2025", company: "KBZ Bank", role: "Manager - Digital Channels (KBZPay Ecosystem)", context: "Directing foundational user growth arrays and security matrices for key regional mobile banking channels." },
    { year: "2014 - 2022", company: "Media Advisory & Consultancy", role: "Communications Consultant & Localization Lead", context: "Anchoring cross-border media translation networks, language localized pipelines, and communications architecture frameworks." }
  ];

  const appBlogCache = [
    { id: 1, title: "Learning Through Experience is the Best Class for All Employees", desc: "While organizations invest thousands of hours in frameworks and methodologies, the most powerful classroom remains real-world execution. Experience directly dictates operational scale parameters.", time: "5 min read", category: "Product Strategy", content: "True product management maturity cannot be simulated inside slide decks or hypothetical sprint definitions. When running user-base channels scaled to millions of active nodes, runtime execution abnormalities, regulatory shifting, and real-time customer behavior logic become the primary engineering classrooms.\n\nTo scale operations effectively, teams must transition away from isolated vanity metrics and align direct cross-functional loops between design testing arrays, active performance markers, and release governance pipelines." },
    { id: 2, title: "The $300 Million Button: How a Single UX Fix Transformed E-Commerce History", desc: "The legendary story of how a simple change to a checkout form's user flow rescued an e-commerce giant from massive cart abandonment, proving that UX is directly tied to revenue generation.", time: "7 min read", category: "UX Testing", content: "The architecture was sound, the servers were optimized, yet transactions were failing at the final gateway pool. Deep user experience analytics revealed that forcing guest users to create a rigid registry node before completing standard checkout operations generated cognitive friction.\n\nBy simply refactoring the primary action element from 'Register' to 'Continue as Guest', checkout paths cleared instantly, producing over $300M in first-year operational recovery metrics." },
    { id: 3, title: "The Market Is Not Waiting: Why the AI Era Is Redefining Digital Product Success", desc: "An analysis of the technological paradigm shift sweeping digital products, moving beyond static engineering timelines into an era where platforms compete purely on intelligence layers.", time: "6 min read", category: "Tech Strategy", content: "Modern digital management requires a complete departure from static roadmap timelines. As automated intelligence layers integrate deeper into consumer financial channels, platform optimization parameters must adapt programmatically.\n\nProduct leadership must focus on building resilient middleware data models capable of executing real-time system adjustments without unseating core compliance parameters." }
  ];

  const appGamesCache = [
    { id: 1, title: "Neural Decrypt Puzzle Engine", description: "A high-fidelity touch puzzle sandbox testing automated deductive logic capabilities and binary pattern alignment arrays.", specs: "Runtime Environment: Inline Client WebGL Shell • Target Optimization: Touch Vector Sequences" }
  ];

  // =========================================================================
  // PARADIGM 1: STITCH AI INSPIRED NATIVE MOBILE APPLICATION UI
  // =========================================================================
  if (isApp) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#0d0d0f] text-[#e5e1e4] flex flex-col font-sans antialiased overflow-hidden select-none pb-[env(safe-area-inset-bottom)]">
        
        {/* Top App Bar Component */}
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-16 bg-[#0d0d0f]/90 backdrop-blur-md border-b border-zinc-800/60">
          <div className="flex items-center gap-3">
            <div className="h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white px-3.5 text-xs font-black tracking-widest shadow-md shadow-[#4F46E5]/20">
              KHNCO
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
            <User className="w-4 h-4" />
          </div>
        </header>

        {/* Dynamic Viewport Window */}
        <div className="flex-1 overflow-y-auto pt-20 pb-28 px-5 flex flex-col gap-4 bg-[#0d0d0f] scrollbar-none">
          
          {/* TAB: APPLICATION HOME FEED */}
          {currentTab === 'home' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              {/* Stitch AI Premium Profile Hero Card */}
              <div className="bg-[#141416] border border-zinc-800/80 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-xl">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4F46E5] opacity-20 blur-3xl rounded-full" />
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-xl font-bold tracking-tight text-white mb-1">Kaung Htet Nyein Chan Oo</h1>
                    <p className="text-xs text-zinc-400 font-medium tracking-wide">Head of Digital Operations & Product Development</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)] animate-pulse" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Operational Node Connected</span>
                </div>
              </div>

              {/* Action Buttons Interface Blocks */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="bg-white text-zinc-950 font-bold text-xs py-3.5 px-4 rounded-lg active:scale-98 transition-transform duration-100 flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  Consultation
                </button>
                <button 
                  onClick={() => setIsMapOpen(true)}
                  className="bg-zinc-900 border border-zinc-800 text-white font-bold text-xs py-3.5 px-4 rounded-lg active:scale-98 transition-transform duration-100 flex items-center justify-center gap-2 hover:border-[#4F46E5]/40 transition-colors"
                >
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Blueprint
                </button>
              </div>

              {/* Informative App Telemetrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#141416] border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-sm">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Track Record</span>
                  <span className="text-xl font-bold text-white">6+ Years</span>
                </div>
                <div className="bg-[#141416] border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between h-24 shadow-sm">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Ecosystem Scope</span>
                  <span className="text-xs font-bold text-indigo-400 leading-tight">FinTech & Digital Channels</span>
                </div>
              </div>

              {/* Operations Narrative Micro-card */}
              <div className="bg-[#141416] border border-zinc-800/80 rounded-xl p-5 border-l-2 border-l-[#4F46E5] shadow-sm">
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Driving corporate transformation through optimized channel architecture and cross-functional agility. Expert in scaling enterprise tier applications inside modern tech hubs.
                </p>
              </div>

            </div>
          )}

          {/* TAB: THE OPERATIONAL MATRIX SHEETS */}
          {currentTab === 'matrix' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              <div className="pb-1 border-b border-zinc-900">
                <span className="text-[10px] font-mono text-[#4F46E5] uppercase tracking-wider font-semibold">Technical Architecture</span>
                <h2 className="text-base font-bold text-white mt-0.5">Core Capabilities</h2>
              </div>

              {coreCompetencies.map((comp, idx) => (
                <div key={idx} className="bg-[#141416] border border-zinc-800/80 rounded-xl p-5 space-y-2.5 shadow-sm">
                  <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {comp.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{comp.desc}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {comp.badges.map((b, bIdx) => (
                      <span key={bIdx} className="bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400 px-2 py-0.5 rounded">{b}</span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Stylized Mobile Operational Architecture Module */}
              <div className="bg-[#141416] border border-zinc-800/80 rounded-xl p-5 space-y-4 shadow-sm">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-semibold">Lifecycle Nodes</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Operational Architecture</h4>
                </div>

                <div className="flex bg-zinc-900 p-1 rounded-lg gap-1">
                  {operationalArchitecturePhases.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveArchitecturePhase(idx + 1)}
                      className={`flex-1 text-center py-2 rounded-md text-[9px] font-bold tracking-wider transition-all ${activeArchitecturePhase === idx + 1 ? 'bg-[#4F46E5] text-white shadow' : 'text-zinc-500'}`}
                    >
                      P0{idx + 1}
                    </button>
                  ))}
                </div>

                <div className="bg-zinc-950/60 border border-zinc-900 p-4 rounded-xl space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-indigo-400">{operationalArchitecturePhases[activeArchitecturePhase - 1].phase}</span>
                    <span className="text-xs font-bold text-white">{operationalArchitecturePhases[activeArchitecturePhase - 1].title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{operationalArchitecturePhases[activeArchitecturePhase - 1].desc}</p>
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-zinc-900/60">
                    {operationalArchitecturePhases[activeArchitecturePhase - 1].metrics.map((m, mIdx) => (
                      <span key={mIdx} className="bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded text-[9px] font-mono border border-zinc-800">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: HIGH-CONTRAST APP BLOG POSTS */}
          {currentTab === 'blog' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="pb-1 border-b border-zinc-900">
                <span className="text-[10px] font-mono text-[#4F46E5] uppercase tracking-wider font-semibold">Knowledge Pool</span>
                <h2 className="text-base font-bold text-white mt-0.5">Insight Ledger</h2>
              </div>

              <div className="space-y-3">
                {appBlogCache.map((post) => (
                  <div 
                    key={post.id} 
                    onClick={() => setActiveBlogDetail(post)}
                    className="bg-[#141416] border border-zinc-800/80 p-5 rounded-xl flex flex-col gap-2 shadow-sm active:bg-zinc-900 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-[#4F46E5] bg-[#4F46E5]/10 border border-[#4F46E5]/20 px-2 py-0.5 rounded font-bold">{post.category}</span>
                      <span className="text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{post.title}</h4>
                    <p className="text-[11px] text-zinc-400 font-light leading-relaxed line-clamp-2">{post.desc}</p>
                    <div className="flex items-center justify-between text-[11px] font-bold text-indigo-400 pt-2 mt-1 border-t border-zinc-900/60">
                      <span>Read Content Metrics</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ARCADE INSTANCE ENVIRONMENT */}
          {currentTab === 'games' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="pb-1 border-b border-zinc-900">
                <span className="text-[10px] font-mono text-[#4F46E5] uppercase tracking-wider font-semibold">Testing Sandbox</span>
                <h2 className="text-base font-bold text-white mt-0.5">Digital Simulation</h2>
              </div>

              {appGamesCache.map((game) => (
                <div key={game.id} className="bg-[#141416] border border-zinc-800/80 rounded-xl p-6 text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
                    <Gamepad2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1 max-w-xs mx-auto">
                    <h4 className="text-sm font-bold text-white">{game.title}</h4>
                    <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{game.description}</p>
                  </div>
                  <button 
                    onClick={() => setActiveGameDetail(game)}
                    className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md active:scale-98 transition-transform"
                  >
                    Initialize Session
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Bottom Navigation Dock Layout */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-[#141416]/95 backdrop-blur-xl border-t border-zinc-800/60 shadow-2xl">
          {[
            { id: 'home', label: 'Home', icon: HomeIcon },
            { id: 'matrix', label: 'Matrix', icon: Layers },
            { id: 'blog', label: 'Insights', icon: BookOpen },
            { id: 'games', label: 'Arcade', icon: Gamepad2 }
          ].map((navBlock) => {
            const IconComponent = navBlock.icon;
            const isSelected = currentTab === navBlock.id;
            return (
              <button 
                key={navBlock.id}
                onClick={() => setCurrentTab(navBlock.id)}
                className={`flex flex-col items-center justify-center w-16 pt-2 pb-1 transition-all duration-200 relative ${isSelected ? 'text-white border-t-2 border-[#4F46E5]' : 'text-zinc-500'}`}
              >
                <IconComponent className={`w-5 h-5 mb-1 ${isSelected ? 'scale-105 text-[#4F46E5]' : 'active:scale-90'}`} />
                <span className="text-[9px] font-bold tracking-wider uppercase">{navBlock.label}</span>
              </button>
            );
          })}
        </nav>

        {/* APP LEVEL MODAL DRAWER 1: CONTACT HUB */}
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#141416] border-t border-zinc-800 w-full rounded-t-2xl p-6 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[75vh] overflow-y-auto pb-10">
              <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-2" onClick={() => setIsContactOpen(false)} />
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-sm font-bold text-white">Direct Communication Channels</h5>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Secure Engagement Core</p>
                </div>
                <button onClick={() => setIsContactOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 pt-2">
                <a href="mailto:jimmykg.spacex@gmail.com" className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
                  <Mail className="w-5 h-5 text-indigo-400" />
                  <div><p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Secure Email</p><p className="text-xs font-bold text-zinc-200">jimmykg.spacex@gmail.com</p></div>
                </a>
                <a href="tel:+66620983201" className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <div><p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Voice Link</p><p className="text-xs font-bold text-zinc-200">+66 62 098 3201</p></div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* APP LEVEL MODAL DRAWER 2: TRAJECTORY MAP */}
        {isMapOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#141416] border-t border-zinc-800 w-full rounded-t-2xl p-6 space-y-6 animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-y-auto pb-10">
              <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-2" onClick={() => setIsMapOpen(false)} />
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-bold text-white">Strategic Trajectory Blueprint</h5>
                <button onClick={() => setIsMapOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="relative border-l border-zinc-800 pl-4 space-y-5 ml-2 text-left">
                {visualTrajectoryMap.map((item, mIdx) => (
                  <div key={mIdx} className="space-y-1 relative animate-in fade-in duration-300">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#4F46E5]" />
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-indigo-400 rounded-full">{item.year}</span>
                    <h6 className="text-xs font-bold text-white pt-1">{item.company}</h6>
                    <p className="text-[11px] text-zinc-300 font-medium">{item.role}</p>
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-light">{item.context}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* APP LEVEL MODAL DRAWER 3: INSIGHT POST READER */}
        {activeBlogDetail && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#141416] border-t border-zinc-800 w-full rounded-t-2xl p-6 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto pb-12">
              <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-2" onClick={() => setActiveBlogDetail(null)} />
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#4F46E5] bg-[#4F46E5]/10 px-2 py-0.5 rounded font-bold">{activeBlogDetail.category}</span>
                <button onClick={() => setActiveBlogDetail(null)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <h3 className="text-base font-bold text-white">{activeBlogDetail.title}</h3>
              <div className="text-xs text-zinc-400 leading-relaxed space-y-3 whitespace-pre-line font-light pt-2 border-t border-zinc-900">
                {activeBlogDetail.content}
              </div>
            </div>
          </div>
        )}

        {/* APP LEVEL MODAL DRAWER 4: ARCADE RUNTIME EXECUTOR */}
        {activeGameDetail && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#141416] border-t border-zinc-800 w-full rounded-t-2xl p-6 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-y-auto pb-12">
              <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-2" onClick={() => setActiveGameDetail(null)} />
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-bold text-white">{activeGameDetail.title}</h5>
                <button onClick={() => setActiveGameDetail(null)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="bg-zinc-950 rounded-xl p-8 border border-zinc-900 text-center space-y-3">
                <Activity className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                <p className="text-xs text-zinc-300 font-mono">Initializing inline sandbox instance...</p>
                <p className="text-[10px] text-zinc-500 font-mono">{activeGameDetail.specs}</p>
              </div>
              <button 
                onClick={() => setActiveGameDetail(null)}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl"
              >
                Terminate Session Gateway
              </button>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // PARADIGM 2: ORIGINAL PREMIUM LONG-SCROLL WEBSITE LAYOUT (WEB BROWSERS)
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
                      {role.bullets.map((bullet, bIdx) => (
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

      <Footer />
    </main>
  );
}