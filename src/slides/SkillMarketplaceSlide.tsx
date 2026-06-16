import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis, Code } from '../components/SlideElements';
import superhumanAidevImage from '../assets/superhuman-aidev.png?url';

// Anthropic's native marketplaces — revealed one bullet at a time alongside
// the Superhuman AI Dev marketplace screenshot.
const BULLETS: ReactNode[] = [
  <>
    create ONE central internal <Emphasis color="orange">marketplace</Emphasis>{' '}
    for skills in your organization
  </>,
  <>
    use plugins for <Emphasis color="green">namespacing</Emphasis> — each user
    picks which plugins to install
  </>,
  <>
    <Emphasis color="orange">WARNING!</Emphasis> custom marketplaces don't update automatically
  </>,
  <>
    create interactive <Code>/setup-plugins</Code> skill that helps users discover and install the relevant plugins for their needs and enable marketplace auto-update
  </>,
];

export const SkillMarketplaceSlide: SlideDefinition = {
  id: 'skill-marketplace',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">how to</span>{' '}
      <span className="text-orange">distribute skills</span>
    </>
  ),
  maxRevealStages: BULLETS.length - 1,
  content: ({ revealStage }) => (
    <div className="skill-marketplace-body">
      {/* Left — the Anthropic-marketplaces beats */}
      <div className="skill-marketplace-bullets">
        {BULLETS.slice(0, revealStage + 1).map((bullet, i) => (
          <SlideItem key={i} delay={i === 0 ? 0.05 : 0}>
            {bullet}
          </SlideItem>
        ))}
      </div>

      {/* Right — Superhuman AI Dev marketplace screenshot */}
      <div className="skill-marketplace-shot">
        <img
          src={superhumanAidevImage}
          alt="Superhuman AI Dev marketplace"
          loading="lazy"
        />
      </div>
    </div>
  ),
  notes:
    'Anthropic native marketplaces — create one internal marketplace, use plugins for namespacing, Enterprise controls to force-install for the whole org.',
};
