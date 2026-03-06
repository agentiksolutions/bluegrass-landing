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
    "AI consulting Kentucky",
    "AI consulting Lexington KY",
    "business operations consulting",
    "small business AI",
    "web design Lexington KY",
    "dashboard development",
    "business automation Kentucky",
  ],
  authors: [{ name: "Phil Fifield", url: siteUrl }],
  creator: "Bluegrass Advisory Group",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Bluegrass Advisory Group",
    title: "Bluegrass Advisory Group — AI Integration & Business Operations",
    description:
      "We help businesses figure out AI. Web design, dashboards, AI integration, and operations consulting. Lexington, Kentucky.",
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
