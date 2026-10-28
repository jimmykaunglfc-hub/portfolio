import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

/** Golden-ratio vertices: https://www.qfbox.info/4d/rhombico
 * Coplanar hull triangles become 62 polygon faces; squares receive a shallow hypar treatment. */
export function productFacets() {
 const phi=(1+Math.sqrt(5))/2,vertices=new Map<string,THREE.Vector3>();
 for(const base of [[1,1,phi**3],[0,phi*Math.sqrt(5),phi**2],[phi,phi**2,2*phi]])
  for(let p=0;p<3;p++)for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1]){
   const v=new THREE.Vector3(base[p]*x,base[(p+1)%3]*y,base[(p+2)%3]*z);
   vertices.set(v.toArray().map(n=>n.toFixed(5)).join(','),v.multiplyScalar(.37));
  }
 const hull=new ConvexGeometry([...vertices.values()]),pos=hull.getAttribute('position');
 const planes=new Map<string,{normal:THREE.Vector3;points:Map<string,THREE.Vector3>}>();
 for(let i=0;i<pos.count;i+=3){
  const a=new THREE.Vector3().fromBufferAttribute(pos,i),b=new THREE.Vector3().fromBufferAttribute(pos,i+1),c=new THREE.Vector3().fromBufferAttribute(pos,i+2);
  const n=b.clone().sub(a).cross(c.clone().sub(a)).normalize();
  const key=[...n.toArray(),n.dot(a)].map(v=>(Math.abs(v)<.00005?0:v).toFixed(4)).join(',');
  const face=planes.get(key)??{normal:n,points:new Map<string,THREE.Vector3>()};
  for(const v of [a,b,c])face.points.set(v.toArray().map(n=>n.toFixed(5)).join(','),v);
  planes.set(key,face);
 }
 hull.dispose();
 return [...planes.values()].map(({normal,points})=>{
  const vs=[...points.values()],center=vs.reduce((sum,v)=>sum.add(v),new THREE.Vector3()).divideScalar(vs.length);
  const u=vs[0].clone().sub(center).normalize(),v=normal.clone().cross(u);
  vs.sort((a,b)=>Math.atan2(a.clone().sub(center).dot(v),a.clone().sub(center).dot(u))-Math.atan2(b.clone().sub(center).dot(v),b.clone().sub(center).dot(u)));
  const local=vs.map(p=>p.clone().sub(center).multiplyScalar(.94)),data:number[]=[];
  if(vs.length===4){
   const sample=(x:number,y:number)=>local[0].clone().multiplyScalar((1-x)*(1-y)).addScaledVector(local[1],x*(1-y)).addScaledVector(local[2],x*y).addScaledVector(local[3],(1-x)*y).addScaledVector(normal,.10*(2*x-1)*(2*y-1));
   for(let x=0;x<6;x++)for(let y=0;y<6;y++){
    const a=sample(x/6,y/6),b=sample((x+1)/6,y/6),c=sample((x+1)/6,(y+1)/6),d=sample(x/6,(y+1)/6);
    data.push(...a.toArray(),...b.toArray(),...c.toArray(),...a.toArray(),...c.toArray(),...d.toArray());
   }
  }else for(let i=0;i<local.length;i++)data.push(0,0,0,...local[i].toArray(),...local[(i+1)%local.length].toArray());
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(data,3));geometry.computeVertexNormals();
  return {geometry,center,normal,sides:vs.length};
 });
}

/** Sculptural icons: empathy, experience, direction, value, architecture, reliability. */
export function journeyIcon(index:number,material:THREE.Material){
 const group=new THREE.Group();
 const mesh=(geometry:THREE.BufferGeometry,x=0,y=0,z=0)=>{const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);group.add(m);return m;};
 if(index===0){mesh(new THREE.SphereGeometry(.19,24,16),0,.3);mesh(new THREE.CapsuleGeometry(.23,.23,6,20),0,-.2).scale.set(1.2,1,.7);}
 else if(index===1){const s=new THREE.Shape();s.moveTo(-.25,.48);s.lineTo(-.25,-.35);s.lineTo(-.03,-.15);s.lineTo(.14,-.46);s.lineTo(.29,-.37);s.lineTo(.12,-.07);s.lineTo(.41,-.07);s.closePath();mesh(new THREE.ExtrudeGeometry(s,{depth:.14,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:3,steps:1}));}
 else if(index===2){mesh(new THREE.TorusGeometry(.39,.035,12,48));const n=mesh(new THREE.OctahedronGeometry(.39));n.scale.set(.36,1.3,.35);n.rotation.z=-.4;}
 else if(index===3){for(let i=0;i<3;i++)mesh(new THREE.BoxGeometry(.17,.28+i*.22,.23),-.28+i*.28,-.3+(.28+i*.22)/2);}
 else if(index===4){for(let i=0;i<3;i++){const m=mesh(new THREE.BoxGeometry(.64,.10,.54),0,-.27+i*.27);m.rotation.y=.4;}}
 else{const s=new THREE.Shape();s.moveTo(0,.48);s.lineTo(.37,.31);s.lineTo(.31,-.15);s.quadraticCurveTo(.15,-.4,0,-.5);s.quadraticCurveTo(-.15,-.4,-.31,-.15);s.lineTo(-.37,.31);s.closePath();mesh(new THREE.ExtrudeGeometry(s,{depth:.12,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:3,steps:1}));}
 return group;
}
