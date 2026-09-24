// A small plain label. It used to be an uppercase eyebrow on every section.
export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return <p className="font-display text-sm font-semibold text-muted mb-3">{children}</p>;
}
