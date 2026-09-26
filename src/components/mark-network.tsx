"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";
import { MARK } from "@/lib/mark-geometry";

// The official mark assembles itself as the visitor scrolls through a pinned section.
// Order: the state outline draws, the network grows outward from Lexington one hop at a
// time (each line starts at a node that is already lit), the state floods blue while the
// network turns white, and the Lexington star lights last. Every value is a pure function
// of scroll progress, so scrolling back runs it in reverse.
// The server renders the finished mark, so no-JS and reduced-motion visitors see the logo.

const STAR: [number, number] = [647.09, 183.35]; // hub of the network, Lexington
const same = (ax: number, ay: number, bx: number, by: number) => Math.hypot(ax - bx, ay - by) < 2;

// Breadth-first order from the star. Built once at module load from the logo geometry.
const PLAN = (() => {
  const pts: [number, number][] = [STAR, ...MARK.circles.map(([x, y]) => [x, y] as [number, number])];
  const id = (x: number, y: number) => pts.findIndex(([px, py]) => same(px, py, x, y));
  const edges = MARK.lines.map(([x1, y1, x2, y2]) => [id(x1, y1), id(x2, y2)] as [number, number]);
  const depth = pts.map(() => Infinity);
  depth[0] = 0;
  for (let changed = true; changed; ) {
    changed = false;
    for (const [a, b] of edges) {
      if (depth[a] + 1 < depth[b]) (depth[b] = depth[a] + 1), (changed = true);
      if (depth[b] + 1 < depth[a]) (depth[a] = depth[b] + 1), (changed = true);
    }
  }
  const maxDepth = Math.max(...depth.filter(Number.isFinite));
  // Each line draws away from whichever end is nearer the star.
  const lines = edges.map(([a, b]) => {
    const [from, to] = depth[a] <= depth[b] ? [a, b] : [b, a];
    return { from: pts[from], to: pts[to], toNode: to, step: depth[from] };
  });
  return { lines, depth, maxDepth };
})();

// Scroll windows, as fractions of the pinned distance.
const OUTLINE: [number, number] = [0.02, 0.2];
const NET: [number, number] = [0.14, 0.7];
const FLOOD: [number, number] = [0.72, 0.84];
const STAR_ON: [number, number] = [0.86, 0.96];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const local = (p: number, [a, b]: [number, number]) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (t: number) => {
  // #0033A0 to #FFFFFF
  const c = (a: number) => Math.round(a + (255 - a) * t);
  return `rgb(${c(0)},${c(51)},${c(160)})`;
};

function lineWindow(step: number): [number, number] {
  const span = (NET[1] - NET[0]) / (PLAN.maxDepth + 0.6);
  const start = NET[0] + step * span;
  return [start, start + span * 1.6];
}

export default function MarkNetwork() {
  const still = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const outline = useRef<SVGPathElement>(null);
  const fill = useRef<SVGPathElement>(null);
  const star = useRef<SVGPathElement>(null);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const nodes = useRef<(SVGCircleElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  const paint = (p: number) => {
    const flood = ease(local(p, FLOOD));
    const ink = mix(flood);
    outline.current?.style.setProperty("stroke-dashoffset", String(1 - ease(local(p, OUTLINE))));
    fill.current?.style.setProperty("opacity", String(flood));
    PLAN.lines.forEach((l, i) => {
      const el = lines.current[i];
      if (!el) return;
      el.style.strokeDashoffset = String(1 - ease(local(p, lineWindow(l.step))));
      el.style.stroke = ink;
    });
    // A node lights when the first line reaching it lands; node 0 is the star.
    nodes.current.forEach((el, i) => {
      if (!el) return;
      const d = PLAN.depth[i + 1];
      const [, landed] = lineWindow(d - 1);
      const t = ease(local(p, [landed - 0.03, landed + 0.02]));
      el.style.opacity = String(t);
      el.style.transform = `scale(${0.4 + 0.6 * t})`;
      el.style.fill = ink;
    });
    const s = ease(local(p, STAR_ON));
    if (star.current) {
      star.current.style.opacity = String(s);
      star.current.style.transform = `scale(${0.7 + 0.3 * s})`;
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!still) paint(p);
  });
  useEffect(() => {
    if (!still) paint(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still]);

  const svg = (
    <svg
      viewBox={MARK.viewBox}
      role="img"
      aria-label="The Bluegrass Advisory Group mark: Kentucky in blue with a network of white nodes and a star on Lexington"
      className="w-[min(88vw,1100px)] h-auto overflow-visible"
    >
      <path ref={fill} d={MARK.state} fill="#0033A0" />
      <path
        ref={outline}
        d={MARK.state}
        fill="none"
        stroke="#0033A0"
        strokeWidth={2}
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={0}
      />
      {PLAN.lines.map((l, i) => (
        <line
          key={i}
          ref={(el) => {
            lines.current[i] = el;
          }}
          x1={l.from[0]}
          y1={l.from[1]}
          x2={l.to[0]}
          y2={l.to[1]}
          stroke="#FFFFFF"
          strokeWidth={3.6}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={0}
        />
      ))}
      {MARK.circles.map(([cx, cy, r], i) => (
        <circle
          key={i}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          cx={cx}
          cy={cy}
          r={r}
          fill="#FFFFFF"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
      <path
        ref={star}
        d={MARK.star}
        fill="#FFFFFF"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );

  if (still) {
    return <section className="px-4 md:px-10 py-20 md:py-28 flex justify-center">{svg}</section>;
  }

  // ponytail: 230vh of scroll drives the whole sequence; shorten the track to speed it up.
  return (
    <section ref={track} className="relative h-[230vh]">
      <div className="sticky top-0 h-svh flex items-center justify-center px-4 md:px-10">{svg}</div>
    </section>
  );
}
