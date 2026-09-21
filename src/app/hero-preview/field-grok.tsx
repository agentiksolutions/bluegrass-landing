"use client";

// Scattered dots gather into the firm's full name, hold to be read, then settle into a lattice — messy operations becoming structure.

import { useEffect, useRef } from "react";

const GRAPHITE = "#1C1C1E";
const SAGE = { r: 42, g: 157, b: 143 };
const EMERALD = { r: 13, g: 124, b: 102 };
const GOLD = { r: 212, g: 160, b: 23 };
const IVORY = { r: 250, g: 248, b: 245 };

const NAME = "Bluegrass Advisory Group";
const LINE_1 = "Bluegrass Advisory";
const LINE_2 = "Group";
const FONT_STACK = '"Playfair Display", Georgia, "Times New Roman", serif';

const T_CHAOS = 0.85;
const T_GATHER = 1.55;
const T_HOLD = 1.65;
const T_RELEASE = 1.45;
const T_DONE = T_CHAOS + T_GATHER + T_HOLD + T_RELEASE;

type Rgb = { r: number; g: number; b: number };

type Sample = { x: number; y: number; gold: boolean };

type Particle = {
  sx: number;
  sy: number;
  lx: number;
  ly: number;
  gx: number;
  gy: number;
  gold: boolean;
  letter: boolean;
  quiet: boolean;
  delay: number;
  seed: number;
  ink: Rgb;
};

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoother(t: number) {
  t = clamp(t, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function mixRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return { r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) };
}

function fitSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  hi: number,
  lo: number,
) {
  let size = hi;
  while (size > lo) {
    ctx.font = `600 ${size}px ${FONT_STACK}`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 1;
  }
  return lo;
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  size: number,
) {
  ctx.font = `600 ${size}px ${FONT_STACK}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  let x = cx - ctx.measureText(text).width / 2;
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (i > 0) x += ctx.measureText(" ").width;
    const word = words[i];
    const first = word[0];
    const rest = word.slice(1);
    ctx.fillStyle = "rgb(255, 36, 200)";
    ctx.fillText(first, x, cy);
    x += ctx.measureText(first).width;
    if (rest) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(rest, x, cy);
      x += ctx.measureText(rest).width;
    }
  }
}

function collectPixels(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  stride: number,
): Sample[] {
  const data = ctx.getImageData(0, 0, w, h).data;
  const out: Sample[] = [];
  const rowH = stride * 0.866;
  let row = 0;
  for (let y = 1; y < h - 1; y += rowH) {
    const ox = row % 2 === 0 ? 0 : stride * 0.5;
    for (let x = ox + 1; x < w - 1; x += stride) {
      const i = (Math.floor(y) * w + Math.floor(x)) * 4;
      if (data[i + 3] < 140) continue;
      out.push({
        x,
        y,
        gold: data[i + 1] < 90 && data[i + 2] > 140,
      });
    }
    row += 1;
  }
  return out;
}

function thin(points: Sample[], minDist: number): Sample[] {
  const cell = minDist;
  const seen = new Set<string>();
  const out: Sample[] = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const key = `${Math.round(p.x / cell)},${Math.round(p.y / cell)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}

function subsample<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const out: T[] = [];
  const step = items.length / count;
  for (let i = 0; i < count; i++) {
    out.push(items[Math.min(items.length - 1, Math.round(i * step))]);
  }
  return out;
}

function hexGrid(
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  spacing: number,
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const rowH = spacing * 0.866;
  let row = 0;
  for (let y = y0; y <= y1; y += rowH) {
    const offset = row % 2 === 0 ? 0 : spacing * 0.5;
    for (let x = x0 + offset; x <= x1; x += spacing) {
      pts.push({ x, y });
    }
    row += 1;
  }
  return pts;
}

function sampleName(width: number, height: number): { points: Sample[]; wrapped: boolean } {
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) return { points: [], wrapped: false };

  const margin = Math.max(22, width * 0.07);
  const usable = Math.max(80, width - margin * 2);
  const oneSize = fitSize(probe, NAME, 2400, 160, 80);
  probe.font = `600 ${oneSize}px ${FONT_STACK}`;
  const oneW = Math.max(1, probe.measureText(NAME).width);
  const oneH = oneSize * 0.78 * (usable / oneW);
  const wrapped = width < 640 || oneH < 40;

  const fontPx = wrapped ? 132 : 152;
  probe.font = `600 ${fontPx}px ${FONT_STACK}`;
  const textW = wrapped
    ? Math.max(probe.measureText(LINE_1).width, probe.measureText(LINE_2).width)
    : probe.measureText(NAME).width;
  const textH = wrapped ? fontPx * 2.35 : fontPx * 1.35;
  const pad = Math.ceil(fontPx * 0.25);
  const scale = 2;

  const off = document.createElement("canvas");
  off.width = Math.ceil((textW + pad * 2) * scale);
  off.height = Math.ceil((textH + pad * 2) * scale);
  const ctx = off.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { points: [], wrapped };

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, off.width, off.height);
  const cx = pad + textW / 2;
  const cy = pad + textH / 2;
  if (wrapped) {
    const gap = fontPx * 1.18;
    drawLine(ctx, LINE_1, cx, cy - gap * 0.5, fontPx);
    drawLine(ctx, LINE_2, cx, cy + gap * 0.5, fontPx);
  } else {
    drawLine(ctx, NAME, cx, cy, fontPx);
  }

  const raw = collectPixels(ctx, off.width, off.height, 5);
  if (!raw.length) return { points: [], wrapped };

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of raw) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }

  const bw = Math.max(1, maxX - minX);
  const bh = Math.max(1, maxY - minY);
  let s = usable / (bw / scale);
  const maxH = height * (wrapped ? 0.42 : 0.28);
  if ((bh / scale) * s > maxH) s = maxH / (bh / scale);
  const dw = (bw / scale) * s;
  const dh = (bh / scale) * s;
  const ox = (width - dw) / 2;
  const oy = (height - dh) / 2;

  const mapped: Sample[] = raw.map((p) => ({
    x: ox + ((p.x - minX) / scale) * s,
    y: oy + ((p.y - minY) / scale) * s,
    gold: p.gold,
  }));

  const minDist = wrapped ? 2.15 : 3.05;
  let points = thin(mapped, minDist);
  if (points.length > 2600) points = thin(mapped, minDist * 1.2);
  if (points.length < 900) points = thin(mapped, wrapped ? 1.7 : 2.3);
  if (points.length > 2800) points = subsample(points, 2600);

  return { points, wrapped };
}

function buildParticles(width: number, height: number): Particle[] {
  const { points } = sampleName(width, height);
  const extra = clamp(Math.round(points.length * 0.18), 70, 320);

  const y0 = height * 0.1;
  const y1 = height * 0.9;
  const mainArea = Math.max(1, width * 0.62 * height * 0.8);
  const spacing = clamp(Math.sqrt(mainArea / Math.max(points.length + extra * 0.45, 80)), 11, 26);
  let main = hexGrid(width * 0.355, width * 0.975, y0, y1, spacing);
  if (main.length > points.length + extra) main = subsample(main, points.length + extra);
  const quiet = hexGrid(width * 0.04, width * 0.3, y0 + spacing, y1 - spacing, spacing * 1.9);

  const letters = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const mainSorted = main.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const particles: Particle[] = [];

  for (let i = 0; i < letters.length; i++) {
    const p = letters[i];
    const g = mainSorted[i] || mainSorted[mainSorted.length - 1] || p;
    particles.push({
      sx: Math.random() * width,
      sy: Math.random() * height,
      lx: p.x,
      ly: p.y,
      gx: g.x,
      gy: g.y,
      gold: p.gold,
      letter: true,
      quiet: false,
      delay: clamp(p.x / width, 0, 1) * 0.36 + Math.random() * 0.05,
      seed: Math.random() * Math.PI * 2,
      ink: p.gold ? GOLD : i % 5 === 0 ? EMERALD : SAGE,
    });
  }

  const usedMain = Math.min(letters.length, mainSorted.length);
  const leftoverMain = mainSorted.slice(usedMain);
  const fieldSlots = leftoverMain
    .concat(quiet)
    .sort((a, b) => a.x - b.x || a.y - b.y);

  for (let i = 0; i < extra; i++) {
    const g = fieldSlots[i % Math.max(fieldSlots.length, 1)] || {
      x: width * (0.45 + Math.random() * 0.5),
      y: height * (0.12 + Math.random() * 0.76),
    };
    particles.push({
      sx: Math.random() * width,
      sy: Math.random() * height,
      lx: width * (0.74 + Math.random() * 0.2),
      ly: Math.random() * height,
      gx: g.x,
      gy: g.y,
      gold: false,
      letter: false,
      quiet: g.x < width * 0.33,
      delay: Math.random() * 0.22,
      seed: Math.random() * Math.PI * 2,
      ink: i % 3 === 0 ? SAGE : EMERALD,
    });
  }

  return particles;
}

function pose(p: Particle, elapsed: number) {
  const t = elapsed - p.delay;
  const gatherEnd = T_CHAOS + T_GATHER;
  const holdEnd = gatherEnd + T_HOLD;

  if (t <= T_CHAOS) {
    const k = smoother(Math.max(0, t) / T_CHAOS);
    return {
      x: p.sx + Math.sin(elapsed * 0.7 + p.seed) * 6,
      y: p.sy + Math.cos(elapsed * 0.55 + p.seed * 1.3) * 5,
      a: lerp(0.1, 0.5, k),
      rgb: p.ink,
      r: 1.15,
    };
  }

  if (t <= gatherEnd) {
    const k = smoother((t - T_CHAOS) / T_GATHER);
    if (p.letter) {
      return {
        x: lerp(p.sx, p.lx, k),
        y: lerp(p.sy, p.ly, k),
        a: lerp(0.5, p.gold ? 0.96 : 0.9, k),
        rgb: mixRgb(p.ink, p.gold ? GOLD : IVORY, k),
        r: lerp(1.15, p.gold ? 1.35 : 1.22, k),
      };
    }
    return {
      x: lerp(p.sx, p.lx, k * 0.4),
      y: lerp(p.sy, p.ly, k * 0.4),
      a: lerp(0.5, 0.045, k),
      rgb: p.ink,
      r: 1.1,
    };
  }

  if (t <= holdEnd) {
    if (p.letter) {
      return {
        x: p.lx + Math.sin(elapsed * 1.2 + p.seed) * 0.12,
        y: p.ly,
        a: p.gold ? 0.96 : 0.9,
        rgb: p.gold ? GOLD : IVORY,
        r: p.gold ? 1.35 : 1.22,
      };
    }
    return { x: p.lx, y: p.ly, a: 0.035, rgb: p.ink, r: 1.05 };
  }

  if (t <= T_DONE) {
    const k = smoother((t - holdEnd) / T_RELEASE);
    const fromX = p.letter ? p.lx : p.lx;
    const fromY = p.letter ? p.ly : p.ly;
    const rest = p.quiet ? 0.16 : p.gold ? 0.72 : 0.56;
    return {
      x: lerp(fromX, p.gx, k),
      y: lerp(fromY, p.gy, k),
      a: lerp(p.letter ? 0.9 : 0.035, rest, k),
      rgb: p.gold ? GOLD : mixRgb(p.letter ? IVORY : p.ink, p.ink, k),
      r: lerp(p.letter ? 1.22 : 1.05, 1.05, k),
    };
  }

  const idle = elapsed - T_DONE;
  const breath = 0.5 + Math.sin(idle * 0.4 + p.seed) * 0.05;
  const base = p.quiet ? 0.15 : p.gold ? 0.68 : 0.5;
  return {
    x: p.gx + Math.sin(idle * 0.32 + p.seed) * 0.32,
    y: p.gy + Math.cos(idle * 0.26 + p.seed * 0.7) * 0.28,
    a: base * (0.94 + breath * 0.12),
    rgb: p.gold ? GOLD : p.ink,
    r: 1.05,
  };
}

export default function OrderBagGrok({ run }: { run: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let start = performance.now();
    let cssW = 0;
    let cssH = 0;
    let dpr = 1;

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      const nextW = Math.max(1, rect.width);
      const nextH = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = nextW;
      cssH = nextH;
      canvas.width = Math.round(nextW * dpr);
      canvas.height = Math.round(nextH * dpr);
      canvas.style.width = `${nextW}px`;
      canvas.style.height = `${nextH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = buildParticles(nextW, nextH);
    };

    const paint = (now: number) => {
      if (!running) return;
      const elapsed = (now - start) / 1000;
      // Transparent so a video can play behind the field. The hero's own scrim
      // supplies the darkness; painting graphite here would hide the footage.
      ctx.clearRect(0, 0, cssW, cssH);
      for (let i = 0; i < particles.length; i++) {
        const pos = pose(particles[i], elapsed);
        if (pos.a < 0.02) continue;
        ctx.fillStyle = `rgba(${pos.rgb.r | 0},${pos.rgb.g | 0},${pos.rgb.b | 0},${pos.a})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pos.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(paint);
    };

    const boot = async () => {
      try {
        await document.fonts.load(`600 80px ${FONT_STACK}`);
        await document.fonts.ready;
      } catch {
        /* Georgia still yields real letterforms */
      }
      if (!running) return;
      layout();
      start = performance.now();
      raf = requestAnimationFrame(paint);
    };

    const ro = new ResizeObserver(() => {
      const rect = wrap.getBoundingClientRect();
      if (Math.abs(rect.width - cssW) < 2 && Math.abs(rect.height - cssH) < 2) return;
      const elapsed = (performance.now() - start) / 1000;
      layout();
      start = performance.now() - elapsed * 1000;
    });
    ro.observe(wrap);
    void boot();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [run]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
