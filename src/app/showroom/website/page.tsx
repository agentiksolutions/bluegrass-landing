import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import WebsiteGeneratorPage from "./website-client";

export const metadata: Metadata = pageMeta({
  title: "Website Generator",
  description:
    "See a live preview of what a professional website could look like for your business. Pick a style, describe what you do, and watch it build.",
  path: "/showroom/website",
});

// The demo is a multi-step wizard whose visible headings change per step,
// so the page's one H1 lives here for crawlers and screen readers.
export default function Page() {
  return (
    <>
      <h1 className="sr-only">Website Generator</h1>
      <WebsiteGeneratorPage />
    </>
  );
}
