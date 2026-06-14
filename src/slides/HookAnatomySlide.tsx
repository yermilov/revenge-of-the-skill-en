import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// The lifecycle, top to bottom — the moments a hook can fire.
const LIFECYCLE = `SessionStart       load context, set env
UserPromptSubmit   you submit a prompt
PreToolUse         before a tool runs   ← can block
PostToolUse        after it returns
Stop               Claude wraps up      ← can block
SessionEnd         cleanup`;

const BULLETS: ReactNode[] = [
  <>
    a hook is <Emphasis color="green">deterministic</Emphasis> — it fires on a
    lifecycle event, no model in the loop
  </>,
  <>
    a skill the model <Emphasis color="orange">chooses</Emphasis> to use; a hook{' '}
    <Emphasis color="green">always runs</Emphasis> — enforce, validate, log,
    inject
  </>,
  <>
    four handler types: <Emphasis color="green">command</Emphasis> · http ·
    prompt · agent
  </>,
];

export const HookAnatomySlide: SlideDefinition = {
  id: 'hook-anatomy',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">what is</span>{' '}
      <span className="text-orange">a hook</span>
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
      {/* Left — the lifecycle the hook taps into */}
      <div style={{ flex: '0 1 auto', minWidth: 0 }}>
        <CodeBlock language="text" code={LIFECYCLE} />
      </div>

      {/* Right — what a hook is */}
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
    'Hooks refresher (1/4) — what a hook is. A hook is deterministic event-driven automation: it fires at a fixed point in Claude Code\'s lifecycle with no model in the loop, so unlike a skill (which the model chooses to invoke) a hook always runs — for enforcement, validation, logging, context injection. Lifecycle events shown: SessionStart (load context / set env), UserPromptSubmit (you submit a prompt), PreToolUse (before a tool runs — can block), PostToolUse (after it returns), Stop (Claude wraps up — can block), SessionEnd (cleanup). Four handler types: command (shell), http (webhook), prompt (fast LLM), agent (LLM + Read/Grep/Glob).',
};
