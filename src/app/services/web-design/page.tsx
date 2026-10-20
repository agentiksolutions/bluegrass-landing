import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = pageMeta({
  title: "Web Design & Development",
  description:
    "A website comes with Business AI Setup Professional and Custom: a one-page site or a full site, with the domain and hosting in your own accounts. Lexington, KY.",
  path: "/services/web-design",
});

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      image={{ src: "/images/scenes/shop-website.webp", alt: "A shop owner after closing, checking a website on a laptop at the counter" }}
      title="A website built for your business."
      subtitle="A website comes with Business AI Setup Professional and Custom. Professional includes a one-page website. Custom includes a full website."
      deliverables={[
        "Professional: a one-page website",
        "Professional: a domain and hosting in your own accounts",
        "Custom: a full website",
        "Custom: a dashboard or app, with a database if it needs one",
        "Both: Claude set up for your business and training for your people",
        "The Support plan fixes a broken website",
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
          "A website included with Business AI Setup Professional (one-page website, domain and hosting in your own accounts) and Custom (full website).",
      }}
    />
  );
}
