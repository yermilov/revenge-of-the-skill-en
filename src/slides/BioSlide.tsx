import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import yarikBadges from '/yarik-badges.jpg?url';

type Level = 'high' | 'medium' | 'low';

const levelStyles: Record<Level, { prefix: string; prefixColor: string; opacity: number }> = {
  high: {
    prefix: '>>',
    prefixColor: 'var(--terminal-orange)',
    opacity: 1,
  },
  medium: {
    prefix: '> ',
    prefixColor: 'var(--terminal-blue)',
    opacity: 1,
  },
  low: {
    prefix: '--',
    prefixColor: 'var(--terminal-white-dim)',
    opacity: 0.85,
  },
};

function BioItem({ level, children }: { level: Level; children: React.ReactNode }) {
  const s = levelStyles[level];

  return (
    <div className="bio-item" style={{ opacity: s.opacity }}>
      <span className="bio-item__prefix" style={{ color: s.prefixColor }}>
        {s.prefix}
      </span>
      <span style={{ color: 'var(--terminal-white)' }}>{children}</span>
    </div>
  );
}

function BioSubItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="bio-sub-item">
      <span className="bio-sub-item__prefix">--</span>
      <span>{children}</span>
    </div>
  );
}

const BIO_ITEMS: { level: Level; content: ReactNode }[] = [
  { level: 'low',    content: <>started as a Java backend engineer</> },
  { level: 'medium', content: <>then: tech-led product features</> },
  { level: 'medium', content: <>then: tech lead of the platform org</> },
  { level: 'high',   content: <>now: AI-first engineering</> },
];

const AI_FIRST_SUBS = [
  'saw the potential and consciously stopped writing code by hand',
  'found my comfortable AI agentic coding workflow',
  'championed Claude Code at Superhuman',
  'built internal tooling: plugins, skills, agents',
];

export const BioSlide: SlideDefinition = {
  id: 'bio',
  title: (
    <>
      <span className="text-dim">&gt;</span> whoami
    </>
  ),
  maxRevealStages: BIO_ITEMS.length - 1,
  content: ({ revealStage }) => (
    <div className="bio-slide">
      <div className="bio-slide-content">
        <p className="bio-subtitle">
          9 years at Superhuman (formerly Grammarly)
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {BIO_ITEMS.map((item, i) =>
            revealStage >= i ? (
              <BioItem key={i} level={item.level}>{item.content}</BioItem>
            ) : null,
          )}
          {revealStage >= 3 && (
            <div className="bio-sub-items">
              {AI_FIRST_SUBS.map((text, i) => (
                <BioSubItem key={i}>{text}</BioSubItem>
              ))}
            </div>
          )}
        </div>
      </div>
      <img
        src={yarikBadges}
        alt="Grammarly badges"
        className="bio-slide-image"
        loading="lazy"
      />
    </div>
  ),
};
