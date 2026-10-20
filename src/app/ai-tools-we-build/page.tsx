import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import PageHero from "@/components/v2/page-hero";
import { InboxPanel } from "@/components/v2/panels";
import Link from "next/link";
import CTABand from "@/components/cta-band";
import RelatedLinks from "@/components/related-links";

export const metadata: Metadata = pageMeta({
  title: "AI Tools We Build Most Often",
  description:
    "The builds that come up again and again: inbox triage, meeting notes, daily briefings, searchable documents, and dashboards, with the limits on each.",
  path: "/ai-tools-we-build",
});

const tools = [
  {
    title: "Inbox and invoice triage",
    what: "Sorts incoming mail and shows only what needs a decision.",
    limit: "A person still approves and pays.",
  },
  {
    title: "Meeting notes and action items",
    what: "A summary with decisions and action items by name.",
    limit: "A person reads it before it goes out.",
  },
  {
    title: "A daily briefing",
    what: "One message with what needs you today, in order.",
    limit: "A system not yet connected shows up empty.",
  },
  {
    title: "Recurring internal communications",
    what: "Your weekly update, drafted in the same format every time.",
    limit: "The draft is automatic. The approval is not.",
  },
  {
    title: "Searchable documents",
    what: "Ask a question and get the answer from your own documents.",
    limit: "Stale procedures give stale answers, so clean up first.",
  },
  {
    title: "Research before a conversation",
    what: "A profile of a company or prospect before you meet.",
    limit: "Public sources only.",
  },
  {
    title: "Voice notes into records",
    what: "A recording comes back transcribed, with action items pulled out.",
    limit: "Somebody has to press record.",
  },
  {
    title: "Dashboards",
    what: "The numbers you manage to, on one screen that updates itself.",
    limit: "Getting two systems to agree on a number comes first.",
  },
];

export default function AIToolsPage() {
  return (
    <>
      <PageHero
        title="The tools we build most often"
        intro="Eight tools solve most business problems. Here is each one, with its limit."
        visual={<InboxPanel />}
      />

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <p className="text-[18px] md:text-[19px] leading-relaxed text-body max-w-[36ch]">
            What each one does, and what it will not do.
          </p>
          <ul className="divide-y divide-line border-y border-line">
            {tools.map((t) => (
              <li key={t.title} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-8 md:py-10">
                <h2 className="font-display text-[24px] md:text-[30px] font-light leading-tight text-ink">{t.title}</h2>
                <div>
                  <p className="text-[18px] md:text-[19px] leading-relaxed text-body">{t.what}</p>
                  <p className="mt-4 text-[17px] leading-relaxed text-muted">{t.limit}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            A person approves anything that goes to a customer
          </h2>
          <div className="max-w-[62ch] space-y-5">
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              The tool proposes and a person decides. You choose when to give it more room.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            What we do not sell
          </h2>
          <div className="max-w-[62ch] space-y-5">
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              Customer-facing chatbots, or anything we can&apos;t show you running first.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              The{" "}
              <Link href="/showroom" className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                showroom
              </Link>{" "}
              has working tools you can try without giving us your email.
            </p>
          </div>
        </div>
      </section>

      <RelatedLinks
        links={[
          {
            href: "/services/ai-integration",
            label: "AI integration",
            blurb: "How a build gets scoped, delivered, and handed over.",
          },
          {
            href: "/ai-assessment",
            label: "What an AI assessment involves",
            blurb: "The step that decides which of these you need.",
          },
          {
            href: "/ai-for-hospitality",
            label: "AI for hospitality businesses",
            blurb: "The same tools, arranged for a multi-location operation.",
          },
          {
            href: "/work/restaurant-franchisee",
            label: "Case study: three stores, one manager portal",
            blurb: "Several of these tools, running for a Five Guys franchisee in Central Kentucky.",
          },
        ]}
      />

      <CTABand
        headline="Which one would you start with?"
      />
    </>
  );
}
