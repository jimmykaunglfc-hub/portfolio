'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpLeft, ArrowUpRight, Landmark, Layers3, Mail, MapPin, Workflow } from 'lucide-react';
import SignalField from '../../components/SignalField';
import Footer from '../../components/Footer';

export default function Home() {
  // Pagination State for Experience Track
  const [activePage, setActivePage] = useState(1);

  const coreCompetencies = [
    {
      title: "Digital Operations Management",
      desc: "Directing end-to-end digital engineering and operational delivery frameworks across Product Management, Quality Assurance (QA), and Product Operations divisions to guarantee continuous platform optimization.",
      icon: "hub",
      badges: ["Agile Delivery", "Operational KPIs", "Cross-Functional Sync"],
      color: "text-[#adc6ff]"
    },
    {
      title: "FinTech Channel Ecosystems",
      desc: "Overseeing massive digital consumer channels including flagship mobile banking layers (KBZPay & KBZ Mobile Banking), maximizing customer journeys, core usability metrics, and regulatory alignment.",
      icon: "payments",
      badges: ["Ecosystem Scale", "UX Testing", "Compliance Governance"],
      color: "text-[#ddb7ff]"
    },
    {
      title: "Strategic Product Engineering",
      desc: "Spearheading multi-phased product roadmaps from deep initial market ideation up to high-frequency deployment execution, ensuring absolute harmonization with corporate vision.",
      icon: "precision_manufacturing",
      badges: ["Roadmap Architecture", "UX/UI Focus", "Market Analysis"],
      color: "text-[#c0c1ff]"
    }
  ];

  // Full high-density profile ledger data structured across two clean pages
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
    <MotionConfig reducedMotion="user">
    <main id="main-content" tabIndex={-1} className="executive-portfolio career-profile">
      <section className="exec-hero career-hero" aria-labelledby="career-title">
        <SignalField />
        <div className="exec-shell exec-hero__content">
          <Link href="/" className="career-back"><ArrowUpLeft size={15} /> Back to the overview</Link>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="exec-eyebrow"><span /> Head of Digital Operations</motion.p>
          <motion.h1 id="career-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .08 }}>
            Orchestrating high-impact<br /><em>digital platforms</em><br />&amp; FinTech channels.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .16 }} className="exec-hero__lede">
            Driving end-to-end product lifecycles, optimizing operational infrastructure, and leading cross-functional teams to deliver secure, market-leading enterprise systems.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .24 }} className="exec-actions career-actions">
            <a href="#expertise" className="exec-button exec-button--primary">Explore capabilities <ArrowDownRight size={18} /></a>
            <a href="#experience" className="exec-button exec-button--quiet">View career record <ArrowDownRight size={18} /></a>
          </motion.div>
        </div>
        <div className="exec-hero__footer exec-shell"><span>Digital operations</span><span>Product leadership</span><span>FinTech ecosystems</span></div>
      </section>

      <section id="expertise" className="exec-section exec-shell" aria-labelledby="capabilities-title">
        <div className="exec-section__heading">
          <p className="exec-eyebrow"><span /> Capabilities</p>
          <h2 id="capabilities-title">One perspective.<br />Connected disciplines.</h2>
          <p>Product direction, operational delivery, and financial-channel experience, working as one.</p>
        </div>
        <div className="career-capabilities">
          {coreCompetencies.map((item, index) => {
            const Icon = [Workflow, Landmark, Layers3][index];
            return <article key={item.title} className="career-capability">
              <div className="career-capability__top"><span>0{index + 1}</span><Icon size={23} strokeWidth={1.4} /></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="exec-tags">{item.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
            </article>;
          })}
        </div>
      </section>

      <section id="experience" className="exec-section exec-shell career-experience" aria-labelledby="experience-title">
        <div className="exec-section__heading">
          <p className="exec-eyebrow"><span /> Full career record</p>
          <h2 id="experience-title">Built through<br />real delivery.</h2>
          <p>Explore the leadership roles and earlier work behind the approach.</p>
        </div>
        <div className="career-filters" role="group" aria-label="Career chapters">
          <button type="button" aria-pressed={activePage === 1} aria-controls="career-records" onClick={() => setActivePage(1)}><span>01</span> Executive operations</button>
          <button type="button" aria-pressed={activePage === 2} aria-controls="career-records" onClick={() => setActivePage(2)}><span>02</span> Advisory &amp; early career</button>
        </div>
        <div id="career-records" key={activePage} className="career-records">
          {paginatedExperience[activePage as 1 | 2].map((block) => (
            <section key={block.company} className="career-company" aria-label={block.company}>
              <header className="career-company__summary">
                <p className="exec-eyebrow"><span /> Organization</p>
                <h3>{block.company}</h3>
                <p>{block.timeline}</p>
                <span className="career-company__type">{block.type}</span>
              </header>
              <div className="career-roles">
                {block.roles.map((role) => (
                  <article key={role.title + role.period} className="career-role">
                    <span className="career-role__marker" aria-hidden="true" />
                    <div className="career-role__heading"><h4>{role.title}</h4><span><MapPin size={13} aria-hidden="true" />{role.location}</span></div>
                    <p className="career-role__period">{role.period}</p>
                    <p className="career-role__description">{role.desc}</p>
                    <ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                    {'skills' in role && <div className="exec-tags">{role.skills?.map((skill) => <span key={skill}>{skill}</span>)}</div>}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section id="contact" className="exec-contact">
        <div className="exec-shell">
          <p className="exec-eyebrow"><span /> Let’s work together</p>
          <h2>Let’s orchestrate<br />what’s next.</h2>
          <p>I am open to strategic technology partnerships, digital banking ecosystem consulting, and senior enterprise operations leadership roles.</p>
          <div className="exec-actions career-actions">
            <a href="mailto:jimmykg.spacex@gmail.com" className="exec-button exec-button--primary"><Mail size={17} /> Email Jimmy</a>
            <a href="#experience" className="exec-button exec-button--quiet">Review career record <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
    </MotionConfig>
  );
}
