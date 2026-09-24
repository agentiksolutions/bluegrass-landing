"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { BOOKING_URL } from "@/lib/site";

const links = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Academy", href: "/academy" },
  { label: "Blog", href: "/insights" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-band border-b border-line font-display">
      <div className="h-16 lg:h-[72px] px-4 md:px-10 flex justify-between items-center gap-4">
        <Link href="/" aria-label="Bluegrass Advisory Group, home" className="shrink-0">
          <Logo height={46} className="hidden sm:block" />
          <Logo height={38} className="sm:hidden" />
        </Link>

        <nav aria-label="Main" className="hidden lg:flex gap-7 items-center text-[15px] font-medium text-ink">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap hover:text-blue ${active(link.href) ? "text-blue" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <a href="tel:+18593143051" className="whitespace-nowrap hover:text-blue">
            (859) 314-3051
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-blue text-white hover:bg-blue-dark rounded px-3 py-2 sm:px-4 text-[14px] font-semibold"
          >
            Book a call
          </a>
          <button
            className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-ink transition-transform ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-ink ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-ink transition-transform ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="Main" className="lg:hidden border-t border-line bg-band px-4 pb-4 flex flex-col text-[16px] font-medium text-ink">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="py-3 border-b border-line">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="py-3 border-b border-line">
            Contact
          </Link>
          <a href="tel:+18593143051" className="py-3 text-blue">
            (859) 314-3051
          </a>
        </nav>
      )}
    </header>
  );
}
