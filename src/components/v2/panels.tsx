"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, EASE, motionOff } from "@/lib/gsap";

// Small views of the kind of software BAG builds, drawn in code so they stay sharp at any size and
// carry no client data. Every figure is sample data and each panel says so. The assistant follows
// the Business AI Setup in the Engagement Catalog; the map is the Roadmap's one-page systems map.
// Each panel moves its own way: the assistant types its briefing, the support reply arrives, the
// map's lines draw in. Panels sit on night chapters except the map, which sits on white.

/** Builds a paused timeline and plays it once the panel is half on screen. An observer, unlike a
 *  scroll trigger, also sees panels that slide in sideways inside a pinned track. */
function useOnce(build: (el: HTMLElement) => gsap.core.Timeline) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || motionOff()) return;
    let tl: gsap.core.Timeline | undefined;
    const ctx = gsap.context(() => {
      tl = build(el).pause();
    }, el);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          tl?.play();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

function PanelHead({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-night-line px-5 py-3">
      <span className="text-[14px] text-night-text">{title}</span>
      <span className="text-[12px] text-night-body">Sample data</span>
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
  const ref = useOnce((el) => {
    return gsap
      .timeline()
      .from(el.querySelector("[data-q]"), { autoAlpha: 0, y: 10, duration: 0.6, ease: EASE })
      .from(el.querySelectorAll("[data-a]"), { autoAlpha: 0, y: 8, duration: 0.6, stagger: 0.25, ease: EASE }, "+=0.35");
  });
  return (
    <div
      ref={ref}
      role="img"
      data-nomotion
      aria-label="An AI assistant workspace set up for a business, shown with sample data: a list of skills, a morning question and a short briefing, with email, calendar and files connected read only"
      className="w-full overflow-hidden rounded-[6px] border border-night-line bg-night-2 font-display"
    >
      <PanelHead title="Your assistant" />
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
        <ul className="border-r border-night-line py-3 text-[12px] text-night-body sm:text-[13px]">
          <li className="px-4 pb-2 text-[12px] text-night-text">Skills</li>
          {skills.map((k, i) => (
            <li key={k} className={`px-4 py-1.5 ${i === 1 ? "bg-blue/40 text-night-text" : ""}`}>
              {k}
            </li>
          ))}
        </ul>
        <div className="space-y-3 p-4 text-[13px] sm:p-5 sm:text-[14px]">
          <p data-q className="ml-auto w-fit max-w-[85%] rounded-[6px] bg-blue px-3 py-2 text-white">
            What needs me today?
          </p>
          <div className="max-w-[94%] rounded-[6px] border border-night-line px-3 py-2.5 text-night-body">
            <p data-a className="text-night-text">
              Three things this morning:
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {reply.map((r) => (
                <li data-a key={r} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-night-blue" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-night-line px-5 py-3 text-[11px] text-night-body sm:text-[12px]">
        <span>Email: read only</span>
        <span>Calendar: read only</span>
        <span>Files: read only</span>
        <span className="text-night-blue">Cannot send or delete</span>
      </div>
    </div>
  );
}

/** A support request and its fix, the kind a monthly plan covers. The reply arrives once. */
export function SupportThread() {
  const ref = useOnce((el) => {
    return gsap
      .timeline()
      .fromTo(el.querySelector("[data-typing]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
      .to(el.querySelector("[data-typing]"), { autoAlpha: 0, duration: 0.2 }, "+=1.1")
      .from(el.querySelector("[data-reply]"), { autoAlpha: 0, y: 10, duration: 0.7, ease: EASE })
      .from(el.querySelector("[data-done]"), { autoAlpha: 0, duration: 0.5 }, "+=0.2");
  });
  return (
    <div
      ref={ref}
      role="img"
      data-nomotion
      aria-label="A support request, shown with sample data: a client asks whether the inbox sorter can handle a vendor's new invoice layout, and Phil replies that the sorter is updated, marked done and covered by the monthly plan"
      className="w-full overflow-hidden rounded-[6px] border border-night-line bg-night-2 font-display"
    >
      <PanelHead title="Support request" />
      <div className="space-y-4 p-5 text-[14px] leading-snug sm:text-[15px]">
        <div className="max-w-[88%]">
          <p className="mb-1 text-[12px] text-night-body">You</p>
          <p className="rounded-[6px] border border-night-line px-4 py-3 text-night-body">
            The linen company changed their invoice layout. Can the inbox sorter still catch their bills?
          </p>
        </div>
        <div className="relative ml-auto max-w-[88%]">
          <p data-typing aria-hidden="true" className="invisible absolute right-0 top-6 text-[13px] text-night-body">
            Phil is typing
          </p>
          <div data-reply>
            <p className="mb-1 text-right text-[12px] text-night-body">Phil</p>
            <p className="rounded-[6px] bg-blue px-4 py-3 text-white">
              Updated the sorter for their new layout. Their bills sort into Vendor bills again.
            </p>
          </div>
        </div>
      </div>
      <div data-done className="flex items-center gap-3 border-t border-night-line px-5 py-3 text-[12px] text-night-body sm:text-[13px]">
        <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full border border-night-blue">
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="#9DB2E8" strokeWidth="2">
            <path d="M2.5 6.2l2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-night-text">Done</span>
        <span className="ml-auto">Covered by your monthly plan</span>
      </div>
    </div>
  );
}

/** The Roadmap's one-page systems map: the tools a business runs on, who uses each one, what
 *  moves between them, and which of those moves someone types by hand. Lines draw in on scroll. */
export function SystemsMap() {
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
    const mx = (x1 + 3 * (x1 + k) + 3 * (x2 - k) + x2) / 8;
    const my = (y1 + 3 * y1 + 3 * y2 + y2) / 8;
    return { d: `M ${x1} ${y1} C ${x1 + k} ${y1}, ${x2 - k} ${y2}, ${x2} ${y2}`, mx, my };
  };

  const ref = useOnce((el) => {
    const lines = el.querySelectorAll<SVGPathElement>("[data-line]");
    lines.forEach((p) => {
      const len = p.getTotalLength();
      // The arrowhead waits until its line has drawn.
      p.dataset.marker = p.getAttribute("marker-end") || "";
      gsap.set(p, { strokeDasharray: `${len} ${len}`, strokeDashoffset: len, attr: { "marker-end": "none" } });
    });
    return gsap
      .timeline()
      .from(el.querySelectorAll("[data-node]"), { autoAlpha: 0, y: 8, duration: 0.45, stagger: 0.05, ease: EASE })
      .to(lines, { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: "power2.inOut" }, 0.3)
      .from(el.querySelectorAll("[data-tag]"), { autoAlpha: 0, duration: 0.4, stagger: 0.12 }, "-=0.8")
      // Hand-typed moves go back to dashes once drawn.
      .call(() =>
        lines.forEach((p) => {
          p.setAttribute("marker-end", p.dataset.marker || "");
          if (p.dataset.hand) gsap.set(p, { strokeDasharray: "5 5", strokeDashoffset: 0 });
        }),
      );
  });

  return (
    <div ref={ref} data-nomotion data-imagery className="w-full overflow-hidden rounded-[6px] border border-line bg-white font-display">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="text-[14px] text-ink">Systems map</span>
        <span className="text-[12px] text-muted">Sample data</span>
      </div>

      <svg
        viewBox="0 0 860 470"
        className="hidden h-auto w-full sm:block"
        role="img"
      data-nomotion
        aria-label="A one-page systems map, shown with sample data. Point of sale, timekeeping and email feed a spreadsheet the owner updates every Monday, mostly by typing figures in by hand. The spreadsheet feeds accounting and the weekly report. Only daily sales move to accounting on their own. Vendor bills from email are marked as the place to start."
      >
        <defs>
          <marker id="v2-arrow-auto" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#0033A0" />
          </marker>
          <marker id="v2-arrow-hand" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#5A6370" />
          </marker>
        </defs>

        {edges.map((e) => {
          const { d } = curve(e);
          return (
            <path
              key={e[0] + e[1]}
              data-line
              data-hand={e[2] ? "1" : undefined}
              d={d}
              fill="none"
              stroke={e[2] ? "#5A6370" : "#0033A0"}
              strokeWidth={e[2] ? 1.4 : 1.8}
              strokeDasharray={e[2] ? "5 5" : undefined}
              markerEnd={`url(#${e[2] ? "v2-arrow-hand" : "v2-arrow-auto"})`}
            />
          );
        })}

        {nodes.map((b) => {
          const hub = b.id === "sheet";
          const start = b.id === "mail";
          return (
            <g key={b.id} data-node>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={6} fill={hub ? "#F2F1EC" : "#FFFFFF"} stroke={hub || start ? "#0033A0" : "#D9D8D1"} strokeWidth={hub ? 1.6 : 1} />
              <text x={b.x + 16} y={b.y + (hub ? 40 : 29)} fontSize={hub ? 19 : 16.5} fill="#161B22">
                {b.label}
              </text>
              <text x={b.x + 16} y={b.y + (hub ? 64 : 50)} fontSize="12.5" fill="#5A6370">
                {b.who}
              </text>
            </g>
          );
        })}

        {edges.map((e) => {
          const { mx, my } = curve(e);
          const start = `${e[0]}>${e[1]}` === START;
          const w = e[3].length * 6.6 + 18;
          return (
            <g key={"t" + e[0] + e[1]} data-tag>
              <rect x={mx - w / 2} y={my - 11} width={w} height={22} rx={4} fill={start ? "#0033A0" : "#FFFFFF"} stroke={start ? "#0033A0" : "#D9D8D1"} />
              <text x={mx} y={my + 4} textAnchor="middle" fontSize="12" fill={start ? "#FFFFFF" : "#3B4350"}>
                {e[3]}
              </text>
            </g>
          );
        })}

        <g transform="translate(16 452)" fontSize="12" fill="#5A6370">
          <line x1="0" y1="-4" x2="26" y2="-4" stroke="#0033A0" strokeWidth="1.8" />
          <text x="34" y="0">Moves on its own</text>
          <line x1="170" y1="-4" x2="196" y2="-4" stroke="#5A6370" strokeWidth="1.4" strokeDasharray="5 5" />
          <text x="204" y="0">Typed by hand</text>
          <rect x="330" y="-14" width="22" height="18" rx="3" fill="#0033A0" />
          <text x="360" y="0">Where we would start</text>
        </g>
      </svg>

      {/* Phones: the same map as a list, so nothing shrinks past reading size. */}
      <ul className="divide-y divide-line text-[14px] sm:hidden">
        {edges.map((e) => {
          const start = `${e[0]}>${e[1]}` === START;
          return (
            <li key={e[0] + e[1]} className="flex items-center gap-2 px-5 py-3">
              <span className="text-ink">{n(e[0]).label}</span>
              <span aria-hidden="true" className="text-muted">
                to
              </span>
              <span className="text-ink">{n(e[1]).label}</span>
              <span className={`ml-auto rounded-[3px] px-2.5 py-0.5 text-[12px] ${start ? "bg-blue text-white" : e[2] ? "text-muted" : "text-blue"}`}>
                {e[2] ? "by hand" : "on its own"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Every location's week on one screen, counted the same way. Bars grow in once. */
export function LocationsPanel() {
  const rows = [
    { name: "Location A", sales: 0.92, labor: "24.1%" },
    { name: "Location B", sales: 0.74, labor: "26.8%" },
    { name: "Location C", sales: 0.58, labor: "23.5%" },
  ];
  const ref = useOnce((el) =>
    gsap
      .timeline()
      .from(el.querySelectorAll("[data-bar]"), { scaleX: 0, transformOrigin: "left center", duration: 1, stagger: 0.15, ease: EASE })
      .from(el.querySelectorAll("[data-num]"), { autoAlpha: 0, duration: 0.4, stagger: 0.15 }, "-=0.7")
      .from(el.querySelector("[data-note]"), { autoAlpha: 0, y: 6, duration: 0.5 }),
  );
  return (
    <div
      ref={ref}
      role="img"
      data-nomotion
      aria-label="A dashboard with sample data: three locations side by side with net sales bars and labor percentages, all counted on the same Monday to Sunday week"
      className="w-full overflow-hidden rounded-[6px] border border-night-line bg-night-2 font-display"
    >
      <PanelHead title="This week, every location" />
      <div className="space-y-5 p-5 sm:p-6">
        <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,6fr)_minmax(0,2fr)] gap-4 text-[12px] text-night-body">
          <span>Location</span>
          <span>Net sales</span>
          <span className="text-right">Labor</span>
        </div>
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-[minmax(0,3fr)_minmax(0,6fr)_minmax(0,2fr)] items-center gap-4 text-[14px]">
            <span className="text-night-text">{r.name}</span>
            <span className="h-2.5 rounded-[2px] bg-night-line">
              <span data-bar className="block h-full rounded-[2px] bg-night-blue" style={{ width: `${r.sales * 100}%` }} />
            </span>
            <span data-num className="text-right text-night-text">
              {r.labor}
            </span>
          </div>
        ))}
      </div>
      <p data-note className="border-t border-night-line px-5 py-3 text-[12px] text-night-body sm:text-[13px]">
        Both systems now count the week Monday to Sunday.
      </p>
    </div>
  );
}

/** An inbox sorted into groups: each message gets its group as you watch. */
export function InboxPanel() {
  const mail = [
    { from: "Linen supplier", subject: "Invoice for October", tag: "Vendor bills" },
    { from: "Produce vendor", subject: "Statement and credit memo", tag: "Vendor bills" },
    { from: "A customer", subject: "Catering order for Friday", tag: "Customers" },
    { from: "Landlord", subject: "Lease renewal question", tag: "Needs you" },
    { from: "Payroll service", subject: "Reminder: hours due Monday", tag: "Reminders" },
  ];
  const ref = useOnce((el) =>
    gsap
      .timeline()
      .from(el.querySelectorAll("[data-mail]"), { autoAlpha: 0, x: -10, duration: 0.45, stagger: 0.1, ease: EASE })
      .from(el.querySelectorAll("[data-tag]"), { autoAlpha: 0, scale: 0.8, duration: 0.35, stagger: 0.22, ease: "back.out(2)" }, "+=0.2"),
  );
  return (
    <div
      ref={ref}
      role="img"
      data-nomotion
      aria-label="An inbox sorter with sample data: five messages, each tagged as vendor bills, customers, needs you or reminders. Nothing is sent or paid."
      className="w-full overflow-hidden rounded-[6px] border border-night-line bg-night-2 font-display"
    >
      <PanelHead title="Inbox, sorted" />
      <ul className="divide-y divide-night-line">
        {mail.map((m) => (
          <li data-mail key={m.subject} className="flex items-center gap-4 px-5 py-3.5 text-[13px] sm:text-[14px]">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-night-text">{m.from}</span>
              <span className="block truncate text-night-body">{m.subject}</span>
            </span>
            <span
              data-tag
              className={`shrink-0 rounded-[3px] px-2.5 py-1 text-[12px] ${
                m.tag === "Needs you" ? "bg-blue text-white" : "border border-night-line text-night-body"
              }`}
            >
              {m.tag}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-night-line px-5 py-3 text-[12px] text-night-blue sm:text-[13px]">Sorts only. Cannot send, pay or delete.</p>
    </div>
  );
}

/** The written plan from a Roadmap: what to set up first, in order. Lines write in once. */
export function PlanPanel() {
  const items = [
    { t: "Sort vendor bills out of the shared inbox", n: "Typed in by hand every Monday today" },
    { t: "Turn the weekly manager meeting into notes and owners", n: "Decisions get lost by Thursday" },
    { t: "Put the procedures where people can ask them questions", n: "New managers ask the same person" },
  ];
  const ref = useOnce((el) =>
    gsap
      .timeline()
      .from(el.querySelectorAll("[data-item]"), { clipPath: "inset(0 100% 0 0)", duration: 0.9, stagger: 0.3, ease: "power2.inOut" }),
  );
  return (
    <div
      ref={ref}
      role="img"
      data-nomotion
      aria-label="A Roadmap's written plan, shown with sample data: three things to set up first, in order, each with the reason it comes first"
      className="w-full overflow-hidden rounded-[6px] border border-night-line bg-night-2 font-display"
    >
      <PanelHead title="Roadmap: what to set up first" />
      <ol className="space-y-5 p-5 sm:p-6">
        {items.map((it, i) => (
          <li data-item key={it.t} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-night-blue text-[13px] text-night-blue">{i + 1}</span>
            <span>
              <span className="block text-[15px] leading-snug text-night-text sm:text-[16px]">{it.t}</span>
              <span className="mt-1 block text-[13px] text-night-body">{it.n}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A tip pool split by hours worked, the kind of calculation the manager portal does each week. */
export function TipPanel() {
  const rows = [
    { name: "Team member A", hours: 31.5 },
    { name: "Team member B", hours: 24.0 },
    { name: "Team member C", hours: 18.25 },
    { name: "Team member D", hours: 12.0 },
  ];
  const pool = 1240;
  const total = rows.reduce((s, r) => s + r.hours, 0);
  const ref = useOnce((el) =>
    gsap
      .timeline()
      .from(el.querySelectorAll("[data-row]"), { autoAlpha: 0, x: -12, duration: 0.45, stagger: 0.12, ease: EASE })
      .from(el.querySelectorAll("[data-share]"), { scaleX: 0, transformOrigin: "left center", duration: 0.8, stagger: 0.12, ease: EASE }, "-=0.3")
      .from(el.querySelector("[data-check]"), { autoAlpha: 0, y: 6, duration: 0.4 }),
  );
  return (
    <div
      ref={ref}
      role="img"
      data-nomotion
      aria-label="A weekly tip pool split by hours worked, shown with sample data: four team members, their hours, their share of a 1,240 dollar pool, and a check that the shares add up to the pool"
      className="w-full overflow-hidden rounded-[6px] border border-night-line bg-night-2 font-display"
    >
      <PanelHead title="Tip pool" />
      <div className="space-y-3 p-5 text-[13px] sm:text-[14px]">
        {rows.map((r) => {
          const share = (pool * r.hours) / total;
          return (
            <div key={r.name} data-row className="grid grid-cols-[minmax(0,4fr)_minmax(0,2fr)_minmax(0,5fr)_minmax(0,2fr)] items-center gap-3">
              <span className="truncate text-night-text">{r.name}</span>
              <span className="text-night-body">{r.hours.toFixed(2)} h</span>
              <span className="h-2 rounded-[2px] bg-night-line">
                <span data-share className="block h-full rounded-[2px] bg-night-blue" style={{ width: `${(r.hours / total) * 100 * 2.4}%` }} />
              </span>
              <span className="text-right text-night-text">${share.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
      <p data-check className="flex justify-between border-t border-night-line px-5 py-3 text-[12px] text-night-body sm:text-[13px]">
        <span>Pool ${pool.toLocaleString("en-US")}.00 · {total.toFixed(2)} hours</span>
        <span className="text-night-blue">Shares add up to the pool</span>
      </p>
    </div>
  );
}

/** A nonprofit board portal: donations in, receipts sent, minutes filed. */
export function BoardPanel() {
  const items = [
    { what: "Donation recorded", detail: "Receipt emailed to the donor", tag: "Donations" },
    { what: "Assistance application received", detail: "Sent to the board for a vote", tag: "Applications" },
    { what: "Board vote recorded", detail: "Approved, payment scheduled", tag: "Votes" },
    { what: "Meeting minutes drafted", detail: "Ready for the secretary to review", tag: "Minutes" },
  ];
  const ref = useOnce((el) =>
    gsap.timeline().from(el.querySelectorAll("[data-item]"), { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.18, ease: EASE }),
  );
  return (
    <div
      ref={ref}
      role="img"
      data-nomotion
      aria-label="A nonprofit board portal activity list, shown with sample data: a donation recorded with a receipt sent, an assistance application sent for a vote, a board vote recorded and meeting minutes drafted for review"
      className="w-full overflow-hidden rounded-[6px] border border-night-line bg-night-2 font-display"
    >
      <PanelHead title="Board portal, this month" />
      <ul className="divide-y divide-night-line">
        {items.map((it) => (
          <li data-item key={it.what} className="flex items-center gap-4 px-5 py-3.5 text-[13px] sm:text-[14px]">
            <span className="min-w-0 flex-1">
              <span className="block text-night-text">{it.what}</span>
              <span className="block text-night-body">{it.detail}</span>
            </span>
            <span className="shrink-0 rounded-[3px] border border-night-line px-2.5 py-1 text-[12px] text-night-body">{it.tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
