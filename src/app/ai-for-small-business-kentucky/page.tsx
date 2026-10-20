import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import PageHero from "@/components/v2/page-hero";
import { AssistantPanel } from "@/components/v2/panels";
import Link from "next/link";
import CTABand from "@/components/cta-band";
import RelatedLinks from "@/components/related-links";

export const metadata: Metadata = pageMeta({
  title: "AI for Kentucky Small Business",
  description:
    "A plain guide for Kentucky small business owners: where the first dollar of AI spending goes, what to build first, and when the answer is to buy nothing.",
  path: "/ai-for-small-business-kentucky",
});

const firstBuilds = [
  {
    title: "A morning briefing",
    body: "One email before your day starts, pulled from your inbox and calendar.",
  },
  {
    title: "Inbox triage",
    body: "Sorts what needs you and drafts the routine replies. You still press send.",
  },
  {
    title: "An assistant that knows your business",
    body: "A general AI tool loaded with how your company works.",
  },
  {
    title: "Meeting summaries",
    body: "A summary with action items attached to names, and nobody taking notes.",
  },
];

const readiness = [
  "A task that eats hours every week. If you cannot name one, wait.",
  "Somebody who will use the tool.",
  "Your existing documents, however messy.",
  "A willingness to change one habit.",
];

export default function KentuckySmallBusinessPage() {
  return (
    <>
      <PageHero
        title="Where the first dollar goes"
        intro="Most owners we talk to tried a chatbot but do not know what AI should do first."
        visual={<AssistantPanel />}
      />

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              Four things to build first
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-body max-w-[40ch]">
              Pick one job that eats hours, automate it, and live with it before
              touching anything else.
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {firstBuilds.map((b) => (
              <li key={b.title} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-7 md:py-8">
                <h3 className="font-display text-[22px] md:text-[26px] font-light leading-tight text-ink">{b.title}</h3>
                <p className="text-[18px] leading-relaxed text-body">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            What you need first
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {readiness.map((r) => (
              <li key={r} className="py-6 font-display text-[19px] md:text-[23px] font-light leading-snug text-ink">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            When we tell people to buy nothing
          </h2>
          <div className="max-w-[62ch] space-y-5">
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              A three-person business whose process lives in one person&apos;s
              head does not have an AI problem. Automating a messy process gets
              you a faster messy process.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              When that is the answer, we tell you on the call. More on{" "}
              <Link href="/ai-assessment" className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                the assessment page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <RelatedLinks
        links={[
          {
            href: "/ai-consulting-cost",
            label: "What drives the cost",
            blurb: "Why two businesses get two very different numbers.",
          },
          {
            href: "/showroom",
            label: "The showroom",
            blurb: "Four tools you can try right now without talking to anyone.",
          },
          {
            href: "/services/operations",
            label: "Operations consulting",
            blurb: "For when the process is the thing that needs work first.",
          },
          {
            href: "/insights/ai-trust-gap",
            label: "The AI trust gap",
            blurb: "Why being skeptical of AI vendors is the correct instinct.",
          },
        ]}
      />

      <CTABand
        headline="Bring us one job you hate."
      />
    </>
  );
}
