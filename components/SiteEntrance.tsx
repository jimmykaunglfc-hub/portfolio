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
      <svg viewBox="0 0 80 80" fill="none" className="site-entrance__mark">
        <path d="M17 17v46M57 16 34 40l23 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m57 16-23 24" stroke="#8ebaff" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="site-entrance__name">KHNCO<span>.</span></span>
      <span className="site-entrance__caption">Digital leadership</span>
      <div className="site-entrance__progress">
        <div className="site-entrance__track" />
        <div className="site-entrance__fill">
          <svg className="site-entrance__wave" viewBox="0 0 480 32" preserveAspectRatio="none" fill="none">
            <path d="M0 16Q30 0 60 16T120 16T180 16T240 16T300 16T360 16T420 16T480 16" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="site-entrance__bar" />
        </div>
      </div>
      <span className="site-entrance__principles">Strategy. Delivery. Impact.</span>
    </div>
  </div>;
}
