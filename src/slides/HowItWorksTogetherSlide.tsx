import { SlideDefinition } from '../types/slides';
import howItWorksTogether from '/how-it-works-together.png?url';

export const HowItWorksTogetherSlide: SlideDefinition = {
  id: 'how-it-works-together',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">how it works</span>{' '}
      <span className="text-orange">together?</span>
    </>
  ),
  content: (
    <div className="image-slide">
      <img
        src={howItWorksTogether}
        alt="Vintage natural-history habitat plate showing how the pieces work together: butterflies labeled SKILLS, ants and sentinel beetles labeled HOOKS, beehives labeled PLUGINS, all connected to a central tree labeled MARKETPLACE"
        loading="lazy"
      />
    </div>
  ),
  notes:
    'How it all works together, as a naturalist ecosystem plate (sequel to the beetle anatomy plate). Skills (butterflies), hooks (ants/sentinels), and plugins (beehives) all coexist in one habitat and connect to the marketplace (the central tree) that distributes them. The point: skills, hooks, and plugins are not separate tricks — they are one ecosystem you grow and share.',
};
