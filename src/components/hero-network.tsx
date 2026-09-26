"use client";

import { useEffect, useRef } from "react";
import { MARK } from "@/lib/mark-geometry";

// The home hero: the official mark drawn live as a field of points. Thousands of fine blue
// points fly in from a loose cloud and settle onto the real state outline, the 94 network
// lines and the 45 nodes, spreading outward from Lexington; the Lexington star ignites last.
// The field sways slowly in depth, leans toward the cursor, and tilts back and loosens as the
// visitor scrolls into the next section. Drawn on a 2D canvas at the device pixel ratio, so
// it stays sharp on retina and 4K screens. Pauses off screen; reduced motion gets the static
// SVG that sits beside it in the markup.

const W = 980;
const H = 440;
const CX = W / 2;
const CY = H / 2;
const STAR: [number, number] = [647.09, 183.35];

const LIT = "#81A7F8"; // UK blue hue, lifted for a dark page
const PALE = "#B1C9FB";
const DEEP = "#3F6FE0";
const STAR_FILL = "#F2F5FB";

type Field = {
  n: number;
  tx: Float32Array; ty: Float32Array; tz: Float32Array; // resting place
  sx: Float32Array; sy: Float32Array; sz: Float32Array; // where it flies in from
  dx: Float32Array; dy: Float32Array; dz: Float32Array; // scroll scatter direction
  delay: Float32Array; size: Float32Array; alpha: Float32Array; phase: Float32Array;
  color: Uint8Array; // 0 LIT, 1 PALE, 2 DEEP
};

// Deterministic noise so the server and every visit build the same field.
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function outlinePoints(): [number, number][] {
  const nums = MARK.state.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const pts: [number, number][] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
  return pts;
}

function build(scale: number): { field: Field; lines: { a: [number, number]; b: [number, number]; at: number }[] } {
  const r = rng(20260926);
  const hops = new Map<string, number>();
  const key = (x: number, y: number) => `${Math.round(x)},${Math.round(y)}`;
  // Breadth-first hop count from the star, so the network lights outward from Lexington.
  hops.set(key(...STAR), 0);
  for (let changed = true; changed; ) {
    changed = false;
    for (const [x1, y1, x2, y2] of MARK.lines) {
      const a = hops.get(key(x1, y1)) ?? Infinity;
      const b = hops.get(key(x2, y2)) ?? Infinity;
      if (a + 1 < b) (hops.set(key(x2, y2), a + 1), (changed = true));
      if (b + 1 < a) (hops.set(key(x1, y1), b + 1), (changed = true));
    }
  }
  const maxHop = Math.max(...Array.from(hops.values()));
  const hopDelay = (x: number, y: number) => 0.35 + ((hops.get(key(x, y)) ?? maxHop) / maxHop) * 1.5;

  const items: { x: number; y: number; z: number; delay: number; size: number; alpha: number; color: number }[] = [];
  const add = (x: number, y: number, z: number, delay: number, size: number, alpha: number, color: number) =>
    items.push({ x, y, z, delay, size, alpha, color });

  // State outline.
  const outline = outlinePoints();
  let perimeter = 0;
  for (let i = 1; i < outline.length; i++) perimeter += Math.hypot(outline[i][0] - outline[i - 1][0], outline[i][1] - outline[i - 1][1]);
  const outlineCount = Math.round(1500 * scale);
  let walked = 0;
  for (let i = 1; i < outline.length; i++) {
    const [x0, y0] = outline[i - 1];
    const [x1, y1] = outline[i];
    const len = Math.hypot(x1 - x0, y1 - y0);
    const k = Math.max(1, Math.round((len / perimeter) * outlineCount));
    for (let j = 0; j < k; j++) {
      const t = (j + r()) / k;
      const f = (walked + len * t) / perimeter;
      add(x0 + (x1 - x0) * t + (r() - 0.5) * 1.6, y0 + (y1 - y0) * t + (r() - 0.5) * 1.6, (r() - 0.5) * 6, 0.1 + f * 1.3, 1, 0.75, r() < 0.3 ? 1 : 0);
    }
    walked += len;
  }

  // Network lines: points strung along each line, lit from the end nearer Lexington.
  const lines: { a: [number, number]; b: [number, number]; at: number }[] = [];
  for (const [x1, y1, x2, y2] of MARK.lines) {
    const d1 = hopDelay(x1, y1);
    const d2 = hopDelay(x2, y2);
    const [ax, ay, bx, by, da, db] = d1 <= d2 ? [x1, y1, x2, y2, d1, d2] : [x2, y2, x1, y1, d2, d1];
    const len = Math.hypot(bx - ax, by - ay);
    const k = Math.round((len / 3.2) * scale) + 4;
    for (let j = 0; j < k; j++) {
      const t = r();
      add(ax + (bx - ax) * t + (r() - 0.5) * 2.2, ay + (by - ay) * t + (r() - 0.5) * 2.2, (r() - 0.5) * 10, da + (db - da) * t + r() * 0.15, 1, 0.9, r() < 0.2 ? 1 : 0);
    }
    lines.push({ a: [ax, ay], b: [bx, by], at: db + 0.3 });
  }

  // Nodes: a tight bright cluster each.
  for (const [x, y] of MARK.circles) {
    const d = hopDelay(x, y) + 0.2;
    const k = Math.round(26 * Math.max(scale, 0.6));
    for (let j = 0; j < k; j++) {
      const a = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * 5;
      add(x + Math.cos(a) * rad, y + Math.sin(a) * rad, (r() - 0.5) * 8, d + r() * 0.2, j < 4 ? 2.6 : 1.5, 1, 1);
    }
  }

  // Ambient depth: a faint, wide field behind and in front of the map.
  const ambient = Math.round(2000 * scale);
  for (let j = 0; j < ambient; j++) {
    const x = CX + (r() - 0.5) * W * 1.9;
    const y = CY + (r() - 0.5) * H * 2.4;
    add(x, y, (r() - 0.5) * 900, r() * 1.8, r() < 0.1 ? 1.5 : 1, 0.22 + r() * 0.3, 2);
  }

  const n = items.length;
  const f = (len: number) => new Float32Array(len);
  const field: Field = {
    n,
    tx: f(n), ty: f(n), tz: f(n), sx: f(n), sy: f(n), sz: f(n), dx: f(n), dy: f(n), dz: f(n),
    delay: f(n), size: f(n), alpha: f(n), phase: f(n), color: new Uint8Array(n),
  };
  // Sort by color so the draw loop changes fillStyle three times a frame.
  items.sort((a, b) => a.color - b.color);
  items.forEach((it, i) => {
    field.tx[i] = it.x - CX;
    field.ty[i] = it.y - CY;
    field.tz[i] = it.z;
    // Fly in from a loose cloud.
    const u = r() * Math.PI * 2;
    const v = Math.acos(2 * r() - 1);
    const reach = 380 + r() * 520;
    field.sx[i] = (it.x - CX) * 0.25 + Math.sin(v) * Math.cos(u) * reach;
    field.sy[i] = (it.y - CY) * 0.25 + Math.sin(v) * Math.sin(u) * reach * 0.6;
    field.sz[i] = Math.cos(v) * reach;
    const w = r() * Math.PI * 2;
    field.dx[i] = Math.cos(w) * (0.4 + r());
    field.dy[i] = Math.sin(w) * (0.4 + r()) - 0.3;
    field.dz[i] = (r() - 0.3) * 1.6;
    field.delay[i] = it.delay;
    field.size[i] = it.size;
    field.alpha[i] = it.alpha;
    field.phase[i] = r() * Math.PI * 2;
    field.color[i] = it.color;
  });
  return { field, lines };
}

const easeOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)); // expo, no overshoot
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function HeroNetwork({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ponytail: particle budget by width; phones get about 40 percent of a laptop's field.
    const phone = window.innerWidth < 768;
    const { field, lines } = build(phone ? 0.4 : 1);
    const colors = [LIT, PALE, DEEP];
    const colorStart = [0, 0, 0, field.n];
    for (let c = 0; c < 3; c++) {
      let i = 0;
      while (i < field.n && field.color[i] < c) i++;
      colorStart[c] = i;
    }
    const outline = outlinePoints();
    const starPts = MARK.star.match(/-?\d+(\.\d+)?/g)!.map(Number);

    let cw = 0, ch = 0, dpr = 1, fit = 1, ox = 0, oy = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      const wide = cw >= 768;
      fit = Math.min((cw * (wide ? 0.84 : 0.94)) / W, (ch * (wide ? 0.6 : 0.42)) / H);
      ox = cw * (wide ? 0.54 : 0.5);
      oy = ch * (wide ? 0.6 : 0.64);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mx = 0, my = 0, ex = 0, ey = 0;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const FOCAL = 1400;
    let rx = 0, ry = 0, cosX = 1, sinX = 0, cosY = 1, sinY = 0;
    // Rotate about the map's centre, then project. Writes into out[0..2]: screen x, y, scale.
    const out = new Float32Array(3);
    const project = (x: number, y: number, z: number) => {
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const k = FOCAL / (FOCAL + z2);
      out[0] = ox + x1 * k * fit;
      out[1] = oy + y2 * k * fit;
      out[2] = k;
    };

    let raf = 0;
    let running = false;
    let start = -1;
    let paused = 0; // time spent off screen, so the load sequence resumes where it stopped
    let pausedAt = 0;

    const frame = (now: number) => {
      if (start < 0) start = now;
      const t = (now - start - paused) / 1000;
      const hero = canvas.parentElement?.offsetHeight || ch;
      const s = clamp01(window.scrollY / (hero * 0.85));
      const sc = s * s;

      ex += (mx - ex) * 0.04;
      ey += (my - ey) * 0.04;
      ry = Math.sin(t * 0.13) * 0.07 + ex * 0.16;
      rx = 0.16 + Math.sin(t * 0.09) * 0.03 + ey * 0.08 + sc * 0.95;
      cosX = Math.cos(rx); sinX = Math.sin(rx); cosY = Math.cos(ry); sinY = Math.sin(ry);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#03050A";
      ctx.fillRect(0, 0, cw, ch);
      const fade = 1 - sc * 0.85;

      // Faint rings on the map plane, centred on Lexington, opening as the field settles.
      const ringOpen = easeOut(clamp01((t - 0.6) / 2.4));
      ctx.lineWidth = 1 / dpr;
      ctx.strokeStyle = LIT;
      for (const [radius, a] of [[70, 0.1], [150, 0.08], [250, 0.06], [380, 0.045], [540, 0.035]] as const) {
        ctx.globalAlpha = a * ringOpen * fade;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const ang = (i / 120) * Math.PI * 2;
          project(STAR[0] - CX + Math.cos(ang) * radius * ringOpen, STAR[1] - CY + Math.sin(ang) * radius * ringOpen, 0);
          if (i === 0) ctx.moveTo(out[0], out[1]);
          else ctx.lineTo(out[0], out[1]);
        }
        ctx.stroke();
      }

      // Hairline connections, each appearing once its points have arrived.
      ctx.lineWidth = Math.max(0.6, 0.9 * fit) / Math.max(1, dpr / 1.5);
      for (const l of lines) {
        const a = clamp01((t - l.at) / 0.9);
        if (a <= 0) continue;
        ctx.globalAlpha = 0.42 * a * fade * (1 - sc);
        project(l.a[0] - CX, l.a[1] - CY, 0);
        const x0 = out[0], y0 = out[1];
        project(l.b[0] - CX, l.b[1] - CY, 0);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(out[0], out[1]);
        ctx.stroke();
      }

      // Outline as a continuous hairline once assembled.
      const outlineOn = clamp01((t - 1.6) / 1.2) * fade * (1 - sc);
      if (outlineOn > 0) {
        ctx.globalAlpha = 0.28 * outlineOn;
        ctx.beginPath();
        outline.forEach(([x, y], i) => {
          project(x - CX, y - CY, 0);
          if (i === 0) ctx.moveTo(out[0], out[1]);
          else ctx.lineTo(out[0], out[1]);
        });
        ctx.closePath();
        ctx.stroke();
      }

      // The points.
      const scatter = sc * 520;
      for (let c = 0; c < 3; c++) {
        ctx.fillStyle = colors[c];
        for (let i = colorStart[c]; i < colorStart[c + 1]; i++) {
          const a = easeOut(clamp01((t - field.delay[i]) / 1.6));
          if (a <= 0.001) continue;
          const breathe = Math.sin(t * 0.7 + field.phase[i]) * 2.2;
          const x = field.sx[i] + (field.tx[i] - field.sx[i]) * a + field.dx[i] * scatter;
          const y = field.sy[i] + (field.ty[i] - field.sy[i]) * a + field.dy[i] * scatter;
          const z = field.sz[i] + (field.tz[i] - field.sz[i]) * a + breathe + field.dz[i] * scatter;
          project(x, y, z);
          const k = out[2];
          if (k <= 0) continue;
          const depth = Math.min(1, k * k);
          ctx.globalAlpha = field.alpha[i] * Math.min(1, a * 1.4) * depth * fade;
          const size = field.size[i] * 1.25 * Math.min(1.6, k) * Math.max(1, fit * 0.85);
          ctx.fillRect(out[0] - size / 2, out[1] - size / 2, size, size);
        }
      }

      // The Lexington star ignites last, with one ring of light running out from it.
      const ignite = easeOut(clamp01((t - 3.3) / 0.9));
      if (ignite > 0) {
        const pulse = clamp01((t - 3.3) / 1.8);
        if (pulse < 1) {
          ctx.globalAlpha = (1 - pulse) * 0.55 * fade;
          ctx.strokeStyle = PALE;
          ctx.lineWidth = 1.2 / Math.min(dpr, 1.5);
          ctx.beginPath();
          for (let i = 0; i <= 72; i++) {
            const ang = (i / 72) * Math.PI * 2;
            const rad = 12 + easeOut(pulse) * 190;
            project(STAR[0] - CX + Math.cos(ang) * rad, STAR[1] - CY + Math.sin(ang) * rad, 0);
            if (i === 0) ctx.moveTo(out[0], out[1]);
            else ctx.lineTo(out[0], out[1]);
          }
          ctx.stroke();
        }
        const grow = (0.55 + 0.45 * ignite) * 0.8;
        ctx.globalAlpha = ignite * Math.max(0.15, fade);
        ctx.fillStyle = STAR_FILL;
        ctx.beginPath();
        for (let i = 0; i + 1 < starPts.length; i += 2) {
          project(STAR[0] - CX + (starPts[i] - STAR[0]) * grow, STAR[1] - CY + (starPts[i + 1] - STAR[1]) * grow, -4);
          if (i === 0) ctx.moveTo(out[0], out[1]);
          else ctx.lineTo(out[0], out[1]);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running) return;
      running = true;
      if (pausedAt) paused += performance.now() - pausedAt;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      pausedAt = performance.now();
      cancelAnimationFrame(raf);
    };

    let onScreen = true;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !document.hidden) play();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden || !onScreen ? stop() : play());
    document.addEventListener("visibilitychange", onVis);
    play();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 h-full w-full motion-reduce:hidden ${className}`} />
      {/* Reduced motion: the finished network, drawn crisp at any size. */}
      <svg
        viewBox={MARK.viewBox}
        aria-hidden="true"
        className="absolute left-1/2 top-[64%] md:left-[54%] md:top-[60%] hidden w-[94%] md:w-[min(84%,133vh)] -translate-x-1/2 -translate-y-1/2 motion-reduce:block"
      >
        <path d={MARK.state} fill="none" stroke={LIT} strokeOpacity={0.4} strokeWidth={1.5} />
        {MARK.lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={LIT} strokeOpacity={0.45} strokeWidth={1.2} />
        ))}
        {MARK.circles.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={4.5} fill={PALE} />
        ))}
        <path d={MARK.star} fill={STAR_FILL} />
      </svg>
    </>
  );
}
