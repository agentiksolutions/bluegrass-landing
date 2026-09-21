// The name starts slightly misted and loosely tracked, then gathers into a tight lockup as a gold rule draws from the center — messy operations pulled into still, finished order.
"use client";

const CSS = `
.bag-na-grok {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: auto;
  padding: 0;
  overflow: visible;
  background: transparent;
}

.bag-na-grok-lockup {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
}

.bag-na-grok-name {
  margin: 0;
  max-width: 100%;
  color: #FAF8F5;
  font-weight: 400;
  font-size: clamp(0.8rem, 3.7vw + 0.22rem, 3.35rem);
  line-height: 1;
  letter-spacing: 0.042em;
  white-space: nowrap;
  text-align: left;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  animation: bag-na-grok-gather 2.1s cubic-bezier(0.22, 0.08, 0.18, 1) 0.12s both;
}

.bag-na-grok-rule-wrap {
  position: relative;
  width: 100%;
  height: 1px;
  margin-top: 0.78em;
}

.bag-na-grok-rule {
  display: block;
  width: 100%;
  height: 1px;
  background: #D4A017;
  transform: scaleX(0);
  transform-origin: 0% 50%;
  animation: bag-na-grok-rule 1.18s cubic-bezier(0.22, 0.08, 0.18, 1) 1.12s both;
}

.bag-na-grok-seal {
  position: absolute;
  top: 50%;
  left: 0%;
  width: 4px;
  height: 4px;
  background: #2A9D8F;
  box-shadow: 0 0 0 1px #0D7C66;
  transform: translate(-50%, -50%) scale(0);
  animation: bag-na-grok-seal 0.42s cubic-bezier(0.22, 0.08, 0.18, 1) 2.05s both;
}

@keyframes bag-na-grok-gather {
  from {
    letter-spacing: 0.12em;
    opacity: 0.34;
    filter: blur(4.5px);
  }
  to {
    letter-spacing: 0.042em;
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes bag-na-grok-rule {
  from {
    transform: scaleX(0);
    opacity: 0.55;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes bag-na-grok-seal {
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bag-na-grok-name,
  .bag-na-grok-rule,
  .bag-na-grok-seal {
    animation: none;
  }
  .bag-na-grok-name {
    letter-spacing: 0.042em;
    opacity: 1;
    filter: none;
  }
  .bag-na-grok-rule {
    transform: none;
    opacity: 1;
  }
  .bag-na-grok-seal {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}
`;

export default function NameAnimationGrok({ run }: { run: number }) {
  return (
    <section className="bag-na-grok" aria-label="Bluegrass Advisory Group">
      <style>{CSS}</style>
      <div key={run} className="bag-na-grok-lockup">
        <h1 className="bag-na-grok-name font-display">
          Bluegrass Advisory Group
        </h1>
        <div className="bag-na-grok-rule-wrap" aria-hidden="true">
          <span className="bag-na-grok-rule" />
          <span className="bag-na-grok-seal" />
        </div>
      </div>
    </section>
  );
}
