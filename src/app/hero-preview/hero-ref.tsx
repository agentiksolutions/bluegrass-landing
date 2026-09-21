'use client';

const CSS = `
.bag-hrg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #FAF8F5;
  color: #1C1C1E;
  font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.bag-hrg-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 12vh 8vw 10vh;
}

.bag-hrg-copy {
  flex: 0 1 auto;
  min-width: 0;
}

.bag-hrg-name {
  margin: 0;
  padding: 0.08em 0 0.12em;
  color: #1C1C1E;
  font-weight: 400;
  font-size: clamp(0.98rem, 0.42rem + 3.15vw, 2.55rem);
  line-height: 1.18;
  letter-spacing: -0.018em;
  white-space: nowrap;
  text-rendering: optimizeLegibility;
  clip-path: inset(0 100% 0 0);
  animation: bag-hrg-set 0.7s cubic-bezier(0.22, 0.08, 0.18, 1) 0.06s both;
}

.bag-hrg-lede {
  margin: 0.85em 0 0;
  max-width: 22em;
  color: rgba(28, 28, 30, 0.62);
  font-size: clamp(0.9rem, 0.15rem + 1.05vw, 1.08rem);
  font-weight: 400;
  line-height: 1.45;
  animation: bag-hrg-fade 0.55s cubic-bezier(0.22, 0.08, 0.18, 1) 0.42s both;
}

.bag-hrg-place {
  margin: 1.15em 0 0;
  color: rgba(28, 28, 30, 0.46);
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  animation: bag-hrg-fade 0.5s cubic-bezier(0.22, 0.08, 0.18, 1) 0.72s both;
}

.bag-hrg-stage {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bag-hrg-plate {
  display: block;
  width: min(100%, 34rem);
  line-height: 0;
  background: #fff;
  border: 1px solid rgba(28, 28, 30, 0.08);
  box-shadow: 0 22px 48px rgba(28, 28, 30, 0.07);
  animation: bag-hrg-seat 0.95s cubic-bezier(0.22, 0.08, 0.18, 1) 0.28s both;
}

.bag-hrg-plate svg {
  display: block;
  width: 100%;
  height: auto;
  max-height: 38vh;
}

@keyframes bag-hrg-set {
  from {
    clip-path: inset(0 100% 0 0);
    opacity: 0.25;
  }
  to {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
}

@keyframes bag-hrg-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bag-hrg-seat {
  from {
    opacity: 0;
    transform: translate(10px, 14px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@media (min-width: 720px) {
  .bag-hrg-inner {
    flex-direction: row;
    align-items: center;
    gap: 4.5vw;
    padding: 0 7.5vw;
  }

  .bag-hrg-copy {
    flex: 1.05 1 0;
  }

  .bag-hrg-stage {
    flex: 1 1 0;
    height: 62vh;
    max-height: 28rem;
    perspective: 1400px;
  }

  .bag-hrg-plate {
    transform: rotateY(-8deg) rotateX(2.5deg);
    transform-origin: 50% 55%;
    animation: bag-hrg-seat-3d 0.95s cubic-bezier(0.22, 0.08, 0.18, 1) 0.28s both;
  }

  .bag-hrg-plate svg {
    max-height: 100%;
  }
}

@keyframes bag-hrg-seat-3d {
  from {
    opacity: 0;
    transform: rotateY(-8deg) rotateX(2.5deg) translate3d(12px, 16px, -24px);
  }
  to {
    opacity: 1;
    transform: rotateY(-8deg) rotateX(2.5deg) translate3d(0, 0, 0);
  }
}

@media (max-height: 420px) {
  .bag-hrg-inner {
    flex-direction: row;
    align-items: center;
    gap: 3vw;
    padding: 6vh 6vw;
  }

  .bag-hrg-lede { margin-top: 0.55em; }
  .bag-hrg-place { margin-top: 0.7em; }
  .bag-hrg-plate svg { max-height: 72%; }
}

@media (prefers-reduced-motion: reduce) {
  .bag-hrg-name,
  .bag-hrg-lede,
  .bag-hrg-place,
  .bag-hrg-plate {
    animation: none;
  }

  .bag-hrg-name {
    clip-path: none;
    opacity: 1;
  }

  .bag-hrg-lede,
  .bag-hrg-place,
  .bag-hrg-plate {
    opacity: 1;
    transform: none;
  }

  @media (min-width: 720px) {
    .bag-hrg-plate {
      transform: rotateY(-8deg) rotateX(2.5deg);
    }
  }
}
`;

function Plate() {
  return (
    <svg viewBox="0 0 560 400" aria-hidden="true">
      <rect width="560" height="400" fill="#fff" />

      <path
        d="M36 318 C 110 292, 168 336, 248 304 S 400 250, 528 278"
        fill="none"
        stroke="#2A9D8F"
        strokeWidth="1"
        opacity="0.18"
      />
      <path
        d="M48 292 C 118 268, 176 312, 252 278 S 398 232, 520 256"
        fill="none"
        stroke="#2A9D8F"
        strokeWidth="1"
        opacity="0.22"
      />
      <path
        d="M62 266 C 128 246, 184 286, 256 252 S 392 214, 508 236"
        fill="none"
        stroke="#2A9D8F"
        strokeWidth="1.05"
        opacity="0.28"
      />
      <path
        d="M78 242 C 136 226, 190 262, 258 228 S 384 198, 492 216"
        fill="none"
        stroke="#2A9D8F"
        strokeWidth="1.05"
        opacity="0.34"
      />
      <path
        d="M98 218 C 148 206, 198 238, 262 206 S 372 182, 470 196"
        fill="none"
        stroke="#2A9D8F"
        strokeWidth="1.1"
        opacity="0.4"
      />
      <path
        d="M122 196 C 168 188, 210 214, 268 186 S 360 168, 444 178"
        fill="none"
        stroke="#0D7C66"
        strokeWidth="1.1"
        opacity="0.38"
      />
      <path
        d="M152 176 C 192 172, 226 192, 274 168 S 348 156, 414 164"
        fill="none"
        stroke="#0D7C66"
        strokeWidth="1.15"
        opacity="0.32"
      />
      <path
        d="M188 158 C 220 156, 246 170, 282 154 S 336 146, 384 152"
        fill="none"
        stroke="#0D7C66"
        strokeWidth="1.05"
        opacity="0.24"
      />

      <g fill="none" stroke="#1C1C1E" strokeWidth="0.7" opacity="0.18">
        <path d="M28 28 h18" />
        <path d="M28 28 v18" />
        <path d="M532 372 h-18" />
        <path d="M532 372 v-18" />
      </g>

      <g>
        <circle cx="176" cy="214" r="4.2" fill="#2A9D8F" />
        <circle cx="176" cy="214" r="8.5" fill="none" stroke="#2A9D8F" strokeWidth="0.7" opacity="0.35" />
        <circle cx="278" cy="164" r="4.6" fill="#D4A017" />
        <circle cx="278" cy="164" r="9.2" fill="none" stroke="#D4A017" strokeWidth="0.7" opacity="0.4" />
        <circle cx="386" cy="198" r="4.2" fill="#0D7C66" />
        <circle cx="386" cy="198" r="8.5" fill="none" stroke="#0D7C66" strokeWidth="0.7" opacity="0.35" />
      </g>
    </svg>
  );
}

export default function HeroRefGrok({ run }: { run: number }) {
  return (
    <section className="bag-hrg" aria-label="Bluegrass Advisory Group">
      <style>{CSS}</style>
      <div key={run} className="bag-hrg-inner">
        <div className="bag-hrg-copy">
          <h1 className="bag-hrg-name font-display">Bluegrass Advisory Group</h1>
          <p className="bag-hrg-lede">
            Operations counsel for people who already run the place.
          </p>
          <p className="bag-hrg-place">Kentucky</p>
        </div>
        <div className="bag-hrg-stage" aria-hidden="true">
          <div className="bag-hrg-plate">
            <Plate />
          </div>
        </div>
      </div>
    </section>
  );
}
