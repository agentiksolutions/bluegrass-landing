import Link from "next/link";

const footerCols = [
  {
    title: "Services",
    items: [
      { label: "Web Design", href: "/services/web-design" },
      { label: "AI Integration", href: "/services/ai-integration" },
      { label: "Dashboards", href: "/services/dashboards" },
      { label: "Operations", href: "/services/operations" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Showroom", href: "/showroom" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    items: [
      {
        label: "phil@bluegrassadvisorygroup.com",
        href: "mailto:phil@bluegrassadvisorygroup.com",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-graphite pt-14 pb-7 px-6 md:px-12 text-stone">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-display text-lg text-warm-white mb-2.5">
              Bluegrass <span className="text-emerald">Advisory</span>
            </div>
            <p className="text-xs leading-relaxed text-[#555] max-w-[260px]">
              AI integration and business operations for companies ready to
              modernize.
            </p>
            <p className="text-xs text-[#444] mt-2.5">Lexington, Kentucky</p>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] font-semibold tracking-[1.5px] text-[#555] uppercase mb-3.5">
                {col.title}
              </div>
              {col.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-xs text-[#777] mb-2 hover:text-warm-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2a2a2a] pt-5 flex flex-col md:flex-row justify-between text-[11px] text-[#444] gap-2">
          <span>&copy; {new Date().getFullYear()} Bluegrass Advisory Group, LLC</span>
          <span>Business Operations &middot; AI Integration &middot; Lexington, KY</span>
        </div>
      </div>
    </footer>
  );
}
