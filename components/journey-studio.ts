import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** Isolated holographic background. Never owns scroll or foreground animation state. */
export function createJourneyStudio(scene:THREE.Scene,renderer:THREE.WebGLRenderer){
 const room=new RoomEnvironment(),generator=new THREE.PMREMGenerator(renderer);
 const environment=generator.fromScene(room,.06);room.dispose();generator.dispose();
 scene.environment=environment.texture;scene.environmentIntensity=.65;
 const group=new THREE.Group();scene.add(group);
 const atmosphere=new THREE.ShaderMaterial({
  transparent:true,depthTest:true,depthWrite:false,
  uniforms:{time:{value:0},aspect:{value:1},fade:{value:1},focus:{value:0},progress:{value:0}},
  vertexShader:'varying vec2 uvPos; void main(){uvPos=uv;gl_Position=vec4(position.xy,0.999,1.);}',
  fragmentShader:`varying vec2 uvPos;uniform float time;uniform float aspect;uniform float fade;uniform float focus;uniform float progress;
   float segment(vec2 p,vec2 a,vec2 b){vec2 d=b-a;float t=clamp(dot(p-a,d)/max(dot(d,d),.00001),0.,1.);return length(p-a-t*d);}
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
    float stage=progress*5.;
    float organised=smoothstep(.6,2.,stage);
    float operating=smoothstep(2.,2.8,stage)*(1.-smoothstep(3.2,3.8,stage));
    float validating=smoothstep(3.4,3.8,stage)*(1.-smoothstep(4.3,4.6,stage));
    float launched=smoothstep(4.3,5.,stage);
    // Projected floor: line spacing compresses into a soft horizon below the subject.
    float depth=max(.025,.43-uvPos.y);
    vec2 ground=vec2(p.x*aspect/depth,.24/depth+progress*.35);
    vec2 cell=abs(fract(ground-.5)-.5);
    vec2 aa=max(fwidth(ground),vec2(.001));
    vec2 gridLine=1.-smoothstep(vec2(0.),aa*1.2,cell);
    float floorMask=(1.-smoothstep(.35,.44,uvPos.y))*smoothstep(.02,.15,uvPos.y)*exp(-abs(p.x)*1.1);
    color+=vec3(.09,.27,.36)*max(gridLine.x,gridLine.y)*floorMask*(.28+organised*.12)*(1.-launched*.65);
    // Blueprint routes remain in the peripheral lanes; the central sculpture stays clear.
    vec2 q=vec2(p.x*aspect,p.y);
    float peripheral=smoothstep(.21,.38,abs(p.x));
    for(int i=0;i<6;i++){
     float n=float(i),side=mod(n,2.)<.5?-1.:1.;
     float row=floor(n*.5);
     float y=-.19+row*.115;
     vec2 a=vec2(side*aspect*.49,y-.05*(1.-organised));
     vec2 b=vec2(side*aspect*.37,y);
     vec2 c=vec2(side*aspect*.29,y+.05);
     float line=min(segment(q,a,b),segment(q,b,c));
     float width=max(fwidth(q.x),.0007);
     float ink=1.-smoothstep(width,width*2.4,line);
     float dotted=mix(step(.55,fract((q.x+q.y)*75.)),1.,organised);
     vec3 tint=mod(row,2.)<.5?vec3(.12,.43,.51):vec3(.28,.24,.48);
     color+=tint*ink*dotted*peripheral*(.23+organised*.26)*(1.-focus*.65);
     float travel=fract(time*.10+n*.17);
     vec2 signal=travel<.5?mix(a,b,travel*2.):mix(b,c,(travel-.5)*2.);
     float pulse=exp(-length(q-signal)*380.);
     color+=vec3(.36,.8,.86)*pulse*operating*peripheral*.6;
     float node=exp(-length(q-c)*430.);
     color+=tint*node*peripheral*.8*(1.-focus*.6);
    }
    // A gentle scanning field, then a stationary halo for the finished product.
    float scanY=mix(.65,.27,clamp((stage-3.65)/.65,0.,1.));
    color+=vec3(.08,.36,.29)*exp(-abs(uvPos.y-scanY)*150.)*validating*peripheral*.28;
    float radius=length(vec2(p.x*aspect,p.y+.015));
    float halo=exp(-pow((radius-.225)*27.,2.));
    color+=vec3(.055,.16,.21)*halo*launched*.42;
    float vignette=1.-.28*smoothstep(.25,.8,length(p*vec2(1.,.9)));
    gl_FragColor=vec4(color*vignette,fade);
   }`,
 });
 const backdrop=new THREE.Mesh(new THREE.PlaneGeometry(2,2),atmosphere);backdrop.frustumCulled=false;backdrop.renderOrder=-100;group.add(backdrop);
 const floorMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{fade:{value:.2}},
  vertexShader:'varying vec2 coord;void main(){coord=uv-.5;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'varying vec2 coord;uniform float fade;void main(){float a=exp(-dot(coord*7.,coord*7.));gl_FragColor=vec4(.09,.21,.29,a*fade);}',
 });
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(14,10),floorMaterial);floor.rotation.x=-Math.PI/2;floor.position.set(0,-2.9,-.7);group.add(floor);
 return {
  update(progress:number,opened:number,time:number,camera:THREE.PerspectiveCamera){
   const focus=THREE.MathUtils.smoothstep(progress,.58,.78),fade=1-opened;
   atmosphere.uniforms.time.value=time;atmosphere.uniforms.aspect.value=camera.aspect;atmosphere.uniforms.fade.value=fade;atmosphere.uniforms.focus.value=focus;
   atmosphere.uniforms.progress.value=progress;
   floorMaterial.uniforms.fade.value=(.16+focus*.12)*fade;
  },
  dispose(){scene.environment=null;environment.dispose();},
 };
}
