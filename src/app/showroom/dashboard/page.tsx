import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import PageHero from "@/components/v2/page-hero";
import DashboardDemoPage from "./dashboard-client";

export const metadata: Metadata = pageMeta({
  title: "Dashboard Demo",
  description:
    "Explore an interactive dashboard for your industry. See what your numbers look like when they are organized into one screen.",
  path: "/showroom/dashboard",
});

// The demo is a multi-step wizard whose visible headings change per step,
// so the page's one H1 lives here for crawlers and screen readers.
export default function Page() {
  return (
    <>
      <PageHero compact title="Dashboard Demo" intro="A sample dashboard for your industry, laid out the way we would build it." />
      <DashboardDemoPage />
    </>
  );
}
