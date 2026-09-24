import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
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
    what: "Mail arriving in a shared inbox gets read, classified by type and by which part of the business it belongs to, and only the items needing a decision surface for a person.",
    limit: "It triages, it does not pay. Accuracy depends on how consistently a sender formats what they send, and a new vendor needs a round of tuning before it reads them reliably.",
  },
  {
    title: "Meeting notes and action items",
    what: "A recurring meeting is transcribed and comes back as a summary with decisions and action items attached to names. This week's items carry into next week automatically.",
    limit: "Transcription quality tracks audio quality. It also mistakes a verbal shrug for a commitment now and then, so a person reads it before it goes out.",
  },
  {
    title: "A daily briefing",
    what: "One message at a set time that reads across the systems you would otherwise open one by one, and tells you what needs you today in priority order.",
    limit: "It is only as good as the data behind it. If a source system is not connected yet, that section of the briefing is empty rather than wrong.",
  },
  {
    title: "Recurring internal communications",
    what: "A weekly or monthly internal update assembled from inputs your team already produces, in the same format every time, tracking whether last period's commitments actually happened.",
    limit: "Some inputs still have to be handed over until their source is connected. The draft is automatic, the approval is not.",
  },
  {
    title: "Searchable documents",
    what: "Your procedures, contracts, and training material in one place you can ask questions of in plain English, with answers drawn from the actual documents rather than a generic model.",
    limit: "It returns what your documents say. Stale procedures produce confidently stale answers, so this one is worth doing after a cleanup rather than before.",
  },
  {
    title: "Research before a conversation",
    what: "A structured profile on a company, a vendor, or a prospect assembled before you meet them, so you walk in knowing what is publicly knowable.",
    limit: "Public sources only, and it is a starting point for your judgment rather than a substitute for it.",
  },
  {
    title: "Voice notes into records",
    what: "A recording from a site visit or a drive home comes back transcribed, sorted by which part of the business it concerns, with the action items pulled out.",
    limit: "Somebody has to actually press record, and speaker names need a contact list before it can label who said what.",
  },
  {
    title: "Dashboards",
    what: "The numbers you manage to, pulled from the systems that hold them, on one screen that updates itself.",
    limit: "The build is the easy part. Getting two systems to agree on what a number means is the work, and it comes first.",
  },
];

export default function AIToolsPage() {
  return (
    <>
      <section className="pt-[148px] pb-8 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>What we build</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          The tools we build most often.
        </h1>
        <p className="text-lg leading-relaxed text-charcoal max-w-[620px] mb-4">
          Every business believes its problem is unique. The problems mostly are.
          The tools that solve them turn out to be the same eight, arranged
          differently.
        </p>
        <p className="text-[15px] leading-relaxed text-charcoal max-w-[620px] mb-16">
          Each one below comes with what it will not do, because that is the part
          you need before you buy, rather than after.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-content mx-auto">
        <div className="flex flex-col">
          {tools.map((t) => (
            <div key={t.title} className="py-8 border-t border-line">
              <h2 className="font-display text-xl font-bold mb-3">{t.title}</h2>
              <p className="text-[15px] leading-relaxed text-charcoal max-w-[680px] mb-4">
                {t.what}
              </p>
              <p className="text-[14px] leading-relaxed text-stone max-w-[680px]">
                {t.limit}
              </p>
            </div>
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div className="max-w-[680px]">
            <h2 className="font-display text-2xl font-bold mb-6">
              A person approves anything that leaves the building.
            </h2>
            <p className="text-[15px] leading-relaxed text-charcoal mb-4">
              Every one of these proposes and a person decides. No email reaches a
              customer, no document publishes, and no record changes because an
              automation felt confident about it.
            </p>
            <p className="text-[15px] leading-relaxed text-charcoal">
              That is slower than full automation, and it is why nothing has gone
              out on its own that we had to walk back. As
              you watch a tool get it right for a few months, you can widen what
              it is allowed to do. That decision stays yours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <div className="max-w-[680px]">
          <h2 className="font-display text-2xl font-bold mb-6">
            What we do not sell.
          </h2>
          <p className="text-[15px] leading-relaxed text-charcoal mb-4">
            Customer-facing chatbots are a different product with different risks,
            and they are not what we do. Neither is anything we cannot show you
            running before you pay for it.
          </p>
          <p className="text-[15px] leading-relaxed text-charcoal">
            If you want to see the difference, the{" "}
            <Link href="/showroom" className="text-emerald hover:underline">
              showroom
            </Link>{" "}
            has working tools you can use right now without giving anyone your
            email address.
          </p>
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
            blurb: "The step that decides which of these you actually need.",
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
        subtext="Thirty minutes. Tell us where the hours go and we will tell you which of these is worth building, and which would be a waste of your money."
      />
    </>
  );
}
