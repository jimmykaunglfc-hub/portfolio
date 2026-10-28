'use client';
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Gem, Volume2, VolumeX } from 'lucide-react';
import { useJourneyAudio } from './useJourneyAudio';
import './product-assembly.css';

const steps=[
 ['00 / Idea','Every product starts with a possibility.','A quiet field of signals. Scroll to give them purpose.'],
 ['01 / Understanding','Listen. Understand. Connect.','Customer needs, business value, and technical feasibility—three perspectives on one opportunity.'],
 ['02 / Direction','Desire. Vision. Solution.','Needs become desire. Value becomes vision. Feasibility becomes a solution. Each path unfolds into two capabilities.'],
 ['03 / Orchestrate','Six capabilities. One operating flow.','Empathy and experience. Direction and value. Architecture and reliability. Connected by a shared delivery rhythm.'],
 ['04 / Validate','Refine what matters.','The operating flow takes shape as a draft product. A light-based review checks experience, value, and readiness.'],
 ['05 / Launch & evolve','Potential, realised.','A refined product, ready to reveal the work behind it. Select the sculpture to step inside.'],
];
type Mode='journey'|'entering'|'portfolio'|'exiting';

export default function ProductAssembly({children}:{children:React.ReactNode}){
 const runway=useRef<HTMLDivElement>(null),host=useRef<HTMLDivElement>(null),portfolio=useRef<HTMLDivElement>(null),productButton=useRef<HTMLButtonElement>(null);
 const controller=useRef<ReturnType<typeof import('./creation-scene').createCreationScene>|null>(null);
 const animation=useRef<ReturnType<typeof animate>|null>(null),modeRef=useRef<Mode>('journey'),savedY=useRef(0),enteredAt=useRef(0),lastProgress=useRef(0);
 const [mode,setMode]=useState<Mode>('journey'),[active,setActive]=useState(0),[fraction,setFraction]=useState(0),[ready,setReady]=useState(false);
 const reduced=useReducedMotion(),opening=useMotionValue(0);
 const scrollYProgress=useMotionValue(0);
 // Measure the actual document position, independent of native ScrollTimeline support
 // and of the runway temporarily becoming fixed/hidden during product entry.
 useEffect(()=>{
  let frame=0;
  const measure=()=>{
   frame=0;const node=runway.current;if(!node||modeRef.current!=='journey')return;
   const rect=node.getBoundingClientRect(),range=node.offsetHeight-window.innerHeight;
   scrollYProgress.set(range>0?Math.max(0,Math.min(1,-rect.top/range)):0);
  };
  const queue=()=>{if(!frame)frame=requestAnimationFrame(measure);};
  window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue);
  const observer=new ResizeObserver(queue);if(runway.current)observer.observe(runway.current);queue();
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',queue);window.removeEventListener('resize',queue);};
 },[scrollYProgress]);
 const sceneOpacity=useTransform(opening,[0,.55,1],[1,1,0]),pageOpacity=useTransform(opening,[0,.35,1],[0,0,1]),pageScale=useTransform(opening,[0,1],[.8,1]);
 const audio=useJourneyAudio(active,mode==='journey');
 const changeMode=useCallback((next:Mode)=>{modeRef.current=next;setMode(next);},[]);
 useEffect(()=>{
  let disposed=false;
  import('./creation-scene').then(({createCreationScene})=>{
   if(disposed||!host.current)return;
   try{controller.current=createCreationScene(host.current);controller.current.update(lastProgress.current,opening.get());setReady(true);}catch{/* Accessible stage navigation and product entry remain usable. */}
  }).catch(()=>{});
  return()=>{disposed=true;animation.current?.stop();controller.current?.dispose();controller.current=null;};
 },[opening]);
 useMotionValueEvent(scrollYProgress,'change',p=>{
  if(modeRef.current!=='journey')return;
  lastProgress.current=p;setActive(Math.min(5,Math.round(p*5)));setFraction(p);controller.current?.update(p,0);
 });
 useMotionValueEvent(opening,'change',o=>controller.current?.update(lastProgress.current,o));
 const moveTo=(index:number)=>{const node=runway.current;if(node)window.scrollTo({top:node.offsetTop+(node.offsetHeight-window.innerHeight)*index/5,behavior:reduced?'instant':'smooth'});};
 const enter=()=>{
  if(modeRef.current!=='journey')return;
  if(fraction<.985){moveTo(5);return;}
  savedY.current=window.scrollY;lastProgress.current=1;changeMode('entering');
 };
 const exit=useCallback(()=>{
  if(modeRef.current!=='portfolio')return;
  lastProgress.current=1;changeMode('exiting');
 },[changeMode]);
 // Both directions are in-place camera transitions. Scroll positions change only behind the overlay.
 useEffect(()=>{
  if(mode!=='entering'&&mode!=='exiting')return;
  const oldOverflow=document.documentElement.style.overflow,oldBehavior=document.documentElement.style.scrollBehavior;
  document.documentElement.style.overflow='hidden';document.documentElement.style.scrollBehavior='auto';
  window.scrollTo({top:0,behavior:'instant'});
  const entering=mode==='entering';
  animation.current=animate(opening,entering?1:0,{duration:reduced?.15:1.65,ease:[.65,0,.25,1],onComplete:()=>{
   if(entering){enteredAt.current=performance.now();changeMode('portfolio');requestAnimationFrame(()=>portfolio.current?.focus({preventScroll:true}));}
   else{
    // Keep the scene fixed until the scroll runway is restored at its last frame.
    setMode('journey');
    requestAnimationFrame(()=>{window.scrollTo({top:savedY.current,behavior:'instant'});requestAnimationFrame(()=>{modeRef.current='journey';controller.current?.update(1,0);productButton.current?.focus({preventScroll:true});});});
   }
  }});
  return()=>{animation.current?.stop();document.documentElement.style.overflow=oldOverflow;document.documentElement.style.scrollBehavior=oldBehavior;};
 },[mode,reduced,opening,changeMode]);
 useEffect(()=>{
  if(mode!=='portfolio')return;
  let upward=0,touchY=0,touchAtTop=false;
  const canExit=()=>window.scrollY<=4&&performance.now()-enteredAt.current>1200;
  const wheel=(event:WheelEvent)=>{
   if(!canExit()||event.ctrlKey){upward=0;return;}
   if(event.deltaY<0){event.preventDefault();upward+=-event.deltaY*(event.deltaMode===1?16:1);if(upward>65)exit();}else upward=0;
  };
  const key=(event:KeyboardEvent)=>{
   if((event.target as HTMLElement)?.closest('input,textarea,select,[contenteditable="true"]'))return;
   if(canExit()&&['ArrowUp','PageUp'].includes(event.key)){event.preventDefault();exit();}
  };
  const touchStart=(event:TouchEvent)=>{touchY=event.touches[0].clientY;touchAtTop=canExit();};
  const touchMove=(event:TouchEvent)=>{if(touchAtTop&&canExit()&&event.touches[0].clientY-touchY>65){event.preventDefault();exit();}};
  window.addEventListener('wheel',wheel,{passive:false});window.addEventListener('keydown',key);window.addEventListener('touchstart',touchStart,{passive:true});window.addEventListener('touchmove',touchMove,{passive:false});
  return()=>{window.removeEventListener('wheel',wheel);window.removeEventListener('keydown',key);window.removeEventListener('touchstart',touchStart);window.removeEventListener('touchmove',touchMove);};
 },[mode,exit]);
 const transition=mode==='entering'||mode==='exiting';
 return <>
  <section className={`atelier-runway journey-${mode}`} ref={runway} aria-label="The product creation journey" inert={mode!=='journey'}>
   <motion.div className="atelier-stage" style={{opacity:sceneOpacity}}>
    <header className="creation-header"><span>KHNCO<span>.</span></span><div className="journey-actions"><button onClick={audio.toggle} aria-pressed={audio.enabled} aria-label={audio.enabled?'Mute journey sound':'Enable journey sound'}>{audio.enabled?<Volume2 size={15}/>:<VolumeX size={15}/>} {audio.error?'Retry sound':audio.enabled?'Sound on':'Sound off'}</button><button onClick={()=>moveTo(5)} disabled={active===5}>Skip to launch <ArrowRight size={13}/></button></div></header>
    <div className="atelier-copy" key={active}><span>{steps[active][0]}</span><h1>{steps[active][1]}</h1><p>{steps[active][2]}</p></div>
    <div className="atelier-canvas" ref={host} aria-hidden="true"/>
    {active===5&&<button ref={productButton} className="atelier-product-hit" aria-label="Enter Jimmy’s portfolio through the polished product" onClick={enter}/>}
    {!ready&&<div className="atelier-fallback" aria-hidden="true"><Gem size={90}/><span>{steps[active][0]}</span></div>}
    <div className="atelier-caption">
     {active===2&&<div className="journey-branches"><span>Desire <small>Empathy · Experience</small></span><span>Vision <small>Direction · Value</small></span><span>Solution <small>Architecture · Reliability</small></span></div>}
     {active===4&&<div className={ready?'sr-only':'journey-validation-fallback'} role="status" aria-live="polite">{fraction>.854?'Release readiness — passed':fraction>.807?'Value confirmed — passed':fraction>.76?'Experience aligned — passed':'Scanning the draft product'}</div>}
     {active===5&&<button className="atelier-unbox" onClick={enter}><Gem size={18}/>{fraction<.985?'Complete the refinement':'Step inside · Explore my work'}<ArrowRight size={16}/></button>}
     <p>{active===5?'Scroll back at the homepage hero to return to this product.':'Scroll to develop the idea · Reverse to revisit a decision'}</p>
    </div>
    <footer className="creation-controls"><button onClick={()=>moveTo(active-1)} disabled={active===0} aria-label="Previous creation step"><ArrowLeft size={16}/></button><div><span>0{active} / 05</span><div className="creation-progress"><motion.i style={{scaleX:scrollYProgress}}/></div><small>DESIRE → VISION → SOLUTION</small></div><button onClick={()=>moveTo(active+1)} disabled={active===5} aria-label="Next creation step"><ArrowRight size={16}/></button></footer>
   </motion.div>
  </section>
  {mode!=='journey'&&<motion.div ref={portfolio} tabIndex={-1} className={`journey-home ${transition?'journey-home-transition':''}`} inert={transition} style={transition?{opacity:pageOpacity,scale:pageScale}:undefined}>
   <button className="journey-return" onClick={exit}><ArrowLeft size={14}/> Back to the product</button>{children}
  </motion.div>}
 </>;
}
