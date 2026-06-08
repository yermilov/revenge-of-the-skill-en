import { SlideDefinition } from '../types/slides';
import { StarWarsCrawl } from './StarWarsCrawl';
import spaceBg from '../assets/skill-space-bg.png?url';

const SPACE_BG = `
  linear-gradient(180deg, rgba(0,0,8,0.9) 0%, rgba(0,0,8,0.72) 50%, rgba(0,0,8,0.92) 100%),
  url(${spaceBg}) center/cover no-repeat
`;

export const StarWarsCrawlSlide2: SlideDefinition = {
  id: 'star-wars-crawl-2',
  background: SPACE_BG,
  content: <StarWarsCrawl scrollOffset={170} highlighted={2} />,
};
