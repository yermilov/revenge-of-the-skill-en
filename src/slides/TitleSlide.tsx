import { SlideDefinition } from '../types/slides';

export const TitleSlide: SlideDefinition = {
  id: 'title',
  content: (
    <div className="title-slide">
      <h1 className="hero title-glow">Episode II: Revenge of the Skill</h1>
      <p className="title-tagline">Advanced session on skill creation</p>
      <p className="title-subtitle">Yaroslav Yermilov, Principal Software Engineer @ Superhuman (formerly Grammarly)</p>
    </div>
  ),
};
