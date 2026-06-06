"use client";

import { motion } from "framer-motion";
import { Network, WalletCards, Cpu, Layers } from "lucide-react";

const matrixData = [
  {
    title: "Digital Operations Management",
    description: "Directing end-to-end digital engineering and operational delivery frameworks across Product Management, Quality Assurance (QA), and Product Operations divisions to guarantee continuous platform optimization.",
    tags: ["Agile Delivery", "Operational KPIs", "Cross-Functional Sync"],
    icon: Network,
    highlightTitle: false,
  },
  {
    title: "FinTech Channel Ecosystems",
    description: "Overseeing massive digital consumer channels including flagship mobile banking layers (KBZPay & KBZ Mobile Banking), maximizing customer journeys, core usability metrics, and regulatory alignment.",
    tags: ["Ecosystem Scale", "UX Testing", "Compliance Governance"],
    icon: WalletCards,
    highlightTitle: false,
  },
  {
    title: "Strategic Product Engineering",
    description: "Spearheading multi-phased product roadmaps from deep initial market ideation up to high-frequency deployment execution, ensuring absolute harmonization with corporate vision.",
    tags: ["Roadmap Architecture", "UX/UI Focus", "Market Analysis"],
    icon: Cpu,
    highlightTitle: true, // This matches the blue text in your screenshot
  },
];

// Animation Variants
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CapabilitiesMatrix() {
  return (
    <section className="relative w-full py-20 bg-gray-50 dark:bg-[#09090b] overflow-hidden">
      {/* Dotted Background Grid (Adapts to Light/Dark) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-200 dark:border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold tracking-widest text-blue-500 uppercase">
                Capabilities
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Core Operational Matrix
            </h2>
          </div>
          
          {/* Decorative Progress Indicators */}
          <div className="flex items-center gap-2 pb-2">
            <div className="h-1 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-1 w-16 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Matrix Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {matrixData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                className="group p-8 rounded-2xl bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-xl dark:shadow-none transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Card Icon */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Card Title */}
                <h3
                  className={`text-xl font-bold mb-4 ${
                    item.highlightTitle
                      ? "text-blue-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}