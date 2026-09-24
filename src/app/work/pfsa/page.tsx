import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { CaseClose, CaseQuote, CaseSection, CaseStudyHero } from "@/components/case-study";

// Facts come from docs/case-study-facts-2026-09-23.md, Case 2 (sourced rows only).
// Past tense for the minutes pipeline: the board has not met since April 2026.

export const metadata: Metadata = pageMeta({
  title: "Case study: The PFSA, a Lexington nonprofit",
  description:
    "A board portal, a public website and an online assistance application for The Public Foundation for Stewardship Advancement, all live within one week in February 2026.",
  path: "/work/pfsa",
});

export default function PfsaCaseStudy() {
  return (
    <>
      <CaseStudyHero
        label="The PFSA"
        title="A back office for a Lexington nonprofit"
        photo={photos.pfsaSite}
        intro={
          <p>
            A 501(c)(3) founded in 2005 and run by a volunteer board. I am its president.
          </p>
        }
      />

      <CaseSection title="Before">
        <p>
          The Public Foundation for Stewardship Advancement kept its books in Quicken. Donation
          receipts came from a Word template, one file per donor.
        </p>
        <p>
          Requests for help came in on a three-page paper application and took about nine business
          days from application to payment. No board minutes could be found for 2016 through 2024,
          and meetings were not recorded.
        </p>
      </CaseSection>

      <CaseSection title="What I built">
        <p>
          The board now has a portal for donors, donations, bank reconciliation, tax receipts, meeting
          minutes and the assistance queue. The treasurer uploads the bank&apos;s export, the portal matches
          deposits to donations, and a receipt cannot go out until the gift has been matched.
        </p>
        <p>
          The PFSA also has a public website and an online assistance application built from the
          board&apos;s paper form.
        </p>
        <p>
          The application scores most of the board&apos;s rubric when it is submitted. Board members
          score the rest in the portal, where the vote is recorded.
        </p>
        <p>
          I also built a process that turned a board meeting recording into draft minutes for the
          secretary to review. It was tested end to end in March 2026.
        </p>
      </CaseSection>

      <CaseSection title="Results">
        <p>
          The portal, the website and the online application went live within one week in February
          2026. Quicken was retired for donation tracking the same month.
        </p>
        <p>
          The board&apos;s first assistance case went through the new system from intake to a
          recorded board vote to payment.
        </p>
        <CaseQuote quote="We built the nonprofit a back office and a website, so the board can put its energy into programs for Lexington, and give back without the stress of running the paperwork." />
      </CaseSection>

      <CaseClose />
    </>
  );
}
