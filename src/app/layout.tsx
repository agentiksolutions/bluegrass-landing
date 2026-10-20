import type { Metadata } from "next";
import { hanken, newsreader } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${hanken.variable} ${newsreader.variable}`}>
      <body className="font-body text-ink bg-white">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* GA4 loads only after the visitor accepts cookies. */}
        <CookieConsent />
      </body>
    </html>
  );
}
