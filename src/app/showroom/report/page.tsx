import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import PageHero from "@/components/v2/page-hero";
import ReportPage from "./report-client";

export const metadata: Metadata = pageMeta({
  title: "AI Readiness Report",
  description:
    "Enter your business info and get a short report on where AI fits your business, specific to your industry and your size.",
  path: "/showroom/report",
});

// The demo is a multi-step wizard whose visible headings change per step,
// so the page's one H1 lives here for crawlers and screen readers.
export default function Page() {
  return (
    <>
      <PageHero compact title="AI Readiness Report" intro="A short report on where AI fits your business, for your industry and size." />
      <ReportPage />
    </>
  );
}
