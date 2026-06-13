import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';

// Left column — instruction skills (the default). Revealed one fact per stage.
const INSTRUCTIONS: ReactNode[] = [
  <>step-by-step guide how to do something</>,
  <>more often invokable by user than by model</>,
  <>if there are more than 4-6 steps, use Todo/Tasks capability to keep track on what to do</>,
];

// Right column — knowledge skills. Revealed only after every instruction fact.
const KNOWLEDGE: ReactNode[] = [
  <>facts the model don't know - most often about your internal specifics</>,
  <>or gotchas for common mistakes model makes</>,
  <>more often invokable by model than by user</>,
];

const KNOWLEDGE_START = INSTRUCTIONS.length;
const LAST_STAGE = INSTRUCTIONS.length + KNOWLEDGE.length - 1;

export const SkillPatternsSlide: SlideDefinition = {
  id: 'skill-patterns',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">instructions</span>{' '}
      <span className="text-dim">vs</span>{' '}
      <span className="text-green">knowledge</span>{' '}
      <span className="text-orange">skills</span>
    </>
  ),
  content: ({ revealStage }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <div className="ivk-grid">
        {/* Left — instructions (green), built first */}
        <div
          className="ivk-col"
          style={{ '--ivk-accent': 'var(--terminal-green)' } as React.CSSProperties}
        >
          <div className="ivk-col__head">instructions</div>
          {INSTRUCTIONS.map((fact, i) =>
            revealStage >= i ? (
              <div key={i} className="ivk-item">
                {fact}
              </div>
            ) : null,
          )}
        </div>

        {/* Right — knowledge (orange), built after the left column completes */}
        <div
          className="ivk-col"
          style={{ '--ivk-accent': 'var(--terminal-orange)' } as React.CSSProperties}
        >
          <div className="ivk-col__head">knowledge</div>
          {KNOWLEDGE.map((fact, j) =>
            revealStage >= KNOWLEDGE_START + j ? (
              <div key={j} className="ivk-item">
                {fact}
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  ),
  maxRevealStages: LAST_STAGE,
  initialRevealStage: 0,
  notes:
    'Two main skill patterns from skill-dev Phase 2, built column by column. Instructions (the default): a multi-step workflow — numbered steps, decision points, feedback loops — written as "do X because Y" so the reason lets the model generalize; instruction-style content beats knowledge dumps by +16.2pp; tool automation (exact CLI commands) and meta (skills about skills) are instruction-shaped. Knowledge: facts the model can\'t derive, SKILL.md routes to reference files, reads as "here is how X works"; only justified when the model would genuinely get it wrong (unnecessary dumps degrade ~1.3pp); prefer runtime retrieval over static inclusion (3x accuracy, ~50% fewer tokens); creative/generative is knowledge-shaped.',
};
