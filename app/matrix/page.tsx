'use client';

import { useState } from 'react';
import CapabilitiesMatrix from '../../components/Capabilities';
import TrajectoryHubs from '../../components/TrajectoryHubs';
import StrategicNetwork from '../../components/StrategicNetwork';
import Footer from '../../components/Footer';

export default function MatrixPage() {
  const [activePage, setActivePage] = useState(1);

  const coreCompetencies = [
    {
      title: "Digital Operations Management",
      desc: "Directing end-to-end digital engineering and operational delivery frameworks across Product Management, Quality Assurance (QA), and Product Operations divisions to guarantee continuous platform optimization.",
      icon: "hub",
      badges: ["Agile Delivery", "Operational KPIs", "Cross-Functional Sync"],
      color: "text-[#4d8eff] dark:text-[#adc6ff]"
    },
    {
      title: "FinTech Channel Ecosystems",
      desc: "Overseeing massive digital consumer channels including flagship mobile banking layers (KBZPay & KBZ Mobile Banking), maximizing customer journeys, core usability metrics, and regulatory alignment.",
      icon: "payments",
      badges: ["Ecosystem Scale", "UX Testing", "Compliance Governance"],
      color: "text-[#4d8eff] dark:text-[#ddb7ff]"
    },
    {
      title: "Strategic Product Engineering",
      desc: "Spearheading multi-phased product roadmaps from deep initial market ideation up to high-frequency deployment execution, ensuring absolute harmonization with corporate vision.",
      icon: "precision_manufacturing",
      badges: ["Roadmap Architecture", "UX/UI Focus", "Market Analysis"],
      color: "text-[#002e6a] dark:text-[#c0c1ff]"
    }
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
              "Driving operational workflows, process optimization, and close cross-functional collaboration loops.",
              "Aligning strategic product initiatives with overarching business objectives and modern user experience goals.",
              "Coordinating directly with Engineering, Design, Customer Support, and Business stakeholders.",
              "Monitoring product performance, key operational KPIs, and end-to-end delivery efficiency timelines.",
              "Implementing agile methodologies and improving internal team productivity bars.",
              "Leading strategic initiatives for corporate digital transformation and scalable product operations."
            ]
          },
          {
            title: "Product Development Manager",
            period: "Apr 2025 - Present • 1 yr 3 mos",
            location: "Chiang Mai, Thailand",
            desc: "Directed the strategic development and execution of comprehensive product roadmaps, ensuring alignment with company vision and real-world market demands.",
            bullets: [
              "Supervised the full product lifecycle, from deep ideation and requirements definition to launch, iteration, and optimization.",
              "Championed user experience (UX) and design initiatives, resulting in intuitive and engaging product interfaces.",
              "Managed, mentored, and empowered a high-performing team of product managers and specialists, fostering professional growth and product innovation.",
              "Fostered seamless cross-functional collaboration with Engineering, Design, Marketing, and Sales to ensure cohesive product delivery structures.",
              "Analyzed market trends, competitive landscapes, and customer insights to identify new opportunities and inform long-term strategy.",
              "Ensured product quality, data security, and strict adherence to modern regulatory compliance standards.",
              "Communicated product vision, progress metrics, and live performance indicators directly to senior leadership and key global stakeholders."
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
              "Built and structured manual operational procedures for handling customer experiences across KBZ Digital Platforms.",
              "Managed all related internal and external stakeholders to successfully reach complex organizational milestones.",
              "Streamlined platform configurations to find a perfect balance between customer comfortability and strict banking regulations."
            ],
            skills: ["User Experience Testing", "Digital Channel Optimization", "Stakeholder Management"]
          },
          {
            title: "Deputy Manager & Assistant Manager",
            period: "Apr 2019 - May 2024 • 5 yrs 1 mo",
            location: "Yangon, Myanmar",
            desc: "Pivotal operational track record optimizing corporate execution workflows, expanding regional ecosystem footprints, and anchoring cross-functional team synchronization.",
            bullets: [
              "Formulated foundational channel operating procedures adopted bank-wide.",
              "Managed tactical sprint tracking and cross-departmental delivery governance."
            ],
            skills: ["Organizational Architecture", "Process Optimization", "Team Leadership"]
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
          },
          {
            title: "Freelance Translator (Channel Myanmar & MRTV-4)",
            period: "Dec 2014 - Oct 2017 • 2 yrs 11 mos",
            location: "Yangon, Myanmar",
            desc: "Orchestrated large-scale localization and fast-turnaround media subtitle translations for premier regional broadcast networks.",
            bullets: ["Maintained high accuracy under strict broadcast timeline windows.", "Managed contextual localization parameters for diverse content libraries."]
          },
          {
            title: "English Teacher & Tour Guide",
            period: "Freelance Track • Dec 2014 - Nov 2017",
            location: "Myanmar",
            desc: "Simultaneously balanced operational logic across localized educational programs and managed international stakeholder client logistics.",
            bullets: ["Cultivated dynamic scheduling frameworks across fast-paced environments.", "Optimized client relations and cross-functional interpersonal communications."]
          }
        ]
      },
      {
        company: "Institutional Liaison Frameworks",
        timeline: "Institutional Tracks",
        type: "Liaison / Advisory",
        roles: [
          {
            title: "Liaison Officer",
            period: "Myanmar Football Federation • Feb 2014 - Sep 2016",
            location: "Myanmar",
            desc: "Managed key international communication links, protocol workflows, and logistics management for cross-border athletic events and administrative delegates.",
            bullets: ["Supervised high-profile logistics and international communication parameters."]
          },
          {
            title: "Translator Cum Personal Assistant",
            period: "Myanma Awba Group • Feb 2015 - Mar 2016",
            location: "Myanmar",
            desc: "Anchored executive operational schedules, critical strategic communications, and document localization pipelines for senior leadership panels.",
            bullets: ["Synchronized high-priority scheduling and localization flows."]
          },
          {
            title: "Liaison Officer",
            period: "Ministry of Sports, Myanmar • Jun 2013 - Feb 2014",
            location: "Myanmar",
            desc: "Facilitated state-level athletic delegation schedules, inter-departmental operations, and localized logistics support structures.",
            bullets: ["Ensured fluid execution of governmental operational workflows."]
          }
        ]
      }
    ]
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-4 relative z-20 animate-in fade-in duration-500 ease-in-out pt-[2rem]">
      
      <CapabilitiesMatrix />
      <TrajectoryHubs />
      <StrategicNetwork />

      <section id="expertise" className="py-24 max-w-7xl mx-auto relative z-20 pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-zinc-300/80 dark:border-zinc-800 pb-8">
          <div className="max-w-xl">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#4d8eff] dark:text-[#adc6ff] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">layers</span> Capabilities
            </h2>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Core Operational Matrix</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 bg-zinc-300 dark:bg-white/10 rounded-full" />
            <div className="w-24 h-1 bg-[#4d8eff] dark:bg-[#adc6ff] rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreCompetencies.map((item, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl flex flex-col justify-between gap-8 group">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-zinc-200/50 dark:bg-white/5 rounded-xl flex items-center justify-center border border-zinc-300/40 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <span className={`material-symbols-outlined text-2xl ${item.color}`}>{item.icon}</span>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight group-hover:text-[#4d8eff] dark:group-hover:text-[#adc6ff] transition-colors duration-300">{item.title}</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {item.badges.map((badge, bIdx) => (
                  <span key={bIdx} className="bg-zinc-200/40 dark:bg-white/[0.03] px-3 py-1 rounded-full text-xs text-zinc-600 dark:text-zinc-300 border border-zinc-300/40 dark:border-white/5 group-hover:border-[#adc6ff]/20 transition-colors duration-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="py-16 max-w-7xl mx-auto relative z-20 pointer-events-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 border-b border-zinc-300/80 dark:border-zinc-800 pb-8">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#4d8eff] dark:text-[#adc6ff] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">timeline</span> Track Record
            </h2>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Professional Trajectory</h3>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <button 
              onClick={() => setActivePage(1)} 
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activePage === 1 ? 'bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] shadow-lg' : 'bg-zinc-200/60 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-300/40 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10'}`}
            >
              Page 1: Executive Operations
            </button>
            <button 
              onClick={() => setActivePage(2)} 
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activePage === 2 ? 'bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] shadow-lg' : 'bg-zinc-200/60 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-300/40 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10'}`}
            >
              Page 2: Strategic Advisory
            </button>
          </div>
        </div>

        <div className="space-y-12 transition-all duration-500">
          {paginatedExperience[activePage as 1 | 2].map((block, idx) => (
            <div key={idx} className="glass-card p-6 md:p-10 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-8">
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

      <Footer />
    </main>
  );
}