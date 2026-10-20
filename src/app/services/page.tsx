import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import CTABand from "@/components/cta-band";
import Button from "@/components/button";
import { AssistantPanel } from "@/components/v2/panels";
import PageHero from "@/components/v2/page-hero";
import { PathSteps } from "@/components/v2/scroll-sections";
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
// Phil, 2026-10-20: "Too many words." Copy cut to one short line per item.
const whatWeDo = [
  { name: "Pair you with the right tools", body: "We match your business with the AI tools that fit." },
  { name: "Set them up on your accounts", body: "Read only to start. You own the accounts." },
  { name: "Train your team", body: "Hands-on at setup. Classes when you want more." },
  { name: "Keep it running", body: "A monthly plan keeps it current." },
];

const capabilities = [
  { name: "Email sorting", body: "What needs you comes to the top." },
  { name: "Meeting notes", body: "Decisions and action items by person." },
  { name: "Team updates", body: "Your weekly update, drafted the same way every time." },
  { name: "Daily briefing", body: "One short list of what needs you today." },
  { name: "Error recovery", body: "What it cannot clear goes to the right person." },
  { name: "Prospect research", body: "Companies that match your customers, profiled and scored." },
  { name: "Document search", body: "Ask a question. Get the answer from your own documents." },
  { name: "Recorded conversations", body: "Site visits and calls become searchable notes." },
];

const path = [
  { name: "Free intro call", body: "Thirty minutes. You get a recommendation after." },
  { name: "Intake form", body: "We read it before we meet." },
  { name: "Roadmap", body: "A systems map and what to set up first." },
  { name: "Business AI Setup", body: "Claude on your accounts, with training." },
  { name: "A monthly plan", body: "Updates, Support or Office Hours." },
];

const larger = [
  { name: "Discovery & Strategic Roadmap", body: "Assessment and a ranked roadmap." },
  { name: "Implementation", body: "We build what the roadmap recommends." },
  { name: "Embedded Retainer", body: "Your ongoing AI operations team." },
];

const also = [
  { name: "Team training", body: "Classes at your office or by screen share.", href: "/academy" },
  { name: "Workspace Tune-Up", body: "We check your Claude setup and apply the fixes you approve.", href: "/contact" },
  { name: "Websites", body: "You own the site and the hosting account.", href: "/services/web-design" },
  { name: "Dashboards", body: "Your numbers on one screen.", href: "/services/dashboards" },
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
      <PageHero
        title="What we do for your business"
        intro="We pick the AI tools that fit, set them up and train your team."
        actions={<Button href={BOOKING_URL}>Book a call</Button>}
        visual={<AssistantPanel />}
      />

      {/* What we do, in four lines. */}
      <section className="px-4 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-page">
          <h2 className="font-display text-[36px] font-light leading-none tracking-[-0.03em] text-ink md:text-[56px]">What we do</h2>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map((w) => (
              <li key={w.name} className="border-t border-ink py-6">
                <h3 className="font-display text-[22px] font-medium tracking-[-0.01em] text-ink md:text-[24px]">{w.name}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-body">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The capabilities sheet, in full: a night chapter whose heading holds while the list passes. */}
      <section data-nav="dark" className="night bg-night px-4 py-24 text-night-text md:px-10 md:py-32">
        <div className="mx-auto grid max-w-page grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="max-w-[12ch] font-display text-[36px] font-light leading-[1.02] tracking-[-0.03em] md:text-[56px]">
              Work your assistant can take on
            </h2>
            <p className="mt-8 max-w-[40ch] text-[18px] leading-relaxed text-night-body">
              <span className="font-display text-night-text">A person approves every job.</span> Nothing is sent or
              changed until someone on your team says yes.
            </p>
          </div>
          <ul className="border-t border-night-line">
            {capabilities.map((c) => (
              <li key={c.name} className="grid grid-cols-1 gap-2 border-b border-night-line py-7 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-8">
                <h3 className="font-display text-[22px] font-medium tracking-[-0.01em] md:text-[24px]">{c.name}</h3>
                <p className="text-[17px] leading-relaxed text-night-body">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The client path: a line draws down the steps. */}
      <section className="px-4 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-page grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 className="font-display text-[36px] font-light leading-none tracking-[-0.03em] text-ink md:text-[56px]">How it works</h2>
          <PathSteps steps={path.map((p) => ({ title: p.name, line: p.body }))} />
        </div>
      </section>

      {/* Larger businesses and the other services, side by side. */}
      <section className="bg-band px-4 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-page grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-[30px] font-light leading-tight tracking-[-0.02em] text-ink md:text-[40px]">For larger businesses</h2>
            <p className="mt-3 text-[17px] text-body">Several companies, or custom work.</p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {larger.map((l) => (
                <li key={l.name} className="py-5">
                  <h3 className="font-display text-[21px] font-medium tracking-[-0.01em] text-ink">{l.name}</h3>
                  <p className="mt-1 text-[17px] leading-relaxed text-body">{l.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[30px] font-light leading-tight tracking-[-0.02em] text-ink md:text-[40px]">Also</h2>
            <p className="mt-3 text-[17px] text-body">On their own or with a setup.</p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {also.map((a) => (
                <li key={a.name}>
                  <Link href={a.href} className="group block py-5">
                    <h3 className="font-display text-[21px] font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-blue">
                      {a.name}
                    </h3>
                    <p className="mt-1 text-[17px] leading-relaxed text-body">{a.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-10 md:py-20">
        <nav aria-label="Guides" className="mx-auto max-w-page">
          <h2 className="font-display text-[18px] font-semibold text-ink">Guides</h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 font-display text-[16px]">
            {guides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue">
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
