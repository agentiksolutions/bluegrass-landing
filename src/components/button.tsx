import Link from "next/link";

type Variant = "primary" | "secondary" | "dark";

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
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-block whitespace-nowrap px-6 py-3.5 rounded font-display text-[15px] font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${variants[variant]} ${className}`;

  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
