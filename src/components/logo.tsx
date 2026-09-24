/* eslint-disable @next/next/no-img-element */
// The one place the logo lives: lockup S2 with the star-only mark (F3), locked by Phil
// 2026-09-23 (Brand/BRAND-DECISIONS-2026-09-23.md). The final star-and-nodes mark is still
// being drawn; to swap, replace public/brand/logo.svg and, if the shape changes, RATIO below.
const RATIO = 1286.01 / 244.8; // viewBox width / height of logo.svg

export default function Logo({ height = 26, className = "" }: { height?: number; className?: string }) {
  return (
    <img
      src="/brand/logo.svg"
      alt="Bluegrass Advisory Group"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
    />
  );
}
