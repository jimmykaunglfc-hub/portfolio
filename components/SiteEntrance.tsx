'use client';

/** Decorative entrance progress, independent of network-loading status. */
export default function SiteEntrance({ ready, onComplete }: { ready: boolean; onComplete: () => void }) {
  return <div
    className={`site-entrance ${ready ? 'site-entrance--ready' : ''}`}
    aria-hidden="true"
    onAnimationEnd={(event) => {
      if (event.target === event.currentTarget && event.animationName === 'site-unveil') onComplete();
    }}
  >
    <div className="site-entrance__signature">
      <svg viewBox="0 0 280 160" fill="none" className="site-entrance__machine">
        <path d="M15 80h45m160 0h45M140 15v20m0 95v20" stroke="currentColor" opacity=".25" strokeDasharray="3 5" />
        {[{ x: 109, y: 73, r: 39, reverse: false }, { x: 177, y: 98, r: 28, reverse: true }].map((gear, index) => <g key={index} transform={`translate(${gear.x} ${gear.y})`}>
          <g className={`site-machine__gear ${gear.reverse ? 'site-machine__gear--reverse' : ''}`}>
            {Array.from({ length: 12 }, (_, tooth) => <rect key={tooth} x="-5" y={-gear.r - 6} width="10" height="12" rx="2" transform={`rotate(${tooth * 30})`} fill="currentColor" opacity=".75" />)}
            <circle r={gear.r} fill="var(--site-bg, #070b16)" stroke="currentColor" strokeWidth="5" />
            <circle r={gear.r - 10} stroke="currentColor" strokeWidth=".8" opacity=".4" />
            {[0, 90, 180, 270].map(angle => <path key={angle} d={`M0 -10V-${gear.r - 13}`} transform={`rotate(${angle})`} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />)}
          </g><circle r="6" fill="currentColor" />
        </g>)}
        <path className="site-machine__circuit" d="M15 120h36V35h128v-12h85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="15" cy="120" r="4" fill="currentColor" /><rect x="258" y="17" width="12" height="12" rx="3" fill="currentColor" />
      </svg>
      <span className="site-entrance__name">KHNCO<span>.</span></span>
      <span className="site-entrance__caption">Connecting the system</span>
      <div className="site-entrance__progress">
        <div className="site-entrance__track" />
        <div className="site-entrance__fill">
          <div className="site-entrance__bar" />
        </div>
      </div>
      <span className="site-entrance__principles">Discover. Align. Deliver. Evolve.</span>
    </div>
  </div>;
}
