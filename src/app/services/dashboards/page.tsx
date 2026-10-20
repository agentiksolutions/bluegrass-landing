import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import ServicePageTemplate from "@/components/service-page-template";
import DataToDashboard from "@/components/v2/data-to-dashboard";
import { LocationsPanel } from "@/components/v2/panels";

export const metadata: Metadata = pageMeta({
  title: "Dashboards & Data",
  description:
    "Custom business dashboards that pull your data into one screen. Real-time KPIs, automated reports, multi-location views. Lexington, Kentucky.",
  path: "/services/dashboards",
});

export default function DashboardsPage() {
  return (
    <ServicePageTemplate
      visual={<LocationsPanel />}
      feature={<DataToDashboard title="What a dashboard build looks like." />}
      title="Your numbers, in one place."
      subtitle="Data from the apps you already use, updated automatically."
      deliverables={[
        "Built around the numbers you manage to",
        "Reports daily, weekly or on demand",
        "Alerts when a number needs attention",
        "Locations side by side",
        "Works on your phone",
      ]}
      whoItsFor={[
        "Owners with more than one location",
        "Managers who build reports by hand",
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
