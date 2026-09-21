'use client';

import { useEffect, useRef } from 'react';

const BG = '#1C1C1E';
const SAGE: RGB = [42, 157, 143];
const EMERALD: RGB = [13, 124, 102];
const GOLD: RGB = [212, 160, 23];
const WHITE: RGB = [250, 248, 245];

type RGB = readonly [number, number, number];

type Node = {
  x: number;
  y: number;
  gold: boolean;
  mag: number;
  appear: number;
  r: number;
};

type Edge = { a: number; b: number };

type Rule = { x0: number; x1: number; y: number; gold: boolean; tick: boolean };

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

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
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

function sampleConstruction(w: number, h: number) {
  const dpr = 2;
  const cw = Math.max(2, Math.floor(w * dpr));
  const ch = Math.max(2, Math.floor(h * dpr));
  const off = document.createElement('canvas');
  off.width = cw;
  off.height = ch;
  const ctx = off.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { edges: [] as { x: number; y: number; a: number }[], fill: [] as { x: number; y: number; a: number }[], size: 24 };
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const lines = layoutLines(w, h);
  paintWords(ctx, lines);
  const size = lines[0]?.size ?? 24;
  const { data } = ctx.getImageData(0, 0, cw, ch);
  const ink = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= cw || y >= ch) return false;
    return data[(y * cw + x) * 4 + 3] > 80;
  };
  const edges: { x: number; y: number; a: number }[] = [];
  const fill: { x: number; y: number; a: number }[] = [];
  const eStep = Math.max(2, Math.round(dpr * 2.2));
  const fStep = Math.max(3, Math.round(dpr * 4.4));
  for (let y = 0; y < ch; y += eStep) {
    for (let x = 0; x < cw; x += eStep) {
      if (!ink(x, y)) continue;
      const a = data[(y * cw + x) * 4 + 3] / 255;
      const edge =
        !ink(x - eStep, y) || !ink(x + eStep, y) || !ink(x, y - eStep) || !ink(x, y + eStep);
      if (edge) edges.push({ x: x / dpr, y: y / dpr, a });
    }
  }
  for (let y = 0; y < ch; y += fStep) {
    for (let x = 0; x < cw; x += fStep) {
      if (!ink(x, y)) continue;
      const a = data[(y * cw + x) * 4 + 3] / 255;
      const edge =
        !ink(x - fStep, y) || !ink(x + fStep, y) || !ink(x, y - fStep) || !ink(x, y + fStep);
      if (!edge) fill.push({ x: x / dpr, y: y / dpr, a });
    }
  }
  return { edges, fill, size };
}

function thin(pts: { x: number; y: number; a: number }[], minDist: number, cap: number) {
  const kept: { x: number; y: number; a: number }[] = [];
  const md = minDist * minDist;
  for (const p of pts) {
    let ok = true;
    for (const q of kept) {
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      if (dx * dx + dy * dy < md) {
        ok = false;
        break;
      }
    }
    if (ok) kept.push(p);
    if (kept.length >= cap) break;
  }
  return kept;
}

function connect(nodes: Node[], maxDist: number): Edge[] {
  const edges: Edge[] = [];
  const seen = new Set<string>();
  const maxd = maxDist * maxDist;
  for (let i = 0; i < nodes.length; i++) {
    const near: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = dx * dx + dy * dy;
      if (d < maxd) near.push({ j, d });
    }
    near.sort((a, b) => a.d - b.d);
    const take = Math.min(2, near.length);
    for (let k = 0; k < take; k++) {
      const a = Math.min(i, near[k].j);
      const b = Math.max(i, near[k].j);
      const key = `${a}-${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ a, b });
    }
  }
  return edges;
}

function makeRules(w: number, h: number): Rule[] {
  const rules: Rule[] = [];
  const x0 = w * 0.38;
  const x1 = w * 0.92;
  const n = 6;
  for (let i = 0; i < n; i++) {
    const y = h * 0.28 + (i / (n - 1)) * h * 0.44;
    const insetL = (i % 2) * w * 0.05;
    const insetR = ((n - 1 - i) % 3) * w * 0.03;
    rules.push({
      x0: x0 + insetL,
      x1: x1 - insetR,
      y,
      gold: i === 3,
      tick: i === 1 || i === 4,
    });
  }
  return rules;
}

function leftQuiet(x: number, w: number, amt: number) {
  const gate = smoothstep(w * 0.3, w * 0.42, x);
  return 1 - amt + amt * gate;
}

function build(w: number, h: number, seed: number) {
  const rand = mulberry32(seed);
  const sampled = sampleConstruction(w, h);
  const edgePts = thin(sampled.edges.sort((a, b) => b.a - a.a), w < 560 ? 4.2 : 5.4, 220);
  const fillPts = thin(sampled.fill, w < 560 ? 7 : 9, 70);
  const raw = [...edgePts, ...fillPts];
  const goldN = 3;
  const rightRank = raw.map((_, i) => i).sort((i, j) => raw[j].x - raw[i].x);
  const gold = new Set(rightRank.slice(0, goldN));
  const rules = makeRules(w, h);
  const nodes: Node[] = raw.map((p, i) => ({
    x: p.x,
    y: p.y,
    gold: gold.has(i),
    mag: p.a,
    appear: rand() * 0.9,
    r: gold.has(i) ? 1.7 : 0.95 + p.a * 0.4,
  }));
  const maxDist = Math.max(12, sampled.size * 0.38);
  const edges = connect(nodes, maxDist);
  return { nodes, edges, rules };
}

export default function NameField4({ run, opaque = true }: { run: number; opaque?: boolean }) {
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
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let rules: Rule[] = [];

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
      const built = build(w, h, 0xc0ffee ^ (run * 104729));
      nodes = built.nodes;
      edges = built.edges;
      rules = built.rules;
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

      const lineLive = 1 - smoothstep(5.25, 6.45, t);
      const dotsLive = 1 - smoothstep(4.65, 5.85, t);
      const rulesIn = smoothstep(5.35, 6.65, t);
      const restAmt = smoothstep(5.2, 6.6, t);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (lineLive > 0.02) {
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        for (const e of edges) {
          const a = nodes[e.a];
          const b = nodes[e.b];
          const grow = easeOut(
            smoothstep(1.55 + Math.min(a.appear, b.appear) * 0.45, 3.55, t),
          );
          if (grow < 0.02) continue;
          const mx = (a.x + b.x) * 0.5;
          const my = (a.y + b.y) * 0.5;
          ctx.moveTo(mx + (a.x - mx) * grow, my + (a.y - my) * grow);
          ctx.lineTo(mx + (b.x - mx) * grow, my + (b.y - my) * grow);
        }
        ctx.strokeStyle = rgba(SAGE, 0.22 + 0.28 * smoothstep(2.2, 3.8, t) * lineLive);
        ctx.globalAlpha = lineLive;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (rulesIn > 0.02) {
        ctx.lineWidth = 0.8;
        for (const r of rules) {
          ctx.beginPath();
          ctx.moveTo(r.x0, r.y);
          ctx.lineTo(r.x1, r.y);
          ctx.strokeStyle = rgba(r.gold ? GOLD : EMERALD, (r.gold ? 0.38 : 0.2) * rulesIn);
          ctx.stroke();
          if (r.tick) {
            const tx = r.x0 + (r.x1 - r.x0) * 0.18;
            ctx.beginPath();
            ctx.moveTo(tx, r.y - 7);
            ctx.lineTo(tx, r.y + 7);
            ctx.strokeStyle = rgba(SAGE, 0.22 * rulesIn);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const shown = easeOut(smoothstep(0.45 + n.appear, 2.15 + n.appear * 0.2, t));
        let a = shown * (0.35 + 0.5 * n.mag) * dotsLive;
        if (n.gold) a = Math.max(a, shown * 0.55) * (dotsLive * 0.25 + 0.75);
        let x = n.x;
        let y = n.y;
        if (t > 6.65 && n.gold) {
          const lt = t - 6.65;
          x += Math.sin(lt * 0.25 + n.appear) * 0.25;
          y += Math.cos(lt * 0.2 + n.appear) * 0.2;
        }
        a *= leftQuiet(x, w, restAmt);
        if (a < 0.02) continue;
        const col: RGB = n.gold ? GOLD : shown > 0.7 && dotsLive > 0.5 ? WHITE : SAGE;
        ctx.fillStyle = rgba(col, a);
        ctx.beginPath();
        ctx.arc(x, y, n.r * (n.gold ? 1 : 0.85 + 0.15 * dotsLive), 0, Math.PI * 2);
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
