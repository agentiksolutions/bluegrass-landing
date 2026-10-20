"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { MARK } from "@/lib/mark-geometry";

// Hero option B (Phil, 2026-10-07: "a better video or something displaying AI and what it
// does.. maybe even videos inside of the KY"). Kentucky is a window: real BAG work drifts past
// inside the state outline, the logo's own network lines sit over it, and one caption at a time
// says what the AI just did. Every tile is a real screen or a panel marked "Sample data".

const TILES = [
  "/images/work/tiles/manager-portal.webp",
  "/images/work/tiles/assistant.webp",
  "/images/work/tiles/academy.webp",
  "/images/work/tiles/systems-map.webp",
  "/images/work/tiles/pfsa.webp",
  "/images/work/tiles/support.webp",
];

const DONE = [
  "Inbox sorted",
  "Morning briefing sent",
  "Weekly report built",
  "Invoices matched to orders",
  "Store checklists checked",
  "Meeting notes filed",
];

// Tile size in the mark's own units (the state is about 980 wide and 440 tall).
const TW = 430;
const TH = 242;
const GAP = 10;
// The row repeats every three tiles, so a pan of (TW + GAP) * 3 = 1320 units loops seamlessly;
// that distance is the ky-pan keyframe in globals.css.

function Row({ y, offset, tiles }: { y: number; offset: number; tiles: string[] }) {
  // Six tiles (two full periods) cover the 980-unit width plus one period of travel.
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <image
          key={i}
          href={tiles[i % 3]}
          x={offset + i * (TW + GAP)}
          y={y}
          width={TW}
          height={TH}
          preserveAspectRatio="xMidYMid slice"
        />
      ))}
    </>
  );
}

export default function HeroWorkMap() {
  const still = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (still) return;
    const t = setInterval(() => setN((k) => (k + 1) % DONE.length), 2600);
    return () => clearInterval(t);
  }, [still]);

  return (
    <div className="relative w-full">
      <svg viewBox={MARK.viewBox} className="block w-full h-auto" role="img" aria-label="Kentucky, filled with screens of real work: a manager portal, an AI assistant, the AI Academy, a systems map, a nonprofit's website and a support request">
        <defs>
          <clipPath id="ky-window">
            <path d={MARK.state} />
          </clipPath>
        </defs>
        <g clipPath="url(#ky-window)">
          <rect x={-1} y={-1} width={983} height={443} fill="#070B14" />
          <g className={still ? "" : "animate-[ky-pan_48s_linear_infinite]"}>
            <Row y={-30} offset={-60} tiles={TILES.slice(0, 3)} />
            <Row y={TH + GAP - 30} offset={-280} tiles={TILES.slice(3, 6)} />
          </g>
          <rect x={-1} y={-1} width={983} height={443} fill="#070B14" opacity={0.12} />
          {MARK.lines.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#81A7F8" strokeOpacity={0.38} strokeWidth={1} />
          ))}
          {MARK.circles.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={2.8} fill="#E6EAF2" opacity={0.8} />
          ))}
        </g>
        <path d={MARK.state} fill="none" stroke="#81A7F8" strokeWidth={2} />
        <path d={MARK.star} fill="#FFFFFF" />
      </svg>

      <div className="mt-6 flex items-center gap-3 font-display text-[15px] md:text-[17px] text-body" aria-live="polite">
        <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#81A7F8] bg-[#81A7F8]/15">
          <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="#81A7F8" strokeWidth="2">
            <path d="M2.5 6.2l2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span key={n} className="text-ink animate-fade-in">
          {DONE[n]}
        </span>
        <span className="text-muted">· sample of what the AI does in a day</span>
      </div>
    </div>
  );
}

