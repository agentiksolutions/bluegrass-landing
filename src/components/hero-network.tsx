"use client";

import { useEffect, useRef, useState } from "react";
import { MARK } from "@/lib/mark-geometry";
import { buildWeb, OUTLINE, STAR, type Web } from "@/lib/kentucky-web";

// The home hero: Kentucky as a fine web. Several hundred evenly spaced points fill the state
// edge to edge, joined by hairline strands that never leave the outline (src/lib/kentucky-web.ts).
// On load the web spins out from Lexington strand by strand, the border closes, and the star
// lights last. Afterwards the web sways slowly in depth, leans toward the cursor, and now and
// then a faint pulse of light runs along a few strands. Scrolling on tilts it back and loosens
// it. Everything is vector-drawn at the device pixel ratio, so it stays sharp at any zoom.
// Pauses off screen. Reduced motion gets the same web as a static SVG.

const W = 980;
const H = 440;
const CX = W / 2;
const CY = H / 2;

const SILK = "#9DB6F5"; // UK blue hue, lifted for a dark page
const PALE = "#C9D8FB";
const STAR_FILL = "#F2F5FB";

// Load sequence, seconds.
const SPIN = [0.25, 3.0] as const; // strands spin out from Lexington
const CLOSE = [2.3, 3.4] as const; // the border closes
const IGNITE = 3.5; // the star lights

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)); // expo, no overshoot
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Strand brightness falls off with length: four buckets, one stroke call each.
const BUCKETS = [0.62, 0.48, 0.36, 0.24];
const bucketOf = (web: Web, i: number) =>
  Math.min(BUCKETS.length - 1, Math.floor((web.length[i] / web.maxLength) * BUCKETS.length * 0.999));

export default function HeroNetwork({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    // ponytail: point budget by width. 16 units gives about 500 interior points, 26 about 190.
    const web = buildWeb(window.innerWidth < 768 ? 26 : 16);
    const n = web.x.length;
    const edgeCount = web.length.length;
    const bucket = Uint8Array.from({ length: edgeCount }, (_, i) => bucketOf(web, i));
    const hop = (SPIN[1] - SPIN[0]) / (web.maxDepth + 1);
    const lit = (i: number) => SPIN[0] + web.depth[i] * hop; // when a point is reached

    // Per-point drift direction for the scroll loosening, seeded.
    const drift = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.sin(i * 12.9898) * 43758.5453;
      const f = a - Math.floor(a);
      const ang = f * Math.PI * 2;
      drift[3 * i] = Math.cos(ang);
      drift[3 * i + 1] = Math.sin(ang) - 0.3;
      drift[3 * i + 2] = (f - 0.3) * 1.6;
    }

    let cw = 0, ch = 0, dpr = 1, fit = 1, ox = 0, oy = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 3);
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

    // Projected screen positions, refreshed once per frame.
    const sx = new Float32Array(n);
    const sy = new Float32Array(n);
    const FOCAL = 1400;
    let cosX = 1, sinX = 0, cosY = 1, sinY = 0;
    const out = [0, 0];
    const project = (x: number, y: number, z: number) => {
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const k = FOCAL / (FOCAL + z2);
      out[0] = ox + x1 * k * fit;
      out[1] = oy + y2 * k * fit;
    };

    // Shimmer: a short run of light along a chain of connected strands.
    type Pulse = { chain: number[]; born: number; life: number };
    const pulses: Pulse[] = [];
    let nextPulse = IGNITE + 1.6;
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const spawn = (t: number) => {
      let at = (rand() * n) | 0;
      const chain = [at];
      for (let k = 0; k < 6; k++) {
        const next = web.neighbours[at].filter((m) => !chain.includes(m));
        if (!next.length) break;
        at = next[(rand() * next.length) | 0];
        chain.push(at);
      }
      if (chain.length > 3) pulses.push({ chain, born: t, life: 2.6 });
    };

    let raf = 0;
    let running = false;
    let start = -1;
    let paused = 0;
    let pausedAt = 0;

    const frame = (now: number) => {
      if (start < 0) start = now;
      const t = (now - start - paused) / 1000;
      const heroH = canvas.parentElement?.offsetHeight || ch;
      const s = clamp01(window.scrollY / (heroH * 0.85));
      const sc = s * s;
      const fade = 1 - sc * 0.9;

      ex += (mx - ex) * 0.04;
      ey += (my - ey) * 0.04;
      const ry = Math.sin(t * 0.13) * 0.07 + ex * 0.14;
      const rx = 0.16 + Math.sin(t * 0.09) * 0.03 + ey * 0.07 + sc * 0.95;
      cosX = Math.cos(rx); sinX = Math.sin(rx); cosY = Math.cos(ry); sinY = Math.sin(ry);

      const spread = sc * 420;
      for (let i = 0; i < n; i++) {
        project(
          web.x[i] - CX + drift[3 * i] * spread,
          web.y[i] - CY + drift[3 * i + 1] * spread,
          drift[3 * i + 2] * spread,
        );
        sx[i] = out[0];
        sy[i] = out[1];
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#03050A";
      ctx.fillRect(0, 0, cw, ch);
      ctx.lineCap = "round";
      const hair = 0.65 / dpr; // 0.65 device pixels

      // Strands, spinning out from the nearer-to-Lexington end.
      ctx.strokeStyle = SILK;
      ctx.lineWidth = hair;
      for (let b = 0; b < BUCKETS.length; b++) {
        ctx.globalAlpha = BUCKETS[b] * fade;
        ctx.beginPath();
        for (let e = 0; e < edgeCount; e++) {
          if (bucket[e] !== b) continue;
          const a = web.edges[2 * e];
          const z = web.edges[2 * e + 1];
          const p = easeOut(clamp01((t - lit(a)) / (hop * 2.2)));
          if (p <= 0) continue;
          ctx.moveTo(sx[a], sy[a]);
          ctx.lineTo(sx[a] + (sx[z] - sx[a]) * p, sy[a] + (sy[z] - sy[a]) * p);
        }
        ctx.stroke();
      }

      // The border: one slightly brighter continuous hairline, closing both ways from the
      // point nearest Lexington.
      const close = easeInOut(clamp01((t - CLOSE[0]) / (CLOSE[1] - CLOSE[0])));
      if (close > 0) {
        ctx.globalAlpha = 0.75 * fade;
        ctx.lineWidth = 0.8 / dpr;
        ctx.beginPath();
        const m = OUTLINE.length;
        const half = Math.ceil((m / 2) * close);
        for (const dir of [1, -1]) {
          for (let k = 0; k <= half; k++) {
            const [x, y] = OUTLINE[(((NEAR + dir * k) % m) + m) % m];
            project(x - CX, y - CY, 0);
            if (k === 0) ctx.moveTo(out[0], out[1]);
            else ctx.lineTo(out[0], out[1]);
          }
        }
        ctx.stroke();
      }

      // Points: 1 to 1.5 device pixels, square, no rims.
      ctx.fillStyle = PALE;
      for (let i = 0; i < n; i++) {
        const a = clamp01((t - lit(i)) / 0.5);
        if (a <= 0) continue;
        ctx.globalAlpha = a * fade * (web.boundary[i] ? 0.55 : 1);
        const size = (web.boundary[i] ? 1 : 1.5) / dpr;
        ctx.fillRect(sx[i] - size / 2, sy[i] - size / 2, size, size);
      }

      // Shimmer.
      if (t > nextPulse && pulses.length < 3) {
        spawn(t);
        nextPulse = t + 0.9 + rand() * 1.4;
      }
      ctx.strokeStyle = PALE;
      ctx.lineWidth = 1 / dpr;
      for (let q = pulses.length - 1; q >= 0; q--) {
        const pu = pulses[q];
        const u = (t - pu.born) / pu.life;
        if (u >= 1) {
          pulses.splice(q, 1);
          continue;
        }
        const segs = pu.chain.length - 1;
        const head = easeInOut(u) * (segs + 0.6);
        ctx.globalAlpha = Math.sin(Math.PI * u) * 0.8 * fade;
        ctx.beginPath();
        for (let k = 0; k < segs; k++) {
          const from = Math.max(k, head - 0.6);
          const to = Math.min(k + 1, head);
          if (to <= from) continue;
          const a = pu.chain[k];
          const z = pu.chain[k + 1];
          const f0 = from - k;
          const f1 = to - k;
          ctx.moveTo(sx[a] + (sx[z] - sx[a]) * f0, sy[a] + (sy[z] - sy[a]) * f0);
          ctx.lineTo(sx[a] + (sx[z] - sx[a]) * f1, sy[a] + (sy[z] - sy[a]) * f1);
        }
        ctx.stroke();
      }

      // The Lexington star lights last, with one ring of light running out from it.
      const ignite = easeOut(clamp01((t - IGNITE) / 0.9));
      if (ignite > 0) {
        const ring = clamp01((t - IGNITE) / 1.8);
        if (ring < 1) {
          ctx.globalAlpha = (1 - ring) * 0.45 * fade;
          ctx.strokeStyle = PALE;
          ctx.lineWidth = 0.8 / dpr;
          ctx.beginPath();
          for (let i = 0; i <= 96; i++) {
            const ang = (i / 96) * Math.PI * 2;
            const rad = 10 + easeOut(ring) * 200;
            project(STAR[0] - CX + Math.cos(ang) * rad, STAR[1] - CY + Math.sin(ang) * rad, 0);
            if (i === 0) ctx.moveTo(out[0], out[1]);
            else ctx.lineTo(out[0], out[1]);
          }
          ctx.stroke();
        }
        const grow = (0.55 + 0.45 * ignite) * 0.5;
        ctx.globalAlpha = ignite * Math.max(0.15, fade);
        ctx.fillStyle = STAR_FILL;
        ctx.beginPath();
        for (let i = 0; i + 1 < STAR_PTS.length; i += 2) {
          project(STAR[0] - CX + (STAR_PTS[i] - STAR[0]) * grow, STAR[1] - CY + (STAR_PTS[i + 1] - STAR[1]) * grow, 0);
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
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full motion-reduce:hidden ${className}`}
      />
      {still && <StillWeb />}
    </>
  );
}

const STAR_PTS = MARK.star.match(/-?\d+(\.\d+)?/g)!.map(Number);

// Index of the border vertex nearest Lexington, where the border starts closing.
const NEAR = OUTLINE.reduce(
  (best, [x, y], i) =>
    Math.hypot(x - STAR[0], y - STAR[1]) < Math.hypot(OUTLINE[best][0] - STAR[0], OUTLINE[best][1] - STAR[1]) ? i : best,
  0,
);

/** Reduced motion: the finished web, as vectors. Built only for visitors who need it. */
function StillWeb() {
  const web = buildWeb(16);
  const d: string[] = [];
  for (let e = 0; e < web.length.length; e++) {
    const a = web.edges[2 * e];
    const z = web.edges[2 * e + 1];
    d.push(`M${web.x[a].toFixed(1)},${web.y[a].toFixed(1)}L${web.x[z].toFixed(1)},${web.y[z].toFixed(1)}`);
  }
  return (
    <svg
      viewBox={MARK.viewBox}
      aria-hidden="true"
      className="absolute left-1/2 top-[64%] md:left-[54%] md:top-[60%] w-[94%] md:w-[min(84%,133vh)] -translate-x-1/2 -translate-y-1/2"
    >
      <path d={d.join("")} fill="none" stroke={SILK} strokeOpacity={0.5} strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
      <path d={MARK.state} fill="none" stroke={SILK} strokeOpacity={0.6} strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
      {Array.from(web.x, (x, i) => (
        <rect key={i} x={x - 0.6} y={web.y[i] - 0.6} width={1.2} height={1.2} fill={PALE} opacity={web.boundary[i] ? 0.5 : 0.85} />
      ))}
      <path d={MARK.star} fill={STAR_FILL} transform={`translate(${STAR[0]} ${STAR[1]}) scale(0.5) translate(${-STAR[0]} ${-STAR[1]})`} />
    </svg>
  );
}
