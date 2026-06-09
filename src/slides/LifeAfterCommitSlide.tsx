import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>explain to Claude Code how to run tests and start your app locally</>,
  <>
    ask Claude to always add lots of logging, and explain how to access the local log file
  </>,
  <>
    explain to Claude how to "click through your service" so it can test it
  </>,
  <>
    teach Claude Code where it can find logs, metrics, and traces from your different environments (including production)
  </>,
];

export const LifeAfterCommitSlide: SlideDefinition = {
  id: 'life-after-commit',
  title: (
    <>
      <span className="text-dim">&gt;</span> life after the commit
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => {
    // rolling window: keep the most recent 5 bullets so the newest always fits
    const WINDOW = 5;
    const firstVisible = Math.max(0, revealStage - WINDOW);
    return (
      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {BULLETS.map((bullet, i) =>
          revealStage >= i + 1 && i >= firstVisible ? (
            <SlideItem key={i} delay={0}>{bullet}</SlideItem>
          ) : null,
        )}
      </div>
    );
  },
  notes:
    'Life after commit - logging (add lots of logging, local log file, ship to BetterStack), web testing (Chrome extension + /chrome, explain how to click through the service), and chrome-devtools-mcp. Bullets revealed one at a time.',
};
