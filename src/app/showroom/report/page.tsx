import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ReportPage from "./report-client";

export const metadata: Metadata = pageMeta({
  title: "AI Opportunity Report",
  description:
    "Enter your business info and get a custom report on where AI can save you time and money, specific to your industry and your size.",
  path: "/showroom/report",
});

// The demo is a multi-step wizard whose visible headings change per step,
// so the page's one H1 lives here for crawlers and screen readers.
export default function Page() {
  return (
    <>
      <h1 className="sr-only">AI Opportunity Report</h1>
      <ReportPage />
    </>
  );
}
