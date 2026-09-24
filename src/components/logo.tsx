/* eslint-disable @next/next/no-img-element */
// The one place the logo lives: the official star-only lockup (Grok concept 1, picked by Phil
// 2026-09-24), copied from Brand/logo-2026-09-23/official/logo-lockup-small.svg (firm repo PR #27,
// branch overnight/logo). Header and footer
// are under the 150 px height where the node network reads, so both use this star-only file.
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
