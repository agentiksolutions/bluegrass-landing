"use client";

import { useEffect, useRef } from "react";
import { OUTLINE, STAR } from "@/lib/kentucky-web";
import { COUNTY_ARCS } from "@/lib/ky-counties";
import { MARK } from "@/lib/mark-geometry";

// The V2 hero: Kentucky drawn by moving light. A few thousand points drift through a slowly
// turning current that stays inside the real state outline, each leaving a short trail, so the
// state fills with flowing lines. On load the light starts at Lexington and spreads to the
// borders. Scrolling the hero pulls the current toward Lexington; a pointer stirs it.
// Drawn live on the device, so it is sharp at any screen size (Phil wants nothing under 4K).
// Coordinates are the logo's drawing units (viewBox 980 x 440), shared with the official mark.

const W0 = 980;
const H0 = 440;
const CELL = 5; // inside-the-state lookup grid, in drawing units

type Fit = { s: number; ox: number; oy: number };

function fitFor(w: number, h: number): Fit {
  if (w < 768) {
    // Phones: the state runs past both edges in the upper half; the words sit below it.
    const s = (w * 1.32) / W0;
    return { s, ox: w / 2 - (STAR[0] - 40) * s, oy: h * 0.2 };
  }
  const s = Math.min((w * 0.76) / W0, (h * 0.62) / H0);
  return { s, ox: w - W0 * s - w * 0.03, oy: h * 0.38 - (H0 * s) / 2 };
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

export default function KentuckyFlow({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = document.documentElement.classList.contains("motion-off");
    const { mask, cells, cols, rows } = buildMask();
    const insideAt = (x: number, y: number) => {
      const c = (x / CELL) | 0;
      const r = (y / CELL) | 0;
      return c >= 0 && r >= 0 && c < cols && r < rows && mask[r * cols + c] === 1;
    };

    const outline = new Path2D("M" + OUTLINE.map((p) => p.join(" ")).join("L") + "Z");
    const counties = new Path2D(COUNTY_ARCS.map((a) => "M" + a.join(" ")).join(""));
    const star = new Path2D(MARK.star);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let fit: Fit = { s: 1, ox: 0, oy: 0 };
    let n = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let life = new Float32Array(0);
    let tone = new Uint8Array(0);

    const t0 = performance.now();
    let scrollPull = 0;
    // The headline's box on the canvas, padded; light inside it is drawn faint.
    let quiet = { l: 0, r: 0, t: 0, b: 0 };
    const measureQuiet = () => {
      const words = canvas.parentElement?.querySelector<HTMLElement>("[data-quiet]");
      if (!words) return;
      const c = canvas.getBoundingClientRect();
      const r = words.getBoundingClientRect();
      quiet = { l: r.left - c.left - 24, r: r.right - c.left + 24, t: r.top - c.top - 16, b: r.bottom - c.top + 16 };
    };
    const pointer = { x: -1e4, y: -1e4, on: false };

    const spawn = (i: number, t: number) => {
      // The light starts at Lexington and reaches the borders over the first three seconds.
      const reach = reduce ? 1e4 : 40 + Math.min(1, t / 3) * 900;
      for (let k = 0; k < 24; k++) {
        const cell = cells[(Math.random() * cells.length) | 0];
        const x = (cell % cols) * CELL + Math.random() * CELL;
        const y = ((cell / cols) | 0) * CELL + Math.random() * CELL;
        if (Math.hypot(x - STAR[0], y - STAR[1]) <= reach) {
          px[i] = x;
          py[i] = y;
          life[i] = 70 + Math.random() * 200;
          return;
        }
      }
      px[i] = STAR[0] + (Math.random() - 0.5) * 30;
      py[i] = STAR[1] + (Math.random() - 0.5) * 30;
      life[i] = 30 + Math.random() * 60;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.75 : 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      fit = fitFor(w, h);
      measureQuiet();
      const want = w < 768 ? 1100 : w < 1280 ? 2200 : 3000;
      if (want !== n) {
        n = want;
        px = new Float32Array(n);
        py = new Float32Array(n);
        life = new Float32Array(n);
        tone = new Uint8Array(n);
        const t = (performance.now() - t0) / 1000;
        for (let i = 0; i < n; i++) {
          spawn(i, t);
          // About one point in six is lit blue; the rest are limestone.
          tone[i] = Math.random() < 0.17 ? 1 : 0;
          life[i] *= Math.random();
        }
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const step = (now: number) => {
      const t = (now - t0) / 1000;
      const { s, ox, oy } = fit;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fade the old trails toward transparent; the night background shows through.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      // The map under the light: the 120 county lines and the state border.
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(s, s);
      ctx.lineWidth = 0.9 / s;
      ctx.strokeStyle = "rgba(242,241,236,0.035)";
      ctx.stroke(counties);
      ctx.lineWidth = 1.2 / s;
      ctx.strokeStyle = "rgba(242,241,236,0.16)";
      ctx.stroke(outline);
      ctx.restore();

      const pull = 0.18 + scrollPull * 1.4;
      const speed = 0.62 + scrollPull * 1.6;
      const pX = (pointer.x - ox) / s;
      const pY = (pointer.y - oy) / s;

      // Third path: light that passes behind the headline is drawn faint so the words stay clear.
      const paths = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      const q = quiet;
      for (let i = 0; i < n; i++) {
        const x = px[i];
        const y = py[i];
        // A slowly turning current made of a few crossing waves.
        const a =
          Math.sin(x * 0.0105 + t * 0.21) * 1.3 +
          Math.cos(y * 0.0142 - t * 0.17) * 1.2 +
          Math.sin((x + y) * 0.0061 + t * 0.09) * 0.9;
        let vx = Math.cos(a);
        let vy = Math.sin(a);
        // A steady draw toward Lexington, stronger as the visitor scrolls.
        const dx = STAR[0] - x;
        const dy = STAR[1] - y;
        const d = Math.hypot(dx, dy) + 1e-3;
        vx += (dx / d) * pull;
        vy += (dy / d) * pull;
        // The pointer stirs the current around itself.
        if (pointer.on) {
          const qx = x - pX;
          const qy = y - pY;
          const q = qx * qx + qy * qy;
          if (q < 5200) {
            const f = (1 - q / 5200) * 2.2;
            vx += (-qy / Math.sqrt(q + 1)) * f;
            vy += (qx / Math.sqrt(q + 1)) * f;
          }
        }
        const nx = x + vx * speed;
        const ny = y + vy * speed;
        life[i] -= 1;
        if (life[i] <= 0 || !insideAt(nx, ny) || d < 6) {
          spawn(i, t);
          continue;
        }
        const sx = ox + x * s;
        const sy = oy + y * s;
        const inQuiet = (pad: number) => sx > q.l - pad && sx < q.r + pad && sy > q.t - pad && sy < q.b + pad;
        // A soft edge: faint inside the headline box, half strength in a band around it.
        const path = inQuiet(0) ? paths[2] : inQuiet(36) ? paths[3] : paths[tone[i]];
        path.moveTo(sx, sy);
        path.lineTo(ox + nx * s, oy + ny * s);
        px[i] = nx;
        py[i] = ny;
      }
      ctx.lineCap = "round";
      ctx.lineWidth = w < 768 ? 1.1 : 1.3;
      ctx.strokeStyle = "rgba(242,241,236,0.55)";
      ctx.stroke(paths[0]);
      ctx.strokeStyle = "rgba(157,178,232,0.9)";
      ctx.stroke(paths[1]);
      ctx.strokeStyle = "rgba(242,241,236,0.1)";
      ctx.stroke(paths[2]);
      ctx.strokeStyle = "rgba(242,241,236,0.28)";
      ctx.stroke(paths[3]);

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
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduce) {
      // One still frame: run the current for a while, then stop.
      for (let k = 0; k < 140; k++) step(t0 + k * 16);
    }

    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) for (let k = 0; k < 140; k++) step(t0 + k * 16);
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
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
}
