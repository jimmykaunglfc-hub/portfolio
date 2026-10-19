'use client';

import { useEffect, useRef } from 'react';

/** Shader-rendered silk ribbons: a single full-screen triangle pair, no dependencies. */
export default function SignalField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    const shader = (type: number, source: string) => {
      const result = gl.createShader(type);
      if (!result) return null;
      gl.shaderSource(result, source); gl.compileShader(result);
      if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) { gl.deleteShader(result); return null; }
      shaders.push(result); return result;
    };
    const vertex = shader(gl.VERTEX_SHADER, 'attribute vec2 a_position; void main(){gl_Position=vec4(a_position,0.,1.);}');
    const fragment = shader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_pointer;
      uniform float u_time;
      uniform float u_light;
      void main() {
        vec2 uv = gl_FragCoord.xy/u_resolution;
        vec2 p = (uv-.5)*vec2(u_resolution.x/u_resolution.y,1.);
        p += (u_pointer-.5)*.065;
        float t = u_time*.14;
        vec3 color = vec3(0.);
        float intensity = 0.;
        for(int i=0;i<18;i++) {
          float f=float(i)/18.;
          float wave=sin(p.x*2.4+t+f*3.1)*.20+sin(p.x*4.1-t*.75+f*2.)*.06;
          float y=wave+(f-.5)*.47;
          float d=abs(p.y-y);
          float line=.0015/max(d,.0015);
          float halo=exp(-d*18.)*.045;
          float fade=smoothstep(-.85,-.1,p.x)*(1.-smoothstep(.7,1.5,p.x));
          vec3 ink=mix(vec3(.20,.40,1.),vec3(.26,.79,.86),f);
          ink=mix(ink,vec3(.64,.49,.92),smoothstep(.7,1.,f)*.6);
          color+=ink*(line*.33+halo)*fade;
          intensity+=(line*.33+halo)*fade;
        }
        float glow=exp(-length(p-vec2(.45,.0))*2.5)*.14;
        color+=vec3(.13,.3,.65)*glow;
        vec3 lightInk=mix(vec3(.13,.31,.66),vec3(.10,.48,.61),uv.y);
        float lightAlpha=min(intensity*.9+glow*.45,.68);
        gl_FragColor=mix(vec4(color, min(intensity*.36+glow,.85)),vec4(lightInk,lightAlpha),u_light);
      }
    `);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) { shaders.forEach((item) => gl.deleteShader(item)); return; }
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { shaders.forEach((item) => gl.deleteShader(item)); gl.deleteProgram(program); return; }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'u_resolution');
    const time = gl.getUniformLocation(program, 'u_time');
    const pointer = gl.getUniformLocation(program, 'u_pointer');
    const light = gl.getUniformLocation(program, 'u_light');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const target = { x: .5, y: .5 }, current = { x: .5, y: .5 };
    let frame = 0, visible = true, elapsed = 0, previous = 0, lastDraw = 0;
    const resize = () => {
      const density = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(canvas.clientWidth * density); canvas.height = Math.round(canvas.clientHeight * density);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const render = (stamp: number) => {
      frame = 0;
      if (!visible || document.hidden) { previous = 0; return; }
      const interval = canvas.clientWidth < 768 ? 1000 / 24 : 1000 / 40;
      if (stamp - lastDraw >= interval || motion.matches) {
        elapsed += previous && !motion.matches ? Math.min(stamp - previous, 60) / 1000 : 0;
        previous = stamp; lastDraw = stamp;
        current.x += (target.x-current.x)*.05; current.y += (target.y-current.y)*.05;
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform2f(pointer, current.x, current.y); gl.uniform1f(time, elapsed);
        gl.uniform1f(light, document.documentElement.classList.contains('dark') ? 0 : 1);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      if (!motion.matches) frame = requestAnimationFrame(render);
    };
    const resume = () => { if (!frame) frame = requestAnimationFrame(render); };
    const move = (event: PointerEvent) => { const bounds = canvas.getBoundingClientRect(); target.x=(event.clientX-bounds.left)/bounds.width; target.y=1-(event.clientY-bounds.top)/bounds.height; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) resume(); });
    observer.observe(canvas);
    const resized = () => { resize(); resume(); };
    const themeObserver = new MutationObserver(resume);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    resize(); resume();
    window.addEventListener('resize', resized); window.addEventListener('pointermove', move, { passive:true });
    document.addEventListener('visibilitychange', resume); motion.addEventListener('change', resume);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); themeObserver.disconnect(); window.removeEventListener('resize', resized); window.removeEventListener('pointermove', move); document.removeEventListener('visibilitychange', resume); motion.removeEventListener('change', resume); gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach((item) => gl.deleteShader(item)); };
  }, []);
  return <canvas ref={ref} className="signal-field" aria-hidden="true" />;
}
