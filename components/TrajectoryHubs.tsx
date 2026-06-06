"use client";

import { motion } from "framer-motion";
import { GitCommit, Milestone, Rocket } from "lucide-react";

const trajectoryData = [
  {
    era: "Executive Command",
    period: "2025 — Present",
    company: "digit7s",
    role: "Head of Digital Operations",
    description: "Leading end-to-end digital operations, overseeing complex QA processes, automated testing strategies, and strategic product initiatives for corporate digital transformation.",
    icon: Rocket,
  },
  {
    era: "FinTech Ecosystems",
    period: "2018 — 2025",
    company: "KBZ Bank",
    role: "Manager - Digital Channels",
    description: "Drove massive user base scale across flagship mobile banking platforms, streamlining platform configurations to balance customer usability with strict banking regulations.",
    icon: Milestone,
  },
  {
    era: "Foundation & Synchronization",
    period: "2013 — 2022",
    company: "Institutional Frameworks",
    role: "Liaison Officer & Strategic Consultant",
    description: "Managed key international communication links, protocol workflows, and logistics management for cross-border events and executive strategic communications.",
    icon: GitCommit,
  },
];

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const nodeVariants: any = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function TrajectoryHubs() {
  return (
    <section className="relative w-full py-24 bg-white dark:bg-[#09090b] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Career Trajectory
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A systemic evolution from foundational communication frameworks to executive oversight of massive-scale digital ecosystems.
          </p>
        </div>

        {/* Pipeline Container */}
        <div className="relative">
          {/* The glowing vertical data stream line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-gray-300 dark:via-gray-700 to-transparent"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {trajectoryData.map((node, index) => {
              const Icon = node.icon;
              return (
                <motion.div key={index} variants={nodeVariants} className="relative pl-16 md:pl-20">
                  
                  {/* The Hub Icon on the timeline */}
                  <div className="absolute left-2 md:left-4 top-1 w-8 h-8 md:w-9 md:h-9 bg-blue-500 rounded-full border-4 border-white dark:border-[#09090b] flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Icon className="w-4 h-4 text-white" />
                  </div>

                  {/* The Content Card */}
                  <div className="group block p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-[#121214] border border-gray-100 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-colors duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <span className="text-sm font-bold tracking-widest text-blue-500 uppercase">
                        {node.era}
                      </span>
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-white/10 px-3 py-1 rounded-full w-fit">
                        {node.period}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {node.role}
                    </h3>
                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                      {node.company}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                      {node.description}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}