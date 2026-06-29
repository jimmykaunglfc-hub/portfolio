"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, WalletCards, Cpu, Layers } from "lucide-react";

// Synthesized Phase Data based on your video!
const phasesData = [
  {
    id: "phase-01",
    tabLabel: "PHASE 01",
    leadCard: {
      title: "Discovery & Strategy",
      description: "Architecting the foundational blueprint before a single line of code is written.",
      tags: ["Market Analysis", "Roadmap Architecture"],
    },
    // The core matrix items attached to this phase
    matrix: [
      {
        title: "Digital Operations Management",
        description: "Directing end-to-end digital engineering and operational delivery frameworks across Product Management, QA, and Operations.",
        icon: Network,
      },
      {
        title: "FinTech Channel Ecosystems",
        description: "Overseeing massive digital consumer channels including flagship mobile banking layers, maximizing customer journeys.",
        icon: WalletCards,
      }
    ]
  },
  {
    id: "phase-02",
    tabLabel: "PHASE 02",
    leadCard: {
      title: "Operational Architecture",
      description: "Translating strategy into execution. Structuring agile delivery frameworks and cross-functional team alignment.",
      tags: ["Agile Delivery", "Process Optimization"],
    },
    matrix: [
      {
        title: "Strategic Product Engineering",
        description: "Spearheading multi-phased product roadmaps from deep initial market ideation up to high-frequency deployment execution.",
        icon: Cpu,
      },
      {
        title: "Digital Operations Management",
        description: "Directing end-to-end digital engineering and operational delivery frameworks across product divisions.",
        icon: Network,
      }
    ]
  },
  {
    id: "phase-03",
    tabLabel: "PHASE 03",
    leadCard: {
      title: "QA & Compliance",
      description: "Establishing non-negotiable quality and security standards to ensure enterprise-grade stability.",
      tags: ["Automated Testing", "Risk Mitigation"],
    },
    matrix: [
      {
        title: "FinTech Channel Ecosystems",
        description: "Overseeing massive digital consumer channels including flagship mobile banking layers, maximizing customer journeys.",
        icon: WalletCards,
      },
      {
        title: "Strategic Product Engineering",
        description: "Spearheading multi-phased product roadmaps from deep initial market ideation up to high-frequency deployment.",
        icon: Cpu,
      }
    ]
  },
  {
    id: "phase-04",
    tabLabel: "PHASE 04",
    leadCard: {
      title: "Ecosystem Scaling",
      description: "Maximizing market impact and driving continuous user acquisition loops through data-driven iterations.",
      tags: ["Growth Loops", "Data Analytics"],
    },
    matrix: [
      {
        title: "Digital Operations Management",
        description: "Directing end-to-end digital engineering and operational delivery frameworks across Product Management.",
        icon: Network,
      },
      {
        title: "FinTech Channel Ecosystems",
        description: "Overseeing massive digital consumer channels including flagship mobile banking layers, maximizing customer journeys.",
        icon: WalletCards,
      }
    ]
  }
];

export default function CapabilitiesMatrix() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = phasesData[activePhaseIndex];

  return (
    <section className="relative w-full py-20 bg-slate-50 dark:bg-[#050505] overflow-hidden transition-colors">
      
      {/* Sleek Dotted Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-2">
              Execution Frameworks
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Capabilities Matrix
            </h2>
          </div>
        </div>

        {/* 1. SCROLLABLE TAB BAR (Fixes Phase 04 Cutoff) */}
        {/* The 'pr-12' and negative margins ensure it scrolls perfectly past the screen edge on mobile */}
        <div className="relative mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 pr-12 snap-x snap-mandatory">
            {phasesData.map((phase, index) => {
              const isActive = activePhaseIndex === index;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIndex(index)}
                  className={`snap-start whitespace-nowrap shrink-0 px-6 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                      : "bg-transparent text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5"
                  }`}
                >
                  {phase.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SMOOTH ANIMATED CONTENT AREA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id} // Triggers animation when activePhase changes
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {/* The Highlight 'Lead' Card for the Phase */}
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {activePhase.leadCard.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                {activePhase.leadCard.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {activePhase.leadCard.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-slate-200 dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* The Nested Matrix Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activePhase.matrix.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-6 rounded-3xl bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row gap-5 transition-colors group"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}