import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = pageMeta({
  title: "Web Design & Development",
  description:
    "Custom web design for Kentucky businesses. Sites built to load fast, show up in search and get customers to call. Based in Lexington, KY.",
  path: "/services/web-design",
});

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      image={{ src: "/images/scenes/shop-website.webp", alt: "A shop owner after closing, checking a website on a laptop at the counter" }}
      title="A website built for your business."
      subtitle="A custom site designed around your business and your customers, built to load fast and turn visitors into calls."
      deliverables={[
        "Custom design, built for your business",
        "Mobile-responsive layout that works on every device",
        "SEO foundation: proper structure, meta tags, page speed optimization",
        "Contact forms, maps, and lead capture built in",
        "Hosting setup and domain configuration",
        "Google Business Profile and analytics integration",
        "Content writing for your key pages",
        "Support after launch for edits and changes",
      ]}
      whoItsFor={[
        "Businesses with no website or a website that looks like it was built in 2015",
        "Companies that tried Wix or Squarespace and outgrew it",
        "Anyone who hesitates to hand out their web address",
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
