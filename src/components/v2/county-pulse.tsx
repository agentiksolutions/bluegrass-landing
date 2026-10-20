"use client";

import { useEffect, useRef } from "react";
import { COUNTY_ARCS } from "@/lib/ky-counties";
import { MARK } from "@/lib/mark-geometry";

// Kentucky's county borders firing like neurons (Phil, 2026-10-20, Vercel comment: drop the
// nodes over the 3D state; "the county lines themselves should fire into each other"). Pulses run
// along the real county borders (src/lib/ky-counties.ts), lighting each border as it passes; at a
// junction it fires into a neighboring border, or turns back where a border ends. Drawn in code on one
// canvas, so it replaces two video files. The state lies tilted in depth with CSS, starts only
// when near the screen, stops off screen and in hidden tabs, and draws one still frame under
// reduced motion. Coordinates are the logo's drawing units (viewBox -1 -1 981.7 441.1).

const VB = { x: -1, y: -1, w: 981.7, h: 441.1 };
const SPEED = 120; // drawing units per second
const TRAIL = 80;

type Arc = { pts: number[]; cum: number[]; len: number; a: string; b: string };
type Pulse = { arc: number; dir: 1 | -1; s: number; speed: number };

const key = (x: number, y: number) => `${Math.round(x)},${Math.round(y)}`;

function buildArcs() {
  const arcs: Arc[] = COUNTY_ARCS.map((pts) => {
    const cum = [0];
    for (let i = 2; i < pts.length; i += 2) cum.push(cum[cum.length - 1] + Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]));
    return { pts, cum, len: cum[cum.length - 1], a: key(pts[0], pts[1]), b: key(pts[pts.length - 2], pts[pts.length - 1]) };
  });
  const at = new Map<string, number[]>();
  arcs.forEach((arc, i) => {
    for (const k of [arc.a, arc.b]) at.set(k, [...(at.get(k) ?? []), i]);
  });
  return { arcs, at };
}

/** The point at distance s along an arc. */
function pointAt(arc: Arc, s: number): [number, number] {
  const d = Math.max(0, Math.min(arc.len, s));
  let i = 1;
  while (i < arc.cum.length - 1 && arc.cum[i] < d) i++;
  const t = (d - arc.cum[i - 1]) / (arc.cum[i] - arc.cum[i - 1] || 1);
  const p = arc.pts;
  return [p[2 * i - 2] + (p[2 * i] - p[2 * i - 2]) * t, p[2 * i - 1] + (p[2 * i + 1] - p[2 * i - 1]) * t];
}

export default function CountyPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = document.documentElement.classList.contains("motion-off");
    const { arcs, at } = buildArcs();
    const state = new Path2D(MARK.state);
    const star = new Path2D(MARK.star);
    const borders = new Path2D(COUNTY_ARCS.map((a) => "M" + a.join(" ")).join(""));

    let w = 1;
    let s = 1;
    const resize = () => {
      w = canvas.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      s = w / VB.w;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * (VB.h / VB.w) * dpr + 14 * s * dpr);
      ctx.setTransform(dpr * s, 0, 0, dpr * s, -VB.x * dpr * s, -VB.y * dpr * s);
    };

    const count = window.innerWidth < 768 ? 22 : 44;
    const pulses: Pulse[] = Array.from({ length: count }, () => {
      const arc = (Math.random() * arcs.length) | 0;
      return { arc, dir: Math.random() < 0.5 ? 1 : -1, s: Math.random() * arcs[arc].len, speed: SPEED * (0.7 + Math.random() * 0.6) };
    });
    // Each border glows when a pulse runs along it and fades over about a second and a half.
    const glow = new Float32Array(arcs.length);
    pulses.forEach((p) => (glow[p.arc] = 1));

    const fire = (p: Pulse) => {
      const arc = arcs[p.arc];
      const end = p.dir === 1 ? arc.b : arc.a;
      const next = (at.get(end) ?? []).filter((i) => i !== p.arc);
      if (!next.length) {
        p.dir = p.dir === 1 ? -1 : 1; // a border that ends at the state line: turn back
        glow[p.arc] = 1;
        return;
      }
      const n = next[(Math.random() * next.length) | 0];
      p.arc = n;
      p.dir = arcs[n].a === end ? 1 : -1;
      p.s = p.dir === 1 ? 0 : arcs[n].len;
      glow[n] = 1;
    };

    const draw = (dt: number) => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      // The slab: a darker copy below the state reads as its edge.
      ctx.save();
      ctx.translate(0, 12);
      ctx.fillStyle = "#070D1C";
      ctx.fill(state);
      ctx.restore();
      ctx.fillStyle = "#0F1E44";
      ctx.fill(state);
      ctx.lineWidth = 1 / s;
      ctx.strokeStyle = "rgba(157,178,232,0.22)";
      ctx.stroke(borders);
      ctx.lineWidth = 1.4 / s;
      ctx.strokeStyle = "rgba(242,241,236,0.45)";
      ctx.stroke(state);
      ctx.lineCap = "round";
      for (let i = 0; i < arcs.length; i++) {
        if (glow[i] < 0.03) continue;
        if (dt) glow[i] = Math.max(0, glow[i] - dt * 0.7);
        ctx.strokeStyle = `rgba(157,178,232,${glow[i] * 0.55})`;
        ctx.lineWidth = 1.8 / Math.max(s, 0.5);
        ctx.beginPath();
        const p = arcs[i].pts;
        ctx.moveTo(p[0], p[1]);
        for (let k = 2; k < p.length; k += 2) ctx.lineTo(p[k], p[k + 1]);
        ctx.stroke();
      }
      for (const p of pulses) {
        if (dt) {
          p.s += p.dir * p.speed * dt;
          const arc = arcs[p.arc];
          if (p.s > arc.len || p.s < 0) {
            p.s = Math.max(0, Math.min(arc.len, p.s));
            fire(p);
          }
        }
        const arc = arcs[p.arc];
        const tail = p.s - p.dir * TRAIL;
        const [hx, hy] = pointAt(arc, p.s);
        // The trail: a few segments that fade toward the tail.
        for (let k = 0; k < 4; k++) {
          const a0 = pointAt(arc, p.s - ((p.s - tail) * k) / 4);
          const a1 = pointAt(arc, p.s - ((p.s - tail) * (k + 1)) / 4);
          ctx.strokeStyle = `rgba(190,206,245,${0.85 - k * 0.2})`;
          ctx.lineWidth = (2.4 - k * 0.4) / Math.max(s, 0.5);
          ctx.beginPath();
          ctx.moveTo(a0[0], a0[1]);
          ctx.lineTo(a1[0], a1[1]);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(242,241,236,0.95)";
        ctx.beginPath();
        ctx.arc(hx, hy, 2.2 / Math.max(s, 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#FFFFFF";
      ctx.fill(star);
    };

    let raf = 0;
    let last = 0;
    let running = false;
    const loop = (t: number) => {
      draw(last ? Math.min(0.05, (t - last) / 1000) : 0);
      last = t;
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(0);
    let inView = false;
    const update = () => (inView && !document.hidden ? start() : stop());
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        update();
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(canvas);
    const onVis = () => update();
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(0);
    });
    ro.observe(canvas);
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section data-nav="dark" data-nomotion className="night relative overflow-hidden bg-night text-night-text">
      <div className="mx-auto flex max-w-page-pad items-center px-4 py-16 md:min-h-[80svh] md:px-10 md:py-24">
        <div className="w-full [perspective:1400px]">
          {/* On phones the tilt pivots on the bottom edge, so the near edge keeps the gutter width
              and the far edge recedes inside it. */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="mx-auto block h-auto w-full origin-bottom [transform:rotateX(18deg)] md:w-[90%] md:origin-center md:[transform:rotateX(34deg)]"
          />
        </div>
      </div>
    </section>
  );
}
