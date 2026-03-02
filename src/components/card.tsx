interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-[#FDFCFA] rounded-lg p-9 border border-[#e8e5e0] transition-all duration-300 ${
        hover
          ? "hover:border-emerald hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] hover:bg-white"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
