"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const GA_ID = "G-YKB8RMQ7LS";
const STORAGE_KEY = "bag-cookie-consent";
const OPEN_EVENT = "bag:cookie-settings";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
}

// GA sets _ga cookies on the registrable domain, so try every domain form.
function clearGaCookies() {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", host, `.${host}`, `.${parts.slice(-2).join(".")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    });
  });
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}

export default function CookieConsent() {
  // null until mounted, so the server render and first client render match.
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const banner = useRef<HTMLElement>(null);

  useEffect(() => {
    const stored = readChoice();
    setChoice(stored);
    setOpen(stored === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (open) banner.current?.focus();
  }, [open]);

  const decide = (next: Choice) => {
    saveChoice(next);
    setChoice(next);
    setOpen(false);
    if (next === "denied") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
    }
  };

  const btn =
    "px-5 py-2.5 rounded-sm text-[14px] font-semibold border border-warm-white/40 text-warm-white hover:bg-warm-white hover:text-graphite transition-colors duration-200 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-white";

  return (
    <>
      {choice === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('consent','update',{analytics_storage:'granted'});gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {open && (
        <section
          ref={banner}
          tabIndex={-1}
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 bg-graphite text-warm-white border-t border-[#2a2a2a] px-4 py-5 md:px-12 outline-hidden"
        >
          <div className="max-w-content mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <p className="text-[14px] leading-relaxed text-[#bbb] flex-1">
              We use Google Analytics cookies to count visits and see which
              pages people read. They stay off unless you accept.{" "}
              <Link href="/privacy" className="underline text-warm-white hover:text-sage">
                Privacy notice
              </Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button type="button" className={btn} onClick={() => decide("granted")}>
                Accept
              </button>
              <button type="button" className={btn} onClick={() => decide("denied")}>
                Decline
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
