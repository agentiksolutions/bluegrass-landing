"use client";

import { useEffect, useRef, useState } from "react";
import { MARK } from "@/lib/mark-geometry";
import { buildWeb, OUTLINE, STAR, type Web } from "@/lib/kentucky-web";

// The home hero: Kentucky as a fine web. Several hundred evenly spaced points fill the state
// edge to edge, joined by hairline strands that never leave the outline (src/lib/kentucky-web.ts).
// On load the web spins out from Lexington strand by strand, the border closes, and the star
// lights last. Afterwards the web sways slowly in depth and leans toward the cursor, short
// signals of light keep travelling along chains of strands, and every few seconds a brighter
// burst ripples out of Lexington. Scrolling on tilts it back and loosens
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

// Signals.
const TAIL = 1.3; // comet tail length, in strands
const SLICES = 7; // tail drawn in tapering slices
const FLARE = 0.3; // seconds a junction glows after a signal passes
const GLOW_SCALE = 0.25; // the glow layer is drawn at a quarter of CSS size
const P0 = [0, 0];
const P1 = [0, 0];

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

    const glow = document.createElement("canvas");
    const gctx = glow.getContext("2d");
    let cw = 0, ch = 0, dpr = 1, fit = 1, ox = 0, oy = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      glow.width = Math.max(1, Math.round(cw * GLOW_SCALE));
      glow.height = Math.max(1, Math.round(ch * GLOW_SCALE));
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

    // Signals: short runs of light travelling along chains of 3 to 6 strands, several live at
    // once, plus now and then a brighter burst out of Lexington along a few outward paths.
    type Pulse = { chain: number[]; born: number; life: number; bright: boolean };
    const pulses: Pulse[] = [];
    const phone = window.innerWidth < 768;
    const MAX_LIVE = phone ? 6 : 12;
    let nextPulse = IGNITE + 0.8;
    let nextBurst = IGNITE + 2.5;
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    let hub = 0;
    for (let i = 1; i < n; i++)
      if (Math.hypot(web.x[i] - STAR[0], web.y[i] - STAR[1]) < Math.hypot(web.x[hub] - STAR[0], web.y[hub] - STAR[1])) hub = i;
    // Walk 3 to 6 strands. `outward` prefers points further from Lexington, so bursts ripple out.
    const walk = (from: number, strands: number, outward: boolean) => {
      let at = from;
      const chain = [at];
      for (let k = 0; k < strands; k++) {
        let next = web.neighbours[at].filter((m) => !chain.includes(m));
        if (outward) {
          const out = next.filter((m) => web.depth[m] > web.depth[at]);
          if (out.length) next = out;
        }
        if (!next.length) break;
        at = next[(rand() * next.length) | 0];
        chain.push(at);
      }
      return chain;
    };
    const spawn = (t: number) => {
      const chain = walk((rand() * n) | 0, 3 + ((rand() * 4) | 0), false);
      if (chain.length > 3) pulses.push({ chain, born: t, life: 0.6 + chain.length * 0.22, bright: false });
    };
    const burst = (t: number) => {
      const paths = phone ? 3 : 4 + ((rand() * 3) | 0);
      for (let k = 0; k < paths; k++) {
        const chain = walk(hub, 5 + ((rand() * 2) | 0), true);
        if (chain.length > 2) pulses.push({ chain, born: t + k * 0.05, life: 0.6 + chain.length * 0.17, bright: true });
      }
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

      // Strands, spinning out from the nearer-to-Lexington end. Each length bucket becomes one
      // path, drawn twice: once wide into a quarter-size glow layer (soft by nature, so it can be
      // small and cheap) that is added underneath, then as the silk hairline on top. The web
      // reads as lit fibre while the strands stay fine.
      const paths: Path2D[] = [];
      for (let b = 0; b < BUCKETS.length; b++) {
        const path = new Path2D();
        for (let e = 0; e < edgeCount; e++) {
          if (bucket[e] !== b) continue;
          const a = web.edges[2 * e];
          const z = web.edges[2 * e + 1];
          const p = easeOut(clamp01((t - lit(a)) / (hop * 2.2)));
          if (p <= 0) continue;
          path.moveTo(sx[a], sy[a]);
          path.lineTo(sx[a] + (sx[z] - sx[a]) * p, sy[a] + (sy[z] - sy[a]) * p);
        }
        paths.push(path);
      }
      if (gctx) {
        gctx.setTransform(GLOW_SCALE, 0, 0, GLOW_SCALE, 0, 0);
        gctx.clearRect(0, 0, cw, ch);
        gctx.strokeStyle = SILK;
        gctx.lineWidth = 3.2;
        gctx.lineCap = "round";
        paths.forEach((path, b) => {
          gctx.globalAlpha = BUCKETS[b] * 0.5 * fade;
          gctx.stroke(path);
        });
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.55;
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(glow, 0, 0, cw, ch);
        ctx.globalCompositeOperation = "source-over";
      }
      ctx.strokeStyle = SILK;
      ctx.lineWidth = hair;
      paths.forEach((path, b) => {
        ctx.globalAlpha = BUCKETS[b] * fade;
        ctx.stroke(path);
      });

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

      // Signals.
      if (t > nextPulse) {
        if (pulses.filter((p) => !p.bright).length < MAX_LIVE) spawn(t);
        nextPulse = t + (phone ? 0.25 : 0.08) + rand() * (phone ? 0.35 : 0.2);
      }
      if (t > nextBurst) {
        burst(t);
        nextBurst = t + 5.5 + rand() * 4;
      }
      // Each signal is a comet: a bright head with a tail that tapers to a hairline, added on
      // top of the web, and each junction it passes flares for a moment.
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (let q = pulses.length - 1; q >= 0; q--) {
        const pu = pulses[q];
        const u = (t - pu.born) / pu.life;
        if (u >= 1) {
          pulses.splice(q, 1);
          continue;
        }
        if (u <= 0) continue;
        const ch = pu.chain;
        const segs = ch.length - 1;
        const span = segs + TAIL;
        const head = u * span; // constant speed, like a signal
        const secPerStrand = pu.life / span;
        // Quick fade in and out; no hard on/off, so nothing strobes.
        const env = Math.min(1, u / 0.1) * Math.min(1, (1 - u) / 0.25) * fade;
        const peak = 1;
        const at = (v: number, o: number[]) => {
          const k = Math.min(segs - 1, Math.max(0, Math.floor(v)));
          const f = Math.min(1, Math.max(0, v - k));
          o[0] = sx[ch[k]] + (sx[ch[k + 1]] - sx[ch[k]]) * f;
          o[1] = sy[ch[k]] + (sy[ch[k + 1]] - sy[ch[k]]) * f;
        };
        ctx.strokeStyle = pu.bright ? STAR_FILL : PALE;
        for (let j = 0; j < SLICES; j++) {
          const v0 = head - TAIL + (TAIL * j) / SLICES;
          const v1 = head - TAIL + (TAIL * (j + 1)) / SLICES;
          const lo = Math.max(0, v0);
          const hi = Math.min(segs, v1);
          if (hi <= lo) continue;
          const w = (j + 1) / SLICES; // 0 at the tail end, 1 at the head
          ctx.globalAlpha = env * peak * w * w;
          ctx.lineWidth = (0.6 + w * (pu.bright ? 2.6 : 2.2)) / dpr;
          ctx.beginPath();
          at(lo, P0);
          ctx.moveTo(P0[0], P0[1]);
          for (let k = Math.floor(lo) + 1; k < hi; k++) ctx.lineTo(sx[ch[k]], sy[ch[k]]);
          at(hi, P1);
          ctx.lineTo(P1[0], P1[1]);
          ctx.stroke();
        }
        // The head: a bright point riding the front of the tail.
        if (head < segs) {
          at(head, P1);
          const r = (pu.bright ? 1.8 : 1.4) / dpr;
          ctx.globalAlpha = env;
          ctx.fillStyle = STAR_FILL;
          ctx.fillRect(P1[0] - r, P1[1] - r, 2 * r, 2 * r);
        }
        // Junction flares: brief soft light where the head passed through a node.
        for (let k = 1; k <= segs; k++) {
          const since = (head - k) * secPerStrand;
          if (since < 0 || since > FLARE) continue;
          const f = 1 - since / FLARE;
          const r = ((pu.bright ? 14 : 9) * (0.6 + 0.4 * f)) / dpr;
          const x = sx[ch[k]];
          const y = sy[ch[k]];
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, pu.bright ? STAR_FILL : PALE);
          g.addColorStop(1, "rgba(157,182,245,0)");
          ctx.globalAlpha = env * peak * f * 0.9;
          ctx.fillStyle = g;
          ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
        }
      }
      ctx.globalCompositeOperation = "source-over";

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
