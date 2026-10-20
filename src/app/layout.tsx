import type { Metadata } from "next";
import { hanken, newsreader } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";
import SmoothScroll from "@/components/v2/smooth-scroll";
import PageMotion from "@/components/v2/page-motion";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

// Runs before first paint: marks that JavaScript is on (so headline words can wait behind their
// masks), turns motion off for visitors who asked for less, and shows everything after four
// seconds if the page script never arrives.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion-off');setTimeout(function(){d.classList.add('rv-done')},4000)})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${hanken.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className="bg-white font-body text-ink">
        <a
          href="#main"
          className="sr-only z-[100] rounded-[3px] bg-blue px-4 py-2 font-display text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <PageMotion />
        <Footer />
        {/* GA4 loads only after the visitor accepts cookies. */}
        <CookieConsent />
      </body>
    </html>
  );
}
