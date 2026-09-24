import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
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
    num: "01",
    title: "The intro call",
    body: "Thirty minutes, no charge. We ask which parts of the business are in scope, how many tools your team touches in a day, and who else has to sign off. By the end of it you have a recommendation, and one of the things we recommend is doing nothing yet.",
  },
  {
    num: "02",
    title: "Intake",
    body: "Once an assessment is signed we send a questionnaire and a short list of things to send over. Whatever documents you already have are enough. Nobody needs to build a data room for us.",
  },
  {
    num: "03",
    title: "The interview",
    body: "A live conversation about how the business runs. For a single department it is about 90 minutes. For a multi-entity business it is several sessions with the owner and the people who actually run each piece, spread across a week.",
  },
  {
    num: "04",
    title: "The review",
    body: "We read everything you sent and map what you currently run against what the work actually requires. This is the quiet part, and it is where most of the hours go.",
  },
  {
    num: "05",
    title: "The roadmap",
    body: "You get a written document: where the business stands today, which opportunities are worth money, what order to do them in, and what a build would involve where a build is the answer. It arrives as a PDF plus the plain-text source, so it is yours to edit and yours to keep.",
  },
  {
    num: "06",
    title: "The walkthrough",
    body: "Before the live call, a recorded walkthrough of the document lands in your inbox. Watch it on your own time so the call is about your questions instead of our narration.",
  },
  {
    num: "07",
    title: "The readout",
    body: "A live call to go through the recommendations and make decisions. Then an email window stays open for follow-up questions, which runs two weeks on a focused assessment and a month on a larger one.",
  },
];

const outcomes = [
  {
    label: "Custom build",
    body: "Your situation needs systems that do not exist yet. The roadmap specifies them so any competent firm could build them, including one that is not us.",
  },
  {
    label: "Tools-based optimization",
    body: "Your stack is fine. The gap is that nothing talks to anything, and the fix is automation around what you already pay for.",
  },
  {
    label: "Process first",
    body: "The tools are not the problem. Documentation, training, and who-does-what are the problem, and buying software would bury it.",
  },
  {
    label: "Embedded support",
    body: "The work is ongoing rather than a project, and a fractional AI operations person is the right shape.",
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
      <section className="pt-[148px] pb-8 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Assessment</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          What an AI assessment involves.
        </h1>
        <p className="text-lg leading-relaxed text-charcoal max-w-[620px] mb-4">
          Most firms will quote you a build before they understand the business.
          An assessment is the step that makes the build worth paying for, and it
          stands on its own if you never hire anyone to do the work.
        </p>
        <p className="text-[15px] leading-relaxed text-charcoal max-w-[620px] mb-16">
          Here is the whole sequence, start to finish.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-content mx-auto">
        <div className="flex flex-col">
          {steps.map((s) => (
            <div
              key={s.num}
              className="grid grid-cols-[44px_1fr] gap-6 py-7 border-t border-line"
            >
              <span className="font-display text-[13px] font-bold text-emerald pt-1">
                {s.num}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold mb-2">
                  {s.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-charcoal max-w-[620px]">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <h2 className="font-display text-2xl font-bold mb-4">
            Five ways an assessment can end.
          </h2>
          <p className="text-[15px] leading-relaxed text-charcoal max-w-[620px] mb-10">
            Every assessment lands on one of these. The fifth one is the reason
            the other four are worth reading: a roadmap that always recommends
            buying more from the firm that wrote it is a sales document.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outcomes.map((o) => (
              <div
                key={o.label}
                className="p-6 bg-white rounded-lg border border-line"
              >
                <h3 className="font-display text-lg font-bold mb-2">
                  {o.label}
                </h3>
                <p className="text-[14px] leading-relaxed text-charcoal">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[72px]">
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">
              How long it takes.
            </h2>
            <p className="text-[15px] leading-relaxed text-charcoal mb-4">
              Signing to readout is about a week when the scope is one department
              or one decision. Two to three weeks when it covers a whole company.
              Four to six when it covers several entities and the people running
              them have to be interviewed separately.
            </p>
            <p className="text-[15px] leading-relaxed text-charcoal">
              The price is fixed before you sign, and it is set by how much of
              the business is in scope. What moves it is covered on{" "}
              <Link
                href="/ai-consulting-cost"
                className="text-emerald hover:underline"
              >
                the cost page
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">
              What is outside it.
            </h2>
            <div className="space-y-3">
              {notIncluded.map((n) => (
                <p
                  key={n}
                  className="text-[15px] leading-relaxed text-charcoal"
                >
                  &bull; {n}
                </p>
              ))}
            </div>
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
        subtext="Thirty minutes, no charge, no pitch. You leave with a recommendation even if the recommendation is that an assessment would be a waste of your money right now."
      />
    </>
  );
}
