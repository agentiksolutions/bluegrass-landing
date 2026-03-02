import type { Metadata } from "next";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = {
  title: "Web Design & Development",
  description:
    "Professional websites built for your business. Not templates — real design, real hosting, fully yours.",
};

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      label="Web Design & Development"
      title="Your business deserves a real website."
      subtitle="Not a template with your logo slapped on it. A fully custom site designed around your business, your customers, and your goals. Built to load fast, look sharp, and convert visitors into calls."
      deliverables={[
        "Custom design — no templates, no drag-and-drop builders",
        "Mobile-responsive layout that works on every device",
        "SEO foundation — proper structure, meta tags, page speed optimization",
        "Contact forms, maps, and lead capture built in",
        "Hosting setup and domain configuration",
        "Google Business Profile and analytics integration",
        "Content writing for your key pages",
        "30-day post-launch support for edits and tweaks",
      ]}
      whoItsFor={[
        "Businesses with no website or a website that looks like it was built in 2015",
        "Companies that tried Wix or Squarespace and outgrew it",
        "Anyone who's embarrassed to hand out their URL",
        "Businesses where the website doesn't match the quality of the work they do",
      ]}
      showroomLink={{
        href: "/showroom/website",
        label: "Try the Website Generator",
      }}
    />
  );
}
