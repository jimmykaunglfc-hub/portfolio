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
    <section className="relative w-full py-24 bg-[#f2f5ff]/60 dark:bg-[#070b16] overflow-hidden transition-colors border-y border-[#0d1020]/10 dark:border-white/5">
      
      {/* Sleek Dotted Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-mono font-medium tracking-[0.14em] text-[#719d12] dark:text-[#c2ff3a] uppercase mb-3">
              Execution Frameworks
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d1020] dark:text-[#dfe2ee] tracking-tight">
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
                      ? "bg-[#c2ff3a] text-[#10170a] shadow-[0_8px_24px_rgba(194,255,58,0.16)]"
                      : "bg-transparent text-zinc-500 dark:text-[#8891ae] border border-[#0d1020]/10 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/5"
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
            <div className="p-6 md:p-8 rounded-sm bg-white/70 dark:bg-[#0c1122] border border-[#0d1020]/10 dark:border-white/10 shadow-sm transition-colors">
                <h3 className="text-xl md:text-2xl font-bold text-[#0d1020] dark:text-[#dfe2ee] mb-3">
                {activePhase.leadCard.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                {activePhase.leadCard.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {activePhase.leadCard.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-mono font-medium rounded-sm bg-[#c2ff3a]/10 dark:bg-[#c2ff3a]/10 text-[#526327] dark:text-[#c2ff3a] border border-[#c2ff3a]/25"
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
                    className="p-6 rounded-sm bg-white/70 dark:bg-[#0c1122] border border-[#0d1020]/10 dark:border-white/10 shadow-sm flex flex-col sm:flex-row gap-5 transition-colors group hover:border-[#c2ff3a]/50"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-sm bg-[#c2ff3a]/10 flex items-center justify-center border border-[#c2ff3a]/25">
                      <Icon className="w-6 h-6 text-[#719d12] dark:text-[#c2ff3a] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#0d1020] dark:text-[#dfe2ee] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-[#8891ae] text-sm leading-relaxed">
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
