import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Terms of Service (draft)",
    description: "Draft terms of service for bluegrassadvisorygroup.com. Not yet in effect.",
    path: "/terms",
  }),
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPage file="terms" />;
}
