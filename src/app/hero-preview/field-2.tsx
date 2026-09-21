'use client';

import { useEffect, useRef } from 'react';

const BG = '#1C1C1E';
const SAGE: RGB = [42, 157, 143];
const EMERALD: RGB = [13, 124, 102];
const GOLD: RGB = [212, 160, 23];
const WHITE: RGB = [250, 248, 245];

type RGB = readonly [number, number, number];

type Particle = {
  x: number;
  y: number;
  lx: number;
  ly: number;
  hx: number;
  hy: number;
  seed: number;
  gold: boolean;
  r: number;
  mag: number;
  keeper: boolean;
};

function rgba(c: RGB, a: number) {
  return `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function smoothstep(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function layoutLines(w: number, h: number) {
  const cx = w * 0.5;
  const cy = h * 0.47;
  const narrow = w < 560;
  if (narrow) {
    const size = Math.min(Math.max(18, w * 0.068), h * 0.072, 34);
    const lead = size * 1.48;
    return [
      { text: 'Bluegrass Advisory', x: cx, y: cy - lead * 0.5, size },
      { text: 'Group', x: cx, y: cy + lead * 0.5, size },
    ];
  }
  const size = Math.min(Math.max(22, w * 0.036), h * 0.11, 52);
  return [{ text: 'Bluegrass Advisory Group', x: cx, y: cy, size }];
}

function paintWords(
  ctx: CanvasRenderingContext2D,
  lines: ReturnType<typeof layoutLines>,
) {
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const ln of lines) {
    ctx.font = `${ln.size}px "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif`;
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      `${(ln.size * 0.15).toFixed(2)}px`;
    ctx.fillText(ln.text, ln.x, ln.y);
  }
}

function sampleLetterPoints(w: number, h: number) {
  const dpr = 2;
  const cw = Math.max(2, Math.floor(w * dpr));
  const ch = Math.max(2, Math.floor(h * dpr));
  const off = document.createElement('canvas');
  off.width = cw;
  off.height = ch;
  const ctx = off.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [] as { x: number; y: number; a: number }[];
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paintWords(ctx, layoutLines(w, h));
  const { data } = ctx.getImageData(0, 0, cw, ch);
  const pts: { x: number; y: number; a: number }[] = [];
  const step = Math.max(2, Math.round(dpr * (w < 560 ? 2.0 : 2.5)));
  for (let y = 0; y < ch; y += step) {
    for (let x = 0; x < cw; x += step) {
      const a = data[(y * cw + x) * 4 + 3];
      if (a > 72) pts.push({ x: x / dpr, y: y / dpr, a: a / 255 });
    }
  }
  return pts;
}

function hexLattice(w: number, h: number, count: number) {
  const left = w * 0.37;
  const right = w * 0.94;
  const top = h * 0.18;
  const bot = h * 0.82;
  const pitch = Math.max(14, Math.sqrt(((right - left) * (bot - top)) / Math.max(40, count)) * 1.15);
  const pts: { x: number; y: number }[] = [];
  let row = 0;
  for (let y = top; y <= bot; y += pitch * 0.86) {
    const ox = row % 2 === 0 ? 0 : pitch * 0.5;
    for (let x = left + ox; x <= right; x += pitch) {
      pts.push({ x, y });
    }
    row += 1;
  }
  return pts;
}

function nearest(px: number, py: number, hex: { x: number; y: number }[]) {
  let best = hex[0] || { x: px, y: py };
  let d = Infinity;
  for (const q of hex) {
    const dd = (q.x - px) * (q.x - px) + (q.y - py) * (q.y - py);
    if (dd < d) {
      d = dd;
      best = q;
    }
  }
  return best;
}

function leftQuiet(x: number, w: number, amt: number) {
  const gate = smoothstep(w * 0.3, w * 0.42, x);
  return 1 - amt + amt * gate;
}

function buildParticles(w: number, h: number, seed: number): Particle[] {
  const rand = mulberry32(seed);
  const letters = sampleLetterPoints(w, h);
  const hex = hexLattice(w, h, Math.round(clamp((w * h) / 3800, 55, 180)));
  const claimed = new Set<string>();
  const goldN = 4;
  const goldPick = new Set<number>();
  const order = letters
    .map((_, i) => i)
    .sort((a, b) => letters[b].x + letters[b].a * 40 - (letters[a].x + letters[a].a * 40));
  for (let i = 0; i < goldN && i < order.length; i++) goldPick.add(order[i]);

  return letters.map((p, i) => {
    const target = nearest(p.x + (rand() - 0.5) * 10, p.y + (rand() - 0.5) * 8, hex);
    const key = `${Math.round(target.x)}:${Math.round(target.y)}`;
    const keeper = !claimed.has(key);
    claimed.add(key);
    return {
      x: p.x,
      y: p.y,
      lx: p.x,
      ly: p.y,
      hx: target.x,
      hy: target.y,
      seed: rand() * Math.PI * 2,
      gold: goldPick.has(i),
      r: 0.85 + p.a * 0.35,
      mag: p.a,
      keeper: keeper || goldPick.has(i),
    };
  });
}

export default function NameField2({ run, opaque = true }: { run: number; opaque?: boolean }) {
  const opaqueRef = useRef(opaque);
  opaqueRef.current = opaque;
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    let raf = 0;
    let dead = false;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];

    const rebuild = () => {
      const nw = host.clientWidth;
      const nh = host.clientHeight;
      if (nw < 8 || nh < 8) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      particles = buildParticles(w, h, 0x51ed + run * 9973);
    };

    const draw = (now: number) => {
      if (dead) return;
      const t = reduced ? 8 : (now - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (opaqueRef.current) {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      const rake = easeInOut(smoothstep(0.45, 2.85, t));
      const front = -0.18 * (w + h) + rake * 1.38 * (w + h);
      const hold = smoothstep(2.7, 3.3, t) * (1 - smoothstep(4.05, 4.7, t));
      const dissolve = easeInOut(smoothstep(4.15, 6.45, t));

      if (rake > 0.02 && rake < 0.98) {
        const gx = ctx.createLinearGradient(
          front * 0.55,
          front * 0.18,
          front * 0.55 + 220,
          front * 0.18 + 70,
        );
        gx.addColorStop(0, 'rgba(250,248,245,0)');
        gx.addColorStop(0.45, 'rgba(250,248,245,0.045)');
        gx.addColorStop(0.72, 'rgba(212,160,23,0.07)');
        gx.addColorStop(1, 'rgba(250,248,245,0)');
        ctx.fillStyle = gx;
        ctx.fillRect(0, 0, w, h);
      }

      for (const p of particles) {
        const proj = p.lx * 0.78 + p.ly * 0.42;
        const dist = proj - front;
        const band = smoothstep(140, 8, dist) * smoothstep(-260, -12, dist);
        const passed = dist < 12 ? 1 : 0;
        const revealed = Math.max(passed, band);
        const lit = revealed * (0.55 + 0.45 * p.mag);

        let x = p.lx;
        let y = p.ly;
        if (dissolve > 0 && p.keeper) {
          x = p.lx + (p.hx - p.lx) * dissolve;
          y = p.ly + (p.hy - p.ly) * dissolve;
        }
        if (t > 6.45 && p.keeper) {
          const lt = t - 6.45;
          x = p.hx + Math.sin(lt * 0.28 + p.seed) * 0.35;
          y = p.hy + Math.cos(lt * 0.22 + p.seed) * 0.3;
        }

        let a = 0.018 + lit * (0.78 + 0.16 * hold);
        if (p.gold) a = Math.max(a, 0.12 + lit * 0.7);
        if (p.keeper) a = a * (1 - dissolve * 0.55) + dissolve * (p.gold ? 0.42 : 0.2);
        else a *= 1 - dissolve;
        a *= leftQuiet(x, w, dissolve);
        if (a < 0.02) continue;

        const wordish = lit > 0.2 && dissolve < 0.4;
        const col: RGB = p.gold ? GOLD : wordish ? WHITE : dissolve > 0.55 ? EMERALD : SAGE;
        ctx.fillStyle = rgba(col, a);
        ctx.beginPath();
        ctx.arc(x, y, p.r + (p.gold ? 0.25 : 0) * (1 - dissolve * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(host);
    raf = requestAnimationFrame(draw);
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [run]);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 overflow-hidden"
      style={{ background: BG }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
