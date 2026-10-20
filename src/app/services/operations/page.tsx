import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";
import { SystemsMap } from "@/components/v2/panels";

export const metadata: Metadata = pageMeta({
  title: "Operations Consulting",
  description:
    "Operations consulting for Kentucky businesses. We audit your processes, tools, and communication, then tackle what is costing you. Lexington, KY.",
  path: "/services/operations",
});

export default function OperationsPage() {
  return (
    <ServicePageTemplate
      visual={<SystemsMap />}
      title="Improve how the work runs."
      subtitle="We find where the time and money go, and tackle it."
      deliverables={[
        "A review of your processes and tools",
        "Written procedures for the work that matters",
        "Which tools to keep and which to replace",
        "Handbook and onboarding documents",
        "Automation where it makes sense",
      ]}
      whoItsFor={[
        "Growing businesses where things fall through the cracks",
        "Owners still doing everything by hand",
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
