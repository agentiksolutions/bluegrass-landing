import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Image from "next/image";
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
    body: "One email before you start the day, pulled from your inbox, your calendar, and whatever else you check first. It replaces the time you spend working out what today is.",
  },
  {
    title: "Inbox triage",
    body: "Something reads the mail, separates what needs you from what does not, and drafts replies to the requests you answer the same way every week. You still press send.",
  },
  {
    title: "An assistant that knows your business",
    body: "A version of a general AI tool loaded with how your company works, so the answers come back in your terms instead of generic ones.",
  },
  {
    title: "Meeting summaries",
    body: "Your recurring meetings come back as a summary with action items attached to names, without anyone sitting there taking notes.",
  },
];

const readiness = [
  "A task that eats real hours every week. If you cannot name one, the right move is to wait.",
  "Somebody who will use the thing. A tool the owner builds and nobody opens is money spent on a demo.",
  "Your existing documents, however messy. SOPs, price lists, vendor terms, the spreadsheet you keep reworking.",
  "A willingness to change one habit. Every build that stuck changed how somebody starts their day.",
];

export default function KentuckySmallBusinessPage() {
  return (
    <>
      <section className="relative mt-16 lg:mt-[72px] bg-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:min-h-[max(520px,calc(90svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-12 lg:py-16 flex flex-col justify-center">
            <h1 className="font-display text-[40px] sm:text-[54px] lg:text-[66px] leading-[1.0] font-extralight tracking-[-0.03em] text-ink max-w-[13ch]">
              Where the first dollar goes
            </h1>
            <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[38ch]">
              Most owners we talk to have tried a chatbot once and still do not know
              which job in their business AI should do first.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/scenes/small-business-counter.webp"
              alt="A small business owner at the counter after closing with a laptop and order slips"
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
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              The four things people build first
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-body max-w-[40ch]">
              The useful version of this is smaller than the headlines suggest. You
              pick one job that eats hours, you automate that one job, and you live
              with it before touching anything else.
            </p>
            <p className="mt-5 text-[18px] leading-relaxed text-body max-w-[40ch]">
              Almost every small business we set up starts with one of these. They
              are small builds, they pay back in time rather than in a spreadsheet
              projection, and it is easy to tell whether they worked.
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
            What you need before you spend anything
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
              It happens on plenty of intro calls. A business with three employees
              and a process that lives in one person&apos;s head does not have an AI
              problem. Automating a messy process gets you a faster messy process.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              When that is the answer, you get it on the call along with a couple of
              free resources, and we go our separate ways. It costs us a sale, and it
              is the only way we want to run this business.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              If you want the longer version of how we reach that conclusion, it is
              on{" "}
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
        subtext="Thirty minutes. Tell us the task that eats your week and we will tell you whether to automate it, and roughly what that would involve."
      />
    </>
  );
}
