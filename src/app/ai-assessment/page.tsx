import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import CTABand from "@/components/cta-band";
import RelatedLinks from "@/components/related-links";

export const metadata: Metadata = pageMeta({
  title: "What an AI Assessment Involves",
  description:
    "Inside a Bluegrass Advisory Group AI assessment: the intake interview, the review, the written roadmap you own, the walkthrough, and the readout call.",
  path: "/ai-assessment",
});

const steps = [
  {
    title: "The intro call",
    body: "Thirty minutes, no charge. We ask which parts of the business are in scope, how many tools your team touches in a day, and who else has to sign off. By the end of it you have a recommendation, and one of the things we recommend is doing nothing yet.",
  },
  {
    title: "Intake",
    body: "Once an assessment is signed we send a questionnaire and a short list of things to send over. Whatever documents you already have are enough. Nobody needs to build a data room for us.",
  },
  {
    title: "The interview",
    body: "A live conversation about how the business runs. For a single department it is one session. For a multi-entity business it is several sessions with the owner and the people who run each piece.",
  },
  {
    title: "The review",
    body: "We read everything you sent and map what you currently run against what the work requires. This is the quiet part, and it is where most of the hours go.",
  },
  {
    title: "The roadmap",
    body: "You get a written document: where the business stands today, which opportunities are worth money, what order to do them in, and what a build would involve where a build is the answer. It arrives as a PDF plus the plain-text source, so it is yours to edit and yours to keep.",
  },
  {
    title: "The walkthrough",
    body: "Before the live call, we send a recorded walkthrough of the document. Watch it when it suits you, so the call is about your questions instead of our narration.",
  },
  {
    title: "The readout",
    body: "A live call to go through the recommendations and make decisions. After it, you can email follow-up questions during a window we agree on before you sign.",
  },
];

const outcomes = [
  {
    label: "Custom build",
    body: "Your situation needs systems that do not exist yet. The roadmap specifies them so any competent firm could build them, including one that is not us.",
  },
  {
    label: "Tools-based optimization",
    body: "Your stack is fine. The gap is that nothing talks to anything, and the answer is automation around what you already pay for.",
  },
  {
    label: "Process first",
    body: "Documentation, training, and who-does-what are the problem. Buying software would bury it.",
  },
  {
    label: "Embedded support",
    body: "The work is ongoing rather than a project, and an Embedded Retainer is the right shape.",
  },
  {
    label: "Walk away",
    body: "You got what you needed from the assessment and you can take it from here. We say so and the engagement ends there.",
  },
];

const notIncluded = [
  "Building the recommendations. That is a separate engagement with its own fixed price.",
  "Custom workflows, agents, or integrations.",
  "Ongoing revisions after the follow-up window closes.",
  "Negotiating with your vendors on your behalf.",
];

export default function AIAssessmentPage() {
  return (
    <>
      <section className="relative mt-16 lg:mt-[72px] bg-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:min-h-[max(520px,calc(90svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-12 lg:py-16 flex flex-col justify-center">
            <h1 className="font-display text-[40px] sm:text-[54px] lg:text-[66px] leading-[1.0] font-extralight tracking-[-0.03em] text-ink max-w-[13ch]">
              What an AI assessment involves
            </h1>
            <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[38ch]">
              Most firms will quote you a build before they understand the business.
              An assessment tells you whether a build will pay off, and it stands
              on its own if you never hire anyone to do the work.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/scenes/assessment-walkthrough.webp"
              alt="One person pointing at a spreadsheet on a laptop while explaining their work to another who takes notes"
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
            Here is the whole sequence, start to finish.
          </p>
          <ol className="divide-y divide-line border-y border-line">
            {steps.map((s) => (
              <li key={s.title} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-8 md:py-10">
                <h2 className="font-display text-[24px] md:text-[30px] font-light leading-tight text-ink">{s.title}</h2>
                <p className="text-[18px] md:text-[19px] leading-relaxed text-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              Five ways an assessment can end
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-body max-w-[40ch]">
              Every assessment lands on one of these. The fifth one matters most:
              a roadmap that always recommends buying more from the firm that
              wrote it is a sales document.
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {outcomes.map((o) => (
              <li key={o.label} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-7 md:py-8">
                <h3 className="font-display text-[22px] md:text-[26px] font-light leading-tight text-ink">{o.label}</h3>
                <p className="text-[18px] leading-relaxed text-body">{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              Timing and price
            </h2>
            <p className="mt-8 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[52ch]">
              Timing is agreed with you for each project before you sign.
            </p>
            <p className="mt-5 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[52ch]">
              The price is fixed before you sign, and it is set by how much of
              the business is in scope. What moves it is covered on{" "}
              <Link
                href="/ai-consulting-cost"
                className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
              >
                the cost page
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              What is outside it
            </h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {notIncluded.map((n) => (
                <li key={n} className="py-5 text-[18px] leading-relaxed text-body">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <RelatedLinks
        links={[
          {
            href: "/services/operations",
            label: "Operations consulting",
            blurb:
              "What happens after the roadmap says the process is the problem.",
          },
          {
            href: "/ai-tools-we-build",
            label: "The tools we build most often",
            blurb: "What usually comes out the other side of an assessment.",
          },
          {
            href: "/showroom/report",
            label: "Try the opportunity report",
            blurb:
              "A free, automated version of the first question an assessment asks.",
          },
          {
            href: "/faq",
            label: "Questions we get asked",
            blurb: "Ownership, timelines, what we need from you, and what it costs.",
          },
        ]}
      />

      <CTABand
        headline="Start with the call."
        subtext="Thirty minutes, at no charge. You leave with a recommendation, even if it is that an assessment would be a waste of your money right now."
      />
    </>
  );
}
