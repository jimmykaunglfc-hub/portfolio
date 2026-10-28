import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** A single digital system: signals → semantic clusters → architecture → runtime → launch. */
export function createCreationScene(host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setClearColor(0x060c18,0);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.25;
  host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x07101e,.025);
  const camera=new THREE.PerspectiveCamera(48,1,.1,100);
  scene.add(new THREE.HemisphereLight(0xbceaff,0x071021,2.3));
  const key=new THREE.DirectionalLight(0xc5edff,5);key.position.set(-4,6,8);scene.add(key);
  const rim=new THREE.PointLight(0x5a99ff,55);rim.position.set(4,-1,4);scene.add(rim);
  const world=new THREE.Group();scene.add(world);
  const colors=[0x81c9ff,0x6aebd5,0xb2b8ff];
  const materials=colors.map(color=>new THREE.MeshPhysicalMaterial({color,metalness:.65,roughness:.18,clearcoat:1,emissive:color,emissiveIntensity:.17}));
  const sphere=new THREE.SphereGeometry(.12,20,14);
  const glowMaterial=new THREE.ShaderMaterial({
    uniforms:{tint:{value:new THREE.Color(0x82c9ff)}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'varying vec3 n; varying vec3 v; void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',
    fragmentShader:'varying vec3 n;varying vec3 v;uniform vec3 tint;void main(){float f=pow(1.-abs(dot(normalize(n),normalize(v))),2.5);gl_FragColor=vec4(tint,f*.28);}',
  });
  const signals=Array.from({length:90},(_,i)=>{
    const group=new THREE.Group();const ball=new THREE.Mesh(sphere,materials[i%3]);group.add(ball);
    const halo=new THREE.Mesh(sphere,glowMaterial);halo.scale.setScalar(1.7);group.add(halo);world.add(group);return group;
  });
  const centers=[new THREE.Vector3(-3.1,1,-1),new THREE.Vector3(0,-.6,0),new THREE.Vector3(3.1,1,-1)];
  const nodes=[new THREE.Vector3(-3,1.4,-1),new THREE.Vector3(0,1.4,-1),new THREE.Vector3(3,1.4,-1),new THREE.Vector3(-3,-1.4,0),new THREE.Vector3(0,-1.4,0),new THREE.Vector3(3,-1.4,0)];
  const textures:THREE.Texture[]=[];
  function label(text:string,color='#bce4ff') {
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=80;
    const ctx=canvas.getContext('2d')!;ctx.font='500 26px monospace';ctx.fillStyle=color;ctx.textAlign='center';ctx.fillText(text,256,48);
    const texture=new THREE.CanvasTexture(canvas);textures.push(texture);
    const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false}));sprite.scale.set(2.4,.375,1);return sprite;
  }
  const clusters=centers.map((center,i)=>{
    const group=new THREE.Group();group.position.copy(center);
    const cage=new THREE.Mesh(new THREE.IcosahedronGeometry(1.1,1),new THREE.MeshBasicMaterial({color:colors[i],wireframe:true,transparent:true,opacity:.15}));group.add(cage);
    const title=label(['CUSTOMER / NEEDS','BUSINESS / VALUE','TECHNOLOGY / FEASIBILITY'][i]);title.position.y=-1.45;group.add(title);world.add(group);return group;
  });
  const runtime=new THREE.Group();world.add(runtime);
  const serviceGeometry=new RoundedBoxGeometry(1.45,1.1,.35,3,.09);
  const serviceMaterial=new THREE.MeshPhysicalMaterial({color:0x122b45,metalness:.65,roughness:.24,clearcoat:1,transparent:true,opacity:.95});
  const serviceNames=['EXPERIENCE','API GATEWAY','IDENTITY','WORKFLOWS','DATA LAYER','OBSERVABILITY'];
  const services=nodes.map((pos,i)=>{
    const group=new THREE.Group();group.position.copy(pos);
    const body=new THREE.Mesh(serviceGeometry,serviceMaterial);group.add(body);
    const edges=new THREE.LineSegments(new THREE.EdgesGeometry(serviceGeometry,25),new THREE.LineBasicMaterial({color:0x74b9e6,transparent:true,opacity:.7}));group.add(edges);
    const title=label(serviceNames[i]);title.position.set(0,-.85,.2);title.scale.multiplyScalar(.65);group.add(title);
    for(let j=0;j<4;j++) {const line=new THREE.Mesh(new THREE.BoxGeometry(.55+(j%2)*.35,.025,.01),materials[i%3]);line.position.set(-.12,.25-j*.14,.19);group.add(line);}
    const led=new THREE.Mesh(new THREE.SphereGeometry(.045,8,6),materials[1]);led.position.set(.52,.35,.22);group.add(led);
    runtime.add(group);return group;
  });
  const links=[[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[0,4],[4,2]];
  const linksGeometry=new THREE.BufferGeometry();const positions=new Float32Array(links.length*6);
  linksGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const linksMaterial=new THREE.LineBasicMaterial({color:0x63c9ee,transparent:true,opacity:.5});
  const connections=new THREE.LineSegments(linksGeometry,linksMaterial);world.add(connections);
  const packets=links.map((_,i)=>{const packet=new THREE.Mesh(new THREE.SphereGeometry(.055,8,6),materials[i%3]);world.add(packet);return packet;});
  const grid=new THREE.GridHelper(70,45,0x204c68,0x102c42);grid.position.set(0,-3,-15);world.add(grid);
  const starsGeometry=new THREE.BufferGeometry();const starPositions=new Float32Array(180*3);
  for(let i=0;i<180;i++){starPositions.set([Math.sin(i*12.37)*18,Math.cos(i*4.79)*10,-i*.22],i*3);}
  starsGeometry.setAttribute('position',new THREE.BufferAttribute(starPositions,3));
  const stars=new THREE.Points(starsGeometry,new THREE.PointsMaterial({color:0x80bce9,size:.035,transparent:true,opacity:.45}));scene.add(stars);
  const portal=new THREE.Group();world.add(portal);portal.position.z=1;
  // A finished software workspace, rather than a frame around an abstract object.
  const productCanvas=document.createElement('canvas');productCanvas.width=1600;productCanvas.height=960;
  const ui=productCanvas.getContext('2d')!;
  const rect=(x:number,y:number,w:number,h:number,r:number,fill:string,stroke?:string)=>{
    ui.beginPath();ui.roundRect(x,y,w,h,r);ui.fillStyle=fill;ui.fill();
    if(stroke){ui.strokeStyle=stroke;ui.lineWidth=2;ui.stroke();}
  };
  const text=(value:string,x:number,y:number,size:number,color='#e5edf8',weight=400)=>{
    ui.font=`${weight} ${size}px system-ui, sans-serif`;ui.fillStyle=color;ui.fillText(value,x,y);
  };
  rect(0,0,1600,960,28,'#0c1728','#344b65');
  rect(0,0,1600,82,28,'#132136');
  text('KHNCO.',38,52,26,'#eef5ff',700);
  text('PRODUCT WORKSPACE',230,50,15,'#829bb7',600);
  rect(1330,24,230,34,17,'#153d3b');text('●  Release ready',1360,47,16,'#9ce0cb',500);
  ui.fillStyle='#26374d';ui.fillRect(0,82,1600,1);ui.fillRect(242,83,1,877);
  text('WORKSPACE',30,138,13,'#718ba8',600);
  ['Overview','Product roadmap','Delivery','Insights'].forEach((item,i)=>{
    if(i===0)rect(18,161,204,54,9,'#203852');
    rect(34,180+i*67,14,14,4,i===0?'#9ac9f5':'#526e8d');
    text(item,64,193+i*67,17,i===0?'#e5f0ff':'#91a6be',i===0?600:400);
  });
  text('DESIGNED FOR IMPACT',30,891,12,'#718ba8',600);
  text('Platform overview',290,159,37,'#eff5ff',600);
  text('From clear direction to confident delivery.',292,200,19,'#8fa5bd');
  const metrics=[['STRATEGY','Aligned','A shared product direction'],['DELIVERY','Connected','Teams, services & workflows'],['QUALITY','Validated','Ready for the next chapter']];
  metrics.forEach(([name,value,detail],i)=>{
    const x=292+i*420;rect(x,244,396,168,14,'#132237','#2a3d55');
    text(name,x+24,281,13,'#8faac6',600);text(value,x+24,332,32,'#dcecff',600);text(detail,x+24,378,16,'#8fa5bd');
  });
  rect(292,444,804,346,14,'#111f32','#2a3d55');
  text('One connected product',318,489,23,'#e0ecfa',600);
  text('A clear path from insight to impact',318,522,16,'#8fa5bd');
  ui.strokeStyle='#365976';ui.lineWidth=3;ui.beginPath();ui.moveTo(405,626);ui.lineTo(982,626);ui.stroke();
  ['Discover','Build','Validate','Launch'].forEach((name,i)=>{
    const x=402+i*192;rect(x-28,598,56,56,14,i===3?'#91cbd7':'#233e59');
    text(String(i+1).padStart(2,'0'),x-13,634,19,i===3?'#0d2435':'#c0dbf5',600);
    ui.textAlign='center';text(name,x,692,17,'#c7d9eb',500);ui.textAlign='left';
  });
  rect(1120,444,408,346,14,'#111f32','#2a3d55');text('Release checklist',1144,489,22,'#e0ecfa',600);
  ['Experience aligned','Services connected','Quality reviewed','Operations ready'].forEach((name,i)=>{
    text('✓',1148,548+i*59,20,'#8bd5c0',600);text(name,1182,548+i*59,17,'#bdccdf');
  });
  rect(292,820,1236,88,12,'#172c40');
  text('Built to evolve.',318,872,24,'#e3f0ff',600);text('Product leadership. Engineering clarity. Lasting impact.',535,870,18,'#9db4cd');
  const productTexture=new THREE.CanvasTexture(productCanvas);productTexture.colorSpace=THREE.SRGBColorSpace;
  productTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());textures.push(productTexture);
  const shell=new THREE.Mesh(new RoundedBoxGeometry(5.85,3.53,.09,4,.055),new THREE.MeshPhysicalMaterial({color:0x263e55,metalness:.5,roughness:.4}));portal.add(shell);
  const surface=new THREE.Mesh(new THREE.PlaneGeometry(5.8,3.48),new THREE.MeshBasicMaterial({map:productTexture,toneMapped:false}));surface.position.z=.055;portal.add(surface);
  const scan=new THREE.Mesh(new THREE.PlaneGeometry(8,.025),new THREE.MeshBasicMaterial({color:0x9effdc,transparent:true,opacity:.8,side:THREE.DoubleSide}));scan.position.z=.5;world.add(scan);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let progress=0,opened=0,disposed=false,visible=true,frame=0,previous=0,time=0;
  const ease=(n:number)=>{n=THREE.MathUtils.clamp(n,0,1);return n*n*(3-2*n);};
  const mix=THREE.MathUtils.lerp;
  function draw() {
    if(disposed)return;
    const p=progress*5,gather=ease(p),map=ease(p-1),assemble=ease(p-2),validate=ease(p-3),launch=ease(p-4);
    const portrait=camera.aspect<.8;
    // Move through the field, not just past flat slides. Foreground signals cross the lens.
    camera.position.set(Math.sin(progress*Math.PI*2)*.75*(1-opened),1.3-progress*.9,(portrait?16:12)-progress*1.15-opened*6);
    camera.lookAt(0,.35,-.7);
    world.rotation.y=Math.sin(progress*Math.PI)*.15;
    signals.forEach((signal,i)=>{
      const a=i*2.399,n=Math.floor(i/3),category=i%3,center=centers[category];
      const scattered=[Math.cos(a)*(3+(i%9)*.37),Math.sin(a)*3.4,Math.sin(i*1.7)*5];
      const clustered=[center.x+Math.cos(a)*.85,center.y+Math.sin(a)*.85,center.z+Math.sin(n)*.55];
      const node=nodes[i%6];const arranged=[node.x+Math.cos(a)*.45,node.y+Math.sin(a)*.3,node.z];
      const sway=reduced.matches?0:Math.sin(time*.6+i)*.025*(1-assemble);
      signal.position.set(...scattered.map((v,j)=>mix(mix(v,clustered[j],gather),arranged[j],map)+(j===1?sway:0)) as [number,number,number]);
      signal.scale.setScalar((.65+(i%4)*.2)*(1-assemble*.8));signal.visible=launch<.6;
    });
    clusters.forEach((cluster,i)=>{cluster.visible=p>.25&&p<2.8;cluster.scale.setScalar(Math.max(.001,gather*(1-map*.9)));cluster.rotation.y=(reduced.matches?0:time*.045)*(i%2?1:-1);});
    runtime.visible=p>1.2&&launch<.98;serviceMaterial.opacity=.95*(1-launch);services.forEach((service,i)=>{
      service.scale.setScalar(Math.max(.001,map));service.position.copy(nodes[i]);service.position.z+=assemble*(i%2?-.65:.4)-launch*3;
      service.position.x*=1+launch*.9;service.rotation.y=(1-assemble)*(i%2?-.3:.3);
    });
    links.forEach(([a,b],i)=>{const start=services[a].position,end=services[b].position;positions.set([start.x,start.y,start.z,end.x,end.y,end.z],i*6);const travel=reduced.matches?.5:(time*.23+i*.17+progress*3)%1;packets[i].position.lerpVectors(start,end,travel);packets[i].visible=p>2.1&&launch<.8;});
    linksGeometry.attributes.position.needsUpdate=true;linksGeometry.computeBoundingSphere();connections.visible=p>1.2;linksMaterial.opacity=map*.6*(1-launch);
    (grid.material as THREE.Material).transparent=true;(grid.material as THREE.Material).opacity=1-launch*.92;
    scan.visible=p>3.1&&p<4.2;scan.position.y=2.3-validate*4.6;
    portal.visible=p>4;portal.scale.setScalar(Math.max(.001,launch)*(1+opened*1.6));portal.position.z=1+opened*2;
    portal.rotation.y=-.035*launch*(1-opened);portal.rotation.x=.015*launch*(1-opened);
    renderer.render(scene,camera);
  }
  function tick(now:number){frame=0;if(disposed||!visible||document.hidden)return;time+=Math.min((now-previous)/1000,.05);previous=now;draw();if(!reduced.matches)frame=requestAnimationFrame(tick);}
  function wake(){if(!frame&&!disposed&&visible&&!document.hidden){previous=performance.now();frame=requestAnimationFrame(tick);}}
  const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;}});visibility.observe(host);
  const change=()=>{cancelAnimationFrame(frame);frame=0;wake();};document.addEventListener('visibilitychange',change);reduced.addEventListener('change',change);
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();draw();};
  const observer=new ResizeObserver(resize);observer.observe(host);resize();wake();
  return {update(p:number,o=0){progress=p;opened=o;if(visible)draw();},dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();document.removeEventListener('visibilitychange',change);reduced.removeEventListener('change',change);const geometries=new Set<THREE.BufferGeometry>(),mats=new Set<THREE.Material>();scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.LineSegments||object instanceof THREE.Points){geometries.add(object.geometry);}if('material' in object){const material=object.material as THREE.Material|THREE.Material[];(Array.isArray(material)?material:[material]).forEach(m=>mats.add(m));}});geometries.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove();}};
}
