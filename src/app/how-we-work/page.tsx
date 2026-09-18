import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import SectionLabel from "@/components/section-label";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = pageMeta({
  title: "How we work",
  description:
    "How Bluegrass Advisory Group runs the practice, who decides, and which engagement shapes we offer. Lexington, Kentucky.",
  path: "/how-we-work",
});

const roles = [
  {
    title: "Phil",
    body: "Phil decides and spends.",
  },
  {
    title: "Maverick",
    body: "Maverick architects, audits, and runs work that sits outside the practice.",
  },
  {
    title: "The fleet",
    body: "The fleet runs the practice day to day in Slack and GitHub.",
  },
];

const dayToDay = [
  "Seats post to Slack under their own seat names.",
  "Channel reads use the Cursor Slack connection.",
  "Seats read advisory repository files through the GitHub plugin.",
  "Pull requests that change the plan or the protocol stay on a branch until Phil and the co-owner decide.",
  "Seats do not merge their own pull requests.",
];

const shapes = [
  {
    num: "01",
    title: "Quickstart / solo setup",
    body: "We set up the chassis, starter skills, and education tiers. The work completes in days.",
  },
  {
    num: "02",
    title: "Discovery",
    body: "Discovery is the paid front door. We run an interview and a tech inventory. You leave with a fitted governance policy, a ranked use-case list with arithmetic, and a filled knowledge base. Unpaid discovery is not offered.",
  },
  {
    num: "03",
    title: "Install",
    body: "We install the chassis plus fitted modules. You see quick wins in week one. We do not rebuild your infrastructure.",
  },
  {
    num: "04",
    title: "Enablement",
    body: "We name one champion. Education is gated on usage. Advancement follows demonstrated use.",
  },
  {
    num: "05",
    title: "Partnership",
    body: "We run a recurring use-case pipeline with an explicit work division.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-graphite text-warm-white pt-[148px] pb-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <SectionLabel light>How we work</SectionLabel>
          <h1 className="font-display text-[clamp(40px,5.5vw,58px)] leading-[1.1] font-bold tracking-tight mb-4">
            How the practice runs
          </h1>
          <p className="text-lg text-[#aaa] max-w-[560px]">
            Who decides, who builds, and which engagement shapes we offer.
          </p>
        </div>
      </section>

      {/* Who decides */}
      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Who decides</SectionLabel>
        <h2 className="font-display text-3xl font-bold tracking-tight mb-10">
          Clear ownership from day one.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {roles.map((role) => (
            <div key={role.title}>
              <h3 className="font-display text-xl font-bold mb-3 text-graphite">
                {role.title}
              </h3>
              <p className="text-[16px] leading-relaxed text-[#555]">
                {role.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Day to day */}
      <section className="bg-graphite text-warm-white py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <SectionLabel light>Day to day</SectionLabel>
          <h2 className="font-display text-3xl font-bold tracking-tight mb-10">
            How work moves through Slack and GitHub.
          </h2>
          <div className="space-y-4 max-w-[720px]">
            {dayToDay.map((line) => (
              <div key={line} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald" />
                </span>
                <p className="text-[15px] leading-relaxed text-stone">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement shapes */}
      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Engagement shapes</SectionLabel>
        <h2 className="font-display text-3xl font-bold tracking-tight mb-4">
          Five shapes in ladder order.
        </h2>
        <p className="text-[16px] leading-relaxed text-[#555] max-w-[600px] mb-12">
          Solo operators usually start with Quickstart. Teams that match the
          practice ICP and have not completed Discovery start with Discovery.
        </p>
        <div className="space-y-8">
          {shapes.map((shape) => (
            <div
              key={shape.num}
              className="grid grid-cols-1 md:grid-cols-[72px_1fr] gap-3 md:gap-8 items-start border-b border-graphite/[0.08] pb-8 last:border-b-0 last:pb-0"
            >
              <div className="font-display text-2xl font-bold text-emerald">
                {shape.num}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {shape.title}
                </h3>
                <p className="text-[16px] leading-relaxed text-[#555]">
                  {shape.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        headline="Ready to talk about where you fit."
        subtext="Tell us about your business. We will point you to the right starting shape."
        buttonText="Get Started"
        buttonHref="/contact"
      />
    </>
  );
}
