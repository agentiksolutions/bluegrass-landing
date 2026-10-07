import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Image from "next/image";
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
    what: "Mail arriving in a shared inbox gets read, classified by type and by which part of the business it belongs to, and only the items needing a decision surface for a person.",
    limit: "It sorts and flags. A person still approves and pays. Accuracy depends on how consistently a sender formats what they send, and a new vendor needs a round of tuning before it reads them reliably.",
  },
  {
    title: "Meeting notes and action items",
    what: "A recurring meeting is transcribed and comes back as a summary with decisions and action items attached to names. This week's items carry into next week automatically.",
    limit: "Transcription quality tracks audio quality. It also sometimes reads a vague remark as a commitment, so a person reads it before it goes out.",
  },
  {
    title: "A daily briefing",
    what: "One message at a set time that reads across the systems you would otherwise open one by one, and tells you what needs you today in priority order.",
    limit: "It is only as good as the data behind it. If a source system is not connected yet, that section of the briefing is empty rather than wrong.",
  },
  {
    title: "Recurring internal communications",
    what: "A weekly or monthly internal update assembled from inputs your team already produces, in the same format every time, tracking whether last period's commitments happened.",
    limit: "Some inputs still have to be handed over until their source is connected. The draft is automatic, the approval is not.",
  },
  {
    title: "Searchable documents",
    what: "Your procedures, contracts, and training material in one place you can ask questions of in plain English, with answers drawn from the actual documents rather than a generic model.",
    limit: "It returns what your documents say. Stale procedures produce confidently stale answers, so do this one after a cleanup.",
  },
  {
    title: "Research before a conversation",
    what: "A structured profile on a company, a vendor, or a prospect assembled before you meet them, so you walk in knowing what is publicly knowable.",
    limit: "Public sources only, and it is a starting point for your judgment rather than a substitute for it.",
  },
  {
    title: "Voice notes into records",
    what: "A recording from a site visit or a drive home comes back transcribed, sorted by which part of the business it concerns, with the action items pulled out.",
    limit: "Somebody has to press record, and speaker names need a contact list before it can label who said what.",
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
      <section className="relative mt-16 lg:mt-[72px] bg-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:min-h-[max(520px,calc(90svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-12 lg:py-16 flex flex-col justify-center">
            <h1 className="font-display text-[40px] sm:text-[54px] lg:text-[66px] leading-[1.0] font-extralight tracking-[-0.03em] text-ink max-w-[13ch]">
              The tools we build most often
            </h1>
            <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[38ch]">
              Every business believes its problem is unique. The problems mostly are.
              The tools that solve them turn out to be the same eight, arranged
              differently.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/scenes/inbox-sorting.webp"
              alt="An office manager at dusk pointing at an inbox sorted into groups on a large monitor"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <p className="text-[18px] md:text-[19px] leading-relaxed text-body max-w-[36ch]">
            Each one below comes with what it will not do, because that is the part
            you need before you buy, rather than after.
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
            A person approves anything that leaves the building
          </h2>
          <div className="max-w-[62ch] space-y-5">
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              Every one of these proposes and a person decides. No email reaches a
              customer, no document publishes, and no record changes because an
              automation felt confident about it.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              That is slower than full automation. As you watch a tool get it
              right over time, you can widen what it is allowed to do. That
              decision stays yours.
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
              Customer-facing chatbots are a different product with different risks,
              and they are not what we do. Neither is anything we cannot show you
              running before you pay for it.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              If you want to see the difference, the{" "}
              <Link href="/showroom" className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                showroom
              </Link>{" "}
              has working tools you can use right now without giving anyone your
              email address.
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
        subtext="Thirty minutes. Tell us where the hours go and we will tell you which of these to build first, and which would be a waste of your money."
      />
    </>
  );
}
