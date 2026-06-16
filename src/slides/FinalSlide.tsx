import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis, Code } from '../components/SlideElements';
import linkedinQr from '/linkedin-qr.jpeg?url';

const BULLETS: ReactNode[] = [
  <>
    skills = <Emphasis color="green">reusable expertise</Emphasis> — teach Claude
    once, reuse forever; capture your next <Emphasis color="green">repeatable
    task</Emphasis> or recurring mistake as one
  </>,
  <>
    they compose: <Emphasis color="orange">basic → task → workflow</Emphasis> —
    small skills stack into whole jobs
  </>,
  <>
    <Code>hooks</Code> <Emphasis color="green">always run</Emphasis> (skills the
    model <Emphasis color="orange">chooses</Emphasis>) — enforce, validate, track
    what's used
  </>,
  <>
    distribute across the team — stand up a{' '}
    <Emphasis color="green">marketplace</Emphasis> and force-install it
  </>,
  <>
    don't memorize any of this — build <Code>skill-dev</Code> ·{' '}
    <Code>hook-dev</Code> · <Code>plugin-dev</Code> skills with the right
    activation
  </>,
  <>
    share the building blocks → the team's{' '}
    <Emphasis color="green">flywheel</Emphasis> spins faster
  </>,
  <>
    questions? ask me now or <Code>@claude-code-guide</Code> later
  </>,
  <>
    or reach me on LinkedIn{' '}
    <span style={{ color: 'var(--terminal-blue)' }}>→</span>
  </>,
];

export const FinalSlide: SlideDefinition = {
  id: 'final',
  title: (
    <>
      <span className="text-dim">&gt;</span> compacting the conversation...
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3xl)',
          width: '100%',
          paddingBottom: 'var(--space-xl)',
        }}
      >
        {/* Left column - bullets */}
        <div
          style={{
            flex: 1,
            maxWidth: '650px',
            textAlign: 'left',
          }}
        >
          {(() => {
            // rolling window: overflow slide
            const WINDOW = 3;
            const firstVisible = Math.max(0, revealStage - WINDOW);
            return BULLETS.map((bullet, i) =>
              revealStage >= i + 1 && i >= firstVisible ? (
                <SlideItem key={i} delay={0}>
                  {bullet}
                </SlideItem>
              ) : null,
            );
          })()}
        </div>

        {/* Right column - QR code, revealed only on the final stage */}
        {revealStage >= BULLETS.length && (
          <img
            src={linkedinQr}
            alt="LinkedIn QR code - Yarik Yermilov"
            style={{
              flexShrink: 0,
              maxWidth: '600px',
              maxHeight: 'calc(100vh - 180px)',
              objectFit: 'contain',
              borderRadius: 'var(--input-border-radius)',
              border: '2px solid var(--terminal-border)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              opacity: 0,
              animation: 'slideItemFadeIn 0.5s ease-out forwards',
            }}
          />
        )}
      </div>
    </>
  ),
  notes:
    'Final slide - closing thoughts: think beyond autocomplete, follow AI engineers on Twitter, filter hype, adapt approaches to your needs, focus on throughput not latency, connect on LinkedIn',
};
