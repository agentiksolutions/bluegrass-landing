import type { Metadata } from "next";
import ReportPage from "./report-client";

export const metadata: Metadata = {
  title: "AI Opportunity Report",
  description:
    "Enter your business info and get a custom report on where AI can actually save you time and money — specific to your industry, your size, your problems.",
  alternates: { canonical: "/showroom/report" },
};

export default ReportPage;
