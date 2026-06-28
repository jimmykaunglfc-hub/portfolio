'use client';

import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, Layers, BookOpen, Gamepad2, User, Mail, 
  ArrowRight, Clock, ChevronRight, Sparkles, CheckCircle2, 
  Briefcase, GraduationCap, Phone, ExternalLink, Calendar, MapPin,
  Activity, Shield, Zap, Info, Sun, Moon, CornerDownRight
} from 'lucide-react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CapabilitiesMatrix from '../components/Capabilities';
import TrajectoryHubs from '../components/TrajectoryHubs';
import StrategicNetwork from '../components/StrategicNetwork';
import DataNexus from '../components/DataNexus';

export default function HybridAppRouter() {
  const [isApp, setIsApp] = useState(false);
  const [currentTab, setCurrentTab] = useState('home');
  const [activeExperiencePage, setActiveExperiencePage] = useState(1);
  const [isDark, setIsDark] = useState(true);
  
  // App UI Interactive Expanders
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [activeArchitecturePhase, setActiveArchitecturePage] = useState(1);

  useEffect(() => {
    // Detect dark mode status from root HTML element
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    
    // Set up observer to track real-time theme toggles from the top navbar
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Advanced App Detection Engine
    const isCapacitor = (window as any).Capacitor?.isNativePlatform?.();
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosWebview = /(iphone|ipod|ipad).*applewebkit(?!.*safari)/.test(ua);
    const isAndroidWebview = /android.*wv/.test(ua);

    if (isCapacitor || isStandalone || isIosWebview || isAndroidWebview) {
      setIsApp(true);
    }

    return () => observer.disconnect();
  }, []);

  // Comprehensive Data Matrix for Native App Feeds
  const coreCompetencies = [
    {
      title: "Digital Operations Management",
      desc: "Directing end-to-end digital engineering and operational delivery frameworks across Product Management, Quality Assurance (QA), and Product Operations divisions to guarantee continuous platform optimization.",
      icon: Layers,
      badges: ["Agile Delivery", "Operational KPIs", "Cross-Functional Sync"],
      color: "text-blue-500",
      bg: "bg-blue-500/5 border-blue-500/10"
    },
    {
      title: "FinTech Channel Ecosystems",
      desc: "Overseeing massive digital consumer channels including flagship mobile banking layers (KBZPay & KBZ Mobile Banking), maximizing customer journeys, core usability metrics, and regulatory alignment.",
      icon: Zap,
      badges: ["Ecosystem Scale", "UX Testing", "Compliance Governance"],
      color: "text-purple-500",
      bg: "bg-purple-500/5 border-purple-500/10"
    },
    {
      title: "Strategic Product Engineering",
      desc: "Spearheading multi-phased product roadmaps from deep initial market ideation up to high-frequency deployment execution, ensuring absolute harmonization with corporate vision.",
      icon: Briefcase,
      color: "text-cyan-400",
      badges: ["Roadmap Architecture", "UX/UI Focus", "Market Analysis"],
      bg: "bg-cyan-500/5 border-cyan-500/10"
    }
  ];

  const visualTrajectoryMap = [
    { 
      year: "2025 - Present", 
      company: "digit7s", 
      role: "Head of Digital Operations & Product Development", 
      location: "Bangkok City, Thailand",
      context: "Orchestrating multi-tiered product workflows, agile scaling configurations, and cross-functional engineering management inside major tech hubs across Thailand.",
      bullets: [
        "Managing product lifecycle from initial planning to release execution metrics.",
        "Overseeing complex QA processes, automated testing strategies, and high-standard release quality protocols.",
        "Driving operational workflows, process optimization, and close cross-functional collaboration loops."
      ]
    },
    { 
      year: "2018 - 2025", 
      company: "KBZ Bank", 
      role: "Manager - Digital Channels (KBZPay Ecosystem)", 
      location: "Yangon, Myanmar",
      context: "Directing foundational user growth arrays and security matrices for key regional mobile banking channels.",
      bullets: [
        "Drove massive user base scale across both platforms to improve financial growth through primary digital systems.",
        "Built and structured manual operational procedures for handling customer experiences across digital platforms."
      ]
    },
    { 
      year: "2013 - 2016", 
      company: "Institutional Frameworks", 
      role: "State Liaison Officer & Executive Coordinator", 
      location: "Myanmar",
      context: "Facilitating international stakeholder relations, diplomatic logistics configurations, and inter-departmental operations syncs." 
    }
  ];

  const appBlogCache = [
    { id: 1, title: "Learning Through Experience is the Best Class for All Employees", desc: "While organizations invest thousands of hours in frameworks and methodologies, the most powerful classroom remains real-world execution. Here is why experience is the key metric.", time: "5 min read", category: "Product Strategy" },
    { id: 2, title: "The $300 Million Button: How a Single UX Fix Transformed E-Commerce History", desc: "The legendary story of how a simple change to a checkout form's user flow rescued an e-commerce giant from massive cart abandonment, proving that UX is directly tied to revenue generation.", time: "7 min read", category: "UX Testing" },
    { id: 3, title: "The Market Is Not Waiting: Why the AI Era Is Redefining Digital Product Success", desc: "An analysis of the technological paradigm shift sweeping digital products, moving beyond static engineering timelines into an era where platforms compete purely on intelligence layers.", time: "6 min read", category: "Tech Strategy" }
  ];

  const operationalArchitecturePhases = [
    { phase: "Phase 01", title: "Discovery & Strategy", desc: "Architecting the foundational blueprint. I bridge the gap between initial market ideation and corporate vision, mapping out comprehensive product roadmaps before a single line of code is written.", metrics: ["Market Analysis", "Roadmap Architecture", "Stakeholder Alignment", "UX/UI Focus"] },
    { phase: "Phase 02", title: "Operational Architecture", desc: "Translating strategy into execution. I structure agile delivery frameworks, optimize internal cross-functional synchronization, and ensure engineering teams have clear, unblocked pathways.", metrics: ["Agile Delivery", "Process Optimization", "Cross-Functional Sync", "Resource Allocation"] },
    { phase: "Phase 03", title: "QA & Compliance", desc: "Establishing non-negotiable quality and security standards. Implementing robust automated testing strategies and rigorous operational risk frameworks to deliver secure, market-leading platforms.", metrics: ["Automated Testing", "Risk Mitigation", "Regulatory Alignment", "Release Governance"] },
    { phase: "Phase 04", title: "Ecosystem Scaling", desc: "Maximizing market impact. Driving continuous user acquisition loops, continuous integration streams, and data-driven optimization passes to scale applications globally.", metrics: ["Growth Loops", "Data Analytics", "Performance Tracking", "Continuous Integration"] }
  ];

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
          },
          {
            title: "Product Development Manager",
            period: "Apr 2025 - Present • 1 yr 3 mos",
            location: "Chiang Mai, Thailand",
            desc: "Directed the strategic development and execution of comprehensive product roadmaps, ensuring alignment with company vision and real-world market demands.",
            bullets: [
              "Supervised the full product lifecycle, from deep ideation and requirements definition to launch, iteration, and optimization.",
              "Championed user experience (UX) and design initiatives, resulting in intuitive and engaging product interfaces."
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
            ],
            skills: ["User Experience Testing", "Digital Channel Optimization", "Stakeholder Management"]
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
            bullets: ["Refined execution matrices for training delivery systems.", "Cultivated professional cross-cultural organizational communication standards."]
          }
        ]
      }
    ]
  };

  // =========================================================================
  // PARADIGM 1: FINTECH-GRADE STANDALONE APPLICATION USER INTERFACE
  // =========================================================================
  if (isApp) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans antialiased overflow-hidden select-none pb-[env(safe-area-inset-bottom)]">
        
        {/* Native App Top Status Bar Spacer & Dynamic Navigation Control Header */}
        <header className="h-[calc(4.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b border-zinc-200 dark:border-zinc-900 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-black text-lg tracking-tight text-zinc-900 dark:text-white">KHNCO<span className="text-blue-500">.</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500">
              {isDark ? <Moon className="w-4 h-4 text-zinc-400" /> : <Sun className="w-4 h-4 text-orange-500" />}
            </div>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-4 h-9 rounded-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center text-xs font-bold gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Mail className="w-3.5 h-3.5" /> Contact
            </button>
          </div>
        </header>

        {/* Core Isolated Scroll Workspace */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth custom-scrollbar bg-zinc-50 dark:bg-[#09090b]">
          
          {/* VIEWPORT CHANNEL 1: EXECUTIVE COMMAND FEED */}
          {currentTab === 'home' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              
              {/* Refactored Elite Profile Header Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-xl border border-zinc-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-5 -mt-5" />
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md font-semibold">Executive Node</span>
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
                
                <div className="mt-4 space-y-1">
                  <h2 className="text-2xl font-black tracking-tight text-white leading-tight">Kaung Htet Nyein Chan Oo</h2>
                  <p className="text-xs font-mono text-blue-400 font-medium">Head of Digital Operations</p>
                </div>
                
                <p className="text-xs text-zinc-400 font-light mt-3 leading-relaxed">
                  Directing cross-functional frameworks and product lifecycles inside world-class FinTech channels and enterprise software systems.
                </p>
                
                <div className="mt-5 flex gap-3 pt-2 border-t border-zinc-800/80">
                  <button onClick={() => setIsContactOpen(true)} className="flex-1 bg-white hover:bg-zinc-100 text-zinc-950 rounded-xl py-3 text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Direct Consultation
                  </button>
                  <button onClick={() => setIsMapOpen(true)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-3 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-zinc-700/50">
                    Review Roadmap
                  </button>
                </div>
              </div>

              {/* Informative Telemetric Analytics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                    <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Track Record</span>
                  </div>
                  <h4 className="text-2xl font-black text-zinc-900 dark:text-white mt-2">6+ Years</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-tight">Digital Banking & Enterprise Ops</p>
                </div>
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Scale Profile</span>
                  </div>
                  <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">Live</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-tight">KBZ Banking Platform Channels</p>
                </div>
              </div>

              {/* Fully Functional Biography Explander Card */}
              <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-900 rounded-xl p-4 shadow-sm space-y-3">
                <button 
                  onClick={() => setIsBioExpanded(!isBioExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-center font-bold text-sm text-blue-600 dark:text-blue-400">PM</div>
                    <div>
                      <h5 className="text-xs font-bold text-zinc-800 dark:text-white">Operations Strategy Core</h5>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono mt-0.5">Click to examine directives</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isBioExpanded ? 'rotate-180' : ''}`} />
                </button>
                
                {isBioExpanded && (
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-2.5 animate-in fade-in duration-200 leading-relaxed">
                    <p>Directing end-to-end digital engineering and operational delivery frameworks across Product Management, Quality Assurance (QA), and Product Operations divisions to guarantee continuous platform optimization.</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Agile Pipelines", "Process Architecture", "SLA Governance"].map((b, i) => (
                        <span key={i} className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500 dark:text-zinc-400">{b}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* VIEWPORT CHANNEL 2: OPERATIONS MATRIX & ARCHITECTURE */}
          {currentTab === 'matrix' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">System Operations Map</span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">Capabilities & Trajectory</h3>
              </div>

              {/* Core Competency Matrix Blocks */}
              <div className="space-y-4">
                {coreCompetencies.map((comp, idx) => {
                  const Icon = comp.icon;
                  return (
                    <div key={idx} className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700/30">
                          <Icon className={`w-4 h-4 ${comp.color}`} />
                        </div>
                        <h4 className="text-xs font-bold text-zinc-800 dark:text-white">{comp.title}</h4>
                      </div>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">{comp.desc}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {comp.badges.map((badge, bIdx) => (
                          <span key={bIdx} className="bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/40 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-500 dark:text-zinc-400">{badge}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Operational Architecture Section */}
              <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-900 p-5 rounded-xl shadow-sm space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">Lifecycle Matrices</span>
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-white">Operational Architecture</h4>
                </div>

                {/* Micro Tab Controls for Architecture Phases */}
                <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl gap-1">
                  {operationalArchitecturePhases.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveArchitecturePage(idx + 1)}
                      className={`flex-1 text-center py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${activeArchitecturePhase === idx + 1 ? 'bg-blue-600 dark:bg-blue-500 text-white shadow' : 'text-zinc-500'}`}
                    >
                      P0{idx + 1}
                    </button>
                  ))}
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-900 p-4 rounded-xl min-h-[140px] flex flex-col justify-between animate-in fade-in duration-200">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-blue-500">{operationalArchitecturePhases[activeArchitecturePhase - 1].phase}</span>
                      <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">{operationalArchitecturePhases[activeArchitecturePhase - 1].title}</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{operationalArchitecturePhases[activeArchitecturePhase - 1].desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-zinc-100 dark:border-zinc-900">
                    {operationalArchitecturePhases[activeArchitecturePhase - 1].metrics.map((m, mIdx) => (
                      <span key={mIdx} className="bg-white dark:bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded text-[9px] font-mono border border-zinc-200/60 dark:border-zinc-800">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* VIEWPORT CHANNEL 3: PREMIUM INSIGHT STREAM */}
          {currentTab === 'blog' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">Industrial Analysis</span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">Insight Ledger</h3>
              </div>

              <div className="space-y-4">
                {appBlogCache.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl flex flex-col gap-3 shadow-sm shadow-zinc-100/50 dark:shadow-none">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 px-2 py-0.5 rounded font-medium border border-blue-500/10">{post.category}</span>
                      <span className="text-zinc-400 dark:text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">{post.title}</h4>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">{post.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                      <span>Read Article Metrics</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEWPORT CHANNEL 4: ARCADE LAB */}
          {currentTab === 'games' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">Interactive Frameworks</span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">Simulation Console</h3>
              </div>

              <div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-600 dark:text-purple-400">
                  <Gamepad2 className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1.5 max-w-xs mx-auto">
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-white">Neural Decrypt Pipeline</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">A touch-optimized logic game testing deductive optimization parameters and technical sequence alignment tracks.</p>
                </div>
                <button className="w-full py-3 bg-purple-600 dark:bg-purple-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all shadow-md shadow-purple-500/10">
                  Initialize Session
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Global Tab Bar Navigation Dock */}
        <nav className="h-[4.5rem] bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 px-4 flex justify-around items-center shrink-0 shadow-lg">
          {[
            { id: 'home', label: 'Home', icon: HomeIcon },
            { id: 'matrix', label: 'Matrix', icon: Layers },
            { id: 'blog', label: 'Insights', icon: BookOpen },
            { id: 'games', label: 'Arcade', icon: Gamepad2 }
          ].map((dockItem) => {
            const DockIcon = dockItem.icon;
            const isSelected = currentTab === dockItem.id;
            return (
              <button 
                key={dockItem.id}
                onClick={() => setCurrentTab(dockItem.id)}
                className="flex flex-col items-center justify-center w-[20%] h-14 rounded-xl transition-all"
              >
                <DockIcon className={`w-5 h-5 mb-1 transition-transform ${isSelected ? 'text-blue-600 dark:text-blue-400 stroke-[2.5px] scale-110' : 'text-zinc-400 dark:text-zinc-500 stroke-2'}`} />
                <span className={`text-[9px] font-bold tracking-wide uppercase ${isSelected ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-zinc-400 dark:text-zinc-500 font-medium'}`}>{dockItem.label}</span>
              </button>
            );
          })}
        </nav>

        {/* APP DRAWER MODAL 1: HIGH-FIDELITY CONTACT LINK */}
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-zinc-950/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 w-full rounded-t-2xl p-6 space-y-5 animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-y-auto pb-10">
              <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-2" onClick={() => setIsContactOpen(false)} />
              
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-base font-bold text-zinc-900 dark:text-white">Engagement Channels</h5>
                  <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">Secure Operations Gateways</p>
                </div>
                <button onClick={() => setIsContactOpen(false)} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1.5 rounded-lg font-bold">Dismiss</button>
              </div>

              <div className="space-y-3">
                <a href="mailto:jimmykg.spacex@gmail.com" className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/5 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/10"><Mail className="w-5 h-5" /></div>
                  <div className="text-left"><p className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">Secure Email Terminal</p><p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">jimmykg.spacex@gmail.com</p></div>
                </a>
                <a href="tel:+66620983201" className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/5 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-500/10"><Phone className="w-5 h-5" /></div>
                  <div className="text-left"><p className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">Voice Terminal Connection</p><p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">+66 62 098 3201</p></div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* APP DRAWER MODAL 2: TIMELINE BLUEPRINT */}
        {isMapOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-zinc-950/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 w-full rounded-t-2xl p-6 space-y-6 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto pb-10">
              <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-2" onClick={() => setIsMapOpen(false)} />
              
              <div className="flex justify-between items-start">
                <h5 className="text-base font-bold text-zinc-900 dark:text-white">Strategic Trajectory Blueprint</h5>
                <button onClick={() => setIsMapOpen(false)} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1.5 rounded-lg font-bold">Close</button>
              </div>

              <div className="relative border-l border-zinc-200 dark:border-zinc-800 pl-4 space-y-6 ml-2 text-left">
                {visualTrajectoryMap.map((item, mIdx) => (
                  <div key={mIdx} className="space-y-1.5 relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white dark:bg-zinc-900 border-2 border-blue-600 dark:border-blue-400" />
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">{item.year}</span>
                    <h6 className="text-xs font-bold text-zinc-800 dark:text-white pt-1">{item.company}</h6>
                    <p className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">{item.role}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">{item.context}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // PARADIGM 2: PREMIUM LONG-SCROLL WEBSITE LAYOUT (WEB DESKTOP & MOBILE)
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

      {/* 5. Professional Detailed Track Record Module (Section 6) */}
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

                    {'skills' in role && (
                      <div className="flex flex-wrap gap-2 pt-3">
                        {role.skills?.map((skill, sIdx) => (
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

      {/* 6. Website Deployment Ecosystem Metrics Container (Sections 7 & 8) */}
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
              <a href="https://www.linkedin.com/in/kaung-htet-nyein-chan-oo-593952167/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-[#4d8eff] dark:hover:border-[#c0c1ff]/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="material-symbols-outlined text-[#002e6a] dark:text-[#c0c1ff] text-2xl">share</span>
                <div className="text-left"><p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">LinkedIn Network</p><p className="text-sm font-medium group-hover:text-[#4d8eff] dark:group-hover:text-[#c0c1ff]">kaung-htet-nyein-chan-oo</p></div>
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
              {visualTrajectoryMap.map((mapItem, mIdx) => (
                <div key={mIdx} className="relative group/map-node space-y-2">
                  <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-[#4d8eff] dark:border-[#adc6ff] transition-colors duration-300 flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-950" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-xs font-mono font-semibold text-[#002e6a] dark:text-[#adc6ff] bg-[#4d8eff]/10 dark:bg-[#adc6ff]/10 border border-[#4d8eff]/20 dark:border-[#adc6ff]/20 px-2.5 py-0.5 rounded-full w-max">{mapItem.year}</span>
                    <h6 className="text-lg font-bold tracking-tight">{mapItem.company}</h6>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.01] border border-zinc-100 dark:border-white/5 space-y-1">
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{mapItem.role}</p>
                    <p className="text-xs font-light text-zinc-600 dark:text-slate-400 leading-relaxed">{mapItem.context}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setIsMapOpen(false)} className="w-full py-4 bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer">Close Blueprint View</button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}