import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// One review-diff hunk per best practice — the panel shows the hunk(s) for the
// currently-visible principles, so each rule is illustrated by a before/after.
const HUNKS = [
  `- NEVER use sleep() in tests
+ NEVER use sleep() in tests — it makes
+ them flaky and timing-dependent`,
  `- (a paragraph explaining how the parser works)
+ run: node scripts/parse.mjs <file>
+ then read its JSON output`,
  `- our endpoints: /v1/users, /v1/teams, …
+ run: grep -rn "@route" src/api`,
  `- migrate the database as appropriate
+ run exactly: npm run migrate --env prod`,
  `- see references/ for the details
+ read references/spec.md when
+ validating frontmatter`,
  `- step 1: brew install gh jq bun
+ (assume installed — setup lives
+ in troubleshooting.md)`,
  `- # …730 lines, everything inline
+ # 180 lines + references/ for the rest`,
];

const BULLETS: ReactNode[] = [
  <>
    every rule gets a <Emphasis color="green">because</Emphasis> — a bare rule is{' '}
    <Emphasis color="orange">brittle</Emphasis>; the reason lets the model
    generalize to edge cases
  </>,
  <>
    <Emphasis color="green">instructions</Emphasis>, not knowledge dumps — write{' '}
    <Emphasis color="green">do X</Emphasis>, not a lecture on how X works
  </>,
  <>
    <Emphasis color="green">runtime retrieval</Emphasis> over pasted facts —
    anything grep-able starts <Emphasis color="orange">going stale</Emphasis> the
    day you paste it
  </>,
  <>
    match <Emphasis color="green">freedom to fragility</Emphasis> — judgment gets
    principles, fragile ops get <Emphasis color="orange">exact commands</Emphasis>
  </>,
  <>
    point to references <Emphasis color="green">explicitly</Emphasis> —{' '}
    <Emphasis color="green">read X when Y</Emphasis>, never a vague{' '}
    <Emphasis color="orange">“see references/”</Emphasis>
  </>,
  <>
    assume tools are <Emphasis color="green">installed</Emphasis> — setup belongs
    in <Emphasis color="green">troubleshooting.md</Emphasis>, read on failure
  </>,
  <>
    keep it <Emphasis color="green">lean</Emphasis> — cap{' '}
    <Emphasis color="orange">~500 lines</Emphasis> and one level of nesting;
    overflow into <Emphasis color="green">references/</Emphasis>
  </>,
];

// Sliding window keeps the diff + principles on screen as the list grows past
// what fits — older rules scroll off; the newest stays in focus.
const WINDOW = 3;

export const SkillBecauseSlide: SlideDefinition = {
  id: 'skill-because',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">some</span>{' '}
      <span className="text-orange">best practices</span>
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
        {/* Left — the SKILL.md review: the hunk(s) for the visible principles */}
        <div style={{ flex: '0 1 auto', minWidth: 0 }}>
          <CodeBlock
            language="diff"
            filename="SKILL.md — review"
            code={HUNKS.slice(firstVisible, revealStage + 1).join('\n\n')}
          />
        </div>

        {/* Right — the principles */}
        <div style={{ flex: '1 1 46%', maxWidth: '720px', textAlign: 'left' }}>
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
    'Skill-authoring best practices from skill-dev Phase 5, shown as a code-review diff (one hunk per rule, sliding window of 3). 1) Motivation for every rule — bare MUST/NEVER is brittle, the model generalizes from the reason. 2) Instructions over knowledge dumps (+16.2pp) — "do X", not a lecture. 3) Runtime retrieval over static inclusion — grep-able info goes stale. 4) Match freedom to fragility — judgment gets principles, fragile ops get exact commands. 5) Explicit loading conditions — "read X when Y", not vague "see references/". 6) Assume tools installed — setup lives in troubleshooting.md, read on failure. 7) Keep it lean — cap ~500 lines, one level of nesting, overflow into references/.',
};
