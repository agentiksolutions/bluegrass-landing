"use client";

import { motion, useReducedMotion } from "motion/react";

// Two small views of the kind of software BAG builds, drawn in code so they stay sharp and
// carry no client data. Every figure is sample data and the panels say so.
// Layout follows the real manager portal (store home with period figures, checklists, tools)
// without copying any of its numbers.

const EASE = [0.16, 1, 0.3, 1] as const;

function Check({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
        done ? "border-[#81A7F8] bg-[#81A7F8]/15" : "border-line"
      }`}
    >
      {done && (
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="#81A7F8" strokeWidth="2">
          <path d="M2.5 6.2l2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

/** Store home of a multi-location manager portal. */
export function PortalPanel() {
  const figures = [
    { label: "Sales this period", value: "$84,210", note: "+3.1% on last year" },
    { label: "Labor", value: "24.6%", note: "Goal 25%" },
    { label: "Average check", value: "$19.40", note: "+$0.35" },
  ];
  const checklist = [
    { item: "Opening checklist", done: true },
    { item: "Delivery tablets on", done: true },
    { item: "Bread order placed", done: true },
    { item: "Closing checklist", done: false },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center bg-white p-4 sm:p-8">
      <div
        role="img"
        aria-label="A store home screen in a manager portal, shown with sample data: period sales, labor and average check for one of three stores, and today's checklist"
        className="w-full max-w-[560px] overflow-hidden rounded-lg border border-line bg-tint font-display"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex gap-1 text-[13px]">
            {["Store A", "Store B", "Store C"].map((s, i) => (
              <span key={s} className={`rounded px-2.5 py-1 ${i === 0 ? "bg-blue text-white" : "text-muted"}`}>
                {s}
              </span>
            ))}
          </div>
          <span className="text-[12px] text-muted">Sample data</span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
          {figures.map((f) => (
            <div key={f.label} className="px-4 py-4">
              <p className="text-[11px] sm:text-[12px] text-muted">{f.label}</p>
              <p className="mt-1 text-[20px] sm:text-[26px] font-extralight tracking-tight text-ink">{f.value}</p>
              <p className="mt-0.5 text-[11px] sm:text-[12px] text-blue">{f.note}</p>
            </div>
          ))}
        </div>
        <ul className="divide-y divide-line">
          {checklist.map((c) => (
            <li key={c.item} className="flex items-center gap-3 px-5 py-2.5 text-[13px] sm:text-[14px] text-body">
              <Check done={c.done} />
              {c.item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Scheduled jobs reporting in, each one ticking to done as the panel comes into view. */
export function StatusBoard() {
  const still = useReducedMotion();
  const jobs = [
    { name: "Inbox sorted", time: "6:02 AM" },
    { name: "Morning briefing sent", time: "7:45 AM" },
    { name: "Weekly sales report built", time: "8:00 AM" },
    { name: "Invoices matched to orders", time: "9:30 AM" },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center bg-white p-4 sm:p-8">
      <div
        role="img"
        aria-label="A status board of scheduled jobs, shown with sample data: inbox sorted, morning briefing sent, weekly sales report built and invoices matched, each marked done"
        className="w-full max-w-[520px] overflow-hidden rounded-lg border border-line bg-tint font-display"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="text-[14px] text-ink">This morning</span>
          <span className="text-[12px] text-muted">Sample data</span>
        </div>
        <ul className="divide-y divide-line">
          {jobs.map((j, i) => (
            <motion.li
              key={j.name}
              className="flex items-center gap-3 px-5 py-3.5 text-[14px] sm:text-[15px] text-body"
              initial={still ? false : { opacity: 0.35 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.45 }}
            >
              <Check done />
              <span className="flex-1">{j.name}</span>
              <span className="text-[12px] sm:text-[13px] text-muted">{j.time}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
