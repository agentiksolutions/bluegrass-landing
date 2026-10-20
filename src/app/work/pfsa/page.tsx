import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { CaseClose, CaseQuote, CaseSection, CaseStudyHero, CaseVisual } from "@/components/case-study";
import { BoardPanel } from "@/components/v2/panels";

// Facts come from docs/case-study-facts-2026-09-23.md, Case 2 (sourced rows only).
// Past tense for the minutes pipeline: the board has not met since April 2026.

export const metadata: Metadata = pageMeta({
  title: "Case study: The PFSA, a Lexington nonprofit",
  description:
    "A board portal, a public website and an online assistance application for The Public Foundation for Stewardship Advancement, all live in February 2026.",
  path: "/work/pfsa",
});

export default function PfsaCaseStudy() {
  return (
    <>
      <CaseStudyHero
        title="A back office for a Lexington nonprofit"
        photo={photos.pfsaSite}
        intro={
          <p>
            The PFSA is a volunteer-run 501(c)(3), founded in 2005, where I am president.
          </p>
        }
      />

      <CaseSection title="Before">
        <p>
          The PFSA kept its books in Quicken and made donation receipts one Word file per donor.
          Requests for help came on a three-page paper form and took about nine business days to pay.
        </p>
      </CaseSection>

      <CaseSection title="What I built">
        <p>
          The board now runs donations, bank reconciliation, tax receipts, minutes and assistance
          requests from one portal. A receipt cannot go out until the gift is matched to a deposit.
        </p>
        <p>
          I also built a public website and an online application that scores most of the
          board&apos;s rubric when it is submitted.
        </p>
      </CaseSection>
      <CaseVisual caption="What the board portal records, from a donation to a recorded vote.">
        <BoardPanel />
      </CaseVisual>

      <CaseSection title="Results">
        <p>
          All three went live in February 2026, and Quicken was retired for donations that month. The
          first assistance case went from intake to a recorded board vote to payment.
        </p>
        <CaseQuote quote="We built the nonprofit a back office and a website, so the board can put its energy into programs for Lexington, and give back without the stress of running the paperwork." />
      </CaseSection>

      <CaseClose />
    </>
  );
}
