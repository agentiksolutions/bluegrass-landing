import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { CaseClose, CaseQuote, CaseSection, CaseStudyHero, CaseVisual } from "@/components/case-study";
import { StorePanel, TipPanel } from "@/components/v2/panels";

// Facts come from docs/case-study-facts-2026-09-23.md (sourced rows only) and Phil's own
// words in docs/phil-impact-in-his-words-2026-09-23.md. No payroll, no store names, no store towns.

export const metadata: Metadata = pageMeta({
  title: "Case study: a Five Guys franchisee in Central Kentucky",
  description:
    "Three stores run on one manager portal built by Phil Fifield, who runs operations for a Five Guys franchisee in Central Kentucky.",
  path: "/work/restaurant-franchisee",
});

export default function FranchiseeCaseStudy() {
  return (
    <>
      <CaseStudyHero
        label="A Five Guys franchisee in Central Kentucky"
        title="Three stores, one manager portal"
        visual={<StorePanel />}
        intro={
          <p>
            I run operations for this franchisee and built these systems for it.
          </p>
        }
      />

      <CaseSection title="Before">
        <p>
          The store managers ran their stores off scattered files, handoffs by word of mouth and
          questions to me.
        </p>
      </CaseSection>

      <CaseSection title="What I built">
        <p>
          The managers now log into one website for their store results, training status, incident
          reports, vendors and daily checklists. I started building it in April 2026.
        </p>
        <p>
          Each Tuesday morning the portal puts together a newsletter for the managers from the
          stores&apos; own reports.
        </p>
        <p>
          It also covers the jobs that come up once in a while. A large catering order gets a
          one-page printout with the math done. When a piece of equipment stops working, the portal
          tells the manager who to call and walks them through troubleshooting.
        </p>
      </CaseSection>
      <CaseVisual caption="One of the portal's jobs: splitting the tip pool by hours worked.">
        <TipPanel />
      </CaseVisual>

      <CaseSection title="In my words">
        <div className="grid grid-cols-1 gap-6 not-prose">
          <CaseQuote quote="No one is literate on AI, but they all use the portal." />
          <CaseQuote quote="It's a one-sheet print-off. That way, we don't have to go back and remember what goes in that large cheeseburger box." />
          <CaseQuote quote="We gave the store managers their time back. A lot of the paperwork runs on its own now, and the numbers reach them in a form they can read quickly, so they spend their time with guests and their people and make decisions with more confidence." />
        </div>
      </CaseSection>


      <CaseClose />
    </>
  );
}
