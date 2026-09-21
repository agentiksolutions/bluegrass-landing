"use client";

import { useState } from "react";
import { MotionBackdrop } from "./motion";
import NameGrok from "./name-grok";
import FieldGrok from "./field-grok";
import Field1 from "./field-1";
import Field2 from "./field-2";
import Field3 from "./field-3";
import Field4 from "./field-4";
import HeroCards from "./cards";
import HeroRef from "./hero-ref";

// Preview-only page for choosing a hero name animation. Not linked from the site.
// Delete this folder once a variant is chosen and folded into src/app/page.tsx.

const WORD = "Bluegrass Advisory Group";

// Every clip in public/videos that is a hero candidate. Round two lands as hero-r2-*.
const CLIPS = [
  { label: "gen A", src: "/videos/hero-a-gen.mp4", light: false },
  { label: "gen B", src: "/videos/hero-b-gen.mp4", light: false },
  { label: "R2-1", src: "/videos/hero-r2-1.mp4", light: false },
  { label: "R2-2", src: "/videos/hero-r2-2.mp4", light: false },
  { label: "R2-3", src: "/videos/hero-r2-3.mp4", light: false },
  { label: "R2-4", src: "/videos/hero-r2-4.mp4", light: false },
  { label: "day 1", src: "/videos/hero-day-1.mp4", light: true },
  { label: "day 2", src: "/videos/hero-day-2.mp4", light: true },
  { label: "day 3", src: "/videos/hero-day-3.mp4", light: true },
  { label: "current", src: "/videos/kling-hero-bluegrass.mp4", light: false },
  { label: "own 1", src: "/videos/hero-own-1.mp4", light: false },
  { label: "own 2", src: "/videos/hero-own-2.mp4", light: false },
  { label: "wind", src: "canvas:wind", light: false },
  { label: "order", src: "canvas:order", light: false },
  { label: "contour", src: "canvas:contour", light: false },
  { label: "grok name field", src: "canvas:grokfield", light: false },
  { label: "G1 condense", src: "canvas:field1", light: false },
  { label: "G2 light rake", src: "canvas:field2", light: false },
  { label: "G3 survey", src: "canvas:field3", light: false },
  { label: "G4 constellation", src: "canvas:field4", light: false },
  { label: "cards light", src: "cards:light", light: true },
  { label: "cards dark", src: "cards:dark", light: false },
  { label: "grok survey plate", src: "cards:ref", light: true },
];

// Backdrops that spell the name themselves, so the typed headline stands down.
const NAME_FIELDS = ["canvas:grokfield", "canvas:field1", "canvas:field2", "canvas:field3", "canvas:field4", "cards:light", "cards:dark", "cards:ref"];

// On daylight footage the headline goes dark and the scrim turns into a light wash.
function tone(light: boolean) {
  return {
    scrim: light
      ? "bg-gradient-to-tr from-warm-white/85 via-warm-white/45 to-transparent"
      : "bg-graphite/60",
    head: light ? "text-graphite" : "text-warm-white",
    sub: light ? "text-charcoal/80" : "text-warm-white/70",
    rule: light ? "bg-emerald" : "bg-sage",
    accent: light ? "text-emerald" : "text-sage",
    sweep: light
      ? "linear-gradient(100deg, #1C1C1E 0%, #1C1C1E 38%, #0D7C66 50%, #1C1C1E 62%, #1C1C1E 100%)"
      : "linear-gradient(100deg, #FAF8F5 0%, #FAF8F5 38%, #2A9D8F 50%, #FAF8F5 62%, #FAF8F5 100%)",
  };
}

function Stage({ children, src, light, runKey, overlay }: { children: React.ReactNode; src: string; light: boolean; runKey: number; overlay: boolean }) {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {src === "cards:ref" ? (
        <HeroRef run={runKey} />
      ) : src.startsWith("cards:") ? (
        <div className={`absolute inset-0 ${src === "cards:light" ? "bg-warm-white" : "bg-graphite"}`}>
          <HeroCards run={runKey} light={src === "cards:light"} />
        </div>
      ) : src === "canvas:grokfield" ? (
        <FieldGrok run={runKey} />
      ) : src === "canvas:field1" ? (
        <Field1 run={runKey} />
      ) : src === "canvas:field2" ? (
        <Field2 run={runKey} />
      ) : src === "canvas:field3" ? (
        <Field3 run={runKey} />
      ) : src === "canvas:field4" ? (
        <Field4 run={runKey} />
      ) : src.startsWith("canvas:") ? (
        <MotionBackdrop mode={src.slice(7) as "wind" | "order" | "contour"} />
      ) : (
      <video
        key={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      )}
      {!src.startsWith("cards:") && (
        <div className={`absolute inset-0 ${src.startsWith("canvas:") ? "bg-graphite/25" : tone(light).scrim}`} />
      )}
      {overlay && !src.startsWith("canvas:") && <FieldGrok run={runKey} />}
      <div className="relative z-10 px-6 md:px-12 max-w-content mx-auto w-full">
        {children}
      </div>
    </section>
  );
}

// A. Letters rise word by word, a thin emerald rule draws itself underneath.
function VariantA({ run, light }: { run: number; light: boolean }) {
  const t = tone(light);
  const words = WORD.split(" ");
  return (
    <div key={run}>
      <h1 className={`font-display font-bold tracking-tight ${t.head} text-[clamp(21px,4.6vw,64px)] leading-[1.08] whitespace-nowrap`}>
        {words.map((w, i) => (
          <span key={w} className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block opacity-0"
              style={{
                animation: `heroRise 900ms cubic-bezier(.16,1,.3,1) forwards`,
                animationDelay: `${i * 160}ms`,
              }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </h1>
      <div
        className={`h-px ${t.rule} mt-6 origin-left scale-x-0`}
        style={{ animation: "heroRule 1100ms cubic-bezier(.16,1,.3,1) 620ms forwards" }}
      />
      <p
        className={`text-lg ${t.sub} max-w-[520px] mt-7 opacity-0`}
        style={{ animation: "heroFade 900ms ease-out 1000ms forwards" }}
      >
        We help businesses figure out AI.
      </p>
    </div>
  );
}

// B. The name sits still; a soft emerald light sweeps across it once.
function VariantB({ run, light }: { run: number; light: boolean }) {
  const t = tone(light);
  return (
    <div key={run}>
      <h1
        className="font-display font-bold tracking-tight text-[clamp(21px,4.6vw,64px)] leading-[1.08] whitespace-nowrap bg-clip-text text-transparent"
        style={{
          backgroundImage: t.sweep,
          backgroundSize: "300% 100%",
          animation: "heroSweep 2600ms ease-in-out 400ms forwards",
        }}
      >
        Bluegrass Advisory Group
      </h1>
      <p
        className={`text-lg ${t.sub} max-w-[520px] mt-7 opacity-0`}
        style={{ animation: "heroFade 900ms ease-out 1200ms forwards" }}
      >
        We help businesses figure out AI.
      </p>
    </div>
  );
}

// C. Letter by letter, with the three initials landing in emerald.
function VariantC({ run, light }: { run: number; light: boolean }) {
  const t = tone(light);
  const chars = WORD.split("");
  let idx = 0;
  return (
    <div key={run}>
      <h1 className={`font-display font-bold tracking-tight text-[clamp(21px,4.6vw,64px)] leading-[1.08] whitespace-nowrap ${t.head}`}>
        {chars.map((c, i) => {
          const isInitial = i === 0 || (chars[i - 1] === " " && c !== " ");
          const delay = c === " " ? 0 : idx++ * 34;
          return (
            <span
              key={`${c}-${i}`}
              className={`inline-block opacity-0 ${isInitial ? t.accent : ""}`}
              style={{
                animation: "heroDrop 620ms cubic-bezier(.16,1,.3,1) forwards",
                animationDelay: `${delay}ms`,
                whiteSpace: c === " " ? "pre" : undefined,
              }}
            >
              {c === " " ? " " : c}
            </span>
          );
        })}
      </h1>
      <p
        className={`text-lg ${t.sub} max-w-[520px] mt-7 opacity-0`}
        style={{ animation: "heroFade 900ms ease-out 1400ms forwards" }}
      >
        We help businesses figure out AI.
      </p>
    </div>
  );
}

export default function HeroPreview() {
  const [variant, setVariant] = useState<"A" | "B" | "C" | "D">("A");
  const [run, setRun] = useState(0);
  const [clip, setClip] = useState(CLIPS[0].src);
  const isLight = CLIPS.find((c) => c.src === clip)?.light ?? false;
  const [overlay, setOverlay] = useState(false);

  const pick = (v: "A" | "B" | "C" | "D") => {
    setVariant(v);
    setRun((r) => r + 1);
  };

  return (
    <>
      <style>{`
        @keyframes heroRise { from { opacity:0; transform: translateY(105%);} to { opacity:1; transform: translateY(0);} }
        @keyframes heroRule { to { transform: scaleX(1);} }
        @keyframes heroFade { to { opacity:1;} }
        @keyframes heroSweep { from { background-position: 120% 0;} to { background-position: -40% 0;} }
        @keyframes heroDrop { from { opacity:0; transform: translateY(-14px);} to { opacity:1; transform: translateY(0);} }
      `}</style>

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-graphite/80 backdrop-blur px-3 py-2 rounded-full">
        {(["A", "B", "C", "D"] as const).map((v) => (
          <button
            key={v}
            onClick={() => pick(v)}
            className={`px-4 py-1.5 rounded-full text-sm ${
              variant === v ? "bg-sage text-graphite" : "text-warm-white/80"
            }`}
          >
            {v}
          </button>
        ))}
        <button
          onClick={() => setRun((r) => r + 1)}
          className="px-4 py-1.5 rounded-full text-sm text-warm-white/80"
        >
          Replay
        </button>
        <button
          onClick={() => {
            setOverlay((o) => !o);
            setRun((r) => r + 1);
          }}
          className={`px-4 py-1.5 rounded-full text-sm ${
            overlay ? "bg-sage text-graphite" : "text-warm-white/80"
          }`}
        >
          name over video
        </button>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-graphite/80 backdrop-blur px-3 py-2 rounded-full">
        {CLIPS.map((c) => (
          <button
            key={c.src}
            onClick={() => {
              setClip(c.src);
              setRun((r) => r + 1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs ${
              clip === c.src ? "bg-sage text-graphite" : "text-warm-white/80"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <Stage src={clip} light={isLight} runKey={run} overlay={overlay}>
        {!NAME_FIELDS.includes(clip) && !overlay && variant === "A" && <VariantA run={run} light={isLight} />}
        {!NAME_FIELDS.includes(clip) && !overlay && variant === "B" && <VariantB run={run} light={isLight} />}
        {!NAME_FIELDS.includes(clip) && !overlay && variant === "C" && <VariantC run={run} light={isLight} />}
        {!NAME_FIELDS.includes(clip) && !overlay && variant === "D" && <NameGrok run={run} />}
      </Stage>
    </>
  );
}
