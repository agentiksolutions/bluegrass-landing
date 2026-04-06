"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on /contact page since user is already there
  if (pathname === "/contact") return null;

  return (
    <Link
      href="https://calendly.com/phil-bluegrassadvisorygroup/30min"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-emerald text-warm-white rounded-full shadow-lg shadow-emerald/25 transition-all duration-300 hover:bg-sage hover:shadow-xl hover:shadow-sage/30 hover:-translate-y-0.5 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      } px-5 py-3.5 md:px-6 md:py-3.5`}
      aria-label="Schedule a Call"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
          clipRule="evenodd"
        />
      </svg>
      <span className="hidden md:inline text-[14px] font-semibold tracking-wide">
        Schedule a Call
      </span>
    </Link>
  );
}
