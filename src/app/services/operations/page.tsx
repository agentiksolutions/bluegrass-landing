import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = pageMeta({
  title: "Operations Consulting",
  description:
    "Operations consulting for Kentucky businesses. We audit your processes, tools, and communication, then tackle what is costing you. Lexington, KY.",
  path: "/services/operations",
});

export default function OperationsPage() {
  return (
    <ServicePageTemplate
      image={{ src: "/images/scenes/process-map.webp", alt: "A person adding a sticky note to a hand-drawn process map on a whiteboard at night" }}
      title="Improve how the work runs."
      subtitle="Most businesses have the same problems: unclear processes, too many tools, communication gaps, and manual work that could be automated. We find where the time and money go, and tackle it."
      deliverables={[
        "Full operational assessment: processes, tools, and team workflows",
        "SOP documentation for your critical processes",
        "Tool audit and recommendation: what to keep, what to replace",
        "Communication system design for teams and management",
        "Employee handbook and onboarding documentation",
        "Process automation where it makes sense",
        "Implementation: we build what the roadmap recommends",
        "Ongoing check-ins through Office Hours or an Embedded Retainer",
      ]}
      whoItsFor={[
        "Growing businesses where things keep falling through the cracks",
        "Companies where the owner is still doing everything manually",
        "Teams with high turnover and no onboarding system",
        "Businesses with good people and processes that need work",
      ]}
      showroomLink={{
        href: "/showroom",
        label: "See It in Action",
      }}
      relatedPosts={[
        {
          href: "/work/restaurant-franchisee",
          title: "Three stores, one manager portal",
          category: "Case study",
        },
        {
          href: "/work/pfsa",
          title: "A back office for a Lexington nonprofit",
          category: "Case study",
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
