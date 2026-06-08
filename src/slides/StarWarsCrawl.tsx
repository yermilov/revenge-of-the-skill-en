
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

interface StarWarsCrawlProps {
  scrollOffset: number;
  /** Which paragraph is the focal highlight; the other is dimmed. */
  highlighted: 1 | 2;
}

export function StarWarsCrawl({ scrollOffset, highlighted }: StarWarsCrawlProps) {
  return (
    <div className="sw-scene">
      <StarField />
      <div className="sw-fade-top" />
      <div className="sw-fade-bottom" />

      <div className="sw-crawl-wrapper">
        <div
          className="sw-crawl"
          style={{ transform: `rotateX(25deg) translateY(-${scrollOffset}px)` }}
        >
          <div className="sw-title-block">
            <p className="sw-episode">Episode II</p>
            <p className="sw-main-title">REVENGE OF THE SKILL</p>
          </div>

          <p className={`sw-para ${highlighted === 1 ? 'sw-para--highlight' : 'sw-para--dim'}`}>
            2 weeks ago, Yaroslav Yermilov presented Pragmatic Vibe Clauding session.
          </p>

          <p className={`sw-para ${highlighted === 2 ? 'sw-para--highlight' : 'sw-para--dim'}`}>
            Claude Code is your teammate you mentor on their first day (maybe not
            even one), so just talk to it in terminal.
          </p>
        </div>
      </div>
    </div>
  );
}
