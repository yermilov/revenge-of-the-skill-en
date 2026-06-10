import { SlideDefinition } from '../types/slides';
import skillAnatomy from '/skill-anatomy.png?url';

export const SkillAnatomySlide: SlideDefinition = {
  id: 'skill-anatomy',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">anatomy of the</span>{' '}
      <span className="text-orange">skill</span>
    </>
  ),
  content: (
    <div className="image-slide">
      <img
        src={skillAnatomy}
        alt="Vintage entomology plate of a pinned beetle whose body parts are labeled as skill parts: frontmatter, triggers, SKILL.md instructions, references, scripts, assets"
        loading="lazy"
      />
    </div>
  ),
  notes:
    'Anatomy of a skill as a biology-textbook plate. Head = frontmatter (name + description), antennae = triggers, thorax = SKILL.md instructions, wings = linked reference .md files, legs = scripts (bash/python/ts), abdomen = assets.',
};
