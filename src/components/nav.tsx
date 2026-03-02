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
        scrolled
          ? "bg-warm-white/[0.97] backdrop-blur-[16px] border-b border-graphite/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Link
        href="/"
        className="font-display text-xl font-bold text-graphite tracking-tight"
      >
        Bluegrass <span className="text-emerald">Advisory</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex gap-8 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] font-medium tracking-wide transition-opacity duration-200 ${
              pathname === link.href
                ? "text-graphite opacity-100"
                : "text-graphite opacity-50 hover:opacity-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="bg-graphite text-warm-white px-5 py-2.5 rounded text-[13px] font-semibold hover:bg-emerald transition-colors duration-200"
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
          className={`w-5 h-0.5 bg-graphite transition-transform duration-200 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-5 h-0.5 bg-graphite transition-opacity duration-200 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-5 h-0.5 bg-graphite transition-transform duration-200 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
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
