import type { Metadata } from "next";
import { playfair, dmSans } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

const GA_ID = "G-YKB8RMQ7LS";

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

        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
