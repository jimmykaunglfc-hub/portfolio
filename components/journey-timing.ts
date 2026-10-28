/** RAF timestamps can precede performance.now() sampled while scheduling a frame. */
export function frameDelta(now:number,previous:number){
 return Number.isFinite(now)&&Number.isFinite(previous)?Math.max(0,Math.min((now-previous)/1000,.05)):0;
}

/** Curve.getPoint requires [0,1]; JavaScript remainder can otherwise be negative. */
export function flowPhase(time:number,offset:number){
 const value=time*.19+offset;
 return Number.isFinite(value)?((value%1)+1)%1:0;
}
