import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const EXIT_CODES = `exit 1   ⚠ logged — then CONTINUES anyway
exit 2   ✓ blocks; stderr becomes Claude's feedback
exit 0   allow — but print {} or the UI cries "hook error"`;

const BULLETS: ReactNode[] = [
  <>
    only <Emphasis color="orange">exit 2 blocks</Emphasis> — exit 1 just logs and
    proceeds (the #1 mistake)
  </>,
  <>
    hooks run with your <Emphasis color="orange">full shell</Emphasis> — quote and
    validate every input
  </>,
  <>
    keep them <Emphasis color="green">under ~500ms</Emphasis> — they fire on every
    matching event
  </>,
  <>
    a blocking <Code>Stop</Code> hook can loop — bail when{' '}
    <Code>stop_hook_active</Code>
  </>,
  <>
    always print <Code>{'{}'}</Code> on exit 0 — silent success shows as a{' '}
    <Emphasis color="orange">“hook error”</Emphasis>
  </>,
];

// Sliding window keeps the newest gotchas readable as the list grows.
const WINDOW = 3;

export const HookGotchasSlide: SlideDefinition = {
  id: 'hook-gotchas',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">hook</span>{' '}
      <span className="text-orange">gotchas</span>
    </>
  ),
  content: ({ revealStage }) => {
    const firstVisible = Math.max(0, revealStage - WINDOW + 1);
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-xl)',
          width: '100%',
          height: '100%',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* Left — the exit-code cheat sheet (the heart of the gotchas) */}
        <div style={{ flex: '0 1 auto', minWidth: 0 }}>
          <CodeBlock language="text" code={EXIT_CODES} />
        </div>

        {/* Right — the gotchas */}
        <div style={{ flex: '1 1 46%', maxWidth: '700px', textAlign: 'left' }}>
          {BULLETS.map((bullet, i) =>
            revealStage >= i && i >= firstVisible ? (
              <SlideItem key={i} delay={revealStage === i ? 0.05 : 0}>
                {bullet}
              </SlideItem>
            ) : null,
          )}
        </div>
      </div>
    );
  },
  maxRevealStages: BULLETS.length - 1,
  initialRevealStage: 0,
  notes:
    'Hooks refresher (4/4) — gotchas. 1) Only exit 2 blocks; exit 1 logs and continues — the most common mistake. 2) Hooks inherit your full shell permissions, so quote and validate every input (read all stdin first, jq -r with // empty fallbacks). 3) Keep them under ~500ms — they fire on every matching event and a slow hook makes the session sluggish. 4) A blocking Stop hook re-triggers Stop → infinite loop; bail early when stop_hook_active is true. 5) A hook that exits 0 with no stdout is misreported as a "hook error" in the transcript — always print at least {}. (Also: PostToolUse can\'t undo, matchers are case-sensitive, all matching hooks run in parallel.)',
};
