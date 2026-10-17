import type { Metadata } from "next";
import { playfair, dmSans } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import CookieConsent from "@/components/cookie-consent";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body text-graphite bg-warm-white">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingCTA />
        {/* GA4 loads only after the visitor accepts cookies. */}
        <CookieConsent />
      </body>
    </html>
  );
}
