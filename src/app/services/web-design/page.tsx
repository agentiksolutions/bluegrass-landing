import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";
import { photos } from "@/lib/photos";

export const metadata: Metadata = pageMeta({
  title: "Web Design & Development",
  description:
    "A website comes with Business AI Setup Professional and Custom: a one-page site or a full site, with the domain and hosting in your own accounts. Lexington, KY.",
  path: "/services/web-design",
});

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      shot={photos.pfsaSite}
      title="A website built for your business."
      subtitle="Included with Business AI Setup Professional and Custom."
      deliverables={[
        "Professional: a one-page site, domain and hosting in your accounts",
        "Custom: a full site, plus a dashboard or app if you need one",
        "Both: Claude set up and your team trained",
        "The Support plan fixes a broken site",
      ]}
      whoItsFor={[
        "Businesses with no site, or an outdated one",
        "Anyone who outgrew Wix or Squarespace",
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
