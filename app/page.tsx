'use client';

import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, Layers, BookOpen, Gamepad2, User, Mail, 
  ArrowRight, Clock, ChevronRight, Sparkles, CheckCircle2, 
  Briefcase, GraduationCap, Phone, ExternalLink, Calendar, MapPin
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
  
  // App Modal States
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    // Advanced App Detection Engine
    const isCapacitor = (window as any).Capacitor?.isNativePlatform?.();
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosWebview = /(iphone|ipod|ipad).*applewebkit(?!.*safari)/.test(ua);
    const isAndroidWebview = /android.*wv/.test(ua);

    if (isCapacitor || isStandalone || isIosWebview || isAndroidWebview) {
      setIsApp(true);
    }
  }, []);

  // Hardcoded Local Data Cache for Clean Native App Feeds
  const coreCompetencies = [
    { title: "Digital Operations Management", desc: "Directing end-to-end digital engineering and operational delivery frameworks.", icon: Layers, color: "text-blue-400" },
    { title: "FinTech Channel Ecosystems", desc: "Overseeing massive consumer digital banking layers (KBZPay & KBZ Mobile Banking).", icon: Sparkles, color: "text-purple-400" },
    { title: "Strategic Product Engineering", desc: "Spearheading multi-phased product roadmaps from ideation to high-frequency deployment.", icon: Briefcase, color: "text-cyan-400" }
  ];

  const visualTrajectoryMap = [
    { year: "2025 - Present", company: "digit7s", role: "Head of Digital Operations & Product Development", context: "Orchestrating multi-tiered product workflows and engineering management across Thailand." },
    { year: "2018 - 2025", company: "KBZ Bank", role: "Manager - Digital Channels (KBZPay Ecosystem)", context: "Directing foundational user growth and security matrices for key regional mobile banking channels." },
    { year: "2014 - 2022", company: "Media Advisory", role: "Communications Consultant & Localization Lead", context: "Anchoring cross-border media translation networks and localized communication frameworks." }
  ];

  const appBlogCache = [
    { id: 1, title: "Learning Through Experience", desc: "Why real-world execution metrics matter infinitely more than traditional frameworks.", time: "5 min read", category: "Product Strategy" },
    { id: 2, title: "The $300 Million Button", desc: "How a single user experience testing optimization transformed e-commerce checkout history.", time: "7 min read", category: "UX Engineering" },
    { id: 3, title: "Outcomes Over Outputs", desc: "The hidden operational management lessons extracted behind Airbnb's historic corporate turnaround.", time: "6 min read", category: "Leadership" }
  ];

  // =========================================================================
  // PARADIGM 1: PURE NATIVE MOBILE APPLICATION LAYOUT
  // =========================================================================
  if (isApp) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans antialiased overflow-hidden select-none pb-[env(safe-area-inset-bottom)]">
        
        {/* Custom Native Sticky Navigation Header */}
        <header className="h-[calc(4rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-black text-lg tracking-tight">KHNCO<span className="text-blue-500">.</span></span>
          </div>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:scale-95 transition-all text-blue-400"
          >
            <Mail className="w-4 h-4" />
          </button>
        </header>

        {/* Dedicated Isolated Viewports Area */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth custom-scrollbar">
          
          {/* TAB VIEW 1: APPLICATION HOME DASHBOARD */}
          {currentTab === 'home' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {/* Premium Welcome Hero Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 p-6 shadow-xl border border-blue-500/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-5 -mt-5" />
                <span className="text-[10px] font-mono uppercase tracking-widest bg-white/10 text-blue-200 px-2.5 py-1 rounded-md">Executive Summary</span>
                <h2 className="text-2xl font-black tracking-tight mt-4 text-white leading-tight">Orchestrating High-Scale Digital Platforms</h2>
                <p className="text-xs text-blue-100 font-light mt-2 leading-relaxed">Directing cross-functional frameworks and product lifecycles inside world-class FinTech and enterprise channels.</p>
                
                <div className="mt-5 flex gap-3">
                  <button onClick={() => setIsContactOpen(true)} className="flex-1 bg-white text-zinc-950 rounded-xl py-3 text-xs font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Direct Consultation
                  </button>
                  <button onClick={() => setIsMapOpen(true)} className="flex-1 bg-white/10 text-white rounded-xl py-3 text-xs font-semibold active:scale-95 transition-transform flex items-center justify-center gap-1.5 backdrop-blur-sm">
                    Review Roadmap
                  </button>
                </div>
              </div>

              {/* Native Quick Operational Metrics Matrix */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Scale Layer</span>
                  <h4 className="text-2xl font-black text-white mt-1">6+ Yrs</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">FinTech & Operations</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Deployments</span>
                  <h4 className="text-2xl font-black text-blue-400 mt-1">Live</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">KBZ Ecosystem Nodes</p>
                </div>
              </div>

              {/* Highlight Profile Preview Strip */}
              <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-sm text-blue-400">PM</div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Kaung Htet Nyein Chan Oo</h5>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Head of Digital Operations</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </div>

            </div>
          )}

          {/* TAB VIEW 2: INTERACTIVE MATRIX SYSTEM */}
          {currentTab === 'matrix' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400">Core Architecture</span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">Operational Matrix</h3>
              </div>

              {/* Competency Modules Feed */}
              <div className="space-y-4">
                {coreCompetencies.map((comp, idx) => {
                  const Icon = comp.icon;
                  return (
                    <div key={idx} className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-xl space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center border border-zinc-700/30">
                          <Icon className={`w-4 h-4 ${comp.color}`} />
                        </div>
                        <h4 className="text-xs font-bold text-white">{comp.title}</h4>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{comp.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Mini App Timeline Component */}
              <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" /> Key Milestone Layers
                </h4>
                <div className="relative border-l border-zinc-800 pl-4 space-y-4 ml-1.5">
                  {visualTrajectoryMap.map((node, nIdx) => (
                    <div key={nIdx} className="relative text-left space-y-1">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-950 border-2 border-blue-500" />
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-blue-400 font-semibold">{node.year}</span>
                        <span className="text-zinc-500">{node.company}</span>
                      </div>
                      <h5 className="text-xs font-bold text-zinc-200">{node.role}</h5>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB VIEW 3: APP NATIVE INSIGHT STREAM */}
          {currentTab === 'blog' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400">Knowledge Core</span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">Insight Stream</h3>
              </div>

              <div className="space-y-4">
                {appBlogCache.map((post) => (
                  <div key={post.id} className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-xl flex justify-between items-start gap-4 active:bg-zinc-900/60 transition-colors">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{post.category}</span>
                        <span className="text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white leading-snug">{post.title}</h4>
                      <p className="text-[11px] text-zinc-400 font-light line-clamp-2">{post.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700/30 self-center shrink-0">
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB VIEW 4: DIGITAL ARCADE CONSOLE */}
          {currentTab === 'games' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400">Simulation Hub</span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">Digital Arcade</h3>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
                  <Gamepad2 className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1 max-w-xs mx-auto">
                  <h4 className="text-sm font-bold text-white">Neural Decrypt Puzzle Engine</h4>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed">Test interactive pattern recognition matrix structures optimized fully for touch layouts.</p>
                </div>
                <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg active:scale-[0.98] transition-transform">
                  Launch Environment
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Global Isolated App Dock Navigation Layout */}
        <nav className="h-[4.5rem] bg-zinc-950 border-t border-zinc-900 px-4 flex justify-around items-center shrink-0">
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
                className="flex flex-col items-center justify-center w-[20%] h-14 rounded-xl transition-all duration-200"
              >
                <DockIcon className={`w-5 h-5 mb-1 transition-transform ${isSelected ? 'text-blue-400 stroke-[2.5px] scale-110' : 'text-zinc-500 stroke-2'}`} />
                <span className={`text-[9px] font-bold tracking-wide uppercase ${isSelected ? 'text-blue-400' : 'text-zinc-500'}`}>{dockItem.label}</span>
              </button>
            );
          })}
        </nav>

        {/* APPLICATION OVERLAY GATEWAY 1: CONTACT PANEL */}
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-zinc-900 border-t border-zinc-800 w-full rounded-t-2xl p-6 space-y-5 animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-y-auto pb-10">
              <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-2" onClick={() => setIsContactOpen(false)} />
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-base font-bold text-white">Direct Communication Core</h5>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Secure Engagement Gateways</p>
                </div>
                <button onClick={() => setIsContactOpen(false)} className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg font-semibold">Dismiss</button>
              </div>
              <div className="space-y-3">
                <a href="mailto:jimmykg.spacex@gmail.com" className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div className="text-left"><p className="text-[9px] font-mono text-zinc-500 uppercase">Secure Email</p><p className="text-xs font-bold text-zinc-200">jimmykg.spacex@gmail.com</p></div>
                </a>
                <a href="tel:+66620983201" className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <div className="text-left"><p className="text-[9px] font-mono text-zinc-500 uppercase">Voice Terminal</p><p className="text-xs font-bold text-zinc-200">+66 62 098 3201</p></div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* APPLICATION OVERLAY GATEWAY 2: TRAJECTORY MAP */}
        {isMapOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-zinc-900 border-t border-zinc-800 w-full rounded-t-2xl p-6 space-y-6 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto pb-10">
              <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-2" onClick={() => setIsMapOpen(false)} />
              <div className="flex justify-between items-start">
                <h5 className="text-base font-bold text-white">Strategic Trajectory Blueprint</h5>
                <button onClick={() => setIsMapOpen(false)} className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg font-semibold">Close</button>
              </div>
              <div className="relative border-l border-zinc-800 pl-4 space-y-5 ml-2">
                {visualTrajectoryMap.map((item, mIdx) => (
                  <div key={mIdx} className="space-y-1 relative">
                    <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full">{item.year}</span>
                    <h6 className="text-xs font-bold text-white pt-1">{item.company}</h6>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{item.role} — {item.context}</p>
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
  // PARADIGM 2: PREMIUM LONG-SCROLL WEBSITE LAYOUT (WEB)
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
          <div className="glass-card rounded-3xl p-12 md:p-20 text-center overflow-hidden bg-gradient-to-br from-zinc-50 to-transparent dark:from-white/[0.02] dark:to-transparent">
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

// Global Paginated Experience Payload
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
            "Drove massive user base scale across both platforms to improve financial growth of the Bank through primary digital systems.",
            "Built and structured manual operational procedures for handling customer experiences across KBZ Digital Platforms."
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