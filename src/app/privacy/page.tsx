import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Privacy Notice (draft)",
    description: "Draft privacy notice for bluegrassadvisorygroup.com. Not yet in effect.",
    path: "/privacy",
  }),
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalPage file="privacy" />;
}
