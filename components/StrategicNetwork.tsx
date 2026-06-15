"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Cpu, ShieldCheck, Rocket, ArrowRight } from "lucide-react";

const networkData = [
  {
    id: "strategy",
    title: "Discovery & Strategy",
    icon: Network,
    description: "Architecting the foundational blueprint. I bridge the gap between initial market ideation and corporate vision, mapping out comprehensive product roadmaps before a single line of code is written.",
    metrics: ["Market Analysis", "Roadmap Architecture", "Stakeholder Alignment", "UX/UI Focus"],
  },
  {
    id: "operations",
    title: "Operational Architecture",
    icon: Cpu,
    description: "Translating strategy into execution. I structure agile delivery frameworks, optimize internal cross-functional synchronization, and ensure engineering teams have clear, unblocked pathways.",
    metrics: ["Agile Delivery", "Process Optimization", "Cross-Functional Sync", "Resource Allocation"],
  },
  {
    id: "quality",
    title: "QA & Compliance",
    icon: ShieldCheck,
    description: "Establishing non-negotiable quality gates. I oversee complex automated testing strategies and ensure absolute alignment with strict regulatory and banking compliance standards.",
    metrics: ["Automated Testing", "Release Quality", "Compliance Governance", "Security Protocols"],
  },
  {
    id: "scaling",
    title: "Ecosystem Scaling",
    icon: Rocket,
    description: "Driving massive user base scale. From high-frequency deployment execution to monitoring live operational KPIs, I ensure digital platforms handle enterprise-level traffic flawlessly.",
    metrics: ["High-Frequency Deployment", "Ecosystem Scale", "Operational KPIs", "Performance Monitoring"],
  },
];

export default function StrategicNetwork() {
  const [activeNode, setActiveNode] = useState(0);

  return (
    <section className="w-full py-24 bg-gray-50 dark:bg-[#09090b] relative overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Operational Architecture
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Click through the network nodes below to explore how I architect and scale high-impact digital platforms from ideation to enterprise deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* LEFT SIDE: The Interactive Nodes */}
          <div className="lg:col-span-5 relative">
            {/* Connecting Line behind nodes */}
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gray-200 dark:bg-white/10 hidden md:block"></div>

            <div className="space-y-4 relative">
              {networkData.map((node, index) => {
                const isActive = activeNode === index;
                const Icon = node.icon;
                
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(index)}
                    className={`w-full text-left relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                      isActive 
                        ? "bg-white dark:bg-[#121214] shadow-lg border border-blue-500/30" 
                        : "hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {/* THE LIGHT WAVE SHIMMER EFFECT */}
                    {isActive && (
                      <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "200%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-blue-400/20 dark:via-blue-400/10 to-transparent -skew-x-12 pointer-events-none"
                      />
                    )}

                    {/* Node Icon */}
                    <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isActive ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <span className={`relative z-10 font-bold text-lg md:text-xl transition-colors duration-300 ${
                      isActive ? "text-blue-500" : "text-gray-700 dark:text-gray-300"
                    }`}>
                      {node.title}
                    </span>

                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative z-10 ml-auto"
                      >
                        <ArrowRight className="w-5 h-5 text-blue-500" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: The Dynamic Glassmorphism Panel */}
          <div className="lg:col-span-7 flex items-center">
            <div className="w-full bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl min-h-[400px] flex flex-col justify-center relative overflow-hidden">
              
              {/* Decorative Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-bold tracking-widest text-blue-500 uppercase">
                      Phase 0{activeNode + 1}
                    </span>
                  </div>

                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                    {networkData[activeNode].title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                    {networkData[activeNode].description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      Core Metrics & Processes
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {networkData[activeNode].metrics.map((metric, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-white/5"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}