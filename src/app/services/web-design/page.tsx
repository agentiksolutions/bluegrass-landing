import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = pageMeta({
  title: "Web Design & Development",
  description:
    "Custom web design for Kentucky businesses. No templates. Professional sites built for speed, SEO, and conversions. Based in Lexington, KY.",
  path: "/services/web-design",
});

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      label="Web Design & Development"
      title="Your business deserves a real website."
      subtitle="Not a template with your logo slapped on it. A fully custom site designed around your business, your customers, and your goals. Built to load fast, look sharp, and convert visitors into calls."
      deliverables={[
        "Custom design, built for your business",
        "Mobile-responsive layout that works on every device",
        "SEO foundation: proper structure, meta tags, page speed optimization",
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
      relatedPosts={[
        {
          href: "/work/pfsa",
          title: "A back office for a Lexington nonprofit",
          category: "Case study",
        },
      ]}
      serviceJsonLd={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Web Design & Development",
        provider: {
          "@type": "LocalBusiness",
          name: "Bluegrass Advisory Group",
          url: "https://bluegrassadvisorygroup.com",
        },
        areaServed: "Central Kentucky",
        description:
          "Custom web design and development for businesses. Professional sites built for speed, SEO, and conversions.",
      }}
    />
  );
}
