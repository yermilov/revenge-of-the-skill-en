import { useState, useEffect, ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
// Offline fallback: a bundled snapshot of the skill-creator SKILL.md, used
// when the live fetch fails so the panel still renders on stage Wi-Fi.
import skillMdFallback from '../assets/skill-creator-skill.md?raw';

const SKILL_MD_URL =
  'https://raw.githubusercontent.com/anthropics/claude-plugins-official/main/plugins/skill-creator/skills/skill-creator/SKILL.md';

// Two consecutive bullet sets revealed one-by-one.
// Set 1 = the meta-skill thesis + how to author one (full-width, no panel).
// Set 2 = the prebuilt-vs-custom counterpoint + the live SKILL.md panel.
const FIRST_SET: ReactNode[] = [
  <>
    the most important skill in your marketplace is the{' '}
    <Emphasis color="orange">skill that creates skills</Emphasis>
  </>,
  <>
    its quality determines the quality of <Emphasis color="orange">every</Emphasis>{' '}
    skill in your marketplace
  </>,
  <>
    make Claude read{' '}
    <SlideLink href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices">
      https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
    </SlideLink>{' '}
    as a starting point
  </>,
];

const SECOND_SET: ReactNode[] = [
  <>
    or just grab the <Emphasis color="green">prebuilt</Emphasis> skill-creator from
    Anthropic:{' '}
    <SlideLink href="https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator">
      github.com/anthropics/claude-plugins-official
    </SlideLink>
  </>,
  <>
    your next problem — the balance between a{' '}
    <Emphasis color="green">prebuilt</Emphasis> skill that costs you no time or
    effort, and a <Emphasis color="orange">custom</Emphasis> skill that can capture
    all your in-house specifics
  </>,
];

function MetaSkillContent({ revealStage }: { revealStage: number }) {
  // Start with the bundled snapshot so the panel renders immediately even on
  // a flaky connection; swap to the live SKILL.md once the fetch resolves.
  const [content, setContent] = useState<string>(skillMdFallback);

  useEffect(() => {
    fetch(SKILL_MD_URL)
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed');
        return r.text();
      })
      .then(setContent)
      .catch(() => {
        // Keep the bundled fallback content visible.
      });
  }, []);

  const setIndex = revealStage < FIRST_SET.length ? 0 : 1;
  const currentSet = setIndex === 0 ? FIRST_SET : SECOND_SET;
  const visibleCount =
    setIndex === 0 ? revealStage + 1 : revealStage - FIRST_SET.length + 1;

  return (
    <div key={setIndex} className="meta-skill-body">
      <div
        className={`meta-skill-bullets${
          setIndex === 0 ? ' meta-skill-bullets--full' : ''
        }`}
      >
        {currentSet.slice(0, visibleCount).map((bullet, i) => (
          <SlideItem key={i} delay={i === visibleCount - 1 ? 0.05 : undefined}>
            {bullet}
          </SlideItem>
        ))}
      </div>

      {/* SKILL.md panel — only on the second set, paired with the
          "prebuilt skill-creator" bullet. */}
      {setIndex === 1 && (
        <div className="meta-skill-panel">
          <div className="meta-skill-panel__chrome meta-skill-panel__chrome--top">
            ░░░ SKILL.md — skill-creator ░░░
          </div>

          <div className="meta-skill-panel__viewport">
            <div className="meta-skill-panel__scroll">
              {content}
              <div className="meta-skill-panel__scroll-divider">{content}</div>
            </div>
          </div>

          <div className="meta-skill-panel__chrome meta-skill-panel__chrome--bottom">
            [END OF TRANSMISSION]
          </div>
        </div>
      )}
    </div>
  );
}

export const MetaSkillSlide: SlideDefinition = {
  id: 'meta-skill',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">meta</span>{' '}
      <span className="text-orange">skill</span>
    </>
  ),
  // 4 reveal stages: 0..2 walk through FIRST_SET (full-width thesis),
  // 3..4 walk through SECOND_SET alongside the SKILL.md panel.
  maxRevealStages: FIRST_SET.length + SECOND_SET.length - 1,
  content: ({ revealStage }) => <MetaSkillContent revealStage={revealStage} />,
  notes:
    'Meta-skills are the highest leverage point. Stage 0–2 (full-width): the skill-that-creates-skills is the most important one in the marketplace, its quality determines every other skill, point Claude at the agent-skills best-practices doc. Stage 3–4 (with SKILL.md panel): or grab the prebuilt skill-creator from Anthropic; then the real question — balance between prebuilt skills (zero effort) and custom skills (capture in-house specifics).',
};
