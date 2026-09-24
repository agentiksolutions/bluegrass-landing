// Decorative node network for the blue band. The mark's network lives on the Kentucky outline;
// this one is deliberately abstract so it never reads as a second logo.
// ponytail: points are a jittered 8x3 grid, fixed so every build draws the same figure.
const POINTS = [
  [56, 64], [92, 198], [61, 345], [190, 61], [224, 218], [183, 328],
  [337, 79], [383, 173], [405, 368], [535, 67], [497, 171], [525, 314],
  [654, 45], [641, 198], [673, 361], [833, 68], [831, 210], [828, 327],
  [1024, 90], [1012, 212], [972, 324], [1124, 34], [1160, 194], [1166, 333],
];

// Join every node to its three nearest, de-duplicated.
const EDGES = Array.from(
  new Set(
    POINTS.flatMap(([x1, y1], a) =>
      POINTS.map(([x2, y2], b) => [Math.hypot(x1 - x2, y1 - y2), b])
        .filter(([, b]) => b !== a)
        .sort((p, q) => p[0] - q[0])
        .slice(0, 3)
        .map(([, b]) => `${Math.min(a, b as number)}-${Math.max(a, b as number)}`),
    ),
  ),
).map((k) => k.split("-").map(Number));

export default function NetworkBand({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="#FFFFFF" strokeWidth="1.1" opacity="0.28">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={POINTS[a][0]}
            y1={POINTS[a][1]}
            x2={POINTS[b][0]}
            y2={POINTS[b][1]}
          />
        ))}
      </g>
      <g fill="#FFFFFF" opacity="0.5">
        {POINTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
        ))}
      </g>
    </svg>
  );
}
