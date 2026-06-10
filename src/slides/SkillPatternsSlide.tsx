import { SlideDefinition } from '../types/slides';

export const SkillPatternsSlide: SlideDefinition = {
  id: 'skill-patterns',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">instructions</span>{' '}
      <span className="text-dim">vs</span>{' '}
      <span className="text-orange">knowledge</span>
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
        <div
          className="iv-card"
          style={{ '--iv-accent': 'var(--terminal-green)' } as React.CSSProperties}
        >
          <div className="iv-card__name">instruction runner</div>
          <div className="iv-card__def">
            a workflow — numbered steps, decision points, feedback loops
          </div>
          {revealStage >= 1 && <div className="iv-card__quote">“do X because Y”</div>}
          {revealStage >= 2 && (
            <div className="iv-card__subs">
              <div className="iv-sub">
                <span className="iv-sub__name">tool automation</span> — exact CLI
                commands
              </div>
              <div className="iv-sub">
                <span className="iv-sub__name">meta</span> — skills about skills
              </div>
            </div>
          )}
        </div>

        <div className="iv-vs">vs</div>

        <div
          className="iv-card"
          style={{ '--iv-accent': 'var(--terminal-orange)' } as React.CSSProperties}
        >
          <div className="iv-card__name">knowledge reference</div>
          <div className="iv-card__def">
            facts the model can’t derive — SKILL.md routes to reference files
          </div>
          {revealStage >= 1 && <div className="iv-card__quote">“here is how X works”</div>}
          {revealStage >= 2 && (
            <div className="iv-card__subs">
              <div className="iv-sub">
                <span className="iv-sub__name">creative / generative</span> — taste
                by exclusion
              </div>
            </div>
          )}
        </div>
      </div>

      {revealStage >= 2 && (
        <div className="iv-verdict">
          default to <span className="text-green glow-green">instructions</span> — add
          knowledge only when the model would{' '}
          <span className="text-orange glow-orange">genuinely get it wrong</span>
        </div>
      )}
    </div>
  ),
  maxRevealStages: 2,
  initialRevealStage: 0,
  notes:
    'Two main skill patterns from skill-dev Phase 2. Pattern A — Instruction Runner (the default): multi-step workflow with decision points and feedback loops, written as "do X because Y". Pattern B — Knowledge Reference: domain knowledge the model can\'t derive, SKILL.md routes to reference files; only justified when Claude would genuinely get it wrong — unnecessary knowledge dumps actively degrade performance. Decision tree: multi-step → A; knowledge gaps → B (inline under A when possible). The other three patterns embed as flavors of the two families: tool automation (exact CLI commands, low freedom) and meta (skills about skills) are instruction-shaped; creative/generative (aesthetic constraints, taste by exclusion) is knowledge-shaped.',
};
