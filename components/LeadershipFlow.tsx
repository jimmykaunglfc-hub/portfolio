'use client';

import { useId } from 'react';

/** Connected worlds: strategy, product and operations converge on impact. */
export default function LeadershipFlow() {
  const id = useId().replace(/:/g, '');
  const fill = (name: string) => `url(#${id}-${name})`;
  return <figure className="leadership-flow">
    <div className="leadership-flow__heading"><span /> CONNECTED BY DESIGN</div>
    <svg className="leadership-universe" viewBox="0 0 440 440" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>One connected universe of leadership</title>
      <desc id={`${id}-desc`}>Three illuminated worlds represent strategy, product, and operations. Flowing connections bring them together around a central world of impact.</desc>
      <defs>
        <radialGradient id={`${id}-core`} cx="30%" cy="22%" r="85%"><stop stopColor="#e0f5ff" /><stop offset=".23" stopColor="#92c5ff" /><stop offset=".58" stopColor="#3d75c8" /><stop offset="1" stopColor="#0c1b40" /></radialGradient>
        <radialGradient id={`${id}-blue`} cx="28%" cy="22%" r="80%"><stop stopColor="#d4fff7" /><stop offset=".3" stopColor="#7bd7da" /><stop offset="1" stopColor="#15304f" /></radialGradient>
        <radialGradient id={`${id}-violet`} cx="25%" cy="22%" r="85%"><stop stopColor="#eee8ff" /><stop offset=".32" stopColor="#b6acf5" /><stop offset="1" stopColor="#28234d" /></radialGradient>
        <radialGradient id={`${id}-silver`} cx="28%" cy="18%" r="85%"><stop stopColor="#f5f6ff" /><stop offset=".38" stopColor="#a7c8ef" /><stop offset="1" stopColor="#203557" /></radialGradient>
        <radialGradient id={`${id}-halo`}><stop stopColor="#6baaff" stopOpacity=".22" /><stop offset="1" stopColor="#6baaff" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}-link`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7fd8dc" /><stop offset=".5" stopColor="#91baff" /><stop offset="1" stopColor="#c1b5ff" /></linearGradient>
        <clipPath id={`${id}-sphere`}><circle cx="220" cy="222" r="66" /></clipPath>
      </defs>
      <circle className="universe-halo" cx="220" cy="222" r="190" fill={fill('halo')} />
      <g className="universe-stars" fill="currentColor">
        {[[38,197],[165,38],[392,99],[393,294],[61,329],[156,379],[350,50],[33,69],[406,370],[268,31],[91,253],[362,232]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.8 : 1} style={{ animationDelay: `${i * .37}s` }} />)}
      </g>
      <g className="universe-orbits" fill="none" stroke="currentColor">
        <ellipse cx="220" cy="222" rx="188" ry="117" transform="rotate(-35 220 222)" />
        <ellipse cx="220" cy="222" rx="145" ry="193" transform="rotate(34 220 222)" strokeDasharray="2 9" />
      </g>
      <g fill="none" stroke={fill('link')} strokeWidth="1.5">
        <path className="universe-connection" d="M95 110Q180 100 220 222Q290 250 326 130M220 222Q194 328 300 346" />
        <path className="universe-signal" pathLength="100" d="M95 110Q180 100 220 222" />
        <path className="universe-signal universe-signal--second" pathLength="100" d="M326 130Q290 250 220 222" />
        <path className="universe-signal universe-signal--third" pathLength="100" d="M220 222Q194 328 300 346" />
      </g>
      <g className="universe-world universe-world--strategy">
        <circle cx="95" cy="110" r="43" fill={fill('blue')} />
        <ellipse cx="95" cy="110" rx="56" ry="13" transform="rotate(-28 95 110)" fill="none" stroke="#93dcdf" strokeOpacity=".55" />
        <circle cx="82" cy="94" r="12" fill="#e2ffff" opacity=".13" />
        <text x="95" y="177" textAnchor="middle">STRATEGY</text>
        <text className="universe-subtitle" x="95" y="193" textAnchor="middle">Set the direction</text>
      </g>
      <g className="universe-world universe-world--product">
        <circle cx="326" cy="130" r="31" fill={fill('violet')} />
        <path d="M303 118Q326 143 351 127M303 131Q321 150 344 145" stroke="#f1e6ff" strokeOpacity=".22" fill="none" />
        <circle cx="367" cy="100" r="5" fill={fill('silver')} />
        <text x="326" y="184" textAnchor="middle">PRODUCT</text>
        <text className="universe-subtitle" x="326" y="200" textAnchor="middle">Create the value</text>
      </g>
      <g className="universe-core">
        <circle cx="220" cy="222" r="74" fill="none" stroke="#94bfff" strokeOpacity=".15" />
        <circle cx="220" cy="222" r="66" fill={fill('core')} />
        <g clipPath={fill('sphere')} fill="none" stroke="#d9edff" strokeOpacity=".17">
          <ellipse cx="220" cy="222" rx="30" ry="66" transform="rotate(-25 220 222)" />
          <ellipse cx="220" cy="222" rx="53" ry="66" transform="rotate(-25 220 222)" />
          <path d="M145 200Q215 240 285 185M145 230Q225 270 291 211M162 258Q220 285 283 241" />
        </g>
        <ellipse cx="220" cy="222" rx="91" ry="23" transform="rotate(-25 220 222)" fill="none" stroke="#b5dbff" strokeOpacity=".65" />
        <text className="universe-core__label" x="220" y="226" textAnchor="middle">IMPACT</text>
      </g>
      <g className="universe-world universe-world--operations">
        <circle cx="300" cy="346" r="40" fill={fill('silver')} />
        <path d="M266 334Q296 351 334 327M264 346Q303 368 339 341" fill="none" stroke="#d9efff" strokeOpacity=".22" />
        <text x="180" y="346" textAnchor="middle">OPERATIONS</text>
        <text className="universe-subtitle" x="180" y="363" textAnchor="middle">Sustain the momentum</text>
      </g>
    </svg>
    <figcaption className="leadership-flow__footer"><span /> Different worlds. One shared direction.</figcaption>
  </figure>;
}
