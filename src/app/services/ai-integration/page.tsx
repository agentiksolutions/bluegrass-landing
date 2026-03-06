import type { Metadata } from "next";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = {
  title: "AI Integration",
  description:
    "AI integration consulting for Kentucky businesses. We implement AI tools that actually work — dashboards, automation, and operations. Lexington, KY.",
  alternates: { canonical: "/services/ai-integration" },
};

export default function AIIntegrationPage() {
  return (
    <ServicePageTemplate
      label="AI Integration"
      title="AI that actually fits your business."
      subtitle="Not a chatbot on your website. Real tools that do real work — research, reporting, document creation, customer communication — trained on your business, not generic templates."
      deliverables={[
        "AI readiness assessment — where it makes sense and where it doesn't",
        "Custom AI workflows for your specific use cases",
        "Document generation and report automation",
        "Internal research and data analysis tools",
        "Customer communication automation (not spam — real value)",
        "Integration with your existing tools and systems",
        "Staff training so your team actually uses it",
        "Ongoing support and refinement as your needs change",
      ]}
      whoItsFor={[
        "Businesses that know AI exists but don't know where to start",
        "Companies spending hours on tasks that could be automated",
        "Teams drowning in manual research, reporting, or admin work",
        "Business owners who want to stay ahead without becoming tech companies",
      ]}
      showroomLink={{
        href: "/showroom/report",
        label: "Try the AI Report Generator",
      }}
      relatedPosts={[
        {
          href: "/insights/automated-35-workflows",
          title: "I Automated 35 Workflows Before Selling a Single AI Service",
          category: "Lessons Learned",
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
