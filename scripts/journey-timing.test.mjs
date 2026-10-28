import test from 'node:test';
import assert from 'node:assert/strict';
import { CatmullRomCurve3, Vector3 } from 'three';
import { frameDelta, flowPhase } from '../components/journey-timing.ts';

test('RAF preceding the scheduling timestamp cannot reverse the animation clock',()=>{
 assert.equal(frameDelta(100,100.9),0);
 assert.equal(frameDelta(10000,100),.05);
 assert.equal(frameDelta(NaN,100),0);
});
test('every flow packet stays on its curve for negative, normal and invalid times',()=>{
 const curve=new CatmullRomCurve3([new Vector3(),new Vector3(1,1,0),new Vector3(2,0,0)]);
 for(const time of [-100,-.001,0,1,10000,NaN,Infinity])for(let i=0;i<7;i++){
  const phase=flowPhase(time,i*.14);
  assert.ok(phase>=0&&phase<1);
  assert.ok(curve.getPoint(phase).toArray().every(Number.isFinite));
 }
});
