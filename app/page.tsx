'use client';

import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, LineChart, Settings, BookOpen, Gamepad2, 
  User, Mail, Link as LinkIcon, Send, MessageCircle, Phone, ArrowRight, 
  ArrowLeft, Clock, Layers, Shield, Zap, X, ChevronRight, 
  Activity, MessageSquare, Network, Sun, Moon, Calendar, Play
} from 'lucide-react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CapabilitiesMatrix from '../components/Capabilities';
import TrajectoryHubs from '../components/TrajectoryHubs';
import StrategicNetwork from '../components/StrategicNetwork';
import DataNexus from '../components/DataNexus';
import { supabase } from '../lib/supabase';

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
      company: "digit7s", timeline: "Full-time • 1 yr 3 mos", type: "Hybrid",
      roles: [
        {
          title: "Head of Digital Operations", period: "Jan 2026 - Present • 6 mos", location: "Bangkok City, Thailand",
          desc: "Leading end-to-end digital operations across Product Management, Quality Assurance (QA), and Product Operations teams.",
          bullets: ["Managing product lifecycle from initial planning to release execution metrics.", "Overseeing complex QA processes and automated testing strategies.", "Driving operational workflows and cross-functional collaboration loops.", "Coordinating directly with Engineering, Design, and Business stakeholders."]
        },
        {
          title: "Product Development Manager", period: "Apr 2025 - Present • 1 yr 3 mos", location: "Chiang Mai, Thailand",
          desc: "Lead the strategic development and execution of comprehensive product roadmaps.",
          bullets: ["Directed the full product lifecycle, from ideation to launch and optimization.", "Championed UX and design initiatives for engaging product interfaces."]
        }
      ]
    },
    {
      company: "KBZ Bank", timeline: "6 yrs 2 mos Fast-Track", type: "On-site / Full-time",
      roles: [
        {
          title: "Digital Channel Management Lead", period: "Nov 2022 - Jan 2025", location: "Transaction Banking Department",
          desc: "Leading the bank's premier digital financial platforms (KBZPay & KBZ m/i Banking).",
          bullets: ["Directed end-to-end KBZPay UI/UX relaunch, significantly increasing customer engagement.", "Spearheaded new mobile and internet banking platform migrations."]
        },
        {
          title: "Project Manager - CEO Project Office", period: "Sep 2021 - Nov 2022", location: "Yangon, Myanmar",
          desc: "Led high-impact strategic transformation projects under the direction of the Global CEO.",
          bullets: ["Implemented Queue Management System at branches, drastically reducing customer wait times.", "Transformed traditional banking processes into automation."]
        },
        {
          title: "Assistant Project Manager", period: "Jan 2020 - Sep 2021", location: "Cash & Logistics Management",
          desc: "Oversaw cash handling, distribution, and logistics operations.",
          bullets: ["Designed and implemented Hub & Spoke Cash Management Model.", "Led Target Operating Model transformation for compliance."]
        },
        {
          title: "Translator & Executive Assistant", period: "Nov 2018 - Jan 2020", location: "Branch Operations",
          desc: "Provided business and banking-related translation for the Chief Operating Officer.",
          bullets: ["Supported executive-level decision-making and meeting coordination."]
        }
      ]
    }
  ],
  2: [
    {
      company: "Educational & Freelance Tracks", timeline: "Independent", type: "Project-Based",
      roles: [
        {
          title: "Academic English Teacher / Coach", period: "2017 - May 2022", location: "Wall Street English",
          desc: "Delivered premium instructional communication coaching.",
          bullets: ["Refined execution matrices for training delivery systems."]
        },
        {
          title: "Freelance Translator & Guide", period: "2014 - 2017", location: "Channel Myanmar & Tour Guide Assoc.",
          desc: "Orchestrated large-scale localization and media subtitle translations.",
          bullets: ["Cultivated dynamic scheduling frameworks across fast-paced environments."]
        }
      ]
    },
    {
      company: "Institutional Liaison Frameworks", timeline: "State Projects", type: "Advisory",
      roles: [
        {
          title: "State Liaison Officer", period: "2013 - 2016", location: "Myanmar Gov & Football Federation",
          desc: "Managed key international communication links and logistics for cross-border events.",
          bullets: ["Facilitated state-level athletic delegation schedules and operations."]
        }
      ]
    },
    {
      company: "Education & Recognitions", timeline: "Academic Foundation", type: "Credentials",
      roles: [
        {
          title: "Project Management Certification", period: "2021", location: "London Business University",
          desc: "Specialized in project initiation, execution, risk management, and closure.", bullets: []
        },
        {
          title: "Bachelor of Arts (Economics)", period: "2012 - 2016", location: "Dagon University",
          desc: "Studied economic theories, analytical tools, and policy development.", bullets: []
        }
      ]
    }
  ]
};

const visualTrajectoryMap = [
  { year: "2025 - Present", company: "digit7s", role: "Head of Digital Operations", context: "Orchestrating multi-tiered product workflows, agile scaling configurations, and cross-functional engineering management." },
  { year: "2022 - 2025", company: "KBZ Bank", role: "Digital Channel Management Lead", context: "Led KBZPay & m/i Banking platforms, overseeing development, profitability, and UX optimization." },
  { year: "2020 - 2022", company: "KBZ Bank", role: "Project Manager (CEO Office)", context: "Led high-impact strategic transformations, Queue Management Systems, and Hub & Spoke Cash Models." },
  { year: "2013 - 2020", company: "Early Career", role: "Executive Assistant & Liaison", context: "Facilitated international stakeholder relations, translation pipelines, and adult education frameworks." }
];

const coreCompetencies = [
  { title: "Digital Operations Management", desc: "Directing end-to-end digital engineering and operational delivery frameworks across product divisions.", icon: Layers, color: "text-blue-500 bg-blue-500/10 border-blue-500/20 dark:text-blue-400 dark:border-blue-400/20 dark:bg-blue-500/5", tags: ["Agile Delivery", "KPIs"] },
  { title: "FinTech Channel Ecosystems", desc: "Overseeing massive digital consumer channels including flagship mobile banking layers.", icon: Shield, color: "text-purple-500 bg-purple-500/10 border-purple-500/20 dark:text-purple-400 dark:border-purple-400/20 dark:bg-purple-500/5", tags: ["Ecosystem Scale", "Compliance"] },
  { title: "Strategic Product Engineering", desc: "Spearheading multi-phased product roadmaps from deep initial market ideation to high-frequency deployment.", icon: Zap, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-400/20 dark:bg-emerald-500/5", tags: ["Roadmaps", "UX/UI Focus"] }
];

const operationalArchitecturePhases = [
  { phase: "Phase 01", title: "Discovery & Strategy", desc: "Architecting the foundational blueprint before a single line of code is written.", metrics: ["Market Analysis", "Roadmap Architecture"] },
  { phase: "Phase 02", title: "Operational Architecture", desc: "Translating strategy into execution. Structuring agile delivery frameworks.", metrics: ["Agile Delivery", "Process Optimization"] },
  { phase: "Phase 03", title: "QA & Compliance", desc: "Establishing non-negotiable quality and security standards.", metrics: ["Automated Testing", "Risk Mitigation"] },
  { phase: "Phase 04", title: "Ecosystem Scaling", desc: "Maximizing market impact and driving continuous user acquisition loops.", metrics: ["Growth Loops", "Data Analytics"] }
];

const appGamesCache = [
  { id: 1, title: "Techle", slug: "techle", description: "A daily word puzzle game for tech enthusiasts.", specs: "Next.js Route • Interactive WebGL", iconColor: "text-blue-500 dark:text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { id: 2, title: "Bug Blaster", slug: "bug-blaster", description: "Squash bugs and optimize your code in this fast-paced arcade shooter.", specs: "Next.js Route • Interactive WebGL", iconColor: "text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/20" },
  { id: 3, title: "Lexicon Lock", slug: "lexicon-lock", description: "An English anagram puzzle. Unscramble the letters to crack the vault.", specs: "Next.js Route • Interactive WebGL", iconColor: "text-purple-500 dark:text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { id: 4, title: "Sprint Planner", slug: "sprint-planner", description: "Manage resources and deliver the project on time in this strategy simulation.", specs: "Next.js Route • Interactive WebGL", iconColor: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { id: 5, title: "QA Test Simulator", slug: "qa-test", description: "Test your quality assurance skills by finding edge cases.", specs: "Next.js Route • Interactive WebGL", iconColor: "text-orange-500 dark:text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { id: 6, title: "Logic Puzzle", slug: "puzzle", description: "A high-fidelity touch puzzle sandbox testing automated deductive logic capabilities.", specs: "Next.js Route • Interactive WebGL", iconColor: "text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20" }
];

const calculateExperience = () => {
  const currentYear = new Date().getFullYear();
  return currentYear - 2013;
};

// =========================================================================
// MAIN COMPONENT ROUTER
// =========================================================================
export default function HybridAppRouter() {
  // Global Environment State
  const [isApp, setIsApp] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(false);
  const [countdown, setCountdown] = useState(5);
  
  // App Specific States
  const [currentTab, setCurrentTab] = useState('home');
  const [journeySegment, setJourneySegment] = useState<'professional' | 'educational'>('professional');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeBlogDetail, setActiveBlogDetail] = useState<any | null>(null);
  const [activeGameDetail, setActiveGameDetail] = useState<any | null>(null);
  const [activeArchitecturePhase, setActiveArchitecturePhase] = useState(1);
  
  // Live Data Hooks
  const [livePosts, setLivePosts] = useState<any[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  // Web Specific States
  const [activeExperiencePage, setActiveExperiencePage] = useState(1);
  const [isWebContactOpen, setIsWebContactOpen] = useState(false);
  const [isWebMapOpen, setIsWebMapOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));

    // Advanced Native Framework Detection
    const isCapacitor = (window as any).Capacitor?.isNativePlatform?.();
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const ua = window.navigator.userAgent.toLowerCase();
    
    if (isCapacitor || isStandalone || /(iphone|ipod|ipad).*applewebkit(?!.*safari)/.test(ua) || /android.*wv/.test(ua)) {
      setIsApp(true);
      setShowSplash(true); // Enable Splash Screen ONLY if running as a Native App
    }

    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          setLivePosts(data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);

  // Countdown Ticker Loop for Splash Screen
  useEffect(() => {
    if (!showSplash) return;
    if (countdown <= 0) {
      setShowSplash(false);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showSplash, countdown]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const renderInlineStyles = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    return text.split(boldRegex).map((part, i) => {
      if (i % 2 === 1) return <strong key={i} className="font-extrabold text-zinc-900 dark:text-white">{part}</strong>;
      return part;
    });
  };

  // =========================================================================
  // PARADIGM 0: HIGH-TECH APPS SPLASH SCREEN OVERLAY
  // =========================================================================
  if (isApp && showSplash) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#09090B] flex flex-col items-center justify-center z-[200] select-none font-sans overflow-hidden animate-in fade-in duration-300">
        
        {/* Top Floating Action Ticker Bar */}
        <div className="absolute top-[calc(1.5rem+env(safe-area-inset-top))] right-5 z-[210]">
          <button 
            onClick={() => setShowSplash(false)}
            className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-zinc-400 hover:text-white active:scale-95 transition-all"
          >
            <span>Skip</span>
            <span className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[9px] text-blue-400 font-mono font-black tracking-tighter">
              {countdown}
            </span>
          </button>
        </div>

        {/* Ambient Network Core Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
          <div className="w-96 h-96 bg-blue-500 rounded-full blur-[110px]" />
        </div>

        {/* Animated Main Branding Container */}
        <div className="flex flex-col items-center text-center px-6 animate-in slide-in-from-bottom-6 duration-700 ease-out">
          
          {/* Pulsing Core Ring Geometry */}
          <div className="w-28 h-24 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center mb-8 relative group shadow-[0_0_40px_rgba(59,130,246,0.05)]">
            <div className="absolute inset-0 border-2 border-blue-500/20 rounded-2xl animate-ping opacity-25 duration-1000" />
            <Network className="w-10 h-10 text-blue-500" />
          </div>

          {/* Identity Headers */}
          <div className="space-y-3">
            <h1 className="text-3xl font-black text-white tracking-widest uppercase">
              KHNCO<span className="text-blue-500 animate-pulse">.</span>
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase max-w-xs leading-relaxed">
              Orchestrating High-Impact Platforms
            </p>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // PARADIGM 1: PREMIUM NATIVE MOBILE APPLICATION UI
  // =========================================================================
  if (isApp) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-[#e5e1e4] flex flex-col font-sans antialiased overflow-hidden select-none pb-[env(safe-area-inset-bottom)]">
        
        {/* TOP APP BAR */}
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-[calc(4.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] bg-white/70 dark:bg-[#131315]/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-[#27272A]/50">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] animate-pulse" />
            <h1 className="text-sm font-black text-zinc-900 dark:text-white tracking-widest uppercase">KHNCO<span className="text-blue-600 dark:text-blue-500">.</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white active:scale-95 transition-all">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsContactModalOpen(true)} 
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-[#27272A] flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white active:scale-95 transition-all shadow-sm"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* MAIN VIEWPORT */}
        <div className="flex-1 overflow-y-auto pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(7.5rem+env(safe-area-inset-bottom))] px-5 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* TAB 1: HOME (EXECUTIVE DASHBOARD) */}
          {currentTab === 'home' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Executive Hero Profile */}
              <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-zinc-200/60 dark:border-[#27272A] p-7 relative overflow-hidden shadow-xl dark:shadow-2xl">
                <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-blue-500/20 dark:bg-blue-600/20 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-purple-500/10 dark:bg-purple-600/10 blur-[50px] rounded-full pointer-events-none" />
                
                <span className="text-[9px] font-bold tracking-widest uppercase bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 px-2.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/20 relative z-10 inline-block">Executive Profile</span>
                
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-5 leading-[1.1] relative z-10">Kaung Htet <br/>Nyein Chan Oo</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-2 relative z-10">Project & Channel Management Leader</p>
                
                <div className="mt-6 flex items-center gap-2 bg-zinc-50 dark:bg-[#09090b] px-3.5 py-2 rounded-full border border-zinc-200 dark:border-[#27272A] w-max relative z-10">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-bold text-zinc-700 dark:text-white uppercase tracking-wider">Live Node Active</span>
                </div>
              </div>

              {/* Quick Actions / Consultation Session */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-blue-600 dark:bg-blue-500 text-white font-bold text-xs py-3.5 px-4 rounded-2xl active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <Calendar className="w-4 h-4" />
                  Book Session
                </button>
                <button 
                  onClick={() => setCurrentTab('journey')}
                  className="bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-[#27272A] text-zinc-900 dark:text-white font-bold text-xs py-3.5 px-4 rounded-2xl active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <LineChart className="w-4 h-4 text-zinc-400" />
                  View Journey
                </button>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#18181B] rounded-2xl border border-zinc-200/60 dark:border-[#27272A] p-5 flex flex-col justify-between h-28 shadow-sm">
                  <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Track Record</span>
                  <div>
                    <span className="text-2xl font-black text-zinc-900 dark:text-white block">{calculateExperience()}+ Years</span>
                    <span className="text-[10px] text-zinc-500 mt-1 block">Cross-Functional</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#18181B] rounded-2xl border border-zinc-200/60 dark:border-[#27272A] p-5 flex flex-col justify-between h-28 shadow-sm">
                  <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Global Scale</span>
                  <div>
                    <span className="text-lg font-black text-blue-600 dark:text-blue-400 block">Enterprise</span>
                    <span className="text-[10px] text-zinc-500 mt-1 block">High-Fidelity Ready</span>
                  </div>
                </div>
              </div>

              {/* Domain Movement Highlight Map */}
              <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-zinc-200/60 dark:border-[#27272A] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Domain Evolution</h3>
                  <Network className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                </div>
                
                {/* Visual Node Map */}
                <div className="relative flex justify-between items-center px-4 before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-[2px] before:bg-zinc-200 dark:before:bg-zinc-800 before:mx-8">
                  <div className="z-10 bg-zinc-100 dark:bg-[#09090b] p-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-sm"><MessageSquare className="w-4 h-4 text-zinc-500" /></div>
                  <div className="z-10 bg-white dark:bg-[#09090b] p-2.5 rounded-full border-2 border-purple-500 flex items-center justify-center shadow-sm dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]"><Shield className="w-4 h-4 text-purple-500 dark:text-purple-400" /></div>
                  <div className="z-10 bg-white dark:bg-[#09090b] p-2.5 rounded-full border-2 border-blue-500 flex items-center justify-center shadow-sm"><Layers className="w-4 h-4 text-blue-500 dark:text-blue-400" /></div>
                </div>
                <div className="flex justify-between text-[9px] font-bold tracking-wider uppercase mt-4">
                  <span className="w-20 text-center text-zinc-500 leading-tight">Comms &<br/>Liaison</span>
                  <span className="w-20 text-center text-purple-600 dark:text-purple-400 leading-tight">FinTech<br/>Channels</span>
                  <span className="w-20 text-center text-blue-600 dark:text-blue-400 leading-tight">Digital<br/>Operations</span>
                </div>
              </div>

              {/* RECENT HIGHLIGHTS */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Recent Highlights</h3>
                </div>
                
                <div className="flex overflow-x-auto space-x-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {/* Latest Blog Post Highlight 1 */}
                  {!isLoadingPosts && livePosts.length > 0 && (
                    <div onClick={() => setActiveBlogDetail(livePosts[0])} className="w-64 flex-shrink-0 bg-white dark:bg-[#18181B] border border-zinc-200/60 dark:border-[#27272A] p-5 rounded-3xl active:scale-95 transition-transform shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2 py-0.5 rounded">Latest Insight</span>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white mt-3 line-clamp-2 leading-tight">{livePosts[0].title}</h4>
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-4 flex items-center gap-1"><BookOpen className="w-3 h-3"/> Read Article</span>
                    </div>
                  )}

                  {/* Latest Blog Post Highlight 2 */}
                  {!isLoadingPosts && livePosts.length > 1 && (
                    <div onClick={() => setActiveBlogDetail(livePosts[1])} className="w-64 flex-shrink-0 bg-white dark:bg-[#18181B] border border-zinc-200/60 dark:border-[#27272A] p-5 rounded-3xl active:scale-95 transition-transform shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2 py-0.5 rounded">Strategy Intel</span>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white mt-3 line-clamp-2 leading-tight">{livePosts[1].title}</h4>
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-4 flex items-center gap-1"><BookOpen className="w-3 h-3"/> Read Article</span>
                    </div>
                  )}

                  {/* Top Game Highlight 1 */}
                  <div onClick={() => setActiveGameDetail(appGamesCache[0])} className="w-64 flex-shrink-0 bg-white dark:bg-[#18181B] border border-zinc-200/60 dark:border-[#27272A] p-5 rounded-3xl active:scale-95 transition-transform shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 px-2 py-0.5 rounded">Arcade Stack</span>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white mt-3 line-clamp-2 leading-tight">{appGamesCache[0].title}</h4>
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-4 flex items-center gap-1"><Gamepad2 className="w-3 h-3"/> Launch Sandbox</span>
                  </div>

                  {/* Top Game Highlight 2 */}
                  <div onClick={() => setActiveGameDetail(appGamesCache[1])} className="w-64 flex-shrink-0 bg-white dark:bg-[#18181B] border border-zinc-200/60 dark:border-[#27272A] p-5 rounded-3xl active:scale-95 transition-transform shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 px-2 py-0.5 rounded">Arcade Stack</span>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white mt-3 line-clamp-2 leading-tight">{appGamesCache[1].title}</h4>
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-4 flex items-center gap-1"><Gamepad2 className="w-3 h-3"/> Launch Sandbox</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: JOURNEY (CAREER & EDUCATION) */}
          {currentTab === 'journey' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* iOS Style Segmented Control */}
              <div className="flex bg-zinc-100 dark:bg-[#18181B] p-1.5 rounded-xl border border-zinc-200/60 dark:border-[#27272A]">
                <button 
                  onClick={() => setJourneySegment('professional')}
                  className={`flex-1 text-center py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${journeySegment === 'professional' ? 'bg-white dark:bg-[#3B82F6] text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500'}`}
                >
                  Professional
                </button>
                <button 
                  onClick={() => setJourneySegment('educational')}
                  className={`flex-1 text-center py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${journeySegment === 'educational' ? 'bg-white dark:bg-[#3B82F6] text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500'}`}
                >
                  Educational
                </button>
              </div>

              {/* Timeline Feed */}
              <div className="relative border-l-2 border-zinc-200 dark:border-[#27272A] pl-5 space-y-8 ml-2">
                {paginatedExperience[journeySegment === 'professional' ? 1 : 2].map((block, idx) => (
                  <div key={idx} className="relative bg-white dark:bg-[#18181B] border border-zinc-200/60 dark:border-[#27272A] rounded-3xl p-6 shadow-sm">
                    <div className="absolute -left-[28px] top-6 w-3.5 h-3.5 rounded-full bg-zinc-50 dark:bg-[#09090b] border-[3px] border-blue-600 dark:border-[#3B82F6]" />
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-black text-zinc-900 dark:text-white">{block.company}</h4>
                        <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mt-1">{block.timeline}</p>
                      </div>
                    </div>
                    {block.roles.map((role, rIdx) => (
                      <div key={rIdx} className="space-y-3 pt-4 mt-2 border-t border-zinc-100 dark:border-[#27272A]/60">
                        <div>
                          <h5 className="text-sm font-bold text-zinc-800 dark:text-white">{role.title}</h5>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{role.period}</p>
                        </div>
                        <p className="text-[12px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{role.desc}</p>
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
              <div className="pb-2 border-b border-zinc-200 dark:border-[#27272A]">
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider font-bold">Execution Frameworks</span>
                <h2 className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">Capabilities Matrix</h2>
              </div>

              {/* Horizontal Stepper */}
              <div className="space-y-4 pt-2">
                <div className="flex overflow-x-auto space-x-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {operationalArchitecturePhases.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveArchitecturePhase(idx + 1)}
                      className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-[10px] font-bold tracking-wider uppercase border transition-all ${activeArchitecturePhase === idx + 1 ? 'bg-blue-600 border-blue-600 dark:bg-[#3B82F6] dark:border-[#3B82F6] text-white shadow-md' : 'bg-white dark:bg-[#18181B] border-zinc-200 dark:border-[#27272A] text-zinc-500'}`}
                    >
                      {p.phase}
                    </button>
                  ))}
                </div>
                <div className="bg-white dark:bg-[#18181B] border border-zinc-200/60 dark:border-[#27272A] p-6 rounded-3xl space-y-3 shadow-sm min-h-[140px]">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{operationalArchitecturePhases[activeArchitecturePhase - 1].title}</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{operationalArchitecturePhases[activeArchitecturePhase - 1].desc}</p>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {operationalArchitecturePhases[activeArchitecturePhase - 1].metrics.map((m, mIdx) => (
                      <span key={mIdx} className="bg-zinc-50 dark:bg-[#09090b] text-zinc-600 dark:text-zinc-400 px-2.5 py-1 rounded text-[10px] font-mono border border-zinc-200 dark:border-[#27272A]">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4">
                {coreCompetencies.map((comp, idx) => {
                  const Icon = comp.icon;
                  return (
                    <div key={idx} className="bg-white dark:bg-[#18181B] border border-zinc-200/60 dark:border-[#27272A] p-6 rounded-3xl space-y-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${comp.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">{comp.title}</h4>
                      </div>
                      <p className="text-[12px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{comp.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 4: INSIGHTS (LIVE BLOG POSTS) */}
          {currentTab === 'insights' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="pb-2 border-b border-zinc-200 dark:border-[#27272A]">
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider font-bold">Knowledge Base</span>
                <h2 className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">Insight Ledger</h2>
              </div>

              <div className="space-y-4">
                {isLoadingPosts ? (
                  <div className="flex items-center justify-center p-10">
                    <Activity className="w-6 h-6 text-blue-500 animate-spin" />
                  </div>
                ) : livePosts.length > 0 ? (
                  livePosts.map((post) => (
                    <div 
                      key={post.id} 
                      onClick={() => setActiveBlogDetail(post)}
                      className="bg-white dark:bg-[#18181B] border border-zinc-200/60 dark:border-[#27272A] p-6 rounded-3xl flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer shadow-sm overflow-hidden"
                    >
                      {post.cover_image && (
                        <div className="w-full h-40 -mt-6 -mx-6 mb-2 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Article</span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-zinc-900 dark:text-white leading-snug">{post.title}</h4>
                      <p className="text-[12px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed font-light">{post.summary || "Tap to read full article insights."}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-10 text-zinc-500 text-sm">No articles available at the moment.</div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: ARCADE (GAMES LIST & IFRAME ROUTING) */}
          {currentTab === 'arcade' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="pb-2 border-b border-zinc-200 dark:border-[#27272A]">
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider font-bold">Interactive Sandbox</span>
                <h2 className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">Simulation Arcade</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {appGamesCache.map((game) => (
                  <div key={game.id} onClick={() => setActiveGameDetail(game)} className="bg-white dark:bg-[#18181B] border border-zinc-200/60 dark:border-[#27272A] rounded-2xl p-5 flex items-center gap-5 active:scale-[0.98] transition-transform cursor-pointer shadow-sm">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${game.iconColor}`}>
                      <Gamepad2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">{game.title}</h4>
                      <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">{game.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PREMIUM FLOATING GLASS BOTTOM NAV */}
        <div className="fixed bottom-6 left-4 right-4 z-50 pointer-events-none no-select">
          <nav className="pointer-events-auto flex justify-around items-center w-full max-w-sm mx-auto h-[4.5rem] px-2 bg-white/80 dark:bg-[#131315]/80 backdrop-blur-2xl border border-zinc-200/60 dark:border-white/10 rounded-3xl shadow-2xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
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
                  className="flex flex-col items-center justify-center w-[18%] h-14 rounded-2xl active:scale-90 transition-transform"
                >
                  <IconComponent className={`w-5 h-5 mb-1 transition-all ${isSelected ? 'text-blue-600 dark:text-[#3B82F6] stroke-[2.5px] scale-110' : 'text-zinc-400 dark:text-zinc-500 stroke-2'}`} />
                  <span className={`text-[8px] font-bold tracking-widest uppercase ${isSelected ? 'text-blue-600 dark:text-[#3B82F6]' : 'text-zinc-400 dark:text-zinc-500'}`}>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* MODAL: PROFILE & CONTACT (BOTTOM SHEET) */}
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-zinc-950/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#18181B] border-t border-zinc-200 dark:border-[#27272A] w-full rounded-t-[2rem] p-6 space-y-6 animate-in slide-in-from-bottom duration-300 pb-10 shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="w-12 h-1.5 bg-zinc-200 dark:bg-[#27272A] rounded-full mx-auto" onClick={() => setIsContactModalOpen(false)} />
              <div className="flex justify-between items-center">
                <h5 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">Executive Network</h5>
                <button onClick={() => setIsContactModalOpen(false)} className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-[#27272A]/50 px-3 py-1.5 rounded-full">Close</button>
              </div>
              
              <div className="space-y-3">
                {/* Book Consultation Session Slot */}
                <a href="mailto:jimmykg.spacex@gmail.com?subject=Consultation%20Booking" className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272A] rounded-2xl active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400"><Calendar className="w-4 h-4" /></div>
                  <div><p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Consultation Session</p><p className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Book a Meeting Slot</p></div>
                </a>

                {/* Email */}
                <a href="mailto:cohortexplorers@gmail.com" className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272A] rounded-2xl active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400"><Mail className="w-4 h-4" /></div>
                  <div><p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Secure Email</p><p className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">cohortexplorers@gmail.com</p></div>
                </a>
                
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/kaung-htet-nyein-chan-oo-593952167/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272A] rounded-2xl active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-500"><LinkIcon className="w-4 h-4" /></div>
                  <div><p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">LinkedIn Profile</p><p className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Connect Network</p></div>
                </a>

                {/* Phone */}
                <a href="tel:+66620983201" className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272A] rounded-2xl active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500"><Phone className="w-4 h-4" /></div>
                  <div><p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Voice Terminal</p><p className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">+66 62 098 3201</p></div>
                </a>

                {/* Telegram & Facebook */}
                <div className="flex gap-3">
                  <a href="https://t.me/jimmyooig1" target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center gap-2 p-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272A] rounded-2xl active:scale-95 transition-transform">
                    <Send className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                    <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Telegram</span>
                  </a>
                  <a href="https://facebook.com/handsomekaunghtet" target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center gap-2 p-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272A] rounded-2xl active:scale-95 transition-transform">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APP MODAL: FULL BLOG READER (WITH PARSER ENGINE) */}
        {activeBlogDetail && (
          <div className="fixed inset-0 z-[110] bg-white dark:bg-[#09090b] flex flex-col font-sans animate-in slide-in-from-bottom duration-300">
            <header className="h-[calc(4.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b border-zinc-200 dark:border-[#27272A] bg-white/90 dark:bg-[#131315]/90 backdrop-blur-xl px-5 flex items-center justify-between shrink-0">
              <button onClick={() => setActiveBlogDetail(null)} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 active:opacity-70">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Article View</span>
            </header>
            
            <div className="flex-1 overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {activeBlogDetail.cover_image && (
                <div className="w-full h-56 relative border-b border-zinc-200 dark:border-[#27272A]">
                  <img src={activeBlogDetail.cover_image} className="w-full h-full object-cover" alt="Cover" />
                </div>
              )}
              
              <div className="px-6 py-8 space-y-6 text-left">
                <h1 className="text-2xl font-black text-zinc-900 dark:text-white leading-tight">{activeBlogDetail.title}</h1>
                <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 pb-4 border-b border-zinc-200 dark:border-[#27272A]">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(activeBlogDetail.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                
                {/* Markdown Parser Rendering Output - Renders full blog contents completely */}
                <div className="space-y-4 text-zinc-700 dark:text-zinc-300 text-[14px] leading-relaxed font-normal pb-20">
                  {activeBlogDetail.content ? (
                    (() => {
                      const lines = activeBlogDetail.content.split('\n');
                      const compiledElements: React.ReactNode[] = [];
                      
                      lines.forEach((line: string, index: number) => {
                        const tLine = line.trim();
                        if (tLine.startsWith('![') && tLine.includes('](')) {
                          const url = tLine.substring(tLine.indexOf('(') + 1, tLine.indexOf(')'));
                          compiledElements.push(
                            <div key={index} className="w-full my-6 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-[#27272A]">
                              <img src={url} className="w-full h-auto object-cover" alt="inline" />
                            </div>
                          );
                        } else if (tLine.startsWith('## ')) {
                          compiledElements.push(<h2 key={index} className="text-lg font-black text-zinc-900 dark:text-white mt-8 mb-2">{tLine.replace('## ', '')}</h2>);
                        } else if (tLine.startsWith('### ')) {
                          compiledElements.push(<h3 key={index} className="text-base font-bold text-zinc-900 dark:text-white mt-6 mb-2">{tLine.replace('### ', '')}</h3>);
                        } else if (tLine.startsWith('- ')) {
                          compiledElements.push(<li key={index} className="ml-5 mb-1 list-disc">{renderInlineStyles(tLine.replace('- ', ''))}</li>);
                        } else if (tLine.startsWith('> ')) {
                          compiledElements.push(<blockquote key={index} className="pl-4 border-l-2 border-blue-500 italic text-zinc-500 my-4 bg-zinc-50 dark:bg-zinc-900/40 py-2 pr-4 rounded-r-xl">{renderInlineStyles(tLine.replace('> ', ''))}</blockquote>);
                        } else if (tLine) {
                          compiledElements.push(<p key={index} className="mb-4">{renderInlineStyles(tLine)}</p>);
                        }
                      });
                      return compiledElements;
                    })()
                  ) : (
                    <p className="text-zinc-400 italic">{activeBlogDetail.summary || activeBlogDetail.desc}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APP MODAL: PLAYABLE GAME IFRAME RUNTIME WITHOUT DOUBLE HEADERS */}
        {activeGameDetail && (
          <div className="fixed inset-0 z-[110] bg-white dark:bg-black flex flex-col font-sans animate-in slide-in-from-bottom duration-300">
            <header className="h-[calc(4.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b border-zinc-200 dark:border-[#27272A] bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md px-5 flex items-center justify-between shrink-0">
              <button onClick={() => setActiveGameDetail(null)} className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 active:opacity-70">
                <ArrowLeft className="w-4 h-4" /> Exit Node
              </button>
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{activeGameDetail.title}</span>
            </header>
            
            {/* App URL query parameter strips duplicate layout objects via game layout file */}
            <div className="flex-1 w-full bg-zinc-50 dark:bg-[#09090b] overflow-hidden relative">
              <iframe 
                src={`/games/${activeGameDetail.slug}?app=true`} 
                className="absolute inset-0 w-full h-full border-0"
                title={activeGameDetail.title}
              />
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
              <button onClick={() => setIsWebContactOpen(false)} className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white cursor-pointer"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              <a href="mailto:cohortexplorers@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-[#4d8eff] dark:hover:border-[#adc6ff]/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <Mail className="w-6 h-6 text-[#002e6a] dark:text-[#adc6ff]" />
                <div className="text-left"><p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Secure Email Link</p><p className="text-sm font-medium group-hover:text-[#4d8eff] dark:group-hover:text-[#adc6ff]">cohortexplorers@gmail.com</p></div>
              </a>
              <a href="https://www.linkedin.com/in/kaung-htet-nyein-chan-oo-593952167/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-[#4d8eff] dark:hover:border-[#c0c1ff]/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <LinkIcon className="w-6 h-6 text-[#002e6a] dark:text-[#c0c1ff]" />
                <div className="text-left"><p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">LinkedIn Network</p><p className="text-sm font-medium group-hover:text-[#4d8eff] dark:group-hover:text-[#c0c1ff]">kaung-htet-nyein-chan-oo</p></div>
              </a>
              <a href="tel:+66620983201" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-emerald-500 dark:hover:border-emerald-400/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <Phone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <div className="text-left"><p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Voice Terminal</p><p className="text-sm font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400">+66 62 098 3201</p></div>
              </a>
              <a href="https://t.me/jimmyooig1" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-sky-500 dark:hover:border-sky-400/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <Send className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                <div className="text-left"><p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Telegram</p><p className="text-sm font-medium group-hover:text-sky-600 dark:group-hover:text-sky-400">@jimmyooig1</p></div>
              </a>
              <a href="https://facebook.com/handsomekaunghtet" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-blue-500 dark:hover:border-blue-400/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div className="text-left"><p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Facebook</p><p className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">Connect Network</p></div>
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
              <button onClick={() => setIsWebMapOpen(false)} className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white material-symbols-outlined p-1 cursor-pointer"><X className="w-6 h-6" /></button>
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
            <button onClick={() => setIsWebMapOpen(false)} className="w-full py-4 bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer">Close Blueprint View</button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}