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
  sx: number;
  sy: number;
  lx: number;
  ly: number;
  rx: number;
  ry: number;
  delay: number;
  seed: number;
  gold: boolean;
  letter: boolean;
  rest: boolean;
  r: number;
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
  if (!ctx) return [] as { x: number; y: number }[];
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paintWords(ctx, layoutLines(w, h));
  const { data } = ctx.getImageData(0, 0, cw, ch);
  const pts: { x: number; y: number }[] = [];
  const step = Math.max(2, Math.round(dpr * (w < 560 ? 2.1 : 2.6)));
  for (let y = 0; y < ch; y += step) {
    for (let x = 0; x < cw; x += step) {
      if (data[(y * cw + x) * 4 + 3] > 88) {
        pts.push({ x: x / dpr, y: y / dpr });
      }
    }
  }
  return pts;
}

function leftQuiet(x: number, w: number, amt: number) {
  const gate = smoothstep(w * 0.3, w * 0.42, x);
  return 1 - amt + amt * gate;
}

function buildParticles(w: number, h: number, seed: number): Particle[] {
  const rand = mulberry32(seed);
  const letters = sampleLetterPoints(w, h);
  const area = w * h;
  const fieldExtra = Math.round(clamp(area / 900, 90, 420));
  const n = letters.length + fieldExtra;
  const restN = Math.round(clamp(area / 4200, 48, 160));
  const left = w * 0.38;
  const right = w * 0.93;
  const top = h * 0.22;
  const bot = h * 0.78;
  const cols = Math.max(7, Math.round((right - left) / 22));
  const rows = Math.max(5, Math.round((bot - top) / 22));

  const rest: { x: number; y: number }[] = [];
  for (let i = 0; i < restN; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols) % rows;
    const ox = (row % 2) * 0.45 * ((right - left) / cols);
    rest.push({
      x: left + ((col + 0.4) / cols) * (right - left) + ox,
      y: top + ((row + 0.5) / rows) * (bot - top),
    });
  }

  const goldIdx = new Set<number>();
  if (letters.length) {
    const ranked = letters
      .map((p, i) => ({ i, s: p.y + rand() * 8 }))
      .sort((a, b) => a.s - b.s);
    for (let k = 0; k < Math.min(6, ranked.length); k += 1) {
      goldIdx.add(ranked[k].i);
    }
  }

  const restOf = new Set<number>();
  goldIdx.forEach((i) => restOf.add(i)); // forEach, not for-of: this project's tsconfig target rejects Set iteration
  if (letters.length && rest.length) {
    const stride = Math.max(1, Math.floor(letters.length / rest.length));
    for (let i = 0; i < letters.length && restOf.size < rest.length; i += stride) {
      restOf.add(i);
    }
  } else {
    for (let i = 0; i < rest.length; i++) restOf.add(i);
  }

  const out: Particle[] = [];
  let restK = 0;
  for (let i = 0; i < n; i++) {
    const letter = i < letters.length;
    const lp = letter ? letters[i] : { x: w * 0.5, y: h * 0.5 };
    const hasRest = restOf.has(i) && restK < rest.length;
    const rp = hasRest ? rest[restK++] : lp;
    const sx = rand() * w;
    const sy = rand() * h;
    out.push({
      x: sx,
      y: sy,
      sx,
      sy,
      lx: lp.x,
      ly: lp.y,
      rx: rp.x,
      ry: rp.y,
      delay: rand() * 0.85,
      seed: rand() * Math.PI * 2,
      gold: letter && goldIdx.has(i),
      letter,
      rest: hasRest,
      r: letter ? (goldIdx.has(i) ? 1.35 : 0.95) : 0.7,
    });
  }
  return out;
}

export default function NameField1({ run, opaque = true }: { run: number; opaque?: boolean }) {
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
      particles = buildParticles(w, h, 0x9e3779b9 ^ (run * 2654435761));
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

      const hold = smoothstep(3.55, 4.15, t) * (1 - smoothstep(4.55, 5.15, t));
      const resolve = easeInOut(smoothstep(4.7, 6.55, t));

      for (const p of particles) {
        const u = easeInOut(smoothstep(0.85 + p.delay, 3.55 + p.delay * 0.35, t));
        const drift = 1 - u;
        let x = p.sx + (p.lx - p.sx) * u;
        let y = p.sy + (p.ly - p.sy) * u;
        x += Math.sin(t * 0.62 + p.seed) * 4.2 * drift;
        y += Math.cos(t * 0.48 + p.seed * 1.7) * 3.1 * drift + drift * t * 1.6;

        if (resolve > 0) {
          if (p.rest) {
            x = x + (p.rx - x) * resolve;
            y = y + (p.ry - y) * resolve;
          } else {
            x += (p.sx - w * 0.2) * 0.04 * resolve;
            y += 6 * resolve;
          }
        }

        if (t > 6.55 && p.rest) {
          const lt = t - 6.55;
          x = p.rx + Math.sin(lt * 0.32 + p.seed) * 0.45;
          y = p.ry + Math.cos(lt * 0.26 + p.seed) * 0.38;
        }

        p.x = x;
        p.y = y;

        let a = 0.07 + 0.18 * (1 - drift);
        if (p.letter) a = 0.12 * drift + (0.72 + 0.18 * hold) * u * (1 - resolve * 0.15);
        if (!p.letter) a *= 1 - smoothstep(1.6, 3.4, t);
        if (!p.rest) a *= 1 - resolve;
        else if (resolve > 0 && !p.gold) a = a * (1 - resolve) + 0.22 * resolve;
        if (p.gold) a = Math.max(a, 0.35 + 0.4 * u) * (1 - resolve * 0.25) + 0.4 * resolve;
        a *= leftQuiet(x, w, resolve);
        if (a < 0.02) continue;

        const col: RGB = p.gold ? GOLD : p.letter && u > 0.55 && resolve < 0.45 ? WHITE : resolve > 0.5 ? EMERALD : SAGE;
        ctx.fillStyle = rgba(col, a);
        ctx.beginPath();
        ctx.arc(x, y, p.r + (p.gold ? 0.2 : 0), 0, Math.PI * 2);
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
