import Link from "next/link";

type Variant = "primary" | "secondary" | "dark" | "outline-dark";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue-dark",
  secondary: "bg-transparent text-ink border border-ink/25 hover:border-ink",
  dark: "bg-blue text-white hover:bg-blue-dark",
  "outline-dark": "bg-transparent text-night-text border border-night-text/30 hover:border-night-text",
};

/** A square-cornered button whose arrow slides on hover. */
export default function Button({ href, children, variant = "primary", className = "", external = false }: ButtonProps) {
  const classes = `group inline-flex items-center gap-3 whitespace-nowrap rounded-[3px] px-6 py-3.5 font-display text-[15px] font-semibold transition-colors duration-200 ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );

  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
