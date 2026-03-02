export default function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-xs font-semibold tracking-[2.5px] uppercase mb-3 ${
        light ? "text-sage" : "text-emerald"
      }`}
    >
      {children}
    </p>
  );
}
