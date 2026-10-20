/* eslint-disable @next/next/no-img-element */
// The official star-only lockup (brand decision 13: the header and footer are under the 150 px
// height where the node network reads). Files copied from
// Brand/logo-2026-09-23/official/logo-lockup-small.svg and logo-lockup-small-white.svg.
const RATIO = 1286.01 / 244.8; // viewBox width / height of logo.svg

export default function Logo({
  height = 26,
  tone = "light",
  className = "",
}: {
  height?: number;
  /** "light" for a white or limestone background, "dark" for a night background. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <img
      src={tone === "dark" ? "/brand/logo-white.svg" : "/brand/logo.svg"}
      alt="Bluegrass Advisory Group"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
    />
  );
}
