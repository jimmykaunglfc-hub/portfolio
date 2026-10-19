'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const steps = [
  ['Discover', 'Shape the opportunity, align stakeholders, and build a decision-ready roadmap.'],
  ['Design the system', 'Translate strategy into a practical operating model, delivery rhythm, and team cadence.'],
  ['Assure quality', 'Build in testing, compliance, and release confidence before the customer ever sees the product.'],
  ['Scale responsibly', 'Monitor performance, improve the ecosystem, and keep the platform ready for what comes next.'],
];

/** A pinned product blueprint assembles as the reader moves through the four real steps. */
export default function OperatingModel() {
  const journey = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: journey, offset: ['start center', 'end center'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: .001 });
  const rotation = useTransform(progress, [0, 1], [-32, -12]);
  const scale = useTransform(progress, [0, .5, 1], [.82, 1, .92]);
  const topLayer = useTransform(progress, [0, .4, 1], [-100, -55, -12]);
  const middleLayer = useTransform(progress, [0, .55, 1], [0, 12, 24]);
  const bottomLayer = useTransform(progress, [0, .6, 1], [100, 80, 60]);
  useMotionValueEvent(scrollYProgress, 'change', (value) => setActive(Math.min(3, Math.floor(value * 4))));

  return <section id="operating-model" className="exec-model">
    <span id="expertise" className="legacy-anchor" aria-hidden="true" />
    <div className="exec-shell">
      <div className="exec-model__header"><p className="exec-eyebrow"><span /> Operating model</p><h2>From ambiguity<br />to momentum.</h2></div>
      <div ref={journey} className="exec-model__journey">
        <div className="system-scene" aria-hidden="true">
          <div className="system-scene__caption"><span>Product architecture</span><span>0{active + 1} / 04</span></div>
          <div className="system-scene__viewport">
            <div className="system-scene__halo" />
            <motion.div className="system-scene__blueprint" style={{ rotate: reduced ? -22 : rotation, scale: reduced ? .9 : scale }}>
              {[bottomLayer, middleLayer, topLayer].map((y, index) => <motion.div key={index} className={`system-scene__layer system-scene__layer--${index}`} style={{ y: reduced ? (1 - index) * 45 : y }}>
                <svg viewBox="0 0 300 220" fill="none"><path d="M30 50H105L135 80H240M30 170H105L135 140H270M150 20V200M25 110H275" /><rect x="105" y="65" width="90" height="90" rx="16" /><rect x="122" y="82" width="56" height="56" rx="8" />{[[30,50],[240,80],[30,170],[270,140],[150,20],[150,200]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />)}</svg>
                <span>{['Delivery foundation', 'Quality & systems', 'Product vision'][index]}</span>
              </motion.div>)}
            </motion.div>
          </div>
          <div className="system-scene__status"><span className="status-pulse" /><span>{steps[active][0]}</span><ArrowDown size={15} /></div>
          <div className="system-scene__track"><motion.div style={{ scaleX: reduced ? 1 : progress }} /></div>
          <p className="system-scene__hint">Scroll to build the system</p>
        </div>
        <ol className="exec-model__steps">
          {steps.map(([title, description], index) => <li key={title} data-active={active === index}>
            <div className="exec-model__step-head"><span className="exec-model__number">0{index + 1}</span><span className="exec-model__step-label">Step 0{index + 1}</span>{index < steps.length - 1 && <ChevronRight className="exec-model__arrow" size={18} aria-hidden="true" />}</div>
            <div className="exec-model__step-body"><h3>{title}</h3><p>{description}</p></div>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
