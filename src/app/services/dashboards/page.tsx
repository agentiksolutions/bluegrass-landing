import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";
import { photos } from "@/lib/photos";
import DataToDashboard from "@/components/v2/data-to-dashboard";

export const metadata: Metadata = pageMeta({
  title: "Dashboards & Data",
  description:
    "Custom business dashboards that pull your data into one screen. Real-time KPIs, automated reports, multi-location views. Lexington, Kentucky.",
  path: "/services/dashboards",
});

export default function DashboardsPage() {
  return (
    <ServicePageTemplate
      shot={photos.portal}
      feature={<DataToDashboard title="What a dashboard build looks like." />}
      title="Your numbers, in one place."
      subtitle="We build dashboards that pull your data from the apps you already use, update automatically, and show the numbers behind the decisions you make."
      deliverables={[
        "Custom dashboard design based on your actual KPIs",
        "Real-time data connections to your existing systems",
        "Automated reports: daily, weekly, or on demand",
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
        "Anyone whose data sits in several apps that never show it together",
      ]}
      showroomLink={{
        href: "/showroom/dashboard",
        label: "Try the Dashboard Demo",
      }}
      relatedPosts={[
        {
          href: "/work/restaurant-franchisee",
          title: "Three stores, one manager portal",
          category: "Case study",
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
