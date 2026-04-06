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
  primary:
    "bg-emerald text-warm-white hover:bg-sage",
  secondary:
    "bg-transparent text-graphite border border-graphite/10 hover:border-graphite",
  dark:
    "bg-graphite text-warm-white hover:bg-emerald",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-block px-8 py-4 rounded text-[15px] font-semibold transition-all duration-200 ${variants[variant]} ${className}`;

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
