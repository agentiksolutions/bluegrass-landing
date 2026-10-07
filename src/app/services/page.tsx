import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import CTABand from "@/components/cta-band";
import { AssistantPanel } from "@/components/work-panels";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "We set up Claude, an AI assistant, for your business on your own accounts and train your team to use it. What it can take on, how we start, and what comes after.",
  path: "/services",
});

// Sourced: the capabilities sheet (bluegrass-advisory-group docs/offers/capabilities-sheet.html,
// v1.0, 2026-10-02) for the work list and approval line; the Engagement Catalog for the path and
// offer names. No prices, no durations. Phil, 2026-10-07: the old page was "too spread out" and
// should carry the capabilities and generally what we do.
// Phil, 2026-10-07: "what we do is we pair them with the right tools that fit their business
// needs." The other three lines follow the Engagement Catalog.
const whatWeDo = [
  { name: "Pair you with the right tools", body: "We look at how your business runs and match it with the AI tools that fit your needs." },
  { name: "Set them up on your accounts", body: "Connected to your email, calendar and files, read only to start. You own the accounts." },
  { name: "Train your team", body: "Hands-on training at setup, and classes for your people when you want more." },
  { name: "Keep it running", body: "A monthly plan keeps your setup current and adds to it as you go." },
];

const capabilities = [
  {
    name: "Email sorting",
    body: "Sorts incoming mail into invoices, vendor messages and alerts. What needs you comes to the top with the sender, amount and next step.",
  },
  {
    name: "Meeting notes",
    body: "Turns a recorded meeting into a summary with decisions and action items by person. Open items carry into the next meeting.",
  },
  {
    name: "Team updates",
    body: "Drafts your weekly update or newsletter from meeting notes and reports, in the same format every time.",
  },
  {
    name: "Daily briefing",
    body: "Reads your tasks, open projects, bills waiting for review and what came in overnight, then gives you one short list.",
  },
  {
    name: "Error recovery",
    body: "Watches the jobs we set up. Routine problems are retried. Anything it cannot clear goes to the right person with the options.",
  },
  {
    name: "Prospect research",
    body: "Finds companies that match the customers you want, profiles each from public information and scores them for your calls.",
  },
  {
    name: "Document search",
    body: "Your policies, procedures, contracts and training in one place. Ask a question in plain English and get the answer from your own documents.",
  },
  {
    name: "Recorded conversations",
    body: "Turns site visits, calls and meetings into searchable notes with speakers, topics and action items.",
  },
];

const path = [
  { name: "Free intro call", body: "Thirty minutes about your business. You get a recommendation after, sometimes to wait." },
  { name: "Intake form", body: "A questionnaire about your business, tools and people. We read it before we meet." },
  { name: "Roadmap", body: "You show us how the work gets done. You get a systems map and a plan for what to set up first." },
  { name: "Business AI Setup", body: "Claude set up on your accounts, connected read only, with day-one skills and training." },
  { name: "A monthly plan", body: "Updates, Support or Office Hours, to keep it current and add to it." },
];

const larger = [
  { name: "Discovery & Strategic Roadmap", body: "An assessment, ranked recommendations and a sequenced roadmap." },
  { name: "Implementation", body: "We build what the roadmap recommends." },
  { name: "Embedded Retainer", body: "We become your ongoing AI operations team." },
];

const also = [
  { name: "Team training", body: "Classes for your people, at your office or by screen share.", href: "/academy" },
  { name: "Workspace Tune-Up", body: "We check your Claude setup against current guidance and apply the fixes you approve.", href: "/contact" },
  { name: "Websites", body: "A site that says plainly what you do. You own it and the hosting account.", href: "/services/web-design" },
  { name: "Dashboards", body: "Your numbers from the systems you already use, on one screen.", href: "/services/dashboards" },
];

const guides = [
  { href: "/ai-assessment", label: "What an AI assessment involves" },
  { href: "/ai-consulting-cost", label: "What drives the cost" },
  { href: "/ai-tools-we-build", label: "The tools we build most often" },
  { href: "/multi-location-dashboards", label: "Dashboards for more than one location" },
  { href: "/ai-for-hospitality", label: "AI for hospitality businesses" },
  { href: "/ai-for-small-business-kentucky", label: "AI for Kentucky small business" },
  { href: "/ai-consulting-lexington-ky", label: "AI consulting in Lexington" },
  { href: "/faq", label: "Questions we get asked" },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero: what we do in one sentence, beside the thing we set up. */}
      <section className="mt-16 lg:mt-[72px] bg-ink px-4 md:px-10 py-14 md:py-20">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-center">
          <div>
            <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[68px] leading-[0.98] font-extralight tracking-[-0.03em] text-ink max-w-[12ch]">
              What we do for your business
            </h1>
            <p className="mt-6 text-[19px] md:text-[21px] leading-snug text-body max-w-[38ch]">
              We pair your business with the AI tools that fit it, set them up on your own accounts
              and train your team to use them.
            </p>
            <a
              href={BOOKING_URL}
              className="mt-8 inline-flex items-center rounded bg-blue px-6 py-3.5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-blue-dark"
            >
              Book a call
            </a>
          </div>
          <div className="relative min-h-[380px] sm:min-h-0 sm:aspect-[16/9] overflow-hidden rounded-lg border border-line bg-white">
            <AssistantPanel />
          </div>
        </div>
      </section>

      {/* What we do, in four lines. */}
      <section className="px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto">
          <h2 className="font-display text-[32px] md:text-[48px] leading-none font-light tracking-tight text-ink">
            What we do
          </h2>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {whatWeDo.map((w) => (
              <li key={w.name} className="border-t border-line py-6">
                <h3 className="font-display text-[22px] md:text-[24px] font-light text-ink">{w.name}</h3>
                <p className="mt-2 text-[16px] md:text-[17px] leading-relaxed text-body">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The capabilities sheet, in full. */}
      <section className="bg-band px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto">
          <h2 className="font-display text-[32px] md:text-[48px] leading-none font-light tracking-tight text-ink">
            Work your assistant can take on
          </h2>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {capabilities.map((c) => (
              <li key={c.name} className="border-t border-line py-6">
                <h3 className="font-display text-[20px] md:text-[22px] font-light text-ink">{c.name}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-body">{c.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-6 text-[17px] md:text-[18px] leading-relaxed text-body max-w-[90ch]">
            <span className="font-display text-ink">Every job starts with a person approving it.</span>{" "}
            Your assistant drafts and proposes, and someone on your team approves before anything is sent,
            published or changed. As you get comfortable with a routine job, you can choose to let it run on
            its own with a log you can check.
          </p>
        </div>
      </section>

      {/* The client path, in one row. */}
      <section className="px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto">
          <h2 className="font-display text-[32px] md:text-[48px] leading-none font-light tracking-tight text-ink">
            How it works
          </h2>
          <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8">
            {path.map((p) => (
              <li key={p.name} className="border-t border-line pt-5 pb-6">
                <h3 className="font-display text-[20px] md:text-[22px] font-light text-ink">{p.name}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-body">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Larger businesses and the other services, side by side. */}
      <section className="bg-band px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="font-display text-[28px] md:text-[36px] leading-tight font-light tracking-tight text-ink">
              For larger businesses
            </h2>
            <p className="mt-3 text-[17px] text-body">Several companies or entities, or custom work.</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {larger.map((l) => (
                <li key={l.name} className="py-5">
                  <h3 className="font-display text-[20px] font-light text-ink">{l.name}</h3>
                  <p className="mt-1 text-[16px] leading-relaxed text-body">{l.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[28px] md:text-[36px] leading-tight font-light tracking-tight text-ink">
              Also
            </h2>
            <p className="mt-3 text-[17px] text-body">For any business, on its own or alongside a setup.</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {also.map((a) => (
                <li key={a.name}>
                  <Link href={a.href} className="group block py-5">
                    <h3 className="font-display text-[20px] font-light text-ink transition-colors group-hover:text-blue">{a.name}</h3>
                    <p className="mt-1 text-[16px] leading-relaxed text-body">{a.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-12 md:py-14">
        <nav aria-label="Guides" className="max-w-[1360px] mx-auto">
          <h2 className="font-display text-[18px] font-semibold text-ink">Guides</h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 font-display text-[16px]">
            {guides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <CTABand headline="Not sure which one fits?" />
    </>
  );
}
