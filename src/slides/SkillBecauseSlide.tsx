import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// One diff hunk per principle — the diff grows as each bullet lands.
const HUNKS = [
  `- NEVER use sleep() in tests
+ NEVER use sleep() in tests because it
+ creates flaky, timing-dependent failures`,
  `- our API endpoints: /v1/users, /v1/teams, …
+ run: grep -r "router." src/api
+ (the list is always current)`,
  `- migrate the database as appropriate
+ run exactly: npm run migrate --env prod`,
];

const BULLETS: ReactNode[] = [
  <>
    a bare rule is <Emphasis color="orange">brittle</Emphasis> — the model
    generalizes from the <Emphasis color="green">why</Emphasis> to edge cases
    you never wrote down
  </>,
  <>
    <Emphasis color="green">runtime retrieval</Emphasis> over static knowledge —
    anything grep-able starts <Emphasis color="orange">going stale</Emphasis>{' '}
    the day you paste it
  </>,
  <>
    match <Emphasis color="green">freedom to fragility</Emphasis> — judgment
    gets principles, fragile operations get{' '}
    <Emphasis color="orange">exact commands</Emphasis>
  </>,
];

export const SkillBecauseSlide: SlideDefinition = {
  id: 'skill-because',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">do X</span>{' '}
      <span className="text-orange">because Y</span>
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
      {/* Left — the same SKILL.md reviewed, one fix per principle */}
      <div style={{ flex: '0 1 auto', minWidth: 0 }}>
        <CodeBlock
          language="diff"
          filename="SKILL.md — review"
          code={HUNKS.slice(0, revealStage + 1).join('\n\n')}
        />
      </div>

      {/* Right — the principles */}
      <div style={{ flex: '1 1 46%', maxWidth: '720px', textAlign: 'left' }}>
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
    'Content principles from skill-dev Phase 5, shown as a code-review diff. 1) Motivation for every rule: bare MUST/NEVER is brittle, the model generalizes from the reason to unseen edge cases. 2) Runtime retrieval over static inclusion: if the model can find it via grep/read/run, write instructions to find it — pasted knowledge goes stale. 3) Match freedom to fragility: high freedom for judgment tasks, exact commands for fragile operations.',
};
