import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

// Deterministic star field via golden-angle distribution
const STARS = Array.from({ length: 220 }, (_, i) => ({
  cx: (((i * 137.508) % 100)).toFixed(2),
  cy: (((i * 73.141) % 100)).toFixed(2),
  r:  i % 13 === 0 ? '1.6' : i % 5 === 0 ? '1.1' : '0.75',
  opacity: (0.12 + ((i * 17) % 75) / 120).toFixed(2),
}));

function StarField() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {STARS.map((s, i) => (
        <circle key={i} cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r} fill="white" opacity={s.opacity} />
      ))}
    </svg>
  );
}

// The crawl's running narrative. Each crawl slide shows the full set and
// highlights exactly one paragraph (the rest are dimmed). The component
// auto-scrolls so the highlighted paragraph lands in the vertical center —
// no per-slide pixel tuning, so it stays centered across viewport sizes/zoom.
const PARAGRAPHS = [
  <>Two weeks ago, Yaroslav Yermilov presented the Pragmatic Vibe Clauding
    session.</>,
  <>Claude Code is your teammate — you mentor it on its first day (maybe not
    even one), so just talk to it in the terminal.</>,
  <>Find your own vibe coding flow. Focus on building the right task context
    for the agent.</>,
  <>Set yourself a goal: do everything (not just coding) from within Claude
    Code — especially the feedback loops.</>,
  <>Claude Code increases the volume of work, not the speed.</>,
  <>If you catch yourself instructing Claude to do the same thing over and over
    — searching logs, debugging issues, optimizing performance, generating
    images, writing documentation — teach it that skill. Skills are building
    blocks each engineer (or agent) can assemble into their own workflow. People
    hate reading and writing documentation, but agents love it, so convert all
    your docs into skills.</>,
  <>Every engineer who uses a skill from the internal marketplace adds
    improvements — and everyone gets more productive.</>,
  <>You just need the right infrastructure to make skills your foundation.</>,
];

interface StarWarsCrawlProps {
  /** Which paragraph (1-based) is the focal highlight; the rest are dimmed. */
  highlighted: number;
}

export function StarWarsCrawl({ highlighted }: StarWarsCrawlProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const crawlRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLParagraphElement>(null);
  const [offset, setOffset] = useState<number | null>(null);

  // Solve for the translateY that puts the highlighted paragraph's on-screen
  // center at the wrapper's center. The rotateX perspective makes the mapping
  // from translateY → screen position non-linear, so probe two offsets to get
  // the local slope and Newton-step to the solution. Converges in 2–3 iters
  // and is independent of paragraph height / viewport size / zoom.
  const recenter = useCallback(() => {
    const wrapper = wrapperRef.current;
    const crawl = crawlRef.current;
    const hl = highlightRef.current;
    if (!wrapper || !crawl || !hl) return;

    const apply = (o: number) => {
      crawl.style.transform = `rotateX(22deg) translateY(${-o}px)`;
    };
    // Signed distance (screen px) of the highlight center below wrapper center.
    const delta = () => {
      const w = wrapper.getBoundingClientRect();
      const h = hl.getBoundingClientRect();
      return (h.top + h.height / 2) - (w.top + w.height / 2);
    };

    let o = 0;
    for (let i = 0; i < 8; i++) {
      apply(o);
      const d0 = delta();
      if (Math.abs(d0) < 0.5) break;
      apply(o + 10);
      const d1 = delta();
      const slope = (d1 - d0) / 10; // screen-px change per offset unit
      if (Math.abs(slope) < 1e-3) break;
      o = o - d0 / slope; // Newton step toward delta === 0
    }
    apply(o);
    setOffset(o);
  }, []);

  useLayoutEffect(() => {
    recenter();
  }, [highlighted, recenter]);

  // Keep the highlight centered when the window resizes.
  useEffect(() => {
    window.addEventListener('resize', recenter);
    return () => window.removeEventListener('resize', recenter);
  }, [recenter]);

  return (
    <div className="sw-scene">
      <StarField />
      <div className="sw-fade-top" />
      <div className="sw-fade-bottom" />

      <div className="sw-crawl-wrapper" ref={wrapperRef}>
        <div
          className="sw-crawl"
          ref={crawlRef}
          style={{
            transform: `rotateX(22deg) translateY(${offset === null ? 0 : -offset}px)`,
            // Hide the pre-measurement flash on first paint.
            visibility: offset === null ? 'hidden' : 'visible',
          }}
        >
          <div className="sw-title-block">
            <p className="sw-episode">Episode II</p>
            <p className="sw-main-title">REVENGE OF THE SKILL</p>
          </div>

          {PARAGRAPHS.map((para, i) => (
            <p
              key={i}
              ref={highlighted === i + 1 ? highlightRef : undefined}
              className={`sw-para ${highlighted === i + 1 ? 'sw-para--highlight' : 'sw-para--dim'}`}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
