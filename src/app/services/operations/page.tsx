import type { Metadata } from "next";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = {
  title: "Operations Consulting",
  description:
    "We look at how your business runs and fix what's costing you. Processes, tools, communication, all of it.",
};

export default function OperationsPage() {
  return (
    <ServicePageTemplate
      label="Operations Consulting"
      title="Fix what's actually broken."
      subtitle="Most businesses have the same problems — unclear processes, too many tools, communication gaps, and manual work that should've been automated years ago. We find the leaks and plug them."
      deliverables={[
        "Full operational assessment — processes, tools, and team workflows",
        "SOP documentation for your critical processes",
        "Tool audit and recommendation — what to keep, what to replace",
        "Communication system design for teams and management",
        "Employee handbook and onboarding documentation",
        "Process automation where it makes sense",
        "Implementation support — we don't just recommend, we build",
        "Quarterly check-ins to measure impact and adjust",
      ]}
      whoItsFor={[
        "Growing businesses where things keep falling through the cracks",
        "Companies where the owner is still doing everything manually",
        "Teams with high turnover and no onboarding system",
        "Businesses with great people but terrible processes",
      ]}
    />
  );
}
