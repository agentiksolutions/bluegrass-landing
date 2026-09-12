import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
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
      <h1 className="sr-only">Dashboard Demo</h1>
      <DashboardDemoPage />
    </>
  );
}
