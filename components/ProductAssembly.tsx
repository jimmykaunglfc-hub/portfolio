'use client';
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Network } from 'lucide-react';
import './product-assembly.css';
const steps = [
 ['00 / Idea','Possibility, from every angle.','Scattered signals. Different perspectives. The beginning of something valuable.'],
 ['01 / Understanding','Give the signals meaning.','Connect customer needs, business value, and technical feasibility into a shared understanding.'],
 ['02 / Direction','Connect insight to intent.','Map the relationships. Make dependencies visible. Turn categories into a shared roadmap.'],
 ['03 / Orchestrate','One coordinated system.','Bring experience, services, data, and workflows together into a living digital architecture.'],
 ['04 / Validate','Confidence, built in.','Review the draft product against experience, quality, and release-readiness checkpoints.'],
 ['05 / Launch & evolve','From possibility to platform.','A connected digital system, ready to evolve. Enter the portal to explore the leadership behind it.'],
];
export default function ProductAssembly({children}:{children:React.ReactNode}) {
 const runway=useRef<HTMLDivElement>(null),host=useRef<HTMLDivElement>(null),portfolio=useRef<HTMLDivElement>(null);
 const controller=useRef<ReturnType<typeof import('./creation-scene').createCreationScene>|null>(null);
 const animation=useRef<ReturnType<typeof animate>|null>(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:runway,offset:['start start','end end']});
 const opening=useMotionValue(0);
 const [active,setActive]=useState(0),[fraction,setFraction]=useState(0),[ready,setReady]=useState(false),[unlocked,setUnlocked]=useState(false),[inPortfolio,setInPortfolio]=useState(false),[unboxing,setUnboxing]=useState(false);
 useEffect(()=>{
  let disposed=false;
  import('./creation-scene').then(({createCreationScene})=>{
   if(disposed||!host.current)return;
   try{controller.current=createCreationScene(host.current);controller.current.update(scrollYProgress.get(),opening.get());setReady(true);}catch{/* Keep fallback and entry available without WebGL. */}
  }).catch(()=>{/* The accessible journey remains available if the scene cannot load. */});
  return()=>{disposed=true;animation.current?.stop();controller.current?.dispose();controller.current=null;};
 },[scrollYProgress,opening]);
 useMotionValueEvent(scrollYProgress,'change',p=>{
  setActive(Math.min(5,Math.round(p*5)));setFraction(p);
  controller.current?.update(reduced?Math.round(p*5)/5:p,opening.get());
  if(p<.94){animation.current?.stop();opening.set(0);setUnboxing(false);}
 });
 useMotionValueEvent(opening,'change',o=>controller.current?.update(scrollYProgress.get(),o));
 useEffect(()=>{
  const check=()=>setInPortfolio(!!portfolio.current&&window.scrollY>=portfolio.current.offsetTop-window.innerHeight*.25);
  window.addEventListener('scroll',check,{passive:true});check();
  return()=>window.removeEventListener('scroll',check);
 },[unlocked]);
 const moveTo=(index:number)=>{const node=runway.current;if(node)window.scrollTo({top:node.offsetTop+(node.offsetHeight-window.innerHeight)*index/5,behavior:reduced?'instant':'smooth'});};
 const enter=()=>{
  if(scrollYProgress.get()<.985){moveTo(5);return;}
  if(unboxing){portfolio.current?.scrollIntoView({behavior:reduced?'instant':'smooth'});return;}
  setUnboxing(true);
  animation.current=animate(opening,1,{duration:reduced?0:1.4,ease:[.22,1,.36,1],onComplete:()=>{
   setUnlocked(true);requestAnimationFrame(()=>requestAnimationFrame(()=>portfolio.current?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'})));
  }});
 };
 return <>
  <section className="atelier-runway" ref={runway} aria-label="The product creation journey"><div className="atelier-stage">
   <header className="creation-header"><span>KHNCO<span>.</span></span><button onClick={()=>moveTo(5)} disabled={active===5}>Skip to launch <ArrowRight size={13}/></button></header>
   <div className="atelier-grid" aria-hidden="true"/>
   <div className="atelier-copy" key={active}><span>{steps[active][0]}</span><h1>{steps[active][1]}</h1><p>{steps[active][2]}</p></div>
   <div className="atelier-canvas" ref={host} aria-hidden="true"/>
   {active===5&&fraction>=.985&&<button className="atelier-package-hit" aria-label="Open the digital portal and enter Jimmy’s portfolio" onClick={enter}/>}
   {!ready&&<div className="atelier-fallback" aria-hidden="true"><Network size={100}/><span>{['Signals','Understanding','Architecture','Connected system','Release validation','Digital platform'][active]}</span></div>}
   <div className="atelier-caption">
    {active<4&&<div className="atelier-categories">{(active===0?['90 signals','3 perspectives','1 possibility']:active===1?['Customer','Business','Operations']:active===2?['Priorities','Dependencies','Roadmap']:['Product','Delivery','Operations']).map((label,i)=><span key={label}><i style={{background:['#8dbbff','#6dd8c7','#b2a1e5'][i%3]}}/>{label}</span>)}</div>}
    {active===4&&<div className="atelier-validation"><small>RELEASE REVIEW / CONCEPT DEMONSTRATION</small>{['Experience aligned','Quality reviewed','Operational readiness'].map((label,i)=><div key={label} className={fraction>.72+i*.055?'passed':''}><span>{label}</span><span>{fraction>.72+i*.055?<><Check size={13}/>Passed</>:'Reviewing'}</span></div>)}</div>}
    {active===5&&<button className="atelier-unbox" onClick={enter}><Network size={18}/>{fraction<.985?'Complete the launch':unboxing?'Enter Jimmy’s portfolio':'Enter the platform · Explore my work'}<ArrowRight size={16}/></button>}
    <p>{active===5?'Scroll up to revisit the journey—even after entering.':'Scroll to shape the product · Reverse to revisit every decision'}</p>
   </div>
   <footer className="creation-controls"><button onClick={()=>moveTo(active-1)} disabled={active===0} aria-label="Previous creation step"><ArrowLeft size={16}/></button><div><span>0{active} / 05</span><div className="creation-progress"><motion.i style={{scaleX:scrollYProgress}}/></div><small>{active===5?'BUILT TO EVOLVE':'INSIGHT → ARCHITECTURE → IMPACT'}</small></div><button onClick={()=>moveTo(active+1)} disabled={active===5} aria-label="Next creation step"><ArrowRight size={16}/></button></footer>
  </div></section>
  {unlocked&&<div ref={portfolio} className="atelier-portfolio" style={{visibility:inPortfolio?'visible':'hidden'}} inert={!inPortfolio}><button className="atelier-revisit" onClick={()=>moveTo(5)}><ArrowLeft size={14}/> Revisit the product journey</button>{children}</div>}
 </>;
}
