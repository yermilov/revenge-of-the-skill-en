import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// Terminal output grows one tool per stage, in sync with the bullets.
const RUNS = [
  `$ bun validate.mjs ./my-skill
  ✓ name · ✓ description 312/1024 · ✓ body 187/500`,
  `$ activation-eval ./my-skill    # ~20 queries, 3 runs each
  should trigger      8/8 ✓
  should NOT trigger  7/8 ✗  "what is kafka?" → revise, rerun`,
  `$ skill-eval ./my-skill         # with vs without
  pass rate: 14/16 with · 9/16 baseline`,
  `$ claude agent skill-reviewer ./my-skill
  fresh-context review: 2 findings`,
];

const BULLETS: ReactNode[] = [
  <>
    hard limits are <Emphasis color="green">measurable</Emphasis> — a script
    checks them, no reasoning involved
  </>,
  <>
    <Emphasis color="green">activation testing</Emphasis>: should-trigger
    phrasings + near-miss <Emphasis color="orange">should-NOTs</Emphasis>,
    description tuned over iterations
  </>,
  <>
    <Emphasis color="green">output evals</Emphasis> run every case with and
    without the skill — prove it actually helps
  </>,
  <>
    peer review by a <Emphasis color="green">fresh-context agent</Emphasis> —
    the author always <Emphasis color="orange">anchors</Emphasis>, the reviewer
    doesn’t
  </>,
];

export const SkillValidationSlide: SlideDefinition = {
  id: 'skill-validation',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">test it</span>{' '}
      <span className="text-orange">like code</span>
    </>
  ),
  content: ({ revealStage }) => {
    // Sliding window on the bullets; the terminal keeps the full history.
    const WINDOW = 3;
    const firstVisible = Math.max(0, revealStage - WINDOW + 1);
    const isVisible = (i: number) => revealStage >= i && i >= firstVisible;

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
        {/* Left — the test run, one tool per stage */}
        <div style={{ flex: '0 1 auto', minWidth: 0 }}>
          <CodeBlock
            language="bash"
            filename="skill QA pipeline"
            code={RUNS.slice(0, revealStage + 1).join('\n')}
          />
        </div>

        {/* Right — what each stage proves */}
        <div style={{ flex: '1 1 44%', maxWidth: '700px', textAlign: 'left' }}>
          {BULLETS.map((bullet, i) =>
            isVisible(i) ? (
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
    'Skill QA from skill-dev Phase 6 + the agentskills spec. 1) Deterministic constraint check via validate.mjs (measurable limits: name, description length, body size). 2) Activation testing: ~20 eval queries — 8-10 should-trigger with varied phrasing, 8-10 near-miss should-NOT-trigger sharing keywords; run 3x each, optimize the description over ~5 iterations, store in eval_queries.json for regression. 3) Output evals: each test case runs with and without the skill, assertions graded PASS/FAIL, aggregated into pass_rate/time/tokens. 4) Peer review by the skill-reviewer subagent — fresh context avoids the anchoring bias of the author.',
};
