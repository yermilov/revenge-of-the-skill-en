import { SlideDefinition } from '../types/slides';

const TIERS = [
  {
    name: 'quick',
    accent: 'var(--terminal-green)',
    range: '~50 lines',
    def: 'a single-purpose shortcut',
  },
  {
    name: 'standard',
    accent: 'var(--terminal-cyan)',
    range: '150–400 lines',
    def: 'a workflow with embedded domain knowledge',
  },
  {
    name: 'expert',
    accent: 'var(--terminal-blue)',
    range: '400–500 + references/',
    def: 'complex domain — overflow into linked files',
  },
];

export const SkillSizeSlide: SlideDefinition = {
  id: 'skill-size',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">how much</span>{' '}
      <span className="text-orange">to write</span>
    </>
  ),
  content: ({ revealStage }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'var(--space-lg)',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <div className="iv-duel">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className="iv-card"
            style={{ '--iv-accent': tier.accent } as React.CSSProperties}
          >
            <div className="iv-card__name">{tier.name}</div>
            <div className="iv-card__quote">{tier.range}</div>
            <div className="iv-card__def">{tier.def}</div>
          </div>
        ))}
      </div>

      {revealStage >= 1 && (
        <div className="fm-example">
          <span className="fm-example__code">
            description ≤ 1024 chars · body ≤ 500 lines (~5k tokens) · catalog ≤ 2% of
            context
          </span>
        </div>
      )}

      {revealStage >= 2 && (
        <div className="size-quote">
          “Claude is already smart — only add what it doesn’t know.”
        </div>
      )}
    </div>
  ),
  maxRevealStages: 2,
  initialRevealStage: 0,
  notes:
    'Skill tiers from skill-dev Phase 1: Quick ~50 lines (single-purpose shortcut, no references), Standard 150–400 (workflow with embedded knowledge), Expert 400–500 with references/ for overflow — prefer embedding everything under 500 lines because reference files risk being skipped. Hard caps: description 1024 chars, body under 500 lines / ~5k tokens, all descriptions together ~2% of the context window. The closing discipline: challenge each paragraph — does it justify its token cost?',
};
