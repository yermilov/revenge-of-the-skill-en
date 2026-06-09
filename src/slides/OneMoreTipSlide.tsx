import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { PacManCanvas } from '../components/pacman/PacManCanvas';

const BULLETS: ReactNode[] = [
  <>
    on your own you'll write code either <Emphasis color="orange">better</Emphasis>{' '}
    or <Emphasis color="orange">faster</Emphasis>
  </>,
  <>
    watching Claude work in the terminal is a{' '}
    <Emphasis color="orange">waste of productivity and money</Emphasis>
  </>,
  <>
    find 2–3 tasks you can hand to Claude with minimal supervision, and{' '}
    <Emphasis color="orange">switch yourself to the task that needs your full attention</Emphasis>
  </>,
  <>
    or just kick off Claude and <Emphasis>take a break</Emphasis>
  </>,
];

export const OneMoreTipSlide: SlideDefinition = {
  id: 'one-more-tip',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">increase the</span>{' '}
      <span className="text-orange">volume</span>, not{' '}
      <span className="text-orange">speed</span>
    </>
  ),
  content: ({ revealStage }) => {
    const idx = Math.min(revealStage, BULLETS.length - 1);
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
      {/* Left column — one bullet at a time, swapped on reveal */}
      <div
        style={{
          flex: '1 1 60%',
          maxWidth: '900px',
          textAlign: 'left',
        }}
      >
        <SlideItem key={idx} delay={0.05}>
          {BULLETS[idx]}
        </SlideItem>
      </div>

      {/* Right column — Pac-Man animation. Drive size from parent height so
       * the 4:3 canvas always fits inside the title-band layout instead of
       * overflowing and getting clipped by the row's overflow: hidden. */}
      <div
        style={{
          flex: '0 0 auto',
          height: '100%',
          aspectRatio: '320 / 240',
        }}
      >
        <PacManCanvas revealStage={revealStage} />
      </div>
    </div>
    );
  },
  maxRevealStages: 4,
  notes:
    "Reality check with an 8-bit Pac-Man animation. 5 reveal stages: 0 — Claude gives volume, not speed; 1 — on your own it's more effective; 2 — watching = lost productivity; 3 — delegate 2-3, focus on one; 4 — kick it off and take a break.",
};
