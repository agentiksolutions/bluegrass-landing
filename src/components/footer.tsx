import Link from "next/link";
import Logo from "./logo";
import { EMAIL, LINKEDIN, PHONE, PHONE_HREF } from "@/lib/site";

const siteLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Showroom", href: "/showroom" },
  { label: "Academy", href: "/academy" },
  { label: "Blog", href: "/insights" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-band border-t border-line px-4 md:px-10 pt-12 pb-8 font-display text-ink">
      <div className="max-w-[1160px] mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div>
            <Logo height={52} className="max-w-full h-auto" />
            <p className="mt-4 text-[15px]">Bluegrass Advisory Group, LLC</p>
            <p className="text-[15px] text-muted">Lexington, Kentucky</p>
          </div>
          <div className="text-[15px] space-y-1.5">
            <a href={PHONE_HREF} className="block hover:text-blue">
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="block hover:text-blue">
              {EMAIL}
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="block hover:text-blue">
              LinkedIn
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {siteLinks.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-blue">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-5 border-t border-line flex flex-col md:flex-row md:justify-between gap-2 text-[13.5px] text-muted">
          <span>&copy; {new Date().getFullYear()} Bluegrass Advisory Group, LLC</span>
          <span className="flex gap-5">
            <Link href="/privacy" className="hover:text-blue underline underline-offset-2">
              Privacy Notice
            </Link>
            <Link href="/terms" className="hover:text-blue underline underline-offset-2">
              Terms of Service
            </Link>
          </span>
        </div>
        <p className="mt-3 text-[13.5px] text-muted">
          Bluegrass Advisory Group is independent and not affiliated with or endorsed by Five Guys.
        </p>
      </div>
    </footer>
  );
}
