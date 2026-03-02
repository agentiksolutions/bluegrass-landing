import type { Metadata } from "next";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = {
  title: "AI Integration",
  description:
    "AI tools built around your actual workflow. Research, reporting, document creation, customer tools.",
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
    />
  );
}
