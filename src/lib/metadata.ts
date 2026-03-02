import type { Metadata } from "next";

const siteUrl = "https://bluegrassadvisorygroup.com";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bluegrass Advisory Group — AI Integration & Business Operations",
    template: "%s | Bluegrass Advisory Group",
  },
  description:
    "We help businesses figure out AI. Web design, dashboards, AI integration, and operations consulting for companies ready to modernize. Based in Lexington, Kentucky.",
  keywords: [
    "AI consulting",
    "business operations",
    "web design",
    "dashboards",
    "Lexington Kentucky",
    "small business AI",
  ],
  authors: [{ name: "Phil Fifield", url: siteUrl }],
  creator: "Bluegrass Advisory Group",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Bluegrass Advisory Group",
    title: "Bluegrass Advisory Group — AI Integration & Business Operations",
    description:
      "We help businesses figure out AI. Web design, dashboards, AI integration, and operations consulting.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluegrass Advisory Group",
    description: "AI Integration & Business Operations — Lexington, KY",
  },
  robots: {
    index: true,
    follow: true,
  },
};
