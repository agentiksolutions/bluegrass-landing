import { Delaunay } from "d3-delaunay";
import { MARK } from "@/lib/mark-geometry";

// The hero web: points spaced evenly across Kentucky (Poisson-disc sampling) plus a dense row
// along the true state border, joined by a Delaunay triangulation and clipped to the outline so
// no strand leaves the state. Pure and seeded, so every visit builds the same web.
// Coordinates are in the logo's own drawing units (viewBox 980 x 440).

export const STAR: [number, number] = [647.09, 183.35]; // Lexington

export type Web = {
  x: Float32Array;
  y: Float32Array;
  boundary: Uint8Array; // 1 for points on the state border
  depth: Uint16Array; // hops from Lexington along the web
  maxDepth: number;
  edges: Uint32Array; // pairs of point indexes, the nearer-to-Lexington end first
  length: Float32Array; // per edge
  maxLength: number;
  neighbours: number[][];
  outline: [number, number][];
};

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

export const OUTLINE: [number, number][] = (() => {
  const n = MARK.state.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const pts: [number, number][] = [];
  for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]]);
  return pts;
})();

function inside(x: number, y: number, poly: [number, number][]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/** `spacing` is the minimum gap between interior points, in drawing units. */
export function buildWeb(spacing: number): Web {
  const r = rng(1545014);
  const px: number[] = [];
  const py: number[] = [];
  const edge: number[] = [];

  // 1. The border, resampled by arc length at half the interior spacing.
  const step = spacing / 2;
  let carry = 0;
  for (let i = 0; i < OUTLINE.length; i++) {
    const [x0, y0] = OUTLINE[i];
    const [x1, y1] = OUTLINE[(i + 1) % OUTLINE.length];
    const len = Math.hypot(x1 - x0, y1 - y0);
    let d = carry;
    while (d < len) {
      px.push(x0 + ((x1 - x0) * d) / len);
      py.push(y0 + ((y1 - y0) * d) / len);
      edge.push(1);
      d += step;
    }
    carry = d - len;
  }

  // 2. Lexington, then Bridson's Poisson-disc fill of the interior.
  const cell = spacing / Math.SQRT2;
  const [minX, maxX] = [Math.min(...OUTLINE.map((p) => p[0])), Math.max(...OUTLINE.map((p) => p[0]))];
  const [minY, maxY] = [Math.min(...OUTLINE.map((p) => p[1])), Math.max(...OUTLINE.map((p) => p[1]))];
  const gw = Math.ceil((maxX - minX) / cell) + 1;
  const gh = Math.ceil((maxY - minY) / cell) + 1;
  const grid = new Int32Array(gw * gh).fill(-1);
  const gi = (x: number, y: number) => Math.floor((x - minX) / cell) + Math.floor((y - minY) / cell) * gw;
  const clear = (x: number, y: number, min: number) => {
    const cx = Math.floor((x - minX) / cell);
    const cy = Math.floor((y - minY) / cell);
    for (let yy = Math.max(0, cy - 2); yy <= Math.min(gh - 1, cy + 2); yy++)
      for (let xx = Math.max(0, cx - 2); xx <= Math.min(gw - 1, cx + 2); xx++) {
        const k = grid[xx + yy * gw];
        if (k >= 0 && Math.hypot(px[k] - x, py[k] - y) < min) return false;
      }
    return true;
  };
  // Keep interior points half a gap off the border so no triangle is a sliver.
  const offBorder = (x: number, y: number) => {
    for (let i = 0; i < px.length && edge[i]; i++) if (Math.hypot(px[i] - x, py[i] - y) < spacing * 0.55) return false;
    return true;
  };
  const borderCount = px.length;
  const add = (x: number, y: number) => {
    px.push(x);
    py.push(y);
    edge.push(0);
    grid[gi(x, y)] = px.length - 1;
    return px.length - 1;
  };
  const star = add(STAR[0], STAR[1]);
  const active = [star];
  while (active.length) {
    const a = active[(r() * active.length) | 0];
    let placed = false;
    for (let k = 0; k < 30; k++) {
      const ang = r() * Math.PI * 2;
      const rad = spacing * (1 + r());
      const x = px[a] + Math.cos(ang) * rad;
      const y = py[a] + Math.sin(ang) * rad;
      if (x < minX || x > maxX || y < minY || y > maxY) continue;
      if (!inside(x, y, OUTLINE) || !clear(x, y, spacing) || !offBorder(x, y)) continue;
      active.push(add(x, y));
      placed = true;
      break;
    }
    if (!placed) active.splice(active.indexOf(a), 1);
  }

  // 3. Delaunay, clipped: keep an edge only if points along it all fall inside the state.
  const n = px.length;
  const coords = new Float64Array(n * 2);
  for (let i = 0; i < n; i++) (coords[2 * i] = px[i]), (coords[2 * i + 1] = py[i]);
  const tri = new Delaunay(coords);
  const seen = new Set<number>();
  const pairs: [number, number][] = [];
  const t = tri.triangles;
  for (let e = 0; e < t.length; e++) {
    const a = t[e];
    const b = t[e % 3 === 2 ? e - 2 : e + 1];
    const key = a < b ? a * n + b : b * n + a;
    if (seen.has(key)) continue;
    seen.add(key);
    // Consecutive border points are the border itself; drawn as the outline, not as strands.
    if (edge[a] && edge[b]) {
      const gap = Math.abs(a - b);
      if (gap === 1 || gap === borderCount - 1) continue;
    }
    let ok = true;
    for (const f of [0.2, 0.35, 0.5, 0.65, 0.8]) {
      if (!inside(px[a] + (px[b] - px[a]) * f, py[a] + (py[b] - py[a]) * f, OUTLINE)) {
        ok = false;
        break;
      }
    }
    if (ok) pairs.push([a, b]);
  }

  // 4. Hops from Lexington, so the web can spin out from the star.
  const neighbours: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of pairs) neighbours[a].push(b), neighbours[b].push(a);
  const depth = new Uint16Array(n).fill(65535);
  depth[star] = 0;
  const queue = [star];
  for (let q = 0; q < queue.length; q++)
    for (const m of neighbours[queue[q]])
      if (depth[m] === 65535) (depth[m] = depth[queue[q]] + 1), queue.push(m);
  let maxDepth = 0;
  depth.forEach((d) => d !== 65535 && d > maxDepth && (maxDepth = d));
  depth.forEach((d, i) => d === 65535 && (depth[i] = maxDepth));

  const edges = new Uint32Array(pairs.length * 2);
  const length = new Float32Array(pairs.length);
  let maxLength = 0;
  pairs.forEach(([a, b], i) => {
    const [s, e] = depth[a] <= depth[b] ? [a, b] : [b, a];
    edges[2 * i] = s;
    edges[2 * i + 1] = e;
    length[i] = Math.hypot(px[a] - px[b], py[a] - py[b]);
    if (length[i] > maxLength) maxLength = length[i];
  });

  return {
    x: Float32Array.from(px),
    y: Float32Array.from(py),
    boundary: Uint8Array.from(edge),
    depth,
    maxDepth,
    edges,
    length,
    maxLength,
    neighbours,
    outline: OUTLINE,
  };
}
