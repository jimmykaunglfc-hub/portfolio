'use client';

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number; vx: number; vy: number; size: number };

/** A small WebGL signal field. It intentionally falls back to the CSS atmosphere if WebGL or motion is unavailable. */
export default function SignalField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const vertex = `attribute vec2 a_position; attribute float a_size; uniform vec2 u_resolution; void main(){ vec2 clip=(a_position/u_resolution)*2.0-1.0; gl_Position=vec4(clip.x,-clip.y,0,1); gl_PointSize=a_size; }`;
    const fragment = `precision mediump float; void main(){ vec2 p=gl_PointCoord-vec2(.5); float d=dot(p,p); if(d>.25) discard; gl_FragColor=vec4(.76,1.,.23,(.25-d)*3.4); }`;
    const makeShader = (type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); return shader; };
    const program = gl.createProgram()!;
    gl.attachShader(program, makeShader(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, makeShader(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program);
    const position = gl.getAttribLocation(program, 'a_position'); const size = gl.getAttribLocation(program, 'a_size'); const resolution = gl.getUniformLocation(program, 'u_resolution');
    const buffer = gl.createBuffer();
    const points: Point[] = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00022, vy: (Math.random() - .5) * .00022, size: 1.5 + Math.random() * 3.2 }));
    let frame = 0;
    const resize = () => { const ratio = Math.min(window.devicePixelRatio, 1.5); canvas.width = canvas.clientWidth * ratio; canvas.height = canvas.clientHeight * ratio; gl.viewport(0, 0, canvas.width, canvas.height); };
    const draw = () => { const data = new Float32Array(points.flatMap((point) => { point.x += point.vx; point.y += point.vy; if (point.x < 0 || point.x > 1) point.vx *= -1; if (point.y < 0 || point.y > 1) point.vy *= -1; return [point.x * canvas.width, point.y * canvas.height, point.size * Math.min(window.devicePixelRatio, 1.5)]; })); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 12, 0); gl.enableVertexAttribArray(size); gl.vertexAttribPointer(size, 1, gl.FLOAT, false, 12, 8); gl.uniform2f(resolution, canvas.width, canvas.height); gl.drawArrays(gl.POINTS, 0, points.length); frame = requestAnimationFrame(draw); };
    resize(); draw(); window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); gl.deleteBuffer(buffer); gl.deleteProgram(program); };
  }, []);
  return <canvas ref={ref} className="signal-field" aria-hidden="true" />;
}
