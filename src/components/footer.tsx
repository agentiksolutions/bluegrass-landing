import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-consent";
import Logo from "./logo";
import { EMAIL, LINKEDIN, PHONE, PHONE_HREF } from "@/lib/site";

const columns = [
  {
    title: "Firm",
    links: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Academy", href: "/academy" },
      { label: "Showroom", href: "/showroom" },
      { label: "Blog", href: "/insights" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "AI for hospitality", href: "/ai-for-hospitality" },
      { label: "Multi-location dashboards", href: "/multi-location-dashboards" },
      { label: "AI for Kentucky small businesses", href: "/ai-for-small-business-kentucky" },
      { label: "AI consulting in Lexington", href: "/ai-consulting-lexington-ky" },
      { label: "What AI consulting costs", href: "/ai-consulting-cost" },
      { label: "AI tools we build", href: "/ai-tools-we-build" },
      { label: "AI assessment", href: "/ai-assessment" },
    ],
  },
];

export default function Footer() {
  return (
    <footer data-nav="dark" className="night border-t border-night-line bg-night px-4 pb-10 pt-16 font-display text-night-text md:px-10">
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_repeat(3,minmax(0,2fr))]">
          <div>
            <Logo height={48} tone="dark" className="h-auto max-w-full" />
            <div className="mt-6 space-y-1.5 text-[15px] text-night-body">
              <p>Bluegrass Advisory Group, LLC</p>
              <p>Lexington, Kentucky</p>
              <a href={PHONE_HREF} className="block hover:text-night-text">
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="block break-all hover:text-night-text">
                {EMAIL}
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="block hover:text-night-text">
                LinkedIn
              </a>
            </div>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="text-[13px] font-semibold text-night-blue">{c.title}</h2>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-night-body transition-colors hover:text-night-text">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-night-line pt-6 text-[13.5px] text-night-body md:flex-row md:items-center md:justify-between">
          <span>&copy; {new Date().getFullYear()} Bluegrass Advisory Group, LLC</span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="underline underline-offset-2 hover:text-night-text">
              Privacy Notice
            </Link>
            <CookieSettingsButton className="underline underline-offset-2 hover:text-night-text" />
          </span>
        </div>
        <p className="mt-3 text-[13.5px] text-night-body">
          Bluegrass Advisory Group is independent and not affiliated with or endorsed by Five Guys.
        </p>
      </div>
    </footer>
  );
}
