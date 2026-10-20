import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { OUTLINE, STAR } from "@/lib/kentucky-web";
import { COUNTY_ARCS } from "@/lib/ky-counties";
import { MARK } from "@/lib/mark-geometry";

// The 3D hero: the firm's Kentucky mark as a lit slab. Its top face carries live light flowing
// inside the real state outline (the same current as the 2D hero, drawn to a texture), the mark's
// node network stands just above it with pulses of light travelling along the links, and the star
// glows at Lexington. Scroll drives a camera flight from a wide three-quarter view down toward the
// star. Drawing units are the logo's (980 x 440); the scene uses 1 unit = 100 drawing units.

const W0 = 980;
const H0 = 440;
const S = 0.01;
const DEPTH = 0.32;

export type Ky3D = { setProgress: (p: number) => void; setPointer: (x: number, y: number) => void; dispose: () => void };

function pathPoints(d: string): [number, number][] {
  const n = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const pts: [number, number][] = [];
  for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]]);
  return pts;
}

// Drawing units (y down) to scene units (y up, centred on the state).
const toX = (x: number) => (x - W0 / 2) * S;
const toY = (y: number) => (H0 / 2 - y) * S;

function shapeFrom(pts: [number, number][]) {
  const s = new THREE.Shape();
  pts.forEach(([x, y], i) => (i ? s.lineTo(toX(x), toY(y)) : s.moveTo(toX(x), toY(y))));
  s.closePath();
  return s;
}

/** The flowing light, drawn in drawing units onto a canvas that becomes the slab's glow map. */
function makeFlow(scale: number) {
  const canvas = document.createElement("canvas");
  canvas.width = W0 * scale;
  canvas.height = H0 * scale;
  const ctx = canvas.getContext("2d")!;
  const CELL = 5;
  const cols = Math.ceil(W0 / CELL);
  const rows = Math.ceil(H0 / CELL);
  const mask = new Uint8Array(cols * rows);
  const cells: number[] = [];
  for (let r = 0; r < rows; r++) {
    const y = r * CELL + CELL / 2;
    const xs: number[] = [];
    for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) {
      const [xi, yi] = OUTLINE[i];
      const [xj, yj] = OUTLINE[j];
      if (yi > y !== yj > y) xs.push(((xj - xi) * (y - yi)) / (yj - yi) + xi);
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2)
      for (let c = Math.ceil(xs[k] / CELL); c * CELL + CELL / 2 < xs[k + 1]; c++) {
        mask[r * cols + c] = 1;
        cells.push(r * cols + c);
      }
  }
  const inside = (x: number, y: number) => {
    const c = (x / CELL) | 0;
    const r = (y / CELL) | 0;
    return c >= 0 && r >= 0 && c < cols && r < rows && mask[r * cols + c] === 1;
  };
  const N = 2600;
  const px = new Float32Array(N);
  const py = new Float32Array(N);
  const life = new Float32Array(N);
  const tone = new Uint8Array(N);
  const spawn = (i: number, t: number) => {
    const reach = 40 + Math.min(1, t / 3) * 900;
    for (let k = 0; k < 24; k++) {
      const cell = cells[(Math.random() * cells.length) | 0];
      const x = (cell % cols) * CELL + Math.random() * CELL;
      const y = ((cell / cols) | 0) * CELL + Math.random() * CELL;
      if (Math.hypot(x - STAR[0], y - STAR[1]) <= reach) {
        px[i] = x;
        py[i] = y;
        life[i] = 70 + Math.random() * 200;
        return;
      }
    }
    px[i] = STAR[0];
    py[i] = STAR[1];
    life[i] = 20;
  };
  for (let i = 0; i < N; i++) {
    spawn(i, 0);
    life[i] *= Math.random();
    tone[i] = Math.random() < 0.2 ? 1 : 0;
  }
  const counties = new Path2D(COUNTY_ARCS.map((a) => "M" + a.join(" ")).join(""));
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // stir: the pointer on the slab, in drawing units (or null), which swirls the current around it.
  const step = (t: number, pull: number, stir: { x: number; y: number } | null = null) => {
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0, 0, W0, H0);
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = "rgba(157,178,232,0.10)";
    ctx.stroke(counties);
    const paths = [new Path2D(), new Path2D()];
    for (let i = 0; i < N; i++) {
      const x = px[i];
      const y = py[i];
      const a = Math.sin(x * 0.0105 + t * 0.21) * 1.3 + Math.cos(y * 0.0142 - t * 0.17) * 1.2 + Math.sin((x + y) * 0.0061 + t * 0.09) * 0.9;
      const dx = STAR[0] - x;
      const dy = STAR[1] - y;
      const d = Math.hypot(dx, dy) + 1e-3;
      let sx = 0;
      let sy = 0;
      if (stir) {
        const qx = x - stir.x;
        const qy = y - stir.y;
        const q = qx * qx + qy * qy;
        if (q < 6400) {
          const f = (1 - q / 6400) * 2.4;
          sx = (-qy / Math.sqrt(q + 1)) * f;
          sy = (qx / Math.sqrt(q + 1)) * f;
        }
      }
      const nx = x + (Math.cos(a) + (dx / d) * pull + sx) * 0.7;
      const ny = y + (Math.sin(a) + (dy / d) * pull + sy) * 0.7;
      life[i] -= 1;
      if (life[i] <= 0 || !inside(nx, ny) || d < 6) {
        spawn(i, t);
        continue;
      }
      paths[tone[i]].moveTo(x, y);
      paths[tone[i]].lineTo(nx, ny);
      px[i] = nx;
      py[i] = ny;
    }
    ctx.lineCap = "round";
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = "rgba(242,241,236,0.55)";
    ctx.stroke(paths[0]);
    ctx.strokeStyle = "rgba(157,178,232,0.95)";
    ctx.stroke(paths[1]);
  };
  return { canvas, step };
}

export function mountKentucky3D(host: HTMLElement): Ky3D {
  const width = () => host.clientWidth;
  const height = () => host.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(width(), height());
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.2s ease";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Tone mapping darkens the clear colour; this value lands near the page ink (22, 27, 34) after it.
  scene.background = new THREE.Color(0x272c31);
  const camera = new THREE.PerspectiveCamera(32, width() / height(), 0.1, 100);

  // The slab.
  const flow = makeFlow(2);
  const flowTex = new THREE.CanvasTexture(flow.canvas);
  flowTex.colorSpace = THREE.SRGBColorSpace;
  flowTex.anisotropy = 8;
  // Cap UVs are scene coordinates; map them back onto the drawing-unit canvas.
  flowTex.repeat.set(1 / (W0 * S), 1 / (H0 * S));
  flowTex.offset.set(0.5, 0.5);
  const slabGeo = new THREE.ExtrudeGeometry(shapeFrom(OUTLINE), { depth: DEPTH, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 3, curveSegments: 1 });
  const top = new THREE.MeshStandardMaterial({ color: 0x0a1430, roughness: 0.42, metalness: 0.25, emissive: 0xffffff, emissiveMap: flowTex, emissiveIntensity: 0.8 });
  const side = new THREE.MeshPhysicalMaterial({ color: 0x0b1a44, roughness: 0.3, metalness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  const slab = new THREE.Mesh(slabGeo, [top, side]);

  const group = new THREE.Group();
  group.add(slab);

  // The node network just above the top face.
  const z = DEPTH + 0.05;
  const linePos: number[] = [];
  MARK.lines.forEach(([x1, y1, x2, y2]) => linePos.push(toX(x1), toY(y1), z, toX(x2), toY(y2), z));
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
  const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0xdfe6f7, transparent: true, opacity: 0.75 }));
  group.add(lines);

  const nodeGeo = new THREE.SphereGeometry(0.04, 16, 12);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0xc9d3ea });
  const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, MARK.circles.length);
  const m = new THREE.Matrix4();
  MARK.circles.forEach(([x, y], i) => nodes.setMatrixAt(i, m.makeTranslation(toX(x), toY(y), z)));
  group.add(nodes);

  // Pulses: light travelling along the links, out from Lexington and back.
  const PULSES = 70;
  const pulseMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.03, 10, 8), new THREE.MeshBasicMaterial({ color: 0x9db2e8 }), PULSES);
  const pulse = Array.from({ length: PULSES }, () => ({ e: (Math.random() * MARK.lines.length) | 0, t: Math.random(), v: 0.15 + Math.random() * 0.35, dir: Math.random() < 0.5 ? 1 : -1 }));
  group.add(pulseMesh);

  // The star.
  const starGeo = new THREE.ExtrudeGeometry(shapeFrom(pathPoints(MARK.star)), { depth: 0.06, bevelEnabled: false });
  const star = new THREE.Mesh(starGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  star.position.z = DEPTH + 0.02;
  group.add(star);
  const starLight = new THREE.PointLight(0x9db2e8, 6, 4, 1.6);
  starLight.position.set(toX(STAR[0]), toY(STAR[1]), DEPTH + 0.6);
  group.add(starLight);

  group.rotation.x = -Math.PI / 2; // lay the state flat; north points away from the camera
  scene.add(group);
  scene.add(new THREE.AmbientLight(0x8899bb, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(-4, 6, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6f8fe0, 0.8);
  rim.position.set(5, 2, -6);
  scene.add(rim);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(width(), height()), 0.6, 0.5, 0.72);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // Camera path: a wide three-quarter view from the southwest, then a flight down to Lexington.
  const starWorld = new THREE.Vector3(toX(STAR[0]), DEPTH, -toY(STAR[1]));
  const shots = {
    wide: { pos: new THREE.Vector3(-2.1, 7.6, 10.6), look: new THREE.Vector3(-1.25, 0, 1.25) },
    close: { pos: new THREE.Vector3(starWorld.x - 0.6, 1.6, starWorld.z + 2.1), look: starWorld.clone() },
  };
  let progress = 0;
  let shown = 0;
  const pointer = new THREE.Vector2();
  let pointerAt = 0;
  // Where the pointer meets the slab's top face, in drawing units, while it has moved recently.
  const ray = new THREE.Raycaster();
  const topPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -DEPTH);
  const hit = new THREE.Vector3();
  const stirAt = () => {
    if (performance.now() - pointerAt > 1500) return null;
    ray.setFromCamera(new THREE.Vector2(pointer.x, -pointer.y), camera);
    if (!ray.ray.intersectPlane(topPlane, hit)) return null;
    return { x: hit.x / S + W0 / 2, y: H0 / 2 + hit.z / S };
  };
  const eased = new THREE.Vector2();
  const look = new THREE.Vector3();
  const pos = new THREE.Vector3();

  // The wide shot looks at a point southwest of centre, so the state sits up and to the right of the headline.
  const frame = () => {
    const w = width();
    const h = height();
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  frame();

  const clock = new THREE.Clock();
  let raf = 0;
  let running = false;
  const render = () => {
    const t = clock.getElapsedTime();
    shown += (progress - shown) * 0.08;
    eased.lerp(pointer, 0.05);
    const k = shown * shown * (3 - 2 * shown);
    pos.lerpVectors(shots.wide.pos, shots.close.pos, k);
    look.lerpVectors(shots.wide.look, shots.close.look, k);
    pos.x += eased.x * 0.35 * (1 - k);
    pos.y += eased.y * 0.2 * (1 - k);
    camera.position.copy(pos);
    camera.lookAt(look);

    flow.step(t, 0.18 + shown * 1.4, stirAt());
    flowTex.needsUpdate = true;
    top.emissiveIntensity = 0.8 + shown * 0.25;
    starLight.intensity = 4 + Math.sin(t * 2) * 0.8 + shown * 2;
    bloom.strength = 0.6 + shown * 0.15;

    pulse.forEach((p, i) => {
      p.t += p.v * 0.016 * p.dir;
      if (p.t > 1 || p.t < 0) {
        p.e = (Math.random() * MARK.lines.length) | 0;
        p.t = p.dir > 0 ? 0 : 1;
      }
      const [x1, y1, x2, y2] = MARK.lines[p.e];
      m.makeTranslation(toX(x1 + (x2 - x1) * p.t), toY(y1 + (y2 - y1) * p.t), z + 0.01);
      pulseMesh.setMatrixAt(i, m);
    });
    pulseMesh.instanceMatrix.needsUpdate = true;
    star.rotation.z = Math.sin(t * 0.6) * 0.02;
    composer.render();
  };
  const loop = () => {
    render();
    raf = requestAnimationFrame(loop);
  };
  const start = () => {
    if (running) return;
    running = true;
    clock.start();
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  // Warm the light up off screen so the first visible frame is already full of motion.
  for (let i = 0; i < 90; i++) flow.step(i * 0.016 + 3, 0.18);
  render();
  requestAnimationFrame(() => (renderer.domElement.style.opacity = "1"));

  const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()));
  io.observe(host);
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVis);
  const ro = new ResizeObserver(() => {
    renderer.setSize(width(), height());
    composer.setSize(width(), height());
    bloom.setSize(width(), height());
    frame();
  });
  ro.observe(host);

  return {
    setProgress: (p) => (progress = p),
    setPointer: (x, y) => {
      pointer.set(x, y);
      pointerAt = performance.now();
    },
    dispose: () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      composer.dispose();
      renderer.dispose();
      [slabGeo, lineGeo, nodeGeo, starGeo].forEach((g) => g.dispose());
      [top, side].forEach((mt) => mt.dispose());
      flowTex.dispose();
      renderer.domElement.remove();
    },
  };
}
