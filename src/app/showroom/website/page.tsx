import type { Metadata } from "next";
import WebsiteGeneratorPage from "./website-client";

export const metadata: Metadata = {
  title: "Website Generator",
  description:
    "See a live preview of what a professional website could look like for your business. Pick a style, describe what you do, and watch it build.",
  alternates: { canonical: "/showroom/website" },
};

export default WebsiteGeneratorPage;
