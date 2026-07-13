import type { Metadata } from "next";
import DashboardDemoPage from "./dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard Demo",
  description:
    "Explore an interactive dashboard for your industry. Real charts, real KPIs, real alerts — this is what your numbers look like when they're organized.",
  alternates: { canonical: "/showroom/dashboard" },
};

export default DashboardDemoPage;
