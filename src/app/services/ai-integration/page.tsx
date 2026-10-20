import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";
import { InboxPanel } from "@/components/v2/panels";

export const metadata: Metadata = pageMeta({
  title: "AI Integration",
  description:
    "AI integration consulting for Kentucky businesses. We build AI tools around your actual workflow: reporting, automation, and document creation. Lexington, KY.",
  path: "/services/ai-integration",
});

export default function AIIntegrationPage() {
  return (
    <ServicePageTemplate
      visual={<InboxPanel />}
      title="AI that fits how your business runs."
      subtitle="Tools for research, reports, documents and customer drafts."
      deliverables={[
        "An assessment of where AI fits",
        "Reports and documents drafted for you",
        "Customer drafts a person approves",
        "Connected to the tools you use",
        "Training for your team",
      ]}
      whoItsFor={[
        "Owners who don't know where to start",
        "Teams buried in research, reports or admin",
      ]}
      showroomLink={{
        href: "/showroom/report",
        label: "Try the AI Report Generator",
      }}
      relatedPosts={[
        {
          href: "/work/restaurant-franchisee",
          title: "Three stores, one manager portal",
          category: "Case study",
        },
        {
          href: "/insights/ai-trust-gap",
          title: "The AI Trust Gap: Why Most Businesses Aren't Ready to Buy",
          category: "Strategy",
        },
      ]}
      serviceJsonLd={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI Integration Consulting",
        provider: {
          "@type": "LocalBusiness",
          name: "Bluegrass Advisory Group",
          url: "https://bluegrassadvisorygroup.com",
        },
        areaServed: "Central Kentucky",
        description:
          "AI integration consulting for businesses. Custom workflows, automation, reporting, and document generation built around your actual operations.",
      }}
    />
  );
}
