'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/** One user-enabled, non-overlapping cue. No autoplay, pitch manipulation or continuous loop. */
export function useJourneyAudio(step:number,enabledScene:boolean){
 const audio=useRef<HTMLAudioElement|null>(null),fade=useRef(0),generation=useRef(0),lastPlay=useRef(-1000);
 const [enabled,setEnabled]=useState(false),[error,setError]=useState(false);
 const stop=useCallback(()=>{generation.current++;cancelAnimationFrame(fade.current);audio.current?.pause();},[]);
 const play=useCallback(()=>{
  const element=audio.current;if(!element||document.hidden||performance.now()-lastPlay.current<500)return;
  stop();const token=generation.current;lastPlay.current=performance.now();element.currentTime=0;element.volume=0;
  void element.play().then(()=>{
   if(token!==generation.current)return;
   const start=performance.now();
   const tick=(now:number)=>{if(token!==generation.current)return;const ramp=Math.min(1,(now-start)/180),tail=Number.isFinite(element.duration)?Math.min(1,Math.max(0,(element.duration-element.currentTime)/.4)):1;element.volume=.25*ramp*tail;if(!element.paused)fade.current=requestAnimationFrame(tick);};
   fade.current=requestAnimationFrame(tick);
  }).catch(()=>{setEnabled(false);setError(true);});
 },[stop]);
 useEffect(()=>{
  const element=new Audio('/sounds/product-journey.mp3');element.preload='none';audio.current=element;
  const visibility=()=>{if(document.hidden)stop();};document.addEventListener('visibilitychange',visibility);
  return()=>{stop();element.removeAttribute('src');element.load();audio.current=null;document.removeEventListener('visibilitychange',visibility);};
 },[stop]);
 useEffect(()=>{
  if(!enabled||!enabledScene){stop();return;}
  const timer=setTimeout(play,260);return()=>{clearTimeout(timer);stop();};
 },[step,enabled,enabledScene,play,stop]);
 const toggle=()=>{setError(false);if(enabled){stop();setEnabled(false);}else{setEnabled(true);play();}};
 return {enabled,error,toggle};
}
