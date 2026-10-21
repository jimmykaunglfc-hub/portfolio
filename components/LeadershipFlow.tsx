'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { EngineController } from './transformation-engine';

const stages = [
  { title: 'Align', discipline: 'Product strategy', detail: 'Turn customer needs into a clear, shared priority.' },
  { title: 'Deliver', discipline: 'Project leadership', detail: 'Connect teams, dependencies, and quality checkpoints.' },
  { title: 'Improve', discipline: 'Process redesign', detail: 'Remove friction. Simplify the flow. Feed learning back.' },
];

/** Text stays useful before WebGL loads, or when it is unavailable. */
export default function LeadershipFlow() {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<EngineController | null>(null);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    let disposed = false;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(motion.matches);
    updateMotion();
    motion.addEventListener('change', updateMotion);
    import('./transformation-engine').then(({ createTransformationEngine }) => {
      if (disposed || !host.current) return;
      controller.current = createTransformationEngine(host.current, setStage);
      setReady(Boolean(controller.current));
    }).catch(() => { /* Keep the accessible blueprint fallback. */ });
    return () => {
      disposed = true;
      motion.removeEventListener('change', updateMotion);
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);
  return <figure className="leadership-flow transformation-engine" aria-label="Transformation Engine: product strategy, project leadership, and process redesign">
    <div className="engine-heading">
      <span className="leadership-flow__heading"><span /> TRANSFORMATION ENGINE</span>
      {ready && !reduced && <button className="engine-pause" aria-label={paused ? 'Play transformation animation' : 'Pause transformation animation'} aria-pressed={paused} onClick={() => {
        controller.current?.setPaused(!paused); setPaused(!paused);
      }}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>}
    </div>
    <div className="engine-stage" role="img" aria-label="Three sapphire and titanium platforms connect priorities, coordinated delivery, and a simplified process with a continuous feedback loop.">
      <div className="engine-canvas" ref={host} aria-hidden="true" />
      {!ready && <svg className="engine-fallback" viewBox="0 0 480 280" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M95 135H390M390 135V220H95V135" opacity=".4" />
          {[55, 195, 335].map((x, i) => <g key={x}>
            <path d={`M${x} 115l45-25 55 25v55l-45 25-55-25Z`} fill="var(--site-surface)" />
            <path d={`M${x} 115l55 25 45-25M${x + 55} 140v55`} />
            <text x={x + 49} y="166" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12">0{i + 1}</text>
          </g>)}
        </g>
      </svg>}
    </div>
    <div className="engine-steps" aria-label="Explore the transformation stages">
      {stages.map((item, index) => <button key={item.title} aria-pressed={stage === index} onClick={() => {
        setStage(index); controller.current?.selectStage(index);
      }}><span className="engine-steps__number">0{index + 1}</span><strong>{item.title}</strong><small>{item.discipline}</small></button>)}
    </div>
    <figcaption className="engine-caption">
      <p key={stage}>{stages[stage].detail}</p>
      <span>Complexity, orchestrated.</span>
    </figcaption>
  </figure>;
}
