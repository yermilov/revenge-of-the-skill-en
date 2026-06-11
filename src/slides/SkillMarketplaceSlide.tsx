import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis, Code } from '../components/SlideElements';
import superhumanAidevImage from '../assets/superhuman-aidev.png?url';

// Two consecutive bullet sets revealed one-by-one. Set 1 = the DIY symlink
// approach Superhuman built; set 2 = how Anthropic's native marketplaces
// land the same idea natively. The slide moves from set 1 → set 2 once all
// of set 1's bullets have been revealed.
const FIRST_SET: ReactNode[] = [
  <>
    skills are <Emphasis color="green">building blocks</Emphasis> every engineer
    can use to assemble their own workflow
  </>,
  <>
    people hate reading and writing documentation, but{' '}
    <Emphasis color="orange">agents love it</Emphasis> — convert all your
    documentation into skills
  </>,
  <>
    at Superhuman we made skills shared early on, with a tool that clones a
    GitHub repo of skills and symlinks them into{' '}
    <Code>~/.claude/skills/</Code>
  </>,
  <>
    every engineer who uses a skill adds improvements — and everyone gets{' '}
    <Emphasis color="green">more productive</Emphasis>
  </>,
];

const SECOND_SET: ReactNode[] = [
  <>
    then Anthropic shipped <Emphasis color="green">marketplaces</Emphasis> —
    same idea, but native
  </>,
  <>
    create ONE central internal <Emphasis color="orange">marketplace</Emphasis>{' '}
    for skills in your organization
  </>,
  <>
    use plugins for <Emphasis color="orange">namespacing</Emphasis> — each user
    picks which plugins to install
  </>,
  <>
    if you can — use <Emphasis color="green">Claude Enterprise</Emphasis> to
    force-install the marketplace and specific plugins for everyone in the org
  </>,
];

export const SkillMarketplaceSlide: SlideDefinition = {
  id: 'skill-marketplace',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">skill</span>{' '}
      <span className="text-orange">marketplace</span>
    </>
  ),
  // 8 reveal stages: 0..3 walk through FIRST_SET, 4..7 walk through SECOND_SET.
  maxRevealStages: FIRST_SET.length + SECOND_SET.length - 1,
  content: ({ revealStage }) => {
    const setIndex = revealStage < FIRST_SET.length ? 0 : 1;
    const currentSet = setIndex === 0 ? FIRST_SET : SECOND_SET;
    const visibleCount =
      setIndex === 0 ? revealStage + 1 : revealStage - FIRST_SET.length + 1;

    return (
      <div key={setIndex} className="skill-marketplace-body">
        {/* Bullets — full-width on the DIY set, half-width once the
            Anthropic marketplaces screenshot enters the layout. */}
        <div
          className={`skill-marketplace-bullets${
            setIndex === 0 ? ' skill-marketplace-bullets--full' : ''
          }`}
        >
          {currentSet.slice(0, visibleCount).map((bullet, i) => (
            <SlideItem key={i} delay={i === 0 ? 0.05 : 0}>
              {bullet}
            </SlideItem>
          ))}
        </div>

        {/* Right — Superhuman AI Dev marketplace screenshot, only on the
            Anthropic-marketplaces half of the slide. */}
        {setIndex === 1 && (
          <div className="skill-marketplace-shot">
            <img
              src={superhumanAidevImage}
              alt="Superhuman AI Dev marketplace"
              loading="lazy"
            />
          </div>
        )}
      </div>
    );
  },
  notes:
    'Stage 0–3: the Superhuman DIY approach — building blocks, converting documentation into skills, the network effect, distribution via symlinks into ~/.claude/skills/. Stage 4–7: Anthropic native marketplaces — create one internal marketplace, use plugins for namespacing, Enterprise controls to force-install for the whole org.',
};
