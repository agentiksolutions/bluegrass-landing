"use client";

// Split hero: the name and the pitch on the left, the actual work floating in on the right.
// Cards enter on a stagger, then breathe on a slow loop and react a little to the pointer.

import { useEffect, useRef } from "react";

const CARDS = [
  { src: "/videos/showroom-dashboard-demo.png", x: 4, y: 2, w: 62, depth: 1.0, delay: 0 },
  { src: "/videos/showroom-opportunity-report.png", x: 44, y: 26, w: 52, depth: 1.6, delay: 140 },
  { src: "/videos/showroom-website-generator.png", x: 0, y: 46, w: 44, depth: 2.2, delay: 260 },
  { src: "/videos/showroom-built-examples.png", x: 52, y: 66, w: 46, depth: 1.3, delay: 380 },
];

export default function HeroCards({ run, light = true }: { run: number; light?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--px", String(dx));
      el.style.setProperty("--py", String(dy));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const head = light ? "text-graphite" : "text-warm-white";
  const sub = light ? "text-charcoal/75" : "text-warm-white/70";
  const rule = light ? "bg-emerald" : "bg-sage";

  return (
    <div key={run} ref={wrap} className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes cardIn { from { opacity:0; transform: translate3d(0, 34px, 0) scale(.97);} to { opacity:1; transform: translate3d(0,0,0) scale(1);} }
        @keyframes cardFloat { 0%,100% { transform: translate3d(0,0,0);} 50% { transform: translate3d(0,-10px,0);} }
        @keyframes wordUp { from { opacity:0; transform: translateY(105%);} to { opacity:1; transform: translateY(0);} }
        @keyframes ruleIn { to { transform: scaleX(1);} }
        @keyframes softIn { to { opacity:1;} }
      `}</style>

      <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[minmax(0,46%)_minmax(0,54%)] items-center gap-8">
        <div>
          <h1
            className={`font-display font-bold tracking-tight ${head} text-[clamp(21px,3.2vw,48px)] leading-[1.1] whitespace-nowrap`}
          >
            {"Bluegrass Advisory Group".split(" ").map((w, i) => (
              <span key={w} className="inline-block overflow-hidden align-bottom">
                <span
                  className="inline-block opacity-0"
                  style={{
                    animation: "wordUp 820ms cubic-bezier(.16,1,.3,1) forwards",
                    animationDelay: `${i * 130}ms`,
                  }}
                >
                  {w}
                  {i < 2 ? " " : ""}
                </span>
              </span>
            ))}
          </h1>
          <div
            className={`h-px ${rule} mt-5 origin-left scale-x-0 max-w-[340px]`}
            style={{ animation: "ruleIn 900ms cubic-bezier(.16,1,.3,1) 520ms forwards" }}
          />
          <p
            className={`text-base md:text-lg ${sub} max-w-[420px] mt-6 opacity-0`}
            style={{ animation: "softIn 800ms ease-out 760ms forwards" }}
          >
            We learn your business, find what is worth building, and build it.
          </p>
        </div>

        <div className="relative h-[70%] hidden md:block">
          {CARDS.map((c) => (
            <div
              key={c.src}
              className="absolute opacity-0"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                width: `${c.w}%`,
                animation: `cardIn 900ms cubic-bezier(.16,1,.3,1) ${c.delay}ms forwards`,
                transform: `translate3d(calc(var(--px, 0) * ${c.depth * 22}px), calc(var(--py, 0) * ${c.depth * 16}px), 0)`,
              }}
            >
              <div
                style={{ animation: `cardFloat ${7 + c.depth}s ease-in-out ${c.delay + 900}ms infinite` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt=""
                  className="w-full rounded-xl shadow-[0_24px_60px_-18px_rgba(28,28,30,.45)] ring-1 ring-graphite/10"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
