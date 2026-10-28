import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** Procedural studio lighting and quiet peripheral streams; no downloaded HDR assets. */
export function createJourneyStudio(scene:THREE.Scene,renderer:THREE.WebGLRenderer){
 const room=new RoomEnvironment(),generator=new THREE.PMREMGenerator(renderer);
 const environment=generator.fromScene(room,.06);room.dispose();generator.dispose();
 scene.environment=environment.texture;scene.environmentIntensity=.65;
 const group=new THREE.Group();scene.add(group);
 const atmosphere=new THREE.ShaderMaterial({
  transparent:true,depthTest:true,depthWrite:false,
  uniforms:{time:{value:0},aspect:{value:1},fade:{value:1},focus:{value:0}},
  vertexShader:'varying vec2 uvPos; void main(){uvPos=uv;gl_Position=vec4(position.xy,0.999,1.);}',
  fragmentShader:`varying vec2 uvPos;uniform float time;uniform float aspect;uniform float fade;uniform float focus;
   void main(){
    vec2 p=uvPos-.5;
    float left=exp(-length((p-vec2(-.45,-.10))*vec2(2.8,3.8))*3.6);
    float right=exp(-length((p-vec2(.48,-.03))*vec2(3.,4.))*3.5);
    float horizon=exp(-pow((p.y+.28)*29.,2.))*exp(-p.x*p.x*4.);
    float haze=exp(-dot(p*vec2(1.7,3.2),p*vec2(1.7,3.2)));
    float drift=.94+.06*sin(time*.08+p.x*3.);
    vec3 navy=vec3(.018,.030,.054);
    vec3 color=navy+vec3(.025,.075,.13)*left*drift+vec3(.055,.035,.105)*right;
    color+=vec3(.025,.085,.09)*haze*.28+vec3(.075,.13,.18)*horizon*.15;
    color=mix(color,navy+haze*vec3(.014,.025,.04),focus*.35);
    float vignette=1.-.28*smoothstep(.25,.8,length(p*vec2(1.,.9)));
    gl_FragColor=vec4(color*vignette,fade);
   }`,
 });
 const backdrop=new THREE.Mesh(new THREE.PlaneGeometry(2,2),atmosphere);backdrop.frustumCulled=false;backdrop.renderOrder=-100;group.add(backdrop);
 const sphere=new THREE.SphereGeometry(1,20,14);
 const finishes=[
  new THREE.MeshPhysicalMaterial({color:0x91c5eb,metalness:.12,roughness:.14,clearcoat:1,transparent:true,opacity:.43,depthWrite:false,envMapIntensity:1.5}),
  new THREE.MeshPhysicalMaterial({color:0x75b8b7,metalness:.8,roughness:.31,clearcoat:.3,transparent:true,opacity:.65}),
  new THREE.MeshPhysicalMaterial({color:0xa59bcf,metalness:.15,roughness:.28,clearcoat:1,transparent:true,opacity:.65}),
 ];
 const streams=finishes.map(material=>{const mesh=new THREE.InstancedMesh(sphere,material,24);mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;group.add(mesh);return mesh;});
 const transform=new THREE.Object3D();
 const floorMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{fade:{value:.2}},
  vertexShader:'varying vec2 coord;void main(){coord=uv-.5;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'varying vec2 coord;uniform float fade;void main(){float a=exp(-dot(coord*7.,coord*7.));gl_FragColor=vec4(.09,.21,.29,a*fade);}',
 });
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(14,10),floorMaterial);floor.rotation.x=-Math.PI/2;floor.position.set(0,-2.9,-.7);group.add(floor);
 return {
  update(progress:number,opened:number,time:number,camera:THREE.PerspectiveCamera){
   const focus=THREE.MathUtils.smoothstep(progress,.58,.78),fade=1-opened;
   atmosphere.uniforms.time.value=time;atmosphere.uniforms.aspect.value=camera.aspect;atmosphere.uniforms.fade.value=fade;atmosphere.uniforms.focus.value=focus;
   floorMaterial.uniforms.fade.value=(.16+focus*.12)*fade;
   const compact=camera.aspect<.8,count=compact?12:24;
   streams.forEach((mesh,lane)=>{
    // Remove the two distracting bead-like side clusters; retain only the studio lighting.
    mesh.visible=false;mesh.count=count;finishes[lane].opacity=(lane===0?.43:.65)*(1-focus*.8)*fade;
    for(let i=0;i<count;i++){
     const side=i%2?1:-1,t=(i/2)/(count/2),phase=t*Math.PI*2+lane*.8+time*.025+progress*.7;
     const z=-3-t*7;
     const halfWidth=(camera.position.z-z)*Math.tan(22*Math.PI/180)*camera.aspect;
     // Keep silhouettes in the outer quarter of the screen, clear of headings and the sculpture.
     transform.position.set(side*halfWidth*(.78+.09*Math.sin(phase)),Math.sin(phase)*1.05-.55,z);
     transform.rotation.set(phase,phase*.4,0);transform.scale.setScalar((.045+(i%5)*.025)*(1-focus*.35));transform.updateMatrix();mesh.setMatrixAt(i,transform.matrix);
    }
    mesh.instanceMatrix.needsUpdate=true;
   });
  },
  dispose(){scene.environment=null;environment.dispose();streams.forEach(mesh=>mesh.dispose());},
 };
}
