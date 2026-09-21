'use client';

import { useEffect, useRef } from 'react';

const BG = '#1C1C1E';
const SAGE: RGB = [42, 157, 143];
const EMERALD: RGB = [13, 124, 102];
const GOLD: RGB = [212, 160, 23];
const WHITE: RGB = [250, 248, 245];

type RGB = readonly [number, number, number];
type Seg = { ax: number; ay: number; bx: number; by: number; iso: number };

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

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
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

function makeNoise(seed: number) {
  const rand = mulberry32(seed);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const grad = (h: number, x: number, y: number) => {
    const u = (h & 8) === 0 ? x : y;
    const v = (h & 4) === 0 ? y : (h === 12 || h === 14 ? x : 0);
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };
  return (x: number, y: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[X] + Y];
    const ab = perm[perm[X] + Y + 1];
    const ba = perm[perm[X + 1] + Y];
    const bb = perm[perm[X + 1] + Y + 1];
    const x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u);
    const x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u);
    return lerp(x1, x2, v);
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

function letterMask(w: number, h: number, cols: number, rows: number, cell: number) {
  const dpr = 2;
  const cw = Math.max(2, Math.floor(w * dpr));
  const ch = Math.max(2, Math.floor(h * dpr));
  const off = document.createElement('canvas');
  off.width = cw;
  off.height = ch;
  const ctx = off.getContext('2d', { willReadFrequently: true });
  const mask = new Float32Array(cols * rows);
  if (!ctx) return mask;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paintWords(ctx, layoutLines(w, h));
  const { data } = ctx.getImageData(0, 0, cw, ch);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const sx = clamp(Math.floor(((i + 0.5) * cell) * dpr), 0, cw - 1);
      const sy = clamp(Math.floor(((j + 0.5) * cell) * dpr), 0, ch - 1);
      mask[j * cols + i] = data[(sy * cw + sx) * 4 + 3] / 255;
    }
  }
  const tmp = new Float32Array(mask.length);
  const blur = (src: Float32Array, dst: Float32Array) => {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let s = 0;
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ii = i + dx;
            const jj = j + dy;
            if (ii < 0 || jj < 0 || ii >= cols || jj >= rows) continue;
            s += src[jj * cols + ii];
            n += 1;
          }
        }
        dst[j * cols + i] = s / n;
      }
    }
  };
  blur(mask, tmp);
  blur(tmp, mask);
  return mask;
}

function edgePoint(
  ax: number,
  ay: number,
  fa: number,
  bx: number,
  by: number,
  fb: number,
  iso: number,
) {
  const t = (iso - fa) / (fb - fa || 1e-6);
  return { x: lerp(ax, bx, t), y: lerp(ay, by, t) };
}

function march(field: Float32Array, cols: number, rows: number, cell: number, iso: number) {
  const segs: Seg[] = [];
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const i00 = j * cols + i;
      const f00 = field[i00];
      const f10 = field[i00 + 1];
      const f01 = field[i00 + cols];
      const f11 = field[i00 + cols + 1];
      const x = i * cell;
      const y = j * cell;
      let idx = 0;
      if (f00 > iso) idx |= 1;
      if (f10 > iso) idx |= 2;
      if (f11 > iso) idx |= 4;
      if (f01 > iso) idx |= 8;
      if (idx === 0 || idx === 15) continue;
      const top = edgePoint(x, y, f00, x + cell, y, f10, iso);
      const right = edgePoint(x + cell, y, f10, x + cell, y + cell, f11, iso);
      const bottom = edgePoint(x, y + cell, f01, x + cell, y + cell, f11, iso);
      const left = edgePoint(x, y, f00, x, y + cell, f01, iso);
      const pair = (a: { x: number; y: number }, b: { x: number; y: number }) => {
        segs.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, iso });
      };
      switch (idx) {
        case 1:
        case 14:
          pair(left, top);
          break;
        case 2:
        case 13:
          pair(top, right);
          break;
        case 3:
        case 12:
          pair(left, right);
          break;
        case 4:
        case 11:
          pair(right, bottom);
          break;
        case 5:
          pair(left, top);
          pair(right, bottom);
          break;
        case 6:
        case 9:
          pair(top, bottom);
          break;
        case 7:
        case 8:
          pair(left, bottom);
          break;
        case 10:
          pair(top, right);
          pair(bottom, left);
          break;
        default:
          break;
      }
    }
  }
  return segs;
}

export default function NameField3({ run, opaque = true }: { run: number; opaque?: boolean }) {
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
    let cols = 0;
    let rows = 0;
    let cell = 8;
    let mask = new Float32Array(0);
    const noiseA = makeNoise(0x91c3 + run * 17);
    const noiseB = makeNoise(0x51ed + run * 29);
    const field = { current: new Float32Array(0) };

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
      cell = w < 560 ? 7 : 8;
      cols = Math.max(12, Math.ceil(w / cell) + 1);
      rows = Math.max(10, Math.ceil(h / cell) + 1);
      mask = letterMask(w, h, cols, rows, cell);
      field.current = new Float32Array(cols * rows);
    };

    const fillField = (t: number) => {
      const form = smoothstep(1.05, 3.35, t) * (1 - smoothstep(4.55, 6.4, t));
      const rest = smoothstep(4.45, 6.5, t);
      const z = (t > 6.5 ? t : 6.5) * 0.035;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = (i + 0.5) * cell;
          const y = (j + 0.5) * cell;
          const nx = x * 0.012;
          const ny = y * 0.012;
          const n1 = noiseA(nx, ny + z) * 0.55 + noiseA(nx * 2.1, ny * 2.1 + z) * 0.25;
          const n2 = noiseB(nx * 0.7 + 8, ny * 0.7);
          const letter = mask[j * cols + i];
          const right = smoothstep(w * 0.28, w * 0.62, x);
          const leftCut = 1 - rest + rest * right;
          const terrain = (0.42 + 0.58 * n1) * (0.55 + 0.45 * (1 - form)) * leftCut;
          const ridge = rest * (0.28 + 0.42 * n2) * right;
          field.current[j * cols + i] = terrain * (1 - form * 0.55) + letter * form * 1.22 + ridge;
        }
      }
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
      if (!cols) {
        raf = requestAnimationFrame(draw);
        return;
      }

      fillField(t);
      const form = smoothstep(1.05, 3.35, t) * (1 - smoothstep(4.55, 6.4, t));
      const rest = smoothstep(4.45, 6.5, t);
      const hold = smoothstep(3.3, 3.9, t) * (1 - smoothstep(4.4, 5.0, t));
      const levels = [0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88];
      const goldIso = 0.68;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (const iso of levels) {
        const segs = march(field.current, cols, rows, cell, iso);
        const isGold = Math.abs(iso - goldIso) < 0.001 && form > 0.35 && rest < 0.55;
        const a =
          (0.1 + 0.22 * smoothstep(0.3, 1.5, t) + 0.18 * form + 0.08 * hold) *
          (0.55 + iso * 0.5) *
          (1 - rest * 0.15);
        const col: RGB = isGold ? GOLD : iso > 0.6 && form > 0.5 ? WHITE : iso < 0.35 ? EMERALD : SAGE;
        ctx.strokeStyle = rgba(col, isGold ? Math.min(0.55, a + 0.18) : a);
        ctx.lineWidth = isGold ? 1.05 : iso > 0.62 ? 0.85 : 0.65;
        ctx.beginPath();
        for (const s of segs) {
          const midX = (s.ax + s.bx) * 0.5;
          const quiet = 1 - rest + rest * smoothstep(w * 0.3, w * 0.44, midX);
          if (quiet < 0.08) continue;
          ctx.moveTo(s.ax, s.ay);
          ctx.lineTo(s.bx, s.by);
        }
        ctx.stroke();
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
