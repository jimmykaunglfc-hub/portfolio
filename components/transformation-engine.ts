import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type EngineController = { dispose: () => void; setPaused: (paused: boolean) => void; selectStage: (stage: number) => void };

/** Procedural geometry: no remote models, textures, or HDR requests. */
export function createTransformationEngine(host: HTMLElement, onStage: (stage: number) => void): EngineController | null {
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 3.4, -3.4, .1, 60);
  camera.position.set(3, 6.5, 11); camera.lookAt(0, .3, 0);
  const rig = new THREE.Group(); scene.add(rig);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose(); pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xeaf4ff, 0x243857, 2.5));
  const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(-3, 8, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x8dd5ff, 3); rim.position.set(4, 3, -4); scene.add(rim);

  const titanium = new THREE.MeshStandardMaterial({ color: 0x879bb6, metalness: .78, roughness: .28 });
  const silver = new THREE.MeshStandardMaterial({ color: 0xd3dfed, metalness: .65, roughness: .23 });
  const sapphire = new THREE.MeshPhysicalMaterial({ color: 0x347ac0, metalness: .12, roughness: .14, transmission: .45, thickness: .65, ior: 1.45, clearcoat: 1 });
  const inset = new THREE.MeshStandardMaterial({ color: 0x122e51, metalness: .5, roughness: .35 });
  const channel = new THREE.MeshStandardMaterial({ color: 0x3b91c5, emissive: 0x3486c2, emissiveIntensity: .35, metalness: .4, roughness: .3 });
  const light = new THREE.MeshBasicMaterial({ color: 0xa6edff });
  const feedback = new THREE.MeshBasicMaterial({ color: 0x679bbb, transparent: true, opacity: .55 });
  const redundant = new THREE.MeshBasicMaterial({ color: 0x7494ac, transparent: true, opacity: .35 });
  const materials: THREE.Material[] = [titanium, silver, sapphire, inset, channel, light, feedback, redundant];
  const geometries: THREE.BufferGeometry[] = [];
  function box(parent: THREE.Group, x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.Material, radius = .06) {
    const geometry = new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, h / 3)); geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(x, y, z); parent.add(mesh); return mesh;
  }
  const platforms: THREE.Group[] = [];
  const modules: { object: THREE.Group; stage: number; order: number }[] = [];
  const indicators: THREE.MeshStandardMaterial[] = [];
  [-2.7, 0, 2.7].forEach((x) => {
    const platform = new THREE.Group(); platform.position.x = x; rig.add(platform); platforms.push(platform);
    box(platform, 0, 0, 0, 2.16, .2, 2.05, titanium);
    box(platform, 0, .13, 0, 1.98, .09, 1.87, inset);
    const indicator = new THREE.MeshStandardMaterial({ color: 0x78c5ff, emissive: 0x4a9bdd, emissiveIntensity: .7, roughness: .25 });
    materials.push(indicator); indicators.push(indicator);
    box(platform, 0, .02, 1.03, .72, .035, .025, indicator, .01);
    [-.86, .86].forEach((dx) => box(platform, dx, .185, .8, .08, .02, .08, silver, .01));
  });
  function module(stage: number, x: number, z: number, w: number, h: number, order: number) {
    const group = new THREE.Group(); group.position.set(x, .19, z); platforms[stage].add(group);
    box(group, 0, .035, 0, w + .12, .07, w + .12, silver);
    box(group, 0, h / 2 + .07, 0, w, h, w, sapphire);
    box(group, 0, h + .095, 0, w + .025, .05, w + .025, silver);
    box(group, 0, .1, w / 2 + .01, w * .65, .035, .025, light, .01);
    modules.push({ object: group, stage, order });
  }
  module(0, -.47, -.43, .43, .42, 0); module(0, .45, -.22, .5, .67, 1); module(0, -.25, .49, .4, .32, 2);
  module(1, -.48, -.42, .42, .42, 0); module(1, .4, -.4, .45, .66, 1); module(1, 0, .45, .56, .48, 2);
  module(2, 0, 0, .95, .65, 0);
  box(platforms[2], 0, 1.02, 0, .64, .07, .64, sapphire);
  type Path = { curve: THREE.CatmullRomCurve3; bead: THREE.Mesh; stage: number; offset: number };
  const paths: Path[] = [];
  const beadGeometry = new THREE.SphereGeometry(.047, 10, 8); geometries.push(beadGeometry);
  function route(points: number[][], material: THREE.Material, stage: number, moving = true, radius = .022) {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)), false, 'centripetal');
    const geometry = new THREE.TubeGeometry(curve, 40, radius, 6, false); geometries.push(geometry);
    rig.add(new THREE.Mesh(geometry, material));
    if (moving) { const bead = new THREE.Mesh(beadGeometry, light); rig.add(bead); paths.push({ curve, bead, stage, offset: paths.length * .21 }); }
  }
  route([[-2.7,.23,0],[-1.55,.23,0],[-1.2,.23,0],[0,.23,0],[1.2,.23,0],[1.55,.23,0],[2.7,.23,0]], channel, 1, true, .045);
  route([[-3.17,.25,-.43],[-2.95,.25,-.12],[-2.7,.25,0]], channel, 0);
  route([[-2.25,.25,-.22],[-2.5,.25,-.1],[-2.7,.25,0]], channel, 0);
  route([[-2.95,.25,.49],[-2.9,.25,.18],[-2.7,.25,0]], channel, 0);
  route([[-.48,.25,-.42],[-.48,.25,0],[0,.25,.45],[.4,.25,0],[.4,.25,-.4]], channel, 1);
  route([[2.7,.22,.55],[2.7,.22,1.3],[2.3,.22,1.65],[-2.3,.22,1.65],[-2.7,.22,1.3],[-2.7,.22,.55]], feedback, 2, true, .018);
  route([[-.9,.21,.1],[-.8,.21,1.05],[.1,.21,1.15],[.9,.21,.9],[.9,.21,.1]], redundant, 2, false, .014);

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let elapsed = 0, lastStamp = 0, lastDraw = 0, currentStage = -1;
  let paused = false, visible = true, lost = false, disposed = false;
  const pointer = new THREE.Vector2(), position = new THREE.Vector3();
  function draw(stamp: number) {
    if (disposed || lost) return;
    const running = !paused && !motion.matches;
    if (running && lastStamp) elapsed += Math.min((stamp - lastStamp) / 1000, .08);
    lastStamp = stamp;
    if (running && stamp - lastDraw < 1000 / 30) return;
    lastDraw = stamp;
    const cycle = elapsed % 18, stage = Math.floor(cycle / 6);
    if (stage !== currentStage) { currentStage = stage; onStage(stage); }
    rig.rotation.y += ((motion.matches ? 0 : pointer.x * .07) - rig.rotation.y) * .06;
    rig.rotation.x += ((motion.matches ? 0 : pointer.y * .025) - rig.rotation.x) * .06;
    modules.forEach(({ object, stage: moduleStage, order }) => {
      const local = cycle - moduleStage * 6 - order * .22;
      const lift = !motion.matches && local >= 0 && local < 2.4 ? .22 * Math.pow(1 - local / 2.4, 3) : 0;
      object.position.y = .19 + lift;
    });
    indicators.forEach((material, index) => { material.emissiveIntensity = index === stage ? 1.6 : .3; });
    redundant.opacity = motion.matches ? .08 : .35 * (1 - THREE.MathUtils.smoothstep(cycle, 12, 16));
    paths.forEach(({ curve, bead, stage: pathStage, offset }) => {
      curve.getPointAt((elapsed * .16 + offset) % 1, position); bead.position.copy(position);
      bead.visible = !motion.matches && pathStage === stage;
    });
    renderer.render(scene, camera);
  }
  function resume() {
    lastStamp = 0; lastDraw = 0; renderer.setAnimationLoop(null);
    if (lost || disposed || !visible || document.hidden) return;
    draw(performance.now());
    if (!paused && !motion.matches) renderer.setAnimationLoop(draw);
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect(); if (!width || !height) return;
    const aspect = width / height, halfHeight = Math.max(2.65, 4.8 / aspect);
    camera.left = -halfHeight * aspect; camera.right = halfHeight * aspect; camera.top = halfHeight; camera.bottom = -halfHeight;
    camera.updateProjectionMatrix(); renderer.setSize(width, height, false); resume();
  }
  function theme() {
    const dark = document.documentElement.classList.contains('dark');
    titanium.color.set(dark ? 0x879bb6 : 0x657e9c); inset.color.set(dark ? 0x122e51 : 0xbed1e5);
    channel.color.set(dark ? 0x3b91c5 : 0x2264a4); light.color.set(dark ? 0xa6edff : 0x2672b8);
    renderer.toneMappingExposure = dark ? 1.35 : 1.05; resume();
  }
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const rect = host.getBoundingClientRect(); pointer.set((event.clientX - rect.left) / rect.width - .5, (event.clientY - rect.top) / rect.height - .5);
  };
  const leave = () => pointer.set(0, 0);
  const contextLost = (event: Event) => { event.preventDefault(); lost = true; renderer.setAnimationLoop(null); };
  const contextRestored = () => { lost = false; resume(); };
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
  const size = new ResizeObserver(resize), themes = new MutationObserver(theme);
  intersection.observe(host); size.observe(host);
  themes.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  host.addEventListener('pointermove', move, { passive: true }); host.addEventListener('pointerleave', leave);
  renderer.domElement.addEventListener('webglcontextlost', contextLost); renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
  document.addEventListener('visibilitychange', resume); motion.addEventListener('change', resume);
  resize(); theme();
  return {
    setPaused(value) { paused = value; resume(); },
    selectStage(value) { elapsed = THREE.MathUtils.clamp(value, 0, 2) * 6; resume(); },
    dispose() {
      disposed = true; renderer.setAnimationLoop(null);
      intersection.disconnect(); size.disconnect(); themes.disconnect();
      host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', resume); motion.removeEventListener('change', resume);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost); renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
      geometries.forEach((geometry) => geometry.dispose()); materials.forEach((material) => material.dispose());
      environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
