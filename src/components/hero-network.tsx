"use client";

import { useEffect, useRef, useState } from "react";
import { MARK } from "@/lib/mark-geometry";
import { buildWeb, OUTLINE, STAR, type Web } from "@/lib/kentucky-web";
import { COUNTY_ARCS, FAYETTE } from "@/lib/ky-counties";

// The home hero: Kentucky as a fine web of about 2,400 points that fills the state edge to edge
// (src/lib/kentucky-web.ts). On load the web spins out from Lexington strand by strand, the
// border closes and the star lights. Then the 120 county borders draw in once, outward from
// Fayette County, with a bright leading edge that settles faint (src/lib/ky-counties.ts).
// Energy runs through it all the time: fast streaks that fork at junctions, cascades that
// crack outward from Lexington every few seconds, and pulses racing along the county lines.
// The web sways slowly, leans toward the cursor, and tilts back and loosens on scroll. It is
// vector-drawn at the device pixel ratio, pauses off screen, and reduced motion gets a static
// SVG of the same web and counties.

const W = 980;
const H = 440;
const CX = W / 2;
const CY = H / 2;

const SILK = "#9DB6F5"; // UK blue hue, lifted for a dark page
const PALE = "#C9D8FB";
const STAR_FILL = "#F2F5FB";

// Load sequence, seconds.
const SPIN = [0.25, 3.0] as const; // strands spin out from Lexington
const CLOSE = [2.3, 3.4] as const; // the border closes
const IGNITE = 3.5; // the star lights

// Energy. Heads travel along strands and fork at junctions; strands and nodes they touch
// keep a heat value that jumps up on contact (fast attack) and decays (slow release).
const EDGE_DECAY = 0.3; // seconds; a struck strand snaps bright and is dark again in under a second
const NODE_DECAY = 0.16; // junction flashes snap on and die fast

// County borders: after the web assembles, the 120 counties draw in once, outward from Fayette,
// with a brighter leading edge that settles faint. A touch wider than a strand so they read
// under the web.
const TINT = "#81A7F8";
const REVEAL = [4.2, 9.4] as const;
const COUNTY_LEVELS = 8;
const COUNTY_PEAK = 0.95;
const COUNTY_REST = 0.46;
const COUNTY_SETTLE = 1.1; // seconds for a freshly drawn border to settle
const GLOW_SCALE = 0.25; // the glow layer is drawn at a quarter of CSS size

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)); // expo, no overshoot
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Strand brightness falls off with length: four buckets, one stroke call each.
const BUCKETS = [0.62, 0.48, 0.36, 0.24];
const bucketOf = (web: Web, i: number) =>
  Math.min(BUCKETS.length - 1, Math.floor((web.length[i] / web.maxLength) * BUCKETS.length * 0.999));

export default function HeroNetwork({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    // ponytail: point budget by width. A 9-unit gap gives about 2,400 points, 16 about 800.
    const web = buildWeb(window.innerWidth < 768 ? 16 : 9);
    const n = web.x.length;
    const edgeCount = web.length.length;
    const bucket = Uint8Array.from({ length: edgeCount }, (_, i) => bucketOf(web, i));
    const hop = (SPIN[1] - SPIN[0]) / (web.maxDepth + 1);
    const lit = (i: number) => SPIN[0] + web.depth[i] * hop; // when a point is reached

    // Per-point drift direction for the scroll loosening, seeded.
    const drift = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.sin(i * 12.9898) * 43758.5453;
      const f = a - Math.floor(a);
      const ang = f * Math.PI * 2;
      drift[3 * i] = Math.cos(ang);
      drift[3 * i + 1] = Math.sin(ang) - 0.3;
      drift[3 * i + 2] = (f - 0.3) * 1.6;
    }

    const glow = document.createElement("canvas");
    const gctx = glow.getContext("2d");
    let cw = 0, ch = 0, dpr = 1, fit = 1, ox = 0, oy = 0;
    const resize = () => {
      // Phones render at most 2x: the web stays sharp and the frame cost drops by half at 3x.
      dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 2 : 3);
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      glow.width = Math.max(1, Math.round(cw * GLOW_SCALE));
      glow.height = Math.max(1, Math.round(ch * GLOW_SCALE));
      const wide = cw >= 768;
      fit = Math.min((cw * (wide ? 0.84 : 0.94)) / W, (ch * (wide ? 0.6 : 0.42)) / H);
      ox = cw * (wide ? 0.54 : 0.5);
      oy = ch * (wide ? 0.6 : 0.64);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mx = 0, my = 0, ex = 0, ey = 0;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Projected screen positions, refreshed once per frame.
    const sx = new Float32Array(n);
    const sy = new Float32Array(n);
    const FOCAL = 1400;
    let cosX = 1, sinX = 0, cosY = 1, sinY = 0;
    const out = [0, 0];
    const project = (x: number, y: number, z: number) => {
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const k = FOCAL / (FOCAL + z2);
      out[0] = ox + x1 * k * fit;
      out[1] = oy + y2 * k * fit;
    };

    // Energy through the web: heads run strand to strand and fork at junctions like a nervous
    // system. Ambient sparks keep something moving everywhere; every 3 to 5 seconds a cascade
    // leaves Lexington, branches outward and reaches the border.
    const phone = window.innerWidth < 768;
    const AMBIENT_MAX = phone ? 16 : 44; // live ambient heads
    const CASCADE_MAX = phone ? 60 : 200; // live cascade heads
    const RELAY_MAX = phone ? 14 : 36; // live neuron-to-neuron pulses
    // Load shedding: when frames run long (over about 20 ms), fewer heads are allowed until the
    // frame time recovers. `load` scales both caps between 35% and 100%.
    let load = 1;
    let frameMs = 16.7;
    let lastNow = -1;
    let AMBIENT = AMBIENT_MAX;
    let CASCADE_CAP = CASCADE_MAX;
    let RELAY_CAP = RELAY_MAX;
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    let hub = 0;
    for (let i = 1; i < n; i++)
      if (Math.hypot(web.x[i] - STAR[0], web.y[i] - STAR[1]) < Math.hypot(web.x[hub] - STAR[0], web.y[hub] - STAR[1])) hub = i;
    // Strand index for each (point, neighbour) pair.
    const edgeOf = web.neighbours.map(() => new Map<number, number>());
    for (let e = 0; e < edgeCount; e++) {
      const a = web.edges[2 * e];
      const z = web.edges[2 * e + 1];
      edgeOf[a].set(z, e);
      edgeOf[z].set(a, e);
    }
    const heat = new Float32Array(edgeCount);
    const nodeHeat = new Float32Array(n);
    const stamp = new Uint32Array(n); // which cascade last passed a point
    type Head = { a: number; b: number; e: number; born: number; dur: number; power: number; left: number; wave: number };
    const heads: Head[] = [];
    let ambientLive = 0;
    let cascadeLive = 0;
    let relayLive = 0;
    // Neural behaviour. A relay pulse arriving at a point makes that point fire a beat later
    // (flare first, then send), and the strand it crossed stays lit as a completed link for
    // 0.4 to 0.8 s. Two pulses reaching a point within 0.15 s is a collision: a brighter fire and
    // a bigger burst. Now and then a local cluster of 15 to 40 points fires in quick succession.
    const holdUntil = new Float32Array(edgeCount); // a completed link holds its heat until then
    const lastHit = new Float32Array(n).fill(-9);
    const lastFire = new Float32Array(n).fill(-9); // a point that just fired rests before sending again
    type Fire = { node: number; from: number; at: number; left: number; big: boolean; link: number };
    const fires: Fire[] = [];
    let nextCluster = IGNITE + 3;
    let wave = 0;
    let nextCascade = IGNITE + 1.0;
    const launch = (a: number, b: number, born: number, speed: number, power: number, left: number, w: number) => {
      const e = edgeOf[a].get(b);
      if (e === undefined) return;
      heads.push({ a, b, e, born, dur: 1 / speed, power, left, wave: w });
      if (w > 0) cascadeLive++;
      else if (w < 0) relayLive++;
      else ambientLive++;
    };
    const pick = <T,>(list: T[]) => list[(rand() * list.length) | 0];
    // A head reached its point: light the point and the strand, then fork.
    const arrive = (h: Head, t: number) => {
      heat[h.e] = Math.max(heat[h.e], h.power);
      nodeHeat[h.b] = Math.max(nodeHeat[h.b], h.power);
      const speed = 1 / h.dur;
      if (h.wave < 0) {
        // Relay: the link completes and holds, the point takes the charge, then fires.
        holdUntil[h.e] = Math.max(holdUntil[h.e], t + 0.4 + rand() * 0.4);
        const big = t - lastHit[h.b] < 0.15;
        lastHit[h.b] = t;
        nodeHeat[h.b] = Math.max(nodeHeat[h.b], 0.5);
        fires.push({ node: h.b, from: h.a, at: t + 0.07 + rand() * 0.07, left: h.left, big, link: -1 });
        return;
      }
      if (h.wave > 0) {
        // Cascades only move outward and avoid points the wave already passed. When a sibling
        // got there first, the branch still carries on outward, so the surge reaches the border.
        const outward = web.neighbours[h.b].filter((m) => web.depth[m] > web.depth[h.b]);
        if (!outward.length) {
          nodeHeat[h.b] = Math.max(nodeHeat[h.b], 1); // reached the border
          return;
        }
        let next = outward.filter((m) => stamp[m] !== h.wave);
        if (!next.length) next = [outward[(rand() * outward.length) | 0]];
        const forks = cascadeLive > CASCADE_CAP ? 1 : 1 + (rand() < 0.5 ? 1 : 0) + (rand() < 0.15 ? 1 : 0);
        for (let k = 0; k < forks && next.length; k++) {
          const m = next.splice((rand() * next.length) | 0, 1)[0];
          stamp[m] = h.wave;
          launch(h.b, m, t, speed * (0.92 + rand() * 0.16), Math.max(0.7, h.power * 0.985), 0, h.wave);
        }
        return;
      }
      if (h.left <= 0) return;
      const next = web.neighbours[h.b].filter((m) => m !== h.a);
      if (!next.length) return;
      const forks = ambientLive > AMBIENT ? 1 : rand() < 0.22 ? 2 + (rand() < 0.25 ? 1 : 0) : 1;
      for (let k = 0; k < forks && next.length; k++) {
        const m = next.splice((rand() * next.length) | 0, 1)[0];
        launch(h.b, m, t, speed * (0.85 + rand() * 0.3), h.power * 0.9, h.left - 1 - (k ? 1 : 0), 0);
      }
    };
    const spark = (t: number) => {
      const a = (rand() * n) | 0;
      const nb = web.neighbours[a];
      if (!nb.length) return;
      // Mostly violent streaks that rip across a dozen strands in a fraction of a second, some
      // slower glows between them.
      const fast = rand() < 0.65;
      const speed = fast ? 30 + rand() * 35 : 8 + rand() * 8;
      launch(a, pick(nb), t, speed, fast ? 1 : 0.5 + rand() * 0.25, fast ? 8 + ((rand() * 10) | 0) : 3 + ((rand() * 5) | 0), 0);
    };
    // A point fires: flare, then send pulses down some of its other strands.
    const fire = (f: Fire) => {
      nodeHeat[f.node] = Math.max(nodeHeat[f.node], f.big ? 1.7 : 1.1);
      if (f.link >= 0) {
        heat[f.link] = Math.max(heat[f.link], 0.9);
        holdUntil[f.link] = Math.max(holdUntil[f.link], f.at + 0.35 + rand() * 0.35);
      }
      // Refractory rest: a point that sent in the last 0.6 s only flares, so activity cannot
      // loop in one spot. Every chain ends because `left` only ever counts down.
      if (f.left <= 0 || relayLive >= RELAY_CAP || f.at - lastFire[f.node] < 0.6) return;
      lastFire[f.node] = f.at;
      const next = web.neighbours[f.node].filter((m) => m !== f.from);
      const sends = f.big ? 3 + (rand() < 0.5 ? 1 : 0) : 1 + (rand() < 0.45 ? 1 : 0) + (rand() < 0.12 ? 1 : 0);
      for (let k = 0; k < sends && next.length; k++) {
        const m = next.splice((rand() * next.length) | 0, 1)[0];
        launch(f.node, m, f.at, 9 + rand() * 8, f.big ? 1.1 : 0.85, f.left - 1, -1);
      }
    };
    // A thought forming: a local cluster fires outward from one point in quick succession.
    const cluster = (t: number) => {
      const root = (rand() * n) | 0;
      const size = 15 + ((rand() * 26) | 0);
      const parent = new Map<number, number>([[root, -1]]);
      const order = [root];
      const hop = new Map<number, number>([[root, 0]]);
      for (let q = 0; q < order.length && order.length < size; q++)
        for (const m of web.neighbours[order[q]]) {
          if (parent.has(m) || order.length >= size) continue;
          parent.set(m, order[q]);
          hop.set(m, (hop.get(order[q]) || 0) + 1);
          order.push(m);
        }
      for (const v of order) {
        const pa = parent.get(v)!;
        fires.push({
          node: v,
          from: pa,
          at: t + (hop.get(v) || 0) * 0.08 + rand() * 0.05,
          left: 0,
          big: false,
          link: pa >= 0 ? edgeOf[v].get(pa) ?? -1 : -1,
        });
      }
    };
    const cascade = (t: number) => {
      wave = (wave % 4000000000) + 1;
      stamp[hub] = wave;
      nodeHeat[hub] = 1.2;
      for (const m of web.neighbours[hub]) {
        stamp[m] = wave;
        launch(hub, m, t, 45 + rand() * 20, 1.2, 0, wave);
      }
    };
    // County borders as a graph: every arc vertex is a node. Reveal order is the shortest path
    // along the borders from Fayette's own border.
    const vid = new Map<string, number>();
    const vxs: number[] = [];
    const vys: number[] = [];
    const idOf = (x: number, y: number) => {
      const k = x + "," + y;
      let i = vid.get(k);
      if (i === undefined) vid.set(k, (i = vxs.length)), vxs.push(x), vys.push(y);
      return i;
    };
    const arcs = COUNTY_ARCS.map((a) => {
      const ids: number[] = [];
      for (let k = 0; k + 1 < a.length; k += 2) ids.push(idOf(a[k], a[k + 1]));
      return ids;
    });
    const nv = vxs.length;
    const vAdj: [number, number][][] = Array.from({ length: nv }, () => []);
    for (const a of arcs)
      for (let k = 1; k < a.length; k++) {
        const d = Math.hypot(vxs[a[k]] - vxs[a[k - 1]], vys[a[k]] - vys[a[k - 1]]);
        vAdj[a[k]].push([a[k - 1], d]);
        vAdj[a[k - 1]].push([a[k], d]);
      }
    const onFayette = new Set<string>();
    for (const r of FAYETTE) for (let k = 0; k + 1 < r.length; k += 2) onFayette.add(r[k] + "," + r[k + 1]);
    const dist = new Float64Array(nv).fill(Infinity);
    for (let i = 0; i < nv; i++) if (onFayette.has(vxs[i] + "," + vys[i])) dist[i] = Math.hypot(vxs[i] - STAR[0], vys[i] - STAR[1]);
    const settled = new Uint8Array(nv);
    // ponytail: O(n^2) Dijkstra over about 1,200 vertices, a few ms once at load.
    for (;;) {
      let u = -1;
      for (let i = 0; i < nv; i++) if (!settled[i] && dist[i] < Infinity && (u < 0 || dist[i] < dist[u])) u = i;
      if (u < 0) break;
      settled[u] = 1;
      for (const [m, d] of vAdj[u]) if (dist[u] + d < dist[m]) dist[m] = dist[u] + d;
    }
    let maxDist = 1;
    for (let i = 0; i < nv; i++) if (dist[i] < Infinity && dist[i] > maxDist) maxDist = dist[i];
    const revealAt = Float64Array.from({ length: nv }, (_, i) =>
      REVEAL[0] + (REVEAL[1] - REVEAL[0]) * Math.pow(Math.min(1, (dist[i] < Infinity ? dist[i] : maxDist) / maxDist), 0.9));
    const qx = new Float32Array(nv);
    const qy = new Float32Array(nv);
    const countyAlpha = Array.from({ length: COUNTY_LEVELS }, (_, l) => COUNTY_REST + (COUNTY_PEAK - COUNTY_REST) * (l / (COUNTY_LEVELS - 1)));

    // Pulses that race along the county borders once they are drawn: a chain of arcs joined at
    // junctions, walked at a fixed speed in drawing units per second.
    const ends = new Map<number, number[]>();
    arcs.forEach((a, i) => {
      for (const v of [a[0], a[a.length - 1]]) {
        const list = ends.get(v);
        if (list) list.push(i);
        else ends.set(v, [i]);
      }
    });
    const junctions = Array.from(ends.keys());
    type Runner = { pts: number[]; cum: number[]; born: number; speed: number };
    const runners: Runner[] = [];
    const RUNNERS = phone ? 3 : 8;
    const runner = (t: number) => {
      let at = junctions[(rand() * junctions.length) | 0];
      const pts = [at];
      let prevArc = -1;
      for (let k = 0; k < 4 + ((rand() * 5) | 0); k++) {
        const options = (ends.get(at) || []).filter((i) => i !== prevArc);
        if (!options.length) break;
        const i = options[(rand() * options.length) | 0];
        const a = arcs[i][0] === at ? arcs[i] : [...arcs[i]].reverse();
        for (let j = 1; j < a.length; j++) pts.push(a[j]);
        at = a[a.length - 1];
        prevArc = i;
      }
      if (pts.length < 3) return;
      const cum = [0];
      for (let j = 1; j < pts.length; j++) cum.push(cum[j - 1] + Math.hypot(vxs[pts[j]] - vxs[pts[j - 1]], vys[pts[j]] - vys[pts[j - 1]]));
      runners.push({ pts, cum, born: t, speed: 380 + rand() * 360 });
    };
    const RUN_TAIL = 46; // drawing units of lit border behind a runner's head

    let lastT = 0;
    const HOT = [0.06, 0.25, 0.55, 1.3]; // heat bands, each drawn as one batched path; the top one is a collision
    const HOT_ALPHA = [0.3, 0.6, 0.95, 1];
    const NODE_SIZE = [1.6, 2.4, 3.4, 4.8]; // device pixels

    let raf = 0;
    let running = false;
    let start = -1;
    let paused = 0;
    let pausedAt = 0;

    const frame = (now: number) => {
      if (start < 0) start = now;
      const ft = lastNow < 0 ? 16.7 : now - lastNow;
      lastNow = now;
      if (ft < 100) frameMs = frameMs * 0.92 + ft * 0.08; // ignore pauses
      if (frameMs > 20) load = Math.max(0.35, load - 0.01);
      else if (frameMs < 17.5) load = Math.min(1, load + 0.002);
      AMBIENT = Math.round(AMBIENT_MAX * load);
      CASCADE_CAP = Math.round(CASCADE_MAX * load);
      RELAY_CAP = Math.round(RELAY_MAX * load);
      const t = (now - start - paused) / 1000;
      const heroH = canvas.parentElement?.offsetHeight || ch;
      const s = clamp01(window.scrollY / (heroH * 0.85));
      const sc = s * s;
      const fade = 1 - sc * 0.9;

      ex += (mx - ex) * 0.04;
      ey += (my - ey) * 0.04;
      const ry = Math.sin(t * 0.13) * 0.07 + ex * 0.14;
      const rx = 0.16 + Math.sin(t * 0.09) * 0.03 + ey * 0.07 + sc * 0.95;
      cosX = Math.cos(rx); sinX = Math.sin(rx); cosY = Math.cos(ry); sinY = Math.sin(ry);

      const spread = sc * 420;
      for (let i = 0; i < n; i++) {
        project(
          web.x[i] - CX + drift[3 * i] * spread,
          web.y[i] - CY + drift[3 * i + 1] * spread,
          drift[3 * i + 2] * spread,
        );
        sx[i] = out[0];
        sy[i] = out[1];
      }
      for (let i = 0; i < nv; i++) {
        project(vxs[i] - CX, vys[i] - CY, 0);
        qx[i] = out[0];
        qy[i] = out[1];
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#03050A";
      ctx.fillRect(0, 0, cw, ch);
      ctx.lineCap = "round";
      const hair = 0.5 / dpr; // half a device pixel

      // Strands, spinning out from the nearer-to-Lexington end. Each length bucket becomes one
      // path, drawn twice: once wide into a quarter-size glow layer (soft by nature, so it can be
      // small and cheap) that is added underneath, then as the silk hairline on top. The web
      // reads as lit fibre while the strands stay fine.
      const paths: Path2D[] = [];
      for (let b = 0; b < BUCKETS.length; b++) {
        const path = new Path2D();
        for (let e = 0; e < edgeCount; e++) {
          if (bucket[e] !== b) continue;
          const a = web.edges[2 * e];
          const z = web.edges[2 * e + 1];
          const p = easeOut(clamp01((t - lit(a)) / (hop * 2.2)));
          if (p <= 0) continue;
          path.moveTo(sx[a], sy[a]);
          path.lineTo(sx[a] + (sx[z] - sx[a]) * p, sy[a] + (sy[z] - sy[a]) * p);
        }
        paths.push(path);
      }
      // Energy: advance heads, fork at junctions, decay heat.
      const dt = Math.min(0.05, Math.max(0, t - lastT));
      lastT = t;
      if (t > IGNITE + 0.4) {
        for (let k = 0; k < 4 && ambientLive < AMBIENT; k++) spark(t);
        // New neural activity starts where a point fires on its own.
        if (relayLive < RELAY_CAP * 0.6 && rand() < dt * (phone ? 5 : 12)) {
          const v = (rand() * n) | 0;
          fires.push({ node: v, from: -1, at: t, left: 3 + ((rand() * 3) | 0), big: false, link: -1 });
        }
        if (t > nextCluster) {
          cluster(t);
          nextCluster = t + 2.5 + rand() * 3;
        }
        if (t > nextCascade) {
          cascade(t);
          nextCascade = t + 2 + rand() * 1.5;
        }
        if (t > REVEAL[1] && runners.length < Math.ceil(RUNNERS * load) && rand() < dt * 6) runner(t);
        if (rand() < dt * (phone ? 2 : 5)) nodeHeat[(rand() * n) | 0] = Math.max(0.3, 0.3 + rand() * 0.35); // twinkle
      }
      const kE = Math.exp(-dt / EDGE_DECAY);
      const kN = Math.exp(-dt / NODE_DECAY);
      for (let e = 0; e < edgeCount; e++) if (t > holdUntil[e]) heat[e] *= kE;
      for (let q = 0; q < fires.length; ) {
        if (fires[q].at <= t) {
          const f = fires[q];
          fires[q] = fires[fires.length - 1];
          fires.pop();
          fire(f);
        } else q++;
      }
      for (let i = 0; i < n; i++) nodeHeat[i] *= kN;
      // Fast heads cross several strands per frame, so arrivals are resolved in a loop: a child
      // that is already finished is handled in the same frame.
      for (let q = 0; q < heads.length; ) {
        const h = heads[q];
        if (t - h.born >= h.dur) {
          heads[q] = heads[heads.length - 1];
          heads.pop();
          if (h.wave > 0) cascadeLive--;
          else if (h.wave < 0) relayLive--;
          else ambientLive--;
          arrive(h, h.born + h.dur);
        } else q++;
      }
      const hotEdges = HOT.map(() => new Path2D());
      for (let e = 0; e < edgeCount; e++) {
        const v = heat[e] * fade;
        if (v < HOT[0]) continue;
        const band = v >= HOT[3] ? 3 : v >= HOT[2] ? 2 : v >= HOT[1] ? 1 : 0;
        const a = web.edges[2 * e];
        const z = web.edges[2 * e + 1];
        hotEdges[band].moveTo(sx[a], sy[a]);
        hotEdges[band].lineTo(sx[z], sy[z]);
      }
      // Heads: the strand lights progressively up to the head, then a bright point.
      const trails = new Path2D();
      const tips = new Path2D();
      const tip = 3 / dpr;
      for (const h of heads) {
        const f = clamp01((t - h.born) / h.dur);
        const x = sx[h.a] + (sx[h.b] - sx[h.a]) * f;
        const y = sy[h.a] + (sy[h.b] - sy[h.a]) * f;
        trails.moveTo(sx[h.a], sy[h.a]);
        trails.lineTo(x, y);
        tips.rect(x - tip / 2, y - tip / 2, tip, tip);
      }
      const hotNodes = HOT.map(() => new Path2D());
      const halos = HOT.map(() => new Path2D());
      for (let i = 0; i < n; i++) {
        const v = nodeHeat[i] * fade;
        if (v < HOT[0]) continue;
        const band = v >= HOT[3] ? 3 : v >= HOT[2] ? 2 : v >= HOT[1] ? 1 : 0;
        const size = NODE_SIZE[band] / dpr;
        hotNodes[band].rect(sx[i] - size / 2, sy[i] - size / 2, size, size);
        const r = 2.5 + 2 * band; // CSS px, round so the soft glow stays round
        halos[band].moveTo(sx[i] + r, sy[i]);
        halos[band].arc(sx[i], sy[i], r, 0, Math.PI * 2);
      }

      // Glow layer at a quarter of CSS size: the web faintly, the energy strongly. Upscaling
      // softens it, which is the glow; nothing sharp is ever drawn here.
      if (gctx) {
        gctx.setTransform(GLOW_SCALE, 0, 0, GLOW_SCALE, 0, 0);
        gctx.clearRect(0, 0, cw, ch);
        gctx.lineCap = "round";
        gctx.strokeStyle = SILK;
        gctx.lineWidth = 3.2;
        paths.forEach((path, b) => {
          gctx.globalAlpha = BUCKETS[b] * 0.5 * fade;
          gctx.stroke(path);
        });
        gctx.strokeStyle = PALE;
        gctx.lineWidth = 4;
        hotEdges.forEach((path, b) => {
          gctx.globalAlpha = HOT_ALPHA[b] * 0.45;
          gctx.stroke(path);
        });
        gctx.globalAlpha = 0.7 * fade;
        gctx.lineWidth = 5;
        gctx.stroke(trails);
        gctx.fillStyle = PALE;
        halos.forEach((path, b) => {
          gctx.globalAlpha = HOT_ALPHA[b] * 0.55;
          gctx.fill(path);
        });
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.6;
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(glow, 0, 0, cw, ch);
        ctx.globalCompositeOperation = "source-over";
      }
      // County borders: each segment grows from its earlier end; the front is bright and eases
      // down to the resting level. Bucketed by brightness, one stroke per level.
      if (t > REVEAL[0]) {
        const levels = Array.from({ length: COUNTY_LEVELS }, () => new Path2D());
        for (const a of arcs)
          for (let k = 1; k < a.length; k++) {
            let v0 = a[k - 1];
            let v1 = a[k];
            if (revealAt[v1] < revealAt[v0]) [v0, v1] = [v1, v0];
            const t0 = revealAt[v0];
            const t1 = revealAt[v1];
            if (t <= t0) continue;
            const f = t1 > t0 ? clamp01((t - t0) / (t1 - t0)) : 1;
            const age = t - (t0 + (t1 - t0) * f);
            const l = Math.round(Math.exp(-Math.max(0, age) / COUNTY_SETTLE) * (COUNTY_LEVELS - 1));
            levels[l].moveTo(qx[v0], qy[v0]);
            levels[l].lineTo(qx[v0] + (qx[v1] - qx[v0]) * f, qy[v0] + (qy[v1] - qy[v0]) * f);
          }
        ctx.strokeStyle = TINT;
        ctx.lineJoin = "round";
        levels.forEach((path, l) => {
          ctx.globalAlpha = countyAlpha[l] * fade;
          ctx.lineWidth = (1.0 + 0.5 * (l / (COUNTY_LEVELS - 1))) / dpr;
          ctx.stroke(path);
        });
      }

      ctx.strokeStyle = SILK;
      ctx.lineWidth = hair;
      paths.forEach((path, b) => {
        ctx.globalAlpha = BUCKETS[b] * fade;
        ctx.stroke(path);
      });

      // The border: one slightly brighter continuous hairline, closing both ways from the
      // point nearest Lexington.
      const close = easeInOut(clamp01((t - CLOSE[0]) / (CLOSE[1] - CLOSE[0])));
      if (close > 0) {
        ctx.globalAlpha = 0.75 * fade;
        ctx.lineWidth = 0.8 / dpr;
        ctx.beginPath();
        const m = OUTLINE.length;
        const half = Math.ceil((m / 2) * close);
        for (const dir of [1, -1]) {
          for (let k = 0; k <= half; k++) {
            const [x, y] = OUTLINE[(((NEAR + dir * k) % m) + m) % m];
            project(x - CX, y - CY, 0);
            if (k === 0) ctx.moveTo(out[0], out[1]);
            else ctx.lineTo(out[0], out[1]);
          }
        }
        ctx.stroke();
      }

      // Points: under 1.1 device pixels, square, no rims.
      ctx.fillStyle = PALE;
      for (let i = 0; i < n; i++) {
        const a = clamp01((t - lit(i)) / 0.5);
        if (a <= 0) continue;
        ctx.globalAlpha = a * fade * (web.boundary[i] ? 0.55 : 1);
        const size = (web.boundary[i] ? 0.9 : 1.1) / dpr;
        ctx.fillRect(sx[i] - size / 2, sy[i] - size / 2, size, size);
      }

      // Energy, crisp, added on top: afterglow strands, live trails, flaring points, heads.
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = PALE;
      ctx.lineWidth = 0.9 / dpr;
      hotEdges.forEach((path, b) => {
        ctx.globalAlpha = HOT_ALPHA[b] * 0.8;
        ctx.stroke(path);
      });
      ctx.globalAlpha = fade;
      ctx.lineWidth = 1.5 / dpr;
      ctx.stroke(trails);
      // Border runners: a comet of light racing along the county lines.
      for (let q = runners.length - 1; q >= 0; q--) {
        const r = runners[q];
        const head = (t - r.born) * r.speed;
        const total = r.cum[r.cum.length - 1];
        if (head - RUN_TAIL > total) {
          runners.splice(q, 1);
          continue;
        }
        const from = Math.max(0, head - RUN_TAIL);
        const to = Math.min(total, head);
        const path = new Path2D();
        let started = false;
        for (let j = 1; j < r.pts.length; j++) {
          const c0 = r.cum[j - 1];
          const c1 = r.cum[j];
          if (c1 < from || c0 > to) continue;
          const a = r.pts[j - 1];
          const b = r.pts[j];
          const f0 = c1 > c0 ? clamp01((from - c0) / (c1 - c0)) : 0;
          const f1 = c1 > c0 ? clamp01((to - c0) / (c1 - c0)) : 1;
          if (!started) {
            path.moveTo(qx[a] + (qx[b] - qx[a]) * f0, qy[a] + (qy[b] - qy[a]) * f0);
            started = true;
          }
          path.lineTo(qx[a] + (qx[b] - qx[a]) * f1, qy[a] + (qy[b] - qy[a]) * f1);
        }
        ctx.globalAlpha = 0.95 * fade;
        ctx.strokeStyle = PALE;
        ctx.lineWidth = 1.8 / dpr;
        ctx.stroke(path);
      }
      ctx.fillStyle = STAR_FILL;
      hotNodes.forEach((path, b) => {
        ctx.globalAlpha = HOT_ALPHA[b];
        ctx.fill(path);
      });
      ctx.globalAlpha = fade;
      ctx.fill(tips);
      ctx.globalCompositeOperation = "source-over";

      // The Lexington star lights last. No ring: the star just lights.
      const ignite = easeOut(clamp01((t - IGNITE) / 0.9));
      if (ignite > 0) {
        const grow = (0.55 + 0.45 * ignite) * 0.5;
        ctx.globalAlpha = ignite * Math.max(0.15, fade);
        ctx.fillStyle = STAR_FILL;
        ctx.beginPath();
        for (let i = 0; i + 1 < STAR_PTS.length; i += 2) {
          project(STAR[0] - CX + (STAR_PTS[i] - STAR[0]) * grow, STAR[1] - CY + (STAR_PTS[i + 1] - STAR[1]) * grow, 0);
          if (i === 0) ctx.moveTo(out[0], out[1]);
          else ctx.lineTo(out[0], out[1]);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running) return;
      running = true;
      if (pausedAt) paused += performance.now() - pausedAt;
      lastNow = -1;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      pausedAt = performance.now();
      cancelAnimationFrame(raf);
    };

    let onScreen = true;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !document.hidden) play();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden || !onScreen ? stop() : play());
    document.addEventListener("visibilitychange", onVis);
    play();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full motion-reduce:hidden ${className}`}
      />
      {still && <StillWeb />}
    </>
  );
}

const STAR_PTS = MARK.star.match(/-?\d+(\.\d+)?/g)!.map(Number);

// Index of the border vertex nearest Lexington, where the border starts closing.
const NEAR = OUTLINE.reduce(
  (best, [x, y], i) =>
    Math.hypot(x - STAR[0], y - STAR[1]) < Math.hypot(OUTLINE[best][0] - STAR[0], OUTLINE[best][1] - STAR[1]) ? i : best,
  0,
);

/** Reduced motion: the finished web, as vectors. Built only for visitors who need it. */
function StillWeb() {
  const web = buildWeb(9);
  const d: string[] = [];
  for (let e = 0; e < web.length.length; e++) {
    const a = web.edges[2 * e];
    const z = web.edges[2 * e + 1];
    d.push(`M${web.x[a].toFixed(1)},${web.y[a].toFixed(1)}L${web.x[z].toFixed(1)},${web.y[z].toFixed(1)}`);
  }
  return (
    <svg
      viewBox={MARK.viewBox}
      aria-hidden="true"
      className="absolute left-1/2 top-[64%] md:left-[54%] md:top-[60%] w-[94%] md:w-[min(84%,133vh)] -translate-x-1/2 -translate-y-1/2"
    >
      <path d={d.join("")} fill="none" stroke={SILK} strokeOpacity={0.5} strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
      <path d={MARK.state} fill="none" stroke={SILK} strokeOpacity={0.6} strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
      <path
        d={COUNTY_ARCS.map((c) => "M" + c.map((v) => v.toFixed(1)).join(" ")).join("")}
        fill="none"
        stroke={TINT}
        strokeOpacity={0.62}
        strokeWidth={1.4}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={Array.from(web.x, (x, i) => `M${(x - 0.5).toFixed(1)} ${(web.y[i] - 0.5).toFixed(1)}h1v1h-1z`).join("")}
        fill={PALE}
        opacity={0.8}
      />
      <path d={MARK.star} fill={STAR_FILL} transform={`translate(${STAR[0]} ${STAR[1]}) scale(0.5) translate(${-STAR[0]} ${-STAR[1]})`} />
    </svg>
  );
}
