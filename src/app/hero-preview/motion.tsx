"use client";

import { useEffect, useRef } from "react";

// Pure canvas backdrops for the hero. No video file, no download, crisp at any size.
// Three ideas, all in brand colours: wind over grass, scatter resolving into a grid,
// and slow contour lines building a landscape.

type Mode = "wind" | "order" | "contour";

const GRAPHITE = "#1C1C1E";
const EMERALD = "#0D7C66";
const SAGE = "#2A9D8F";
const GOLD = "#D4A017";

export function MotionBackdrop({ mode }: { mode: Mode }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const size = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    // wind: long thin strokes drifting across the frame, like grass under wind
    const blades = Array.from({ length: 220 }, () => ({
      x: Math.random(),
      y: Math.random(),
      len: 40 + Math.random() * 160,
      speed: 0.02 + Math.random() * 0.05,
      alpha: 0.05 + Math.random() * 0.25,
    }));

    // order: dots that start scattered and settle onto a grid
    const COLS = 26;
    const ROWS = 12;
    const dots = Array.from({ length: COLS * ROWS }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      return {
        tx: (col + 0.5) / COLS,
        ty: (row + 0.5) / ROWS,
        x: Math.random(),
        y: Math.random(),
        delay: Math.random() * 2.5,
      };
    });

    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.fillStyle = GRAPHITE;
      ctx.fillRect(0, 0, w, h);

      if (mode === "wind") {
        ctx.lineWidth = 1;
        for (const b of blades) {
          const x = ((b.x + t * b.speed) % 1.2) * w - 0.1 * w;
          const y = b.y * h + Math.sin(t * 0.6 + b.y * 9) * 12;
          const grad = ctx.createLinearGradient(x, y, x + b.len, y);
          grad.addColorStop(0, `rgba(42,157,143,0)`);
          grad.addColorStop(0.5, `rgba(42,157,143,${b.alpha})`);
          grad.addColorStop(1, `rgba(42,157,143,0)`);
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + b.len, y - 6);
          ctx.stroke();
        }
        const glow = ctx.createRadialGradient(w * 0.78, h * 0.3, 0, w * 0.78, h * 0.3, h * 0.7);
        glow.addColorStop(0, "rgba(212,160,23,0.10)");
        glow.addColorStop(1, "rgba(212,160,23,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      if (mode === "order") {
        for (const d of dots) {
          const p = Math.min(Math.max((t - d.delay) / 3.2, 0), 1);
          const e = 1 - Math.pow(1 - p, 4); // ease out
          const x = (d.x + (d.tx - d.x) * e) * w;
          const y = (d.y + (d.ty - d.y) * e) * h;
          ctx.fillStyle = p > 0.98 ? SAGE : EMERALD;
          ctx.globalAlpha = 0.25 + 0.5 * e;
          ctx.beginPath();
          ctx.arc(x, y, p > 0.98 ? 1.6 : 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        // once settled, a faint line sweeps along the finished grid
        const sweep = ((t - 3) % 6) / 6;
        if (t > 3) {
          const sx = sweep * w;
          const g = ctx.createLinearGradient(sx - 120, 0, sx + 120, 0);
          g.addColorStop(0, "rgba(212,160,23,0)");
          g.addColorStop(0.5, "rgba(212,160,23,0.16)");
          g.addColorStop(1, "rgba(212,160,23,0)");
          ctx.fillStyle = g;
          ctx.fillRect(sx - 120, 0, 240, h);
        }
      }

      if (mode === "contour") {
        const lines = 26;
        for (let i = 0; i < lines; i++) {
          const p = i / lines;
          const baseY = h * (0.25 + p * 0.7);
          ctx.beginPath();
          for (let x = 0; x <= w; x += 8) {
            const k = x / w;
            const y =
              baseY +
              Math.sin(k * 5 + t * 0.25 + i * 0.35) * (10 + p * 26) +
              Math.sin(k * 11 - t * 0.15 + i) * 4;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(42,157,143,${0.05 + p * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        const sun = ctx.createRadialGradient(w * 0.72, h * 0.22, 0, w * 0.72, h * 0.22, h * 0.5);
        sun.addColorStop(0, "rgba(212,160,23,0.16)");
        sun.addColorStop(1, "rgba(212,160,23,0)");
        ctx.fillStyle = sun;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, [mode]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
