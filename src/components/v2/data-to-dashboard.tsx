"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, WIDE, motionOff } from "@/lib/gsap";

// The signature sequence (Phil, 2026-10-20: visitors should watch their own messy data turn into
// a live dashboard). Scattered inputs float in depth: spreadsheet cells, receipt lines, point of
// sale rows, emails and time punches. As the visitor scrolls they fly into place, the panels draw,
// the numbers count up, then the dashboard does its job: an alert fires, the weekly summary writes
// itself and the schedule fills in. Every figure is sample data and the panel says so.
// Wide screens: one pinned, scrubbed timeline. Phones: the same build plays once on arrival.
// Reduced motion: the finished dashboard.

type Chip = { text: string; kind: "cell" | "receipt" | "pos" | "mail" | "punch"; slot: string };

const CHIPS: Chip[] = [
  { text: "Mon  6,912.40", kind: "cell", slot: "sales" },
  { text: "Tue  7,108.15", kind: "cell", slot: "sales" },
  { text: "Wed  6,655.92", kind: "cell", slot: "sales" },
  { text: "Thu  7,341.08", kind: "cell", slot: "sales" },
  { text: "Fri  8,920.33", kind: "cell", slot: "sales" },
  { text: "Sat  6,402.77", kind: "cell", slot: "sales" },
  { text: "CHK 4471  2 items  23.18", kind: "pos", slot: "sales" },
  { text: "CHK 4472  5 items  61.40", kind: "pos", slot: "sales" },
  { text: "Produce vendor  1,284.50", kind: "receipt", slot: "food" },
  { text: "Meat supplier  3,016.22", kind: "receipt", slot: "food" },
  { text: "Paper goods  412.90", kind: "receipt", slot: "food" },
  { text: "Dairy  688.04", kind: "receipt", slot: "food" },
  { text: "In 6:58a  Out 3:12p", kind: "punch", slot: "labor" },
  { text: "In 10:31a  Out 6:45p", kind: "punch", slot: "labor" },
  { text: "In 4:02p  Out 11:20p", kind: "punch", slot: "labor" },
  { text: "Overtime  2.5 h", kind: "punch", slot: "labor" },
  { text: "Re: Thursday schedule", kind: "mail", slot: "schedule" },
  { text: "Can I swap Saturday?", kind: "mail", slot: "schedule" },
  { text: "Invoice attached (PDF)", kind: "mail", slot: "food" },
  { text: "Weekly numbers?", kind: "mail", slot: "report" },
  { text: "Location B  =SUM(C2:C9)", kind: "cell", slot: "chart" },
  { text: "Location A  41,288", kind: "cell", slot: "chart" },
  { text: "Location C  36,902", kind: "cell", slot: "chart" },
  { text: "#REF!", kind: "cell", slot: "chart" },
];

const BARS = [0.62, 0.71, 0.58, 0.77, 0.94, 0.66, 0.52];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const SHIFTS = [
  [1, 1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 1],
];
const REPORT =
  "Weekly summary: sales finished ahead of last week. Labor ran over target on Friday night at Location B. Food cost held steady. Two schedule swaps are approved.";

const chipStyle: Record<Chip["kind"], string> = {
  cell: "border-night-line bg-night-2 text-night-text",
  receipt: "border-night-line bg-[#F2F1EC] text-ink",
  pos: "border-night-line bg-night text-night-blue",
  mail: "border-night-line bg-white text-ink",
  punch: "border-night-line bg-night-2 text-night-body",
};

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export default function DataToDashboard() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || motionOff()) return;
    const stage = el.querySelector<HTMLElement>("[data-stage]")!;
    const chips = Array.from(el.querySelectorAll<HTMLElement>("[data-chip]"));
    const r = rand(20261020);

    // Each chip's flight starts from a scattered point in depth and ends at its panel's slot.
    const scatter = chips.map(() => ({
      x: (r() - 0.5) * 1.1,
      y: (r() - 0.5) * 0.9,
      z: -200 + r() * 600,
      rx: (r() - 0.5) * 70,
      ry: (r() - 0.5) * 80,
      rz: (r() - 0.5) * 40,
    }));
    // Chips sit centred in the stage before any transform, so the flight is the slot's offset from
    // the stage centre. Measured from layout, never from a chip mid-flight.
    const delta = (chip: HTMLElement) => {
      const slot = el.querySelector<HTMLElement>(`[data-slot="${chip.dataset.chip}"]`)!;
      const s = stage.getBoundingClientRect();
      const b = slot.getBoundingClientRect();
      return { x: b.left + b.width / 2 - (s.left + s.width / 2), y: b.top + b.height / 2 - (s.top + s.height / 2) };
    };

    const build = (tl: gsap.core.Timeline) => {
      const sw = () => stage.clientWidth;
      const sh = () => stage.clientHeight;
      // Phase 1: the mess drifts in depth.
      chips.forEach((c, i) => {
        const s = scatter[i];
        tl.fromTo(
          c,
          { x: () => s.x * sw(), y: () => s.y * sh(), z: s.z, rotationX: s.rx, rotationY: s.ry, rotation: s.rz, autoAlpha: 1 },
          { x: () => s.x * sw() * 0.85, y: () => s.y * sh() * 0.85, z: s.z + 120, rotationX: s.rx * 0.6, rotationY: s.ry * 0.6, duration: 1, ease: "none" },
          0,
        );
      });
      tl.fromTo(el.querySelectorAll("[data-panel]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, 0.8);
      // Phase 2: every chip flies to its slot and dissolves into the panel.
      chips.forEach((c, i) => {
        tl.to(
          c,
          {
            x: () => delta(c).x,
            y: () => delta(c).y,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotation: 0,
            scale: 0.4,
            duration: 1,
            ease: "power2.inOut",
          },
          1 + (i % 8) * 0.06,
        ).to(c, { autoAlpha: 0, duration: 0.25 }, 1.85 + (i % 8) * 0.06);
      });
      // Phase 3: the dashboard draws and counts.
      tl.fromTo(el.querySelectorAll("[data-bar]"), { scaleY: 0 }, { scaleY: 1, transformOrigin: "bottom", duration: 0.8, stagger: 0.06, ease: "power2.out" }, 2.1);
      const line = el.querySelector<SVGPathElement>("[data-line]")!;
      const len = line.getTotalLength();
      tl.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1, ease: "none" }, 2.1);
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
        const end = parseFloat(n.dataset.count!);
        const dec = Number(n.dataset.dec || 0);
        const pre = n.dataset.pre || "";
        const suf = n.dataset.suf || "";
        const o = { v: 0 };
        tl.to(o, { v: end, duration: 1, ease: "power1.out", onUpdate: () => void (n.textContent = pre + o.v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf) }, 2.1);
      });
      // Phase 4: the dashboard does its job.
      tl.fromTo(el.querySelector("[data-alert]"), { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "back.out(1.6)" }, 3.2);
      const report = el.querySelector<HTMLElement>("[data-report]")!;
      const typed = { n: 0 };
      tl.to(typed, { n: REPORT.length, duration: 1.3, ease: "none", onUpdate: () => void (report.textContent = REPORT.slice(0, Math.round(typed.n))) }, 3.4);
      tl.fromTo(el.querySelectorAll("[data-shift]"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, stagger: { each: 0.025, from: "start" } }, 3.5);
      tl.to({}, { duration: 0.4 }); // a short hold on the finished dashboard
    };

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(WIDE, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: () => "+=" + window.innerHeight * 3.2, pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
        build(tl);
      });
      mm.add("(max-width: 820px)", () => {
        const tl = gsap.timeline({ paused: true });
        build(tl);
        tl.timeScale(1.6);
        const io = new IntersectionObserver(([e]) => e.isIntersecting && (tl.play(), io.disconnect()), { threshold: 0.35 });
        io.observe(stage);
        return () => io.disconnect();
      });
    }, el);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={ref} data-nav="dark" data-nomotion className="night relative overflow-hidden bg-night text-night-text">
      <div className="mx-auto flex min-h-[100svh] max-w-page flex-col px-4 pb-10 pt-24 md:px-10 min-[821px]:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[20ch] font-display text-[34px] font-light leading-[1.04] tracking-[-0.03em] md:text-[52px]">
            Your numbers, turned into a dashboard you&apos;ll actually use.
          </h2>
          <p className="font-display text-[13px] text-night-body">Sample data</p>
        </div>

        <div data-stage className="relative mt-8 flex-1 [perspective:1400px]">
          {/* The mess. Hidden from screen readers: it is the same sample data the panels show. */}
          <div aria-hidden="true" data-panel className="pointer-events-none absolute inset-0 z-20 grid place-items-center [transform-style:preserve-3d]">
            {CHIPS.map((c, i) => (
              <span
                key={i}
                data-chip={c.slot}
                className={`invisible absolute whitespace-nowrap rounded-[4px] border px-3 py-1.5 font-display text-[13px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] [.motion-off_&]:hidden ${chipStyle[c.kind]}`}
              >
                {c.text}
              </span>
            ))}
          </div>

          {/* The dashboard. */}
          <div
            role="img"
            aria-label="A sample operations dashboard: net sales, labor and food cost for three locations, a daily sales chart, a labor alert for Location B, a weekly summary written automatically and a staff schedule filled in for the week"
            className="relative z-10 grid h-full grid-cols-1 gap-3 font-display min-[821px]:grid-cols-12 min-[821px]:grid-rows-[auto_1fr_auto]"
          >
            {[
              { label: "Net sales, this week", slot: "sales", count: 48210, pre: "$", dec: 0, suf: "", note: "All three locations" },
              { label: "Labor", slot: "labor", count: 24.6, pre: "", dec: 1, suf: "%", note: "Target 23.0%" },
              { label: "Food cost", slot: "food", count: 29.8, pre: "", dec: 1, suf: "%", note: "From vendor invoices" },
            ].map((k) => (
              <div key={k.slot} data-panel className="rounded-[6px] border border-night-line bg-night-2 p-4 min-[821px]:col-span-4">
                <p className="text-[12px] text-night-body">{k.label}</p>
                <p className="mt-1 text-[30px] font-medium tracking-[-0.02em] text-night-text md:text-[36px]">
                  <span data-slot={k.slot} data-count={k.count} data-pre={k.pre} data-dec={k.dec} data-suf={k.suf}>
                    {k.pre}
                    {k.count.toLocaleString("en-US", { minimumFractionDigits: k.dec, maximumFractionDigits: k.dec })}
                    {k.suf}
                  </span>
                </p>
                <p className="text-[12px] text-night-body">{k.note}</p>
              </div>
            ))}

            <div data-panel className="flex min-h-[220px] flex-col rounded-[6px] border border-night-line bg-night-2 p-4 min-[821px]:col-span-7">
              <div className="flex justify-between text-[12px] text-night-body">
                <span>Daily sales by location</span>
                <span data-slot="chart">Locations A, B, C</span>
              </div>
              <div className="relative mt-3 flex flex-1 items-end gap-2">
                {BARS.map((b, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div data-bar className="w-full rounded-t-[2px] bg-blue" style={{ height: `${b * 150}px` }} />
                    <span className="text-[11px] text-night-body">{DAYS[i]}</span>
                  </div>
                ))}
                <svg viewBox="0 0 700 160" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[150px] w-full">
                  <path data-line d="M20 110 C 120 80, 180 95, 250 70 S 380 40, 450 60 S 600 20, 680 30" fill="none" stroke="#9DB2E8" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-[821px]:col-span-5">
              <div data-alert className="rounded-[6px] border border-night-blue/50 bg-blue/30 p-4">
                <p className="text-[12px] text-night-blue">Alert</p>
                <p className="mt-1 text-[15px] leading-snug text-night-text">Labor at Location B is 1.6 points over target for Friday night.</p>
              </div>
              <div data-panel className="flex-1 rounded-[6px] border border-night-line bg-night-2 p-4">
                <p className="text-[12px] text-night-body" data-slot="report">
                  Weekly report, written for you
                </p>
                <p data-report className="mt-2 min-h-[4.5em] text-[14px] leading-relaxed text-night-text">
                  {REPORT}
                </p>
              </div>
            </div>

            <div data-panel className="rounded-[6px] border border-night-line bg-night-2 p-4 min-[821px]:col-span-12">
              <div className="flex justify-between text-[12px] text-night-body">
                <span data-slot="schedule">Schedule, next week</span>
                <span>Filled from availability and swaps</span>
              </div>
              <div className="mt-3 grid grid-cols-[64px_repeat(7,minmax(0,1fr))] gap-1.5 text-[11px]">
                <span />
                {DAYS.map((d, i) => (
                  <span key={i} className="text-center text-night-body">
                    {d}
                  </span>
                ))}
                {SHIFTS.map((row, ri) => (
                  <div key={ri} className="contents">
                    <span className="self-center text-night-body">{["Open", "Mid", "Close", "Prep"][ri]}</span>
                    {row.map((on, ci) => (
                      <span key={ci} className="h-5 rounded-[2px] bg-night">
                        {on ? <span data-shift className="block h-full rounded-[2px] bg-night-blue/80" /> : null}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
