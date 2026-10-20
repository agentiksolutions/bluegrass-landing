import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = pageMeta({
  title: "AI Integration",
  description:
    "AI integration consulting for Kentucky businesses. We build AI tools around your actual workflow: reporting, automation, and document creation. Lexington, KY.",
  path: "/services/ai-integration",
});

export default function AIIntegrationPage() {
  return (
    <ServicePageTemplate
      image={{ src: "/images/scenes/inbox-sorting.webp", alt: "An office manager at dusk pointing at an inbox sorted into groups on a large monitor" }}
      title="AI that fits how your business runs."
      subtitle="Tools that do real work: research, reporting, document creation and customer communication, set up around how your business runs."
      deliverables={[
        "AI readiness assessment: where it makes sense and where it doesn't",
        "Custom AI workflows for your specific use cases",
        "Document generation and report automation",
        "Internal research and data analysis tools",
        "Customer communication drafts, approved by a person before they go out",
        "Integration with your existing tools and systems",
        "Staff training so your team uses it",
        "Ongoing support through Office Hours or an Embedded Retainer",
      ]}
      whoItsFor={[
        "Businesses that know AI exists but don't know where to start",
        "Companies spending hours on tasks that could be automated",
        "Teams spending their week on manual research, reporting, or admin work",
        "Business owners who want to stay ahead without becoming tech companies",
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
