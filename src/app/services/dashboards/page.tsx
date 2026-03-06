import type { Metadata } from "next";
import ServicePageTemplate from "@/components/service-page-template";

export const metadata: Metadata = {
  title: "Dashboards & Data",
  description:
    "Custom business dashboards that pull your data into one screen. Real-time KPIs, automated reports, multi-location views. Lexington, Kentucky.",
  alternates: { canonical: "/services/dashboards" },
};

export default function DashboardsPage() {
  return (
    <ServicePageTemplate
      label="Dashboards & Data"
      title="Your numbers, in one place."
      subtitle="Stop digging through five apps to figure out how your business is doing. We build dashboards that pull your data together, update automatically, and show you what matters — not just numbers, but decisions."
      deliverables={[
        "Custom dashboard design based on your actual KPIs",
        "Real-time data connections to your existing systems",
        "Automated reports — daily, weekly, or on-demand",
        "Alert system for metrics that need attention",
        "Multi-location comparison views",
        "Mobile-friendly so you can check numbers anywhere",
        "Role-based access for managers and owners",
        "Training for your team to read and use the data",
      ]}
      whoItsFor={[
        "Multi-location businesses who can't see all their numbers in one place",
        "Business owners still running on spreadsheets and gut instinct",
        "Managers who spend hours compiling reports manually",
        "Anyone who has data in five different apps and can't connect the dots",
      ]}
      showroomLink={{
        href: "/showroom/dashboard",
        label: "Try the Dashboard Demo",
      }}
      relatedPosts={[
        {
          href: "/insights/cut-12-hours-admin",
          title: "How We Cut 12 Hours of Weekly Admin Work Across Three Locations",
          category: "Case Study",
        },
      ]}
      serviceJsonLd={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Dashboard Development",
        provider: {
          "@type": "LocalBusiness",
          name: "Bluegrass Advisory Group",
          url: "https://bluegrassadvisorygroup.com",
        },
        areaServed: "Central Kentucky",
        description:
          "Custom business dashboard development. Real-time KPIs, automated reports, multi-location views, and mobile-friendly data visualization.",
      }}
    />
  );
}
