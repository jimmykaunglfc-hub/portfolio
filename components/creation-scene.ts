import * as THREE from 'three';
import { journeyIcon, productFacets } from './journey-geometry';
import { createJourneyStudio } from './journey-studio';
import { frameDelta, flowPhase } from './journey-timing';

export function createCreationScene(host:HTMLElement){
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x070d19,0);
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),world=new THREE.Group();scene.add(world);
 const camera=new THREE.PerspectiveCamera(44,1,.1,80);
 const studio=createJourneyStudio(scene,renderer);
 scene.add(new THREE.HemisphereLight(0xc2eaff,0x182238,1.1));
 const key=new THREE.DirectionalLight(0xecf7ff,2.8);key.position.set(-3,5,6);scene.add(key);
 const rim=new THREE.DirectionalLight(0x6ebcff,2.4);rim.position.set(4,1,-3);scene.add(rim);
 const colors=[0x8cbdff,0x77d9c7,0xb9aff0];
 const materials=colors.map(color=>new THREE.MeshPhysicalMaterial({color,metalness:.45,roughness:.24,clearcoat:1,emissive:color,emissiveIntensity:.07}));
 const signalMaterials=colors.flatMap(color=>[
  new THREE.MeshPhysicalMaterial({color,metalness:.12,roughness:.13,clearcoat:1,transparent:true,opacity:.63,envMapIntensity:1.5}),
  new THREE.MeshPhysicalMaterial({color,metalness:.78,roughness:.3,clearcoat:.3,envMapIntensity:1.1}),
  new THREE.MeshPhysicalMaterial({color,metalness:.05,roughness:.25,clearcoat:1,envMapIntensity:.8}),
 ]);
 const textures:THREE.Texture[]=[];
 const label=(value:string)=>{
  const canvas=document.createElement('canvas');canvas.width=768;canvas.height=96;
  const ctx=canvas.getContext('2d')!;ctx.font='500 31px sans-serif';ctx.textAlign='center';ctx.fillStyle='#c4d8ed';ctx.fillText(value,384,58);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;textures.push(texture);
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false}));sprite.scale.set(2.6,.325,1);return sprite;
 };
 const roots=[new THREE.Vector3(-2.8,.35,0),new THREE.Vector3(0,.35,0),new THREE.Vector3(2.8,.35,0)];
 const nodes=Array.from({length:6},(_,i)=>new THREE.Vector3((Math.floor(i/2)-1)*2.8,i%2?-1.2:1.25,0));
 const signals=Array.from({length:45},(_,i)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.075+(i%5)*.009,24,16),signalMaterials[(i%3)*3+Math.floor(i/3)%3]);world.add(m);return m;});
 const rootLabels=roots.map((pos,i)=>{
  const a=label(['Customer / Needs','Business / Value','Technology / Feasibility'][i]);a.position.copy(pos).add(new THREE.Vector3(0,-.95,0));world.add(a);
  const b=label(['DESIRE','VISION','SOLUTION'][i]);b.position.copy(pos).add(new THREE.Vector3(0,-.95,0));world.add(b);return [a,b];
 });
 const rootIcons=roots.map((pos,i)=>{const icon=journeyIcon([0,2,4][i],materials[i]);icon.position.copy(pos);world.add(icon);return icon;});
 const names=['Empathy','Experience','Direction','Value','Architecture','Reliability'];
 const icons=nodes.map((pos,i)=>{const g=new THREE.Group(),icon=journeyIcon(i,materials[Math.floor(i/2)]);g.add(icon);const title=label(names[i]);title.position.y=-.74;title.scale.multiplyScalar(.75);g.add(title);g.position.copy(pos);world.add(g);return {group:g,icon,title};});
 const paths=nodes.map((end,i)=>{
  const start=roots[Math.floor(i/2)],curve=new THREE.CubicBezierCurve3(start,start.clone().add(new THREE.Vector3(i%2?.45:-.45,0,.4)),end.clone().add(new THREE.Vector3(0,i%2?.6:-.6,.4)),end);
  const mat=new THREE.LineBasicMaterial({color:colors[Math.floor(i/2)],transparent:true,opacity:.5});const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)),mat);world.add(line);return {curve,line,mat};
 });
 const flow=new THREE.Group();world.add(flow);
 const circuits=[[0,2],[2,4],[4,5],[5,3],[3,1],[1,0],[2,3]].map(([a,b],i)=>{
  const start=nodes[a],end=nodes[b],mid=start.clone().lerp(end,.5);mid.z=-.45;
  const curve=new THREE.CatmullRomCurve3([start,start.clone().lerp(mid,.5),mid,end.clone().lerp(mid,.5),end]);
  const mat=new THREE.LineBasicMaterial({color:0x82bedc,transparent:true,opacity:.35});const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)),mat);flow.add(line);
  const packet=new THREE.Mesh(new THREE.SphereGeometry(.045,10,8),materials[i%3]);flow.add(packet);return {curve,line,packet};
 });
 const product=new THREE.Group();world.add(product);
 const facets=productFacets().map(({geometry,center,normal,sides},i)=>{
  const mat=new THREE.MeshPhysicalMaterial({color:sides===4?0x8ebbd0:sides===5?0xc7dce9:0x769bbd,metalness:.25,roughness:.7,clearcoat:0,side:THREE.DoubleSide,transparent:true});
  const mesh=new THREE.Mesh(geometry,mat);mesh.position.copy(center);product.add(mesh);
  const edge=new THREE.LineSegments(new THREE.EdgesGeometry(geometry,28),new THREE.LineBasicMaterial({color:0xb6e5ef,transparent:true,opacity:.3}));mesh.add(edge);
  return {mesh,mat,edge,center,normal,seed:i};
 });
 const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.75,2),new THREE.MeshBasicMaterial({color:0x9bdde8,wireframe:true,transparent:true,opacity:.08}));product.add(core);
 const laser=new THREE.Group();world.add(laser);
 const laserLine=new THREE.Mesh(new THREE.BoxGeometry(4.3,.012,.012),new THREE.MeshBasicMaterial({color:0xb7ffeb}));laserLine.position.z=1.8;laser.add(laserLine);
 const laserPlane=new THREE.Mesh(new THREE.PlaneGeometry(4.3,3.5),new THREE.MeshBasicMaterial({color:0x68f1d1,transparent:true,opacity:.075,side:THREE.DoubleSide,depthWrite:false}));laserPlane.rotation.x=-Math.PI/2;laser.add(laserPlane);
 const scanLight=new THREE.PointLight(0x7dffdb,0,6);scanLight.position.z=2;laser.add(scanLight);
 // World-space confirmations live outside the sculpture silhouette, never on a card.
 const confirmations=['Experience aligned','Value confirmed','Release readiness'].map((name,i)=>{
  const group=new THREE.Group(),title=label(name),status=label('✓  PASSED');
  title.position.y=.1;status.position.y=-.23;status.scale.multiplyScalar(.65);status.material.color.setHex(0x98edcf);
  title.material.depthTest=true;status.material.depthTest=true;
  title.material.depthWrite=false;status.material.depthWrite=false;
  group.add(title,status);world.add(group);return {group,title,status,threshold:3.8+i*.235};
 });
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let progress=0,opened=0,disposed=false,frame=0,time=0,previous=0;
 const smooth=(n:number)=>{n=THREE.MathUtils.clamp(n,0,1);return n*n*(3-2*n);};
 function draw(){
  if(disposed)return;
  const p=progress*5,gather=smooth(p),direction=smooth((p-1)/.8),split=smooth((p-2)/.8),form=smooth((p-3)/.65),polish=smooth((p-4.3)/.7);
  const spin=reduced.matches?0:time;
  const fitWidth=Math.max(11,4.25/(Math.tan(22*Math.PI/180)*camera.aspect));
  const distance=THREE.MathUtils.lerp(fitWidth,camera.aspect<.8?13:11,form);
  camera.position.set(Math.sin(progress*Math.PI)*.25,.35,distance-opened*6.8);camera.lookAt(0,.2,0);
  studio.update(progress,opened,spin,camera);
  signals.forEach((s,i)=>{
   const a=i*2.399,root=roots[i%3],start=new THREE.Vector3(Math.cos(a)*(1.2+(i%8)*.30),Math.sin(a)*1.8,Math.sin(i*1.7)*1.0-1);
   const target=root.clone().add(new THREE.Vector3(Math.cos(a)*.46,Math.sin(a)*.46,Math.sin(i)*.25));
   s.position.lerpVectors(start,target,gather);s.scale.setScalar(Math.max(.001,1-direction));s.visible=p<1.85;
  });
  rootLabels.forEach(([a,b],i)=>{a.visible=p>.35&&p<1.8;b.visible=p>1.1&&p<2.9;a.material.opacity=gather*(1-direction);b.material.opacity=direction*(1-split);a.position.x=b.position.x=roots[i].x;});
  rootIcons.forEach(icon=>{icon.visible=p>1&&p<2.9;icon.scale.setScalar(Math.max(.001,direction*(1-split)));icon.rotation.y=Math.sin(spin*.25)*.12;});
  paths.forEach(({line,mat},i)=>{line.visible=p>1.65&&p<3.05;line.geometry.setDrawRange(0,Math.floor(split*51));mat.opacity=.6*(1-form);icons[i].group.position.copy(paths[i].curve.getPoint(split));});
  icons.forEach(({group,icon,title},i)=>{
   group.visible=p>2&&p<3.7;group.scale.setScalar(Math.max(.001,split*(1-form)));group.position.lerp(new THREE.Vector3(0,0,-.4),form);icon.rotation.y=Math.sin(spin*.3+i)*.12;title.material.opacity=1-form;
  });
  flow.visible=p>2.6&&p<3.7;flow.scale.setScalar(Math.max(.001,1-form));
  circuits.forEach(({packet,curve,line},i)=>{packet.position.copy(curve.getPoint(reduced.matches?.5:flowPhase(spin,i*.14)));(line.material as THREE.LineBasicMaterial).opacity=split*.4*(1-form);});
  product.visible=p>3;product.scale.setScalar(Math.max(.001,form)*(1+opened*.5));product.rotation.set(.18+Math.sin(spin*.12)*.09,spin*.09,.12);product.position.y=-.12;
  const scanY=1.9-smooth((p-3.65)/.65)*3.8;laser.visible=p>3.65&&p<4.35;laser.position.y=scanY;scanLight.intensity=laser.visible?5:0;
  confirmations.forEach(({group,title,status,threshold},i)=>{
   const compact=camera.aspect<1.35,reveal=smooth((p-threshold)/.10);
   const fade=1-smooth((p-(compact&&i<2?threshold+.18:4.43))/.12);
   group.visible=p>=threshold&&p<4.55&&opened===0;
   // On narrow screens show one confirmation at a time below the product.
   group.position.set(compact?0:i===1?-3.35:3.35,compact?-2.45:[1.05,.05,-1.05][i],.2+(1-reveal)*.65);
   group.position.y-=(1-reveal)*.18;
   group.scale.setScalar((compact?1.05:1.1)*(.82+.18*reveal));
   title.material.opacity=status.material.opacity=reveal*fade;
  });
  facets.forEach(({mesh,mat,edge,center,normal,seed})=>{
   const draft=(1-polish)*(.08+Math.sin(spin*.7+seed)*.025),burst=smooth(opened)*5;
   mesh.position.copy(center).addScaledVector(normal,draft+burst);mesh.rotation.set(opened*Math.sin(seed)*.9,opened*Math.cos(seed)*.9,0);
   mat.roughness=.72-polish*.57;mat.metalness=.2+polish*.4;mat.clearcoat=polish;mat.opacity=1-smooth((opened-.55)/.45);edge.material.opacity=.3*mat.opacity;
   const surfaceY=center.clone().applyEuler(product.rotation).y+product.position.y;
   mat.emissive.setHex(0x65d7bf);mat.emissiveIntensity=laser.visible?Math.max(0,1-Math.abs(surfaceY-scanY)*4)*.32:.015*polish;
  });
  core.material.opacity=.08*(1-opened);renderer.render(scene,camera);
 }
 // The sticky canvas is clipped by changing ancestors during the journey. An
 // IntersectionObserver is not a reliable authority for its render state.
 // Explicit progress updates must ALWAYS render, including reverse entry.
 function tick(now:number){frame=0;if(disposed||document.hidden||opened>=1)return;time+=frameDelta(now,previous);previous=now;draw();if(!reduced.matches)frame=requestAnimationFrame(tick);}
 function wake(){if(!frame&&!disposed&&!document.hidden&&opened<1){previous=performance.now();frame=requestAnimationFrame(tick);}}
 const change=()=>{cancelAnimationFrame(frame);frame=0;wake();};document.addEventListener('visibilitychange',change);reduced.addEventListener('change',change);
 const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();draw();};
 const observer=new ResizeObserver(resize);observer.observe(host);resize();wake();
 return {update(p:number,o=0){progress=THREE.MathUtils.clamp(p,0,1);opened=o;draw();wake();},dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',change);reduced.removeEventListener('change',change);const geometries=new Set<THREE.BufferGeometry>(),mats=new Set<THREE.Material>();scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Line||object instanceof THREE.Points)geometries.add(object.geometry);if('material' in object){const material=object.material as THREE.Material|THREE.Material[];(Array.isArray(material)?material:[material]).forEach(m=>mats.add(m));}});geometries.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());studio.dispose();renderer.dispose();renderer.domElement.remove();}};
}
