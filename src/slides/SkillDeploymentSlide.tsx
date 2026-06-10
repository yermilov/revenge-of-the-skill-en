import { SlideDefinition } from '../types/slides';

const MODELS = [
  {
    name: 'standard skill',
    accent: 'var(--terminal-green)',
    def: 'injected into the main conversation',
    when: 'needs context & back-and-forth',
  },
  {
    name: 'forked skill',
    accent: 'var(--terminal-cyan)',
    def: 'context: fork — runs as a subagent',
    when: 'fire-and-forget, isolates context',
  },
  {
    name: 'standalone agent',
    accent: 'var(--terminal-blue)',
    def: 'a definition in .claude/agents/',
    when: 'own tools, model, permissions — a reusable specialist',
  },
];

export const SkillDeploymentSlide: SlideDefinition = {
  id: 'skill-deployment',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">three ways</span>{' '}
      <span className="text-orange">to ship it</span>
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
      <div className="iv-duel">
        {MODELS.map((model, i) =>
          revealStage >= i ? (
            <div
              key={model.name}
              className="iv-card"
              style={{ '--iv-accent': model.accent } as React.CSSProperties}
            >
              <div className="iv-card__name">{model.name}</div>
              <div className="iv-card__def">{model.def}</div>
              <div className="iv-card__quote">{model.when}</div>
            </div>
          ) : null,
        )}
      </div>

      {revealStage >= 3 && (
        <div className="iv-verdict">
          gotcha: <span className="text-orange glow-orange">fork needs a task inside</span>{' '}
          — fork pure guidelines and the subagent{' '}
          <span className="text-orange glow-orange">returns empty</span>
        </div>
      )}
    </div>
  ),
  maxRevealStages: 3,
  initialRevealStage: 0,
  notes:
    'Deployment models from skill-dev Phase 1. Standard skill: injectable prompt augmenting the main agent — when the task needs conversation context, user interaction, iterative feedback. Forked skill: context: fork runs as a subagent — fire-and-forget with clear input→output, benefits from context isolation (fresh context, no history). Standalone agent: .claude/agents/ definition — when you need custom tool restrictions, permissions, model override, or a reusable specialist invoked by multiple callers. Gotcha: fork only works for skills with explicit task instructions; pure guidelines ("use these conventions") give the subagent no actionable prompt and it returns empty.',
};
