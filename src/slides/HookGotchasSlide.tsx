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
    always print <Code>{'{}'}</Code> on exit 0 — silent success shows as a{' '}
    <Emphasis color="orange">“hook error”</Emphasis>
  </>,
  <>
    keep them <Emphasis color="green">under ~500ms</Emphasis> — they fire on every
    matching event
  </>,
  <>
    <Code>async: true</Code> is <Emphasis color="green">fire-and-forget</Emphasis> —
    non-blocking, so <Emphasis color="orange">exit 2 is ignored</Emphasis>; use it
    for logging / notifications
  </>,
];

export const HookGotchasSlide: SlideDefinition = {
  id: 'hook-gotchas',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">hook</span>{' '}
      <span className="text-orange">gotchas</span>
    </>
  ),
  content: ({ revealStage }) => (
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
          revealStage >= i ? (
            <SlideItem key={i} delay={revealStage === i ? 0.05 : 0}>
              {bullet}
            </SlideItem>
          ) : null,
        )}
      </div>
    </div>
  ),
  maxRevealStages: BULLETS.length - 1,
  initialRevealStage: 0,
  notes:
    'Hooks refresher (4/4) — gotchas. 1) Only exit 2 blocks; exit 1 logs and continues — the most common mistake. 2) A hook that exits 0 with no stdout is misreported as a "hook error" in the transcript — always print at least {}. 3) Keep them under ~500ms — they fire on every matching event and a slow hook makes the session sluggish. 4) Async hooks: set "async": true to fire-and-forget; Claude does not wait, so they are non-blocking and exit 2 is ignored — use them for logging / notifications / cleanup, NOT for gating. (Also worth knowing: hooks run with your full shell so quote/validate inputs; a blocking Stop hook can loop unless you bail on stop_hook_active; PostToolUse can\'t undo; matchers are case-sensitive; all matching hooks run in parallel.)',
};
