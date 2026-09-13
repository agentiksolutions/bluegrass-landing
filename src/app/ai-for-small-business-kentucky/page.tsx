import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
import Card from "@/components/card";
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
    body: "One email before you start the day, pulled from your inbox, your calendar, and whatever else you check first. It replaces the twenty minutes you spend working out what today is.",
  },
  {
    title: "Inbox triage",
    body: "Something reads the mail, separates what needs you from what does not, and drafts replies to the requests you answer the same way every week. You still press send.",
  },
  {
    title: "An assistant that knows your business",
    body: "A version of a general AI tool loaded with how your company actually works, so the answers come back in your terms instead of generic ones.",
  },
  {
    title: "Meeting summaries",
    body: "Your recurring meetings come back as a summary with action items attached to names, without anyone sitting there taking notes.",
  },
];

const readiness = [
  "A task that eats real hours every week. If you cannot name one, the honest move is to wait.",
  "Somebody who will actually use the thing. A tool the owner builds and nobody opens is money spent on a demo.",
  "Your existing documents, however messy. SOPs, price lists, vendor terms, the spreadsheet you keep reworking.",
  "A willingness to change one habit. Every build that stuck changed how somebody starts their day.",
];

export default function KentuckySmallBusinessPage() {
  return (
    <>
      <section className="pt-[148px] pb-8 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Kentucky small business</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          Where the first dollar goes.
        </h1>
        <p className="text-lg leading-relaxed text-[#666] max-w-[620px] mb-4">
          Most small business owners we talk to have heard for two years that AI
          is going to change everything, have tried a chatbot once, and have no
          idea what they are supposed to do on Monday.
        </p>
        <p className="text-[15px] leading-relaxed text-[#666] max-w-[620px] mb-16">
          The useful version of this is smaller than the headlines suggest. You
          pick one job that eats hours, you automate that one job, and you live
          with it for a month before touching anything else.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-content mx-auto">
        <h2 className="font-display text-2xl font-bold mb-4">
          The four things people build first.
        </h2>
        <p className="text-[15px] leading-relaxed text-[#666] max-w-[620px] mb-10">
          Almost every small business we set up starts with one of these. They
          are cheap to build, they pay back in time rather than in a spreadsheet
          projection, and you can tell within two weeks whether it worked.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {firstBuilds.map((b) => (
            <Card key={b.title} className="!p-8 h-full">
              <h3 className="font-display text-lg font-bold mb-3">{b.title}</h3>
              <p className="text-[14px] leading-relaxed text-[#666]">{b.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <h2 className="font-display text-2xl font-bold mb-8">
            What you need before you spend anything.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readiness.map((r) => (
              <div
                key={r}
                className="flex items-start gap-3 p-5 bg-white rounded-lg border border-[#e8e5e0]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald mt-1.5 shrink-0" />
                <span className="text-[15px] leading-relaxed text-[#555]">
                  {r}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <div className="max-w-[640px]">
          <h2 className="font-display text-2xl font-bold mb-6">
            When we tell people to buy nothing.
          </h2>
          <p className="text-[15px] leading-relaxed text-[#666] mb-4">
            It happens on plenty of intro calls. A business with three employees
            and a process that lives in one person&apos;s head does not have an AI
            problem. Automating a broken process gets you a faster broken process.
          </p>
          <p className="text-[15px] leading-relaxed text-[#666] mb-4">
            When that is the answer, you get it on the call along with a couple of
            free resources, and we go our separate ways. It costs us a sale and it
            is the only version of this business worth running.
          </p>
          <p className="text-[15px] leading-relaxed text-[#666]">
            If you want the longer version of how we reach that conclusion, it is
            on{" "}
            <Link href="/ai-assessment" className="text-emerald hover:underline">
              the assessment page
            </Link>
            .
          </p>
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
            blurb: "For when the process is the thing that needs fixing first.",
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
        subtext="Thirty minutes. Tell us the task that eats your week and we will tell you whether it is worth automating, and roughly what that would involve."
      />
    </>
  );
}
