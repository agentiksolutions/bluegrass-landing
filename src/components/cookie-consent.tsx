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
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}

// The consent bar, after the patterns in docs/v2-references.md (GOV.UK, Stripe, Locomotive):
// a slim bar (along the bottom on desktop, clear of the hero buttons; under the header on phones,
// where a bottom bar would cover the hero button), Accept and Reject at equal weight, a preferences view with
// Necessary (always on) and Analytics (a switch), a short saved message, and the footer's
// "Cookie settings" link to reopen it. GA loads only after Accept, exactly as before.
export default function CookieConsent() {
  // null until mounted, so the server render and first client render match.
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [saved, setSaved] = useState(false);
  const card = useRef<HTMLElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const stored = readChoice();
    setChoice(stored);
    setOpen(stored === null);
    const reopen = () => {
      returnTo.current = document.activeElement as HTMLElement | null;
      const now = readChoice();
      setAnalytics(now === "granted");
      setPrefs(now !== null);
      setSaved(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (open) card.current?.focus();
  }, [open, prefs]);

  useEffect(() => {
    if (!saved) return;
    const t = window.setTimeout(() => setSaved(false), 4000);
    return () => window.clearTimeout(t);
  }, [saved]);

  const decide = (next: Choice) => {
    saveChoice(next);
    setChoice(next);
    setOpen(false);
    setPrefs(false);
    setSaved(true);
    if (next === "denied") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
    }
    returnTo.current?.focus();
    returnTo.current = null;
  };

  const btn =
    "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-[3px] bg-blue px-4 md:flex-none md:px-6 font-display text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";
  const textBtn =
    "font-display text-[14px] font-semibold text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('consent','update',{analytics_storage:'granted'});gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {open && (
        <section
          ref={card}
          tabIndex={-1}
          aria-labelledby="cookie-title"
          onKeyDown={(e) => {
            if (e.key === "Escape" && prefs && choice === null) setPrefs(false);
          }}
          className="fixed inset-x-0 top-16 z-30 border-b border-line bg-white text-ink shadow-[0_10px_40px_rgba(22,27,34,0.14)] outline-none motion-safe:animate-[cookie-in_0.35s_ease-out] md:bottom-0 md:top-auto md:z-50 md:border-b-0 md:border-t md:shadow-[0_-10px_40px_rgba(22,27,34,0.14)]"
        >
          <div className="mx-auto max-w-page-pad px-4 py-3 md:px-10 md:py-4">
            {!prefs ? (
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
                <p className="flex-1 font-display text-[13px] leading-snug text-body md:text-[14px]">
                  <span id="cookie-title" className="font-semibold text-ink">
                    Cookies.{" "}
                  </span>
                  <span className="md:hidden">Analytics cookies stay off unless you accept.</span>
                  <span className="hidden md:inline">
                    We use analytics cookies to count visits and see which pages people read. They stay off unless you
                    accept.
                  </span>{" "}
                  <Link href="/privacy" className="hidden underline decoration-blue/40 underline-offset-4 hover:decoration-blue md:inline">
                    Privacy notice
                  </Link>
                </p>
                <div className="flex items-center gap-2">
                  <button type="button" className={btn} onClick={() => decide("granted")}>
                    Accept
                  </button>
                  <button type="button" className={btn} onClick={() => decide("denied")}>
                    Reject
                  </button>
                  <button type="button" className={`${textBtn} ml-2 shrink-0`} onClick={() => setPrefs(true)}>
                    Manage preferences
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
                <h2 id="cookie-title" className="font-display text-[15px] font-semibold md:w-[180px] md:shrink-0">
                  Cookie preferences
                </h2>
                <ul className="flex flex-1 flex-col divide-y divide-line font-display md:flex-row md:gap-8 md:divide-y-0">
                  <li className="flex flex-1 items-start justify-between gap-4 py-2.5 md:py-0">
                    <div>
                      <p className="text-[14px] font-semibold">Necessary</p>
                      <p className="mt-0.5 text-[13px] leading-snug text-body">Remembers your cookie choice in this browser.</p>
                    </div>
                    <span className="shrink-0 pt-0.5 text-[13px] text-muted">Always on</span>
                  </li>
                  <li className="flex flex-1 items-start justify-between gap-4 py-2.5 md:py-0">
                    <div>
                      <p id="analytics-label" className="text-[14px] font-semibold">
                        Analytics
                      </p>
                      <p id="analytics-desc" className="mt-0.5 text-[13px] leading-snug text-body">
                        Google Analytics counts visits and the pages people read.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={analytics}
                      aria-labelledby="analytics-label"
                      aria-describedby="analytics-desc"
                      onClick={() => setAnalytics((v) => !v)}
                      className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-[3px] border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                        analytics ? "border-blue bg-blue" : "border-line bg-band"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute top-[3px] h-4 w-4 rounded-[2px] bg-white shadow transition-[left] duration-200 ${analytics ? "left-[23px]" : "left-[3px]"}`}
                      />
                    </button>
                  </li>
                </ul>
                <div className="flex items-center gap-4">
                  <button type="button" className={`${btn} md:flex-none md:px-6`} onClick={() => decide(analytics ? "granted" : "denied")}>
                    Save preferences
                  </button>
                  {choice === null && (
                    <button type="button" className={textBtn} onClick={() => setPrefs(false)}>
                      Back
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <p role="status" className="sr-only">
        {saved ? "Your cookie settings were saved." : ""}
      </p>
      {saved && (
        <p
          aria-hidden="true"
          className="fixed bottom-5 left-5 z-50 rounded-[4px] bg-ink px-4 py-2.5 font-display text-[14px] text-white shadow-lg motion-safe:animate-[cookie-in_0.3s_ease-out]"
        >
          Your cookie settings were saved.
        </p>
      )}
    </>
  );
}
