"use client";

import { motion, useReducedMotion } from "motion/react";

// Small views of the kind of software BAG builds, drawn in code so they stay sharp and carry
// no client data. Every figure is sample data and each panel says so. The portal follows the
// real manager portal's layout without its numbers; the assistant follows the Business AI
// Setup description in the Engagement Catalog; the map is the Roadmap's one-page systems map.
// Each panel moves differently (board ticks in, map draws in, assistant holds still) so the
// page never repeats one animation section after section.

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


/** A Business AI Setup workspace: skills down the side, a morning question and its answer. */
export function AssistantPanel() {
  const skills = ["Inbox triage", "Morning briefing", "Meeting notes", "Searchable documents", "Research", "Weekly update"];
  const reply = [
    "Two vendor invoices are waiting for your approval.",
    "The Thursday manager meeting moved to 2 PM.",
    "The landlord answered your question about the lease renewal.",
  ];
  return (
    <div className="absolute inset-0 grid place-items-center bg-white p-4 sm:p-8">
      <div
        role="img"
        aria-label="An AI assistant workspace set up for a business, shown with sample data: a list of skills, a morning question and a short briefing, with email, calendar and files connected read only"
        className="w-full max-w-[600px] overflow-hidden rounded-lg border border-line bg-tint font-display"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="text-[14px] text-ink">Your assistant</span>
          <span className="text-[12px] text-muted">Sample data</span>
        </div>
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
          <ul className="border-r border-line py-3 text-[12px] sm:text-[13px] text-muted">
            <li className="px-4 pb-2 text-[11px] sm:text-[12px] text-body">Skills</li>
            {skills.map((k, i) => (
              <li key={k} className={`px-4 py-1.5 ${i === 1 ? "bg-blue/20 text-ink" : ""}`}>
                {k}
              </li>
            ))}
          </ul>
          <div className="space-y-3 p-4 sm:p-5 text-[13px] sm:text-[14px]">
            <p className="ml-auto w-fit max-w-[85%] rounded-lg bg-blue px-3 py-2 text-white">What needs me today?</p>
            <div className="max-w-[92%] rounded-lg border border-line px-3 py-2.5 text-body">
              <p className="text-ink">Three things this morning:</p>
              <ul className="mt-1.5 space-y-1.5">
                {reply.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#81A7F8]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line px-5 py-3 text-[11px] sm:text-[12px] text-muted">
          <span>Email: read only</span>
          <span>Calendar: read only</span>
          <span>Files: read only</span>
          <span className="text-blue">Cannot send or delete</span>
        </div>
      </div>
    </div>
  );
}

/** The Roadmap's one-page systems map: the tools a business runs on and what moves between them. */
export function SystemsMap() {
  const still = useReducedMotion();
  const boxes = [
    { id: "pos", x: 10, y: 30, label: "Point of sale", who: "Managers" },
    { id: "time", x: 10, y: 160, label: "Timekeeping", who: "Managers" },
    { id: "acct", x: 350, y: 30, label: "Accounting", who: "Bookkeeper" },
    { id: "mail", x: 180, y: 290, label: "Email", who: "Everyone", start: true },
    { id: "sheet", x: 350, y: 160, label: "Spreadsheets", who: "Owner" },
    { id: "drive", x: 10, y: 290, label: "Shared drive", who: "Everyone" },
  ];
  // Three columns of 160 with 10-unit gutters inside the 520-wide view.
  const W = 160;
  const H = 62;
  const c = (id: string) => {
    const b = boxes.find((x) => x.id === id)!;
    return { x: b.x + W / 2, y: b.y + H / 2 };
  };
  const links: [string, string, string][] = [
    ["pos", "acct", "daily sales"],
    ["pos", "sheet", "weekly report"],
    ["time", "sheet", "hours"],
    ["acct", "sheet", "invoices"],
    ["mail", "sheet", "vendor bills"],
    ["drive", "mail", "files"],
  ];
  return (
    <div
      role="img"
      aria-label="A one-page systems map, shown with sample data: point of sale, timekeeping, accounting, email, spreadsheets and a shared drive, with lines for what moves between them and email marked as the place to start"
      className="w-full overflow-hidden rounded-lg border border-line bg-tint font-display"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="text-[14px] text-ink">Systems map</span>
        <span className="text-[12px] text-muted">Sample data</span>
      </div>
      <svg viewBox="0 0 520 372" className="block w-full h-auto" aria-hidden="true">
        {links.map(([a, b, label], i) => {
          const p = c(a);
          const q = c(b);
          return (
            <g key={a + b}>
              <motion.line
                x1={p.x}
                y1={p.y}
                x2={q.x}
                y2={q.y}
                stroke="#81A7F8"
                strokeOpacity={0.55}
                strokeWidth={1.4}
                initial={still ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.2 + i * 0.25 }}
              />
              <text
                x={(p.x + q.x) / 2}
                y={(p.y + q.y) / 2 - 6}
                textAnchor="middle"
                fontSize="11"
                fill="#8A94AA"
              >
                {label}
              </text>
            </g>
          );
        })}
        {boxes.map((b) => (
          <g key={b.id}>
            <rect
              x={b.x}
              y={b.y}
              width={W}
              height={H}
              rx={8}
              fill={b.start ? "#0033A0" : "#0C1322"}
              stroke={b.start ? "#81A7F8" : "#1E2A44"}
            />
            <text x={b.x + 14} y={b.y + 26} fontSize="15" fill="#E6EAF2">
              {b.label}
            </text>
            <text x={b.x + 14} y={b.y + 46} fontSize="11.5" fill={b.start ? "#D6E1FB" : "#8A94AA"}>
              {b.start ? "Start here" : b.who}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
