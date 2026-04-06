"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Services", href: "/services" },
  { label: "Showroom", href: "/showroom" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[68px] px-6 md:px-12 flex justify-between items-center ${
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-warm-white/[0.97] backdrop-blur-[16px] border-b border-graphite/[0.06]"
      }`}
    >
      <Link
        href="/"
        className={`font-display text-xl font-bold tracking-tight transition-colors duration-300 ${
          transparent ? "text-warm-white" : "text-graphite"
        }`}
      >
        Bluegrass <span className={transparent ? "text-sage" : "text-emerald"}>Advisory</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex gap-8 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] font-medium tracking-wide transition-all duration-300 ${
              transparent
                ? pathname === link.href
                  ? "text-warm-white opacity-100"
                  : "text-warm-white/60 hover:text-warm-white"
                : pathname === link.href
                  ? "text-graphite opacity-100"
                  : "text-graphite opacity-50 hover:opacity-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="tel:+18593143051"
          className={`text-[13px] font-medium tracking-wide transition-all duration-300 ${
            transparent
              ? "text-warm-white/60 hover:text-warm-white"
              : "text-graphite opacity-50 hover:opacity-100"
          }`}
          aria-label="Call (859) 314-3051"
        >
          (859) 314-3051
        </a>
        <Link
          href="/contact"
          className={`px-5 py-2.5 rounded text-[13px] font-semibold transition-colors duration-200 ${
            transparent
              ? "bg-warm-white/10 text-warm-white backdrop-blur-sm border border-warm-white/20 hover:bg-warm-white/20"
              : "bg-graphite text-warm-white hover:bg-emerald"
          }`}
        >
          Let&apos;s Talk
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`w-5 h-0.5 transition-all duration-200 ${
            transparent ? "bg-warm-white" : "bg-graphite"
          } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`w-5 h-0.5 transition-all duration-200 ${
            transparent ? "bg-warm-white" : "bg-graphite"
          } ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`w-5 h-0.5 transition-all duration-200 ${
            transparent ? "bg-warm-white" : "bg-graphite"
          } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[68px] left-0 right-0 bg-warm-white border-b border-graphite/10 shadow-lg md:hidden">
          <div className="flex flex-col py-4 px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium text-graphite/70 hover:text-graphite transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+18593143051"
              className="py-3 text-sm font-medium text-emerald hover:text-sage transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
              </svg>
              (859) 314-3051
            </a>
            <Link
              href="/contact"
              className="mt-3 bg-graphite text-warm-white px-5 py-3 rounded text-sm font-semibold text-center hover:bg-emerald transition-colors"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
