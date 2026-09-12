import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";

// contact/page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Book a free 30-minute intro call with Bluegrass Advisory Group. Tell us what you want to improve and we will scope what makes sense. Lexington, Kentucky.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
