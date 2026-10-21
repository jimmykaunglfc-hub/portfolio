import { Target, Layers3, CheckCheck, ArrowDown } from 'lucide-react';

/** A conceptual operating model, not invented performance metrics. */
export default function LeadershipFlow() {
  return <div className="leadership-flow" aria-label="From strategy through delivery to lasting impact">
    <div className="leadership-flow__heading"><span /> THE DELIVERY FRAMEWORK</div>
    <div className="leadership-flow__stage" style={{ '--stage': 0 } as React.CSSProperties}>
      <div className="leadership-flow__icon"><Target size={22} /></div>
      <div><small>01 / ALIGN</small><h2>Clear strategy</h2><p>Vision into a shared roadmap.</p></div>
    </div>
    <div className="leadership-flow__connector"><i /><ArrowDown size={14} /></div>
    <div className="leadership-flow__stage" style={{ '--stage': 1 } as React.CSSProperties}>
      <div className="leadership-flow__icon"><Layers3 size={22} /></div>
      <div><small>02 / ORCHESTRATE</small><h2>Confident delivery</h2><p>People, product, and operations.</p></div>
    </div>
    <div className="leadership-flow__connector"><i /><ArrowDown size={14} /></div>
    <div className="leadership-flow__stage" style={{ '--stage': 2 } as React.CSSProperties}>
      <div className="leadership-flow__icon"><CheckCheck size={22} /></div>
      <div><small>03 / EVOLVE</small><h2>Lasting impact</h2><p>Quality built in. Progress sustained.</p></div>
    </div>
    <div className="leadership-flow__footer">Connected thinking. Coordinated action.</div>
  </div>;
}
