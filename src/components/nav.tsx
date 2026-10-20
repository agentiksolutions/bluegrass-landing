"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { setScrollLocked } from "./v2/smooth-scroll";
import { BOOKING_URL, PHONE, PHONE_HREF } from "@/lib/site";

const links = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Academy", href: "/academy" },
  { label: "Blog", href: "/insights" },
];

type Tone = "top" | "dark" | "light";

/**
 * The header reads whatever section sits under it. Night sections carry data-nav="dark".
 * At the very top of a night hero the header has no fill, so the hero runs to the top edge.
 */
export default function Nav() {
  const pathname = usePathname();
  const [tone, setTone] = useState<Tone>("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const probe = 36;
      const dark = Array.from(document.querySelectorAll<HTMLElement>("[data-nav='dark']")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      setTone(dark ? (window.scrollY < 24 ? "top" : "dark") : "light");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onDark = tone !== "light" || open;
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 font-display transition-colors duration-300 ${
          open ? "bg-night" : tone === "top" ? "bg-transparent" : tone === "dark" ? "bg-night/95" : "bg-white/95 border-b border-line"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-4 md:px-10 lg:h-[72px]">
          <Link href="/" aria-label="Bluegrass Advisory Group, home" className="relative shrink-0">
            <span className={`block transition-opacity duration-300 ${onDark ? "opacity-0" : "opacity-100"}`}>
              <Logo height={40} className="h-[34px] w-auto sm:h-[40px]" />
            </span>
            <span aria-hidden="true" className={`absolute inset-0 transition-opacity duration-300 ${onDark ? "opacity-100" : "opacity-0"}`}>
              <Logo height={40} tone="dark" className="h-[34px] w-auto sm:h-[40px]" />
            </span>
          </Link>

          <nav aria-label="Main" className={`hidden items-center gap-8 text-[15px] font-medium lg:flex ${onDark ? "text-night-text" : "text-ink"}`}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative whitespace-nowrap py-2 ${active(l.href) ? (onDark ? "text-night-blue" : "text-blue") : ""}`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    onDark ? "bg-night-blue" : "bg-blue"
                  } ${active(l.href) ? "scale-x-100" : ""}`}
                />
              </Link>
            ))}
            <a href={PHONE_HREF} className="whitespace-nowrap py-2 opacity-80 hover:opacity-100">
              {PHONE}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-[3px] bg-blue px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-blue-dark"
            >
              Book a call
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-6 transition-transform duration-300 ${onDark ? "bg-night-text" : "bg-ink"} ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-6 transition-transform duration-300 ${onDark ? "bg-night-text" : "bg-ink"} ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Phone and tablet menu: a night panel that wipes down from the header. */}
      <div
        id="site-menu"
        className={`night fixed inset-0 z-40 flex flex-col justify-between bg-night px-6 pb-10 pt-28 font-display text-night-text transition-[clip-path,visibility] duration-700 ease-out lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Menu">
          <ul>
            {[...links, { label: "Contact", href: "/contact" }].map((l, i) => (
              <li key={l.href} className="border-b border-night-line">
                <Link
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  className={`block py-4 text-[34px] font-light leading-none tracking-tight transition-all duration-700 ease-out ${
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-1 text-[17px] text-night-body">
          <a href={PHONE_HREF} tabIndex={open ? 0 : -1} className="block">
            {PHONE}
          </a>
          <p>Lexington, Kentucky</p>
        </div>
      </div>
    </>
  );
}
