"use client";

import { useEffect, useRef } from "react";
import { OUTLINE, STAR } from "@/lib/kentucky-web";
import { COUNTY_ARCS } from "@/lib/ky-counties";
import { MARK } from "@/lib/mark-geometry";

// The V2 hero: a network inside the real Kentucky outline, in the style of Obsidian's graph view
// (Phil, 2026-10-29). Dots of different sizes are joined by links and float around their
// homes, and current slides through every link all the time. Signals fire along the links like neurons: a pulse runs to the next dot, lights it, and
// can set off its neighbours. Lexington is the hub. Scrolling raises the firing rate; the pointer
// lights the nearest dot and its links. Drawn live on the device, so it stays sharp at any size.
// Coordinates are the logo's drawing units (viewBox 980 x 440), shared with the official mark.

const W0 = 980;
const H0 = 440;
const CELL = 5; // inside-the-state lookup grid, in drawing units

type Fit = { s: number; ox: number; oy: number };

/** wordsTop: where the headline starts on the canvas; the state always ends above it. */
function fitFor(w: number, h: number, wordsTop: number): Fit {
  if (w < 768) {
    // Phones: the state runs past both edges in the upper half; the words sit below it.
    const s = (w * 1.32) / W0;
    return { s, ox: w / 2 - (STAR[0] - 40) * s, oy: h * 0.2 };
  }
  const floor = wordsTop > 0 ? wordsTop - 12 : h * 0.7;
  if (w < 1024 || h > w * 0.9) {
    // Tablets: the state spans the width, centred in the space above the headline.
    const s = Math.min((w * 1.02) / W0, (floor - 90) / H0);
    return { s, ox: (w - W0 * s) / 2, oy: Math.max(90, (90 + floor - H0 * s) / 2) };
  }
  const s = Math.min((w * 0.76) / W0, (h * 0.62) / H0, (floor - h * 0.1) / H0);
  return { s, ox: w - W0 * s - w * 0.03, oy: Math.min(h * 0.38 - (H0 * s) / 2, floor - H0 * s) };
}

function buildMask() {
  const cols = Math.ceil(W0 / CELL);
  const rows = Math.ceil(H0 / CELL);
  const mask = new Uint8Array(cols * rows);
  const cells: number[] = [];
  for (let r = 0; r < rows; r++) {
    const y = r * CELL + CELL / 2;
    // Scanline fill: find where this row crosses the outline.
    const xs: number[] = [];
    for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) {
      const [xi, yi] = OUTLINE[i];
      const [xj, yj] = OUTLINE[j];
      if (yi > y !== yj > y) xs.push(((xj - xi) * (y - yi)) / (yj - yi) + xi);
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      for (let c = Math.ceil(xs[k] / CELL); c * CELL + CELL / 2 < xs[k + 1]; c++) {
        mask[r * cols + c] = 1;
        cells.push(r * cols + c);
      }
    }
  }
  return { mask, cells, cols, rows };
}

type Net = {
  x: Float32Array;
  y: Float32Array;
  size: Float32Array;
  tint: Uint8Array;
  adj: number[][];
  edges: [number, number][];
};

/** Dots spread evenly inside the state (spacing in drawing units), each linked to its nearest few. */
function buildNet(spacing: number): Net {
  const { mask, cells, cols, rows } = buildMask();
  const inside = (x: number, y: number) => {
    const c = (x / CELL) | 0;
    const r = (y / CELL) | 0;
    return c >= 0 && r >= 0 && c < cols && r < rows && mask[r * cols + c] === 1;
  };
  const xs: number[] = [STAR[0]];
  const ys: number[] = [STAR[1]];
  // ponytail: rejection sampling with an O(n^2) distance check; fine for a few hundred dots.
  for (let tries = 0; tries < 14000; tries++) {
    const cell = cells[(Math.random() * cells.length) | 0];
    const x = (cell % cols) * CELL + Math.random() * CELL;
    const y = ((cell / cols) | 0) * CELL + Math.random() * CELL;
    let ok = true;
    for (let i = 0; i < xs.length && ok; i++) ok = Math.hypot(xs[i] - x, ys[i] - y) > spacing;
    if (ok) {
      xs.push(x);
      ys.push(y);
    }
  }
  const n = xs.length;
  const adj: number[][] = Array.from({ length: n }, () => []);
  const edges: [number, number][] = [];
  const seen = new Set<number>();
  // A few hubs burst spokes out to many dots around them, as the busiest notes do in Obsidian.
  // Lexington (dot 0) is the biggest.
  const hubs = new Map<number, number>([[0, 34]]);
  while (hubs.size < 9) hubs.set(1 + ((Math.random() * (n - 1)) | 0), 10 + ((Math.random() * 14) | 0));
  for (let i = 0; i < n; i++) {
    const near = Array.from({ length: n }, (_, j) => j)
      .filter((j) => j !== i)
      .sort((a, b) => Math.hypot(xs[a] - xs[i], ys[a] - ys[i]) - Math.hypot(xs[b] - xs[i], ys[b] - ys[i]));
    const hub = hubs.get(i);
    const k = hub ?? (Math.random() < 0.4 ? 3 : 2);
    for (const j of near.slice(0, k)) {
      const key = Math.min(i, j) * 8192 + Math.max(i, j);
      if (seen.has(key) || Math.hypot(xs[j] - xs[i], ys[j] - ys[i]) > spacing * (hub ? 9 : 2.6)) continue;
      // A link must stay inside the state, so none jumps across a bend in the border.
      let inLand = true;
      for (const f of [0.25, 0.5, 0.75]) inLand &&= inside(xs[i] + (xs[j] - xs[i]) * f, ys[i] + (ys[j] - ys[i]) * f);
      if (!inLand) continue;
      seen.add(key);
      edges.push([i, j]);
      adj[i].push(j);
      adj[j].push(i);
    }
  }
  // As in Obsidian, a dot's size follows how many links it has.
  const size = Float32Array.from(adj, (a, i) => (i === 0 ? 0 : 0.5 + Math.sqrt(a.length) * 0.4 + (a.length > 8 ? a.length * 0.07 : 0)));
  // About one dot in eight carries the accent colour, like Obsidian's coloured groups.
  const tint = Uint8Array.from(xs, () => (Math.random() < 0.12 ? 1 : 0));
  return { x: Float32Array.from(xs), y: Float32Array.from(ys), size, tint, adj, edges };
}

type Pulse = { from: number; to: number; t: number; gen: number };

export default function KentuckyFlow({ className = "", still = false }: { className?: string; still?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = still || document.documentElement.classList.contains("motion-off");
    const outline = new Path2D("M" + OUTLINE.map((p) => p.join(" ")).join("L") + "Z");
    const counties = new Path2D(COUNTY_ARCS.map((a) => "M" + a.join(" ")).join(""));
    const star = new Path2D(MARK.star);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let fit: Fit = { s: 1, ox: 0, oy: 0 };
    let net: Net | null = null;
    let netFor = 0;
    let glow = new Float32Array(0);
    let phase = new Float32Array(0);
    let pulses: Pulse[] = [];
    let lastSeed = 0;
    let lastNow = 0;
    let scrollPull = 0;
    const t0 = performance.now();
    const pointer = { x: -1e4, y: -1e4, on: false };

    const wordsTop = () => {
      const words = canvas.closest("section")?.querySelector<HTMLElement>("[data-quiet]");
      if (!words) return 0;
      return words.getBoundingClientRect().top - canvas.getBoundingClientRect().top - 16;
    };

    const fire = (from: number, gen: number, not = -1) => {
      if (!net || pulses.length > 120) return;
      const options = net.adj[from].filter((j) => j !== not);
      if (!options.length) return;
      pulses.push({ from, to: options[(Math.random() * options.length) | 0], t: 0, gen });
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.75 : 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      fit = fitFor(w, h, wordsTop());
      // Fewer, larger cells on phones so the dots keep the same size on screen.
      const spacing = w < 768 ? 19 : 14;
      if (spacing !== netFor) {
        net = buildNet(spacing);
        netFor = spacing;
        glow = new Float32Array(net.x.length);
        phase = Float32Array.from(net.x, () => Math.random() * Math.PI * 2);
        pulses = [];
      }
    };

    const step = (now: number) => {
      if (!net) return;
      const t = (now - t0) / 1000;
      const dt = Math.min(0.05, lastNow ? (now - lastNow) / 1000 : 0.016);
      lastNow = now;
      const { s, ox, oy } = fit;
      const n = net.x.length;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // The map under the network: the 120 county lines and the state border.
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(s, s);
      ctx.lineWidth = 0.9 / s;
      ctx.strokeStyle = "rgba(242,241,236,0.035)";
      ctx.stroke(counties);
      ctx.lineWidth = 1.2 / s;
      ctx.strokeStyle = "rgba(242,241,236,0.22)";
      ctx.stroke(outline);
      ctx.restore();

      // Every dot drifts a few units around its home, so the network floats as Obsidian's does.
      const sx = new Float32Array(n);
      const sy = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const a = i === 0 ? 0 : 4.5;
        sx[i] = ox + (net.x[i] + (Math.sin(t * 0.8 + phase[i]) * 0.7 + Math.sin(t * 1.9 + phase[i] * 2.1) * 0.3) * a) * s;
        sy[i] = oy + (net.y[i] + (Math.cos(t * 0.7 + phase[i] * 1.3) * 0.7 + Math.cos(t * 1.6 + phase[i] * 1.7) * 0.3) * a) * s;
      }
      // On load the network appears from Lexington outward over the first two seconds.
      const reach = reduce ? 1e4 : 30 + Math.min(1, t / 2) * 800;
      const shown = (i: number) => Math.hypot(net!.x[i] - STAR[0], net!.y[i] - STAR[1]) <= reach;

      let hover = -1;
      if (pointer.on) {
        let best = 900;
        for (let i = 1; i < n; i++) {
          const d = (sx[i] - pointer.x) ** 2 + (sy[i] - pointer.y) ** 2;
          if (d < best) {
            best = d;
            hover = i;
          }
        }
      }

      const links = new Path2D();
      const lit = new Path2D();
      for (const [a, b] of net.edges) {
        if (!shown(a) || !shown(b)) continue;
        const p = a === hover || b === hover ? lit : links;
        p.moveTo(sx[a], sy[a]);
        p.lineTo(sx[b], sy[b]);
      }
      ctx.lineWidth = w < 768 ? 1.1 : 1.3;
      ctx.strokeStyle = "rgba(242,241,236,0.24)";
      ctx.stroke(links);
      // Current runs through every link all the time: short bright dashes sliding along each line.
      ctx.setLineDash([3, 16]);
      ctx.lineDashOffset = -t * 38;
      ctx.lineWidth = w < 768 ? 1.3 : 1.5;
      ctx.strokeStyle = "rgba(200,214,248,0.5)";
      ctx.stroke(links);
      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(157,178,232,0.85)";
      ctx.stroke(lit);

      // Signals: new ones start every so often, more from Lexington, faster as the visitor scrolls.
      if (!reduce && t > 1.2 && t - lastSeed > 0.16 - scrollPull * 0.1) {
        lastSeed = t;
        fire(Math.random() < 0.25 ? 0 : (Math.random() * n) | 0, 0);
      }
      const speed = 1 + scrollPull * 1.2;
      ctx.lineCap = "round";
      pulses = pulses.filter((p) => {
        const len = Math.hypot(net!.x[p.to] - net!.x[p.from], net!.y[p.to] - net!.y[p.from]) || 1;
        p.t += (dt * 70 * speed) / Math.max(len, 8);
        if (p.t >= 1) {
          glow[p.to] = 1;
          // The dot it reaches fires on, fading out after a few hops.
          if (p.gen < 7 && Math.random() < 0.82) fire(p.to, p.gen + 1, p.from);
          if (p.gen < 3 && Math.random() < 0.3) fire(p.to, p.gen + 1, p.from);
          return false;
        }
        const x = sx[p.from] + (sx[p.to] - sx[p.from]) * p.t;
        const y = sy[p.from] + (sy[p.to] - sy[p.from]) * p.t;
        const tail = Math.max(0, p.t - 0.5);
        const g = ctx.createLinearGradient(sx[p.from] + (sx[p.to] - sx[p.from]) * tail, sy[p.from] + (sy[p.to] - sy[p.from]) * tail, x, y);
        g.addColorStop(0, "rgba(157,178,232,0)");
        g.addColorStop(1, "rgba(200,214,248,0.95)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sx[p.from] + (sx[p.to] - sx[p.from]) * tail, sy[p.from] + (sy[p.to] - sy[p.from]) * tail);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // The dots. A dot that has just fired glows blue and fades back.
      const k = s / 0.76;
      for (let i = 1; i < n; i++) {
        if (!shown(i)) continue;
        const r = net.size[i] * Math.max(0.85, Math.min(1.5, k));
        const on = Math.max(glow[i], i === hover || net.adj[i].includes(hover) ? 0.7 : 0);
        if (on > 0.02) {
          const halo = ctx.createRadialGradient(sx[i], sy[i], 0, sx[i], sy[i], r * 6);
          halo.addColorStop(0, `rgba(157,178,232,${0.8 * on})`);
          halo.addColorStop(1, "rgba(157,178,232,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(sx[i], sy[i], r * 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = net.tint[i] && on < 0.3 ? "rgba(157,178,232,0.85)" : `rgba(242,241,236,${0.55 + on * 0.45})`;
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], r, 0, Math.PI * 2);
        ctx.fill();
        glow[i] *= 0.93;
      }

      // The Lexington star, as drawn in the official mark.
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(s, s);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill(star);
      ctx.restore();
    };

    let raf = 0;
    let running = false;
    const loop = (now: number) => {
      step(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      lastNow = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduce) step(t0);

    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) step(t0);
    });
    ro.observe(canvas);

    const onScroll = () => {
      const r = canvas.getBoundingClientRect();
      scrollPull = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const host = canvas.parentElement!;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = true;
    };
    const onLeave = () => (pointer.on = false);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [still]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
}
