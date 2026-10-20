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
        title="Three stores, one manager portal"
        visual={<StorePanel />}
        intro={
          <p>
            I run operations for a Five Guys franchisee in Central Kentucky and built these systems for it.
          </p>
        }
      />

      <CaseSection title="Before">
        <p>
          Managers ran their stores off scattered files, word-of-mouth handoffs and questions to me.
        </p>
      </CaseSection>

      <CaseSection title="What I built">
        <p>
          Managers log into one website for store results, training status, incident reports, vendors
          and daily checklists. Each Tuesday morning it builds their newsletter from the stores&apos; own reports.
        </p>
      </CaseSection>
      <CaseVisual caption="One of the portal's jobs: splitting the tip pool by hours worked.">
        <TipPanel />
      </CaseVisual>

      <CaseSection title="In my words">
        <div className="grid grid-cols-1 gap-6 not-prose">
          <CaseQuote quote="No one is literate on AI, but they all use the portal." />
          <CaseQuote quote="We gave the store managers their time back." />
        </div>
      </CaseSection>

      <CaseClose />
    </>
  );
}
