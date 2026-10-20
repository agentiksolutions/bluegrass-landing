interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded p-8 border border-line transition-colors duration-150 ${
        hover ? "hover:border-blue" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
