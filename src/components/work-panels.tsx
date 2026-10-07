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

/** The Roadmap's one-page systems map: the tools a business runs on, who uses each one, what
 *  moves between them, and which of those moves someone types by hand. */
export function SystemsMap() {
  const still = useReducedMotion();
  type Node = { id: string; x: number; y: number; w: number; h: number; label: string; who: string };
  const nodes: Node[] = [
    { id: "pos", x: 16, y: 34, w: 180, h: 66, label: "Point of sale", who: "Managers" },
    { id: "time", x: 16, y: 196, w: 180, h: 66, label: "Timekeeping", who: "Managers" },
    { id: "mail", x: 16, y: 358, w: 180, h: 66, label: "Email", who: "Everyone" },
    { id: "sheet", x: 330, y: 181, w: 200, h: 96, label: "Spreadsheets", who: "Owner, every Monday" },
    { id: "acct", x: 664, y: 34, w: 180, h: 66, label: "Accounting", who: "Bookkeeper" },
    { id: "report", x: 664, y: 196, w: 180, h: 66, label: "Weekly report", who: "Owner and managers" },
  ];
  const n = (id: string) => nodes.find((x) => x.id === id)!;
  // [from, to, typed by hand?, label, from-side y offset, to-side y offset]
  const edges: [string, string, boolean, string, number, number][] = [
    ["pos", "acct", false, "daily sales", -12, -12],
    ["pos", "sheet", true, "sales, typed in", 16, -26],
    ["time", "sheet", true, "hours, exported", 0, 0],
    ["mail", "sheet", true, "vendor bills, typed in", 0, 26],
    ["sheet", "acct", true, "invoices, retyped", -26, 14],
    ["sheet", "report", true, "built by hand", 0, 0],
  ];
  const START = "mail>sheet";

  const curve = (e: (typeof edges)[number]) => {
    const a = n(e[0]);
    const b = n(e[1]);
    const x1 = a.x + a.w;
    const y1 = a.y + a.h / 2 + e[4];
    const x2 = b.x - 8;
    const y2 = b.y + b.h / 2 + e[5];
    const k = (x2 - x1) * 0.45;
    // Midpoint of the cubic at t = 0.5, for the label.
    const mx = (x1 + 3 * (x1 + k) + 3 * (x2 - k) + x2) / 8;
    const my = (y1 + 3 * y1 + 3 * y2 + y2) / 8;
    return { d: `M ${x1} ${y1} C ${x1 + k} ${y1}, ${x2 - k} ${y2}, ${x2} ${y2}`, mx, my };
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-line bg-tint font-display">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="text-[14px] text-ink">Systems map</span>
        <span className="text-[12px] text-muted">Sample data</span>
      </div>

      {/* Drawn map from small tablets up. */}
      <svg
        viewBox="0 0 860 470"
        className="hidden sm:block w-full h-auto"
        role="img"
        aria-label="A one-page systems map, shown with sample data. Point of sale, timekeeping and email feed a spreadsheet the owner updates every Monday, mostly by typing figures in by hand. The spreadsheet feeds accounting and the weekly report. Only daily sales move to accounting on their own. Vendor bills from email are marked as the place to start."
      >
        <defs>
          <marker id="arrow-auto" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#81A7F8" />
          </marker>
          <marker id="arrow-hand" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#8A94AA" />
          </marker>
        </defs>

        {edges.map((e, i) => {
          const { d, mx, my } = curve(e);
          const start = `${e[0]}>${e[1]}` === START;
          const w = e[3].length * 6.6 + 18;
          return (
            <motion.g
              key={e[0] + e[1]}
              initial={still ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 + i * 0.22 }}
            >
              <path
                d={d}
                fill="none"
                stroke={e[2] ? "#8A94AA" : "#81A7F8"}
                strokeWidth={e[2] ? 1.4 : 1.8}
                strokeDasharray={e[2] ? "5 5" : undefined}
                markerEnd={`url(#${e[2] ? "arrow-hand" : "arrow-auto"})`}
              />
              <rect x={mx - w / 2} y={my - 11} width={w} height={22} rx={5} fill={start ? "#0033A0" : "#111A2E"} stroke={start ? "#81A7F8" : "#1E2A44"} />
              <text x={mx} y={my + 4} textAnchor="middle" fontSize="12" fill={start ? "#FFFFFF" : "#B6BFD1"}>
                {e[3]}
              </text>
            </motion.g>
          );
        })}

        {nodes.map((b) => {
          const hub = b.id === "sheet";
          const start = b.id === "mail";
          return (
            <g key={b.id}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx={10}
                fill={hub ? "#111A2E" : "#0C1322"}
                stroke={hub || start ? "#81A7F8" : "#2E3B5C"}
                strokeWidth={hub ? 1.6 : 1}
              />
              <text x={b.x + 16} y={b.y + (hub ? 40 : 29)} fontSize={hub ? 19 : 16.5} fill="#E6EAF2">
                {b.label}
              </text>
              <text x={b.x + 16} y={b.y + (hub ? 64 : 50)} fontSize="12.5" fill="#8A94AA">
                {b.who}
              </text>
            </g>
          );
        })}

        <g transform="translate(16 452)" fontSize="12" fill="#8A94AA">
          <line x1="0" y1="-4" x2="26" y2="-4" stroke="#81A7F8" strokeWidth="1.8" />
          <text x="34" y="0">Moves on its own</text>
          <line x1="170" y1="-4" x2="196" y2="-4" stroke="#8A94AA" strokeWidth="1.4" strokeDasharray="5 5" />
          <text x="204" y="0">Typed by hand</text>
          <rect x="330" y="-14" width="22" height="18" rx="4" fill="#0033A0" stroke="#81A7F8" />
          <text x="360" y="0">Where we would start</text>
        </g>
      </svg>

      {/* Phones: the same map as a list, so nothing shrinks past reading size. */}
      <ul className="sm:hidden divide-y divide-line text-[14px]">
        {edges.map((e) => {
          const start = `${e[0]}>${e[1]}` === START;
          return (
            <li key={e[0] + e[1]} className="flex items-center gap-2 px-5 py-3">
              <span className="text-ink">{n(e[0]).label}</span>
              <span aria-hidden="true" className="text-muted">to</span>
              <span className="text-ink">{n(e[1]).label}</span>
              <span className={`ml-auto rounded px-2.5 py-0.5 text-[12px] ${start ? "bg-blue text-white" : e[2] ? "text-muted" : "text-blue"}`}>
                {e[2] ? "by hand" : "on its own"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
