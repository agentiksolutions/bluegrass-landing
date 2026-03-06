import type { Metadata } from "next";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = {
  title: "Operations Consulting",
  description:
    "Operations consulting for Kentucky businesses. We audit your processes, tools, and communication — then fix what's costing you. Lexington, KY.",
  alternates: { canonical: "/services/operations" },
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
      relatedPosts={[
        {
          href: "/insights/cut-12-hours-admin",
          title: "How We Cut 12 Hours of Weekly Admin Work Across Three Locations",
          category: "Case Study",
        },
        {
          href: "/insights/automated-35-workflows",
          title: "I Automated 35 Workflows Before Selling a Single AI Service",
          category: "Lessons Learned",
        },
      ]}
      serviceJsonLd={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Operations Consulting",
        provider: {
          "@type": "LocalBusiness",
          name: "Bluegrass Advisory Group",
          url: "https://bluegrassadvisorygroup.com",
        },
        areaServed: "Central Kentucky",
        description:
          "Operations consulting for businesses. Process audits, SOP documentation, tool optimization, and automation implementation.",
      }}
    />
  );
}
