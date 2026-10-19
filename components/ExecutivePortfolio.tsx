'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowDownRight, ArrowUpRight, ChevronRight, Cpu, Download, ExternalLink,
  Layers3, Mail, Sparkles, Target,
} from 'lucide-react';
import SignalField from './SignalField';

const caseStudies = [
  {
    number: '01',
    label: 'Digital channels',
    title: 'Making flagship banking journeys easier to use.',
    organization: 'KBZ Bank · Transaction Banking',
    summary: 'Led digital-channel work across KBZPay and m/i Banking, including the UI/UX relaunch and mobile and internet banking platform migrations.',
    tags: ['Product delivery', 'UX/UI', 'Platform migration'],
  },
  {
    number: '02',
    label: 'Operational transformation',
    title: 'Turning branch operations into scalable systems.',
    organization: 'KBZ Bank · CEO Project Office',
    summary: 'Delivered transformation initiatives including queue management, banking-process automation, and the Hub & Spoke Cash Management Model.',
    tags: ['Operating model', 'Automation', 'Change delivery'],
  },
  {
    number: '03',
    label: 'Digital operations',
    title: 'Creating the conditions for reliable product delivery.',
    organization: 'digit7s · Head of Digital Operations',
    summary: 'Leading product management, QA, and product operations across planning, testing strategy, release execution, and cross-functional collaboration.',
    tags: ['QA strategy', 'Product operations', 'Leadership'],
  },
];

const operatingModel = [
  ['01', 'Discover', 'Shape the opportunity, align stakeholders, and build a decision-ready roadmap.'],
  ['02', 'Design the system', 'Translate strategy into a practical operating model, delivery rhythm, and team cadence.'],
  ['03', 'Assure quality', 'Build in testing, compliance, and release confidence before the customer ever sees the product.'],
  ['04', 'Scale responsibly', 'Monitor performance, improve the ecosystem, and keep the platform ready for what comes next.'],
];

const career = [
  ['2026—now', 'digit7s', 'Head of Digital Operations'],
  ['2025—now', 'digit7s', 'Product Development Manager'],
  ['2018—2025', 'KBZ Bank', 'Digital Channel Management & Transformation'],
  ['2013—2018', 'Early career', 'Liaison, communications & education'],
];

export default function ExecutivePortfolio() {
  return (
    <main className="executive-portfolio">
      <section className="exec-hero" aria-labelledby="portfolio-title">
        <SignalField />
        <div className="exec-shell exec-hero__content">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="exec-eyebrow">
            <span /> Kaung Htet Nyein Chan Oo · Digital operations & product
          </motion.p>
          <motion.h1 id="portfolio-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .08 }}>
            I turn complex digital<br />systems into <em>clear momentum.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .18 }} className="exec-hero__lede">
            Head of Digital Operations working across product strategy, enterprise delivery, quality assurance, and fintech channels.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .28 }} className="exec-actions">
            <a href="#selected-work" className="exec-button exec-button--primary">View selected work <ArrowDownRight size={18} /></a>
            <a href="mailto:jimmykg.spacex@gmail.com?subject=Portfolio%20enquiry" className="exec-button exec-button--quiet">Start a conversation <ArrowUpRight size={18} /></a>
          </motion.div>
        </div>
        <div className="exec-hero__footer exec-shell" aria-label="Core practice areas">
          {['Product strategy', 'Digital operations', 'Fintech channels', 'QA & compliance'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="exec-proof exec-shell" aria-label="Professional profile">
        <div><strong>13+</strong><span>years across product, operations, and transformation</span></div>
        <div><strong>3</strong><span>connected disciplines: product, quality, operations</span></div>
        <div><strong>2</strong><span>platform domains: digital banking and enterprise systems</span></div>
      </section>

      <section id="selected-work" className="exec-section exec-shell">
        <div className="exec-section__heading">
          <p className="exec-eyebrow"><span /> Selected impact</p>
          <h2>Work that makes<br />the system move.</h2>
          <p>I work where strategy must survive real constraints: teams, risk, regulations, time, and the customer experience.</p>
        </div>
        <div className="exec-case-grid">
          {caseStudies.map((study, index) => (
            <motion.article key={study.number} className="exec-case" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .45, delay: index * .07 }}>
              <div className="exec-case__top"><span>{study.number}</span><Target size={19} /></div>
              <p className="exec-case__label">{study.label}</p>
              <h3>{study.title}</h3>
              <p className="exec-case__org">{study.organization}</p>
              <p className="exec-case__summary">{study.summary}</p>
              <div className="exec-tags">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="operating-model" className="exec-model">
        <div className="exec-shell">
          <div className="exec-model__header"><p className="exec-eyebrow"><span /> Operating model</p><h2>From ambiguity<br />to momentum.</h2></div>
          <ol className="exec-model__steps">
            {operatingModel.map(([number, title, description], index) => <li key={number}>
              <div className="exec-model__number">{number}</div>
              <div><h3>{title}</h3><p>{description}</p></div>
              {index < operatingModel.length - 1 && <ChevronRight className="exec-model__arrow" size={18} />}
            </li>)}
          </ol>
        </div>
      </section>

      <section id="trajectory" className="exec-section exec-shell exec-trajectory">
        <div className="exec-section__heading"><p className="exec-eyebrow"><span /> Career trajectory</p><h2>Built through<br />real delivery.</h2></div>
        <div className="exec-timeline">
          {career.map(([period, company, role]) => <article key={period + company}>
            <p>{period}</p><div className="exec-timeline__marker" /><div><h3>{company}</h3><span>{role}</span></div>
          </article>)}
        </div>
        <a className="exec-text-link" href="/about">Explore the full career record <ArrowUpRight size={16} /></a>
      </section>

      <section className="exec-lab exec-shell">
        <div><p className="exec-eyebrow"><span /> Thinking in public</p><h2>Ideas, experiments,<br />and usable play.</h2></div>
        <div className="exec-lab__links">
          <Link href="/blog"><BookIcon /><span><small>Journal</small><strong>Insights & articles</strong></span><ArrowUpRight size={18} /></Link>
          <Link href="/games"><GameIcon /><span><small>Product lab</small><strong>Interactive experiments</strong></span><ArrowUpRight size={18} /></Link>
        </div>
      </section>

      <section id="contact" className="exec-contact">
        <div className="exec-shell">
          <p className="exec-eyebrow"><span /> Let’s work together</p>
          <h2>Have a complex system<br />that needs momentum?</h2>
          <p>Open to strategic technology partnerships, digital-banking ecosystem consulting, and senior operations leadership roles.</p>
          <div className="exec-actions"><a href="mailto:jimmykg.spacex@gmail.com" className="exec-button exec-button--primary"><Mail size={17} /> Email Jimmy</a><a href="https://www.linkedin.com/in/kaung-htet-nyein-chan-oo-593952167/" target="_blank" rel="noreferrer" className="exec-button exec-button--quiet">LinkedIn <ExternalLink size={16} /></a></div>
          <div className="exec-download"><Download size={16} /><span>The portfolio app is also available for</span><a href="/khnco.apk" download="KHNCO_App.apk">Android</a><span>and</span><a href="https://testflight.apple.com/join/BzAg9XQ2" target="_blank" rel="noreferrer">iOS TestFlight</a></div>
        </div>
      </section>
    </main>
  );
}

function BookIcon() { return <Layers3 size={21} />; }
function GameIcon() { return <><Cpu size={21} /><Sparkles className="exec-lab__sparkle" size={12} /></>; }
