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

// The consent card, after the large-company pattern in docs/v2-references.md: a small card in the
// bottom-left corner on desktop (clear of the hero button on the right; under the header on phones,
// where a bottom card would cover the hero button), "Accept all" and "Reject all" at the same size,
// and a separate preferences window (a native modal <dialog>) with Necessary (always on) and
// Analytics (a switch). A short saved message follows a choice, and the footer's "Cookie settings"
// link reopens the preferences. GA loads only after Accept, exactly as before.
export default function CookieConsent() {
  // null until mounted, so the server render and first client render match.
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [saved, setSaved] = useState(false);
  const card = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
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
    if (open && !prefs) card.current?.focus();
    const d = dialog.current;
    if (!d) return;
    if (open && prefs && !d.open) d.showModal();
    if (!(open && prefs) && d.open) d.close();
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

  // Closing the preferences window without saving: back to the card on a first visit, otherwise away.
  const closePrefs = () => {
    setPrefs(false);
    if (choice === null) return;
    setOpen(false);
    returnTo.current?.focus();
    returnTo.current = null;
  };

  const base =
    "inline-flex min-h-[44px] items-center justify-center rounded-[3px] border border-blue px-5 font-display text-[14px] font-semibold transition-colors duration-200 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";
  const btn = `${base} bg-blue text-white hover:border-blue-dark hover:bg-blue-dark`;
  const outlineBtn = `${base} bg-white text-blue hover:bg-tint`;
  const textBtn =
    "font-display text-[14px] font-semibold text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

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

      {open && !prefs && (
        <section
          ref={card}
          tabIndex={-1}
          aria-labelledby="cookie-title"
          className="fixed inset-x-3 top-[72px] z-30 rounded-[6px] border border-line bg-white p-5 text-ink shadow-[0_12px_40px_rgba(22,27,34,0.22)] outline-hidden motion-safe:animate-[cookie-in_0.35s_ease-out] md:bottom-6 md:left-6 md:right-auto md:top-auto md:z-50 md:w-[400px] md:p-6"
        >
          <h2 id="cookie-title" className="font-display text-[16px] font-semibold">
            Cookies on this site
          </h2>
          <p className="mt-2 font-display text-[14px] leading-relaxed text-body">
            We use analytics cookies to count visits and see which pages people read. They stay off unless you accept.{" "}
            <Link href="/privacy" className="text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue">
              Privacy notice
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" className={btn} onClick={() => decide("granted")}>
              Accept all
            </button>
            <button type="button" className={outlineBtn} onClick={() => decide("denied")}>
              Reject all
            </button>
          </div>
          <button type="button" className={`${textBtn} mt-4`} onClick={() => setPrefs(true)}>
            Manage preferences
          </button>
        </section>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="cookie-prefs-title"
        onCancel={(e) => {
          e.preventDefault();
          closePrefs();
        }}
        className="w-[calc(100%-32px)] max-w-[520px] rounded-[6px] border border-line bg-white p-0 text-ink shadow-[0_24px_64px_rgba(22,27,34,0.3)] backdrop:bg-ink/60"
      >
        {open && prefs && (
          <div className="p-6 md:p-8">
            <h2 id="cookie-prefs-title" className="font-display text-[20px] font-semibold">
              Cookie preferences
            </h2>
            <p className="mt-2 font-display text-[14px] leading-relaxed text-body">
              Choose which cookies this site may use. You can change this at any time from Cookie settings in the footer.
            </p>
            <ul className="mt-5 divide-y divide-line border-y border-line font-display">
              <li className="flex items-start justify-between gap-6 py-4">
                <div>
                  <p className="text-[14px] font-semibold">Necessary</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-body">Remembers your cookie choice in this browser.</p>
                </div>
                <span className="shrink-0 pt-0.5 text-[13px] text-muted">Always on</span>
              </li>
              <li className="flex items-start justify-between gap-6 py-4">
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
                  className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-[3px] border transition-colors duration-200 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                    analytics ? "border-blue bg-blue" : "border-line bg-band"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-[3px] h-4 w-4 rounded-[2px] bg-white shadow-sm transition-[left] duration-200 ${analytics ? "left-[23px]" : "left-[3px]"}`}
                  />
                </button>
              </li>
            </ul>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" className={outlineBtn} onClick={closePrefs}>
                Cancel
              </button>
              <button type="button" className={btn} onClick={() => decide(analytics ? "granted" : "denied")}>
                Save preferences
              </button>
            </div>
          </div>
        )}
      </dialog>

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
