import { SlideDefinition } from '../types/slides';

interface LintFinding {
  bad: string;
  fix: string;
}

const FINDINGS: LintFinding[] = [
  { bad: 'knowledge dump, no instructions', fix: 'rewrite as: do X because Y' },
  { bad: 'vague pointer: "see references/"', fix: '"read spec.md when validating frontmatter"' },
  { bad: 'files nested 3 levels deep', fix: 'one level max — deep chains get half-read' },
  { bad: 'bare "NEVER do X"', fix: 'add the because — reasons generalize' },
  { bad: 'body is 730 lines', fix: 'cap ~500, overflow into references/' },
  { bad: 'step 1: install gh, jq, bun', fix: 'assume installed; setup → troubleshooting.md' },
  { bad: 'explains what JSON is', fix: 'would the model get it wrong without it? delete' },
];

export const SkillAntiPatternsSlide: SlideDefinition = {
  id: 'skill-antipatterns',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">how to ruin</span>{' '}
      <span className="text-orange">a skill</span>
    </>
  ),
  content: ({ revealStage }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <div className="lint-card">
        <div className="lint-card__cmd">skill-lint ./my-skill</div>
        {FINDINGS.map((finding, i) =>
          revealStage >= i ? (
            <div key={i} className="lint-row">
              <span className="lint-row__x">✗</span>
              <span className="lint-row__bad">{finding.bad}</span>
              <span className="lint-row__arrow">→</span>
              <span className="lint-row__fix">{finding.fix}</span>
            </div>
          ) : null,
        )}
        {revealStage >= FINDINGS.length - 1 && (
          <div className="lint-card__summary">
            7 problems — all of them writing choices
          </div>
        )}
      </div>
    </div>
  ),
  maxRevealStages: FINDINGS.length - 1,
  initialRevealStage: 0,
  notes:
    'Anti-patterns from skill-dev Phase 5 presented as a linter run. Knowledge dump → restructure as instructions; vague "see refs/" → explicit read-X-when-Y loading conditions; deep nesting → one level max (deeper gets partially read); bare MUST/NEVER → add the because; >500-line body → progressive disclosure via references/; installation steps in the body → assume tools installed, move setup to troubleshooting.md read on failure; info the model already knows → the litmus test is "would Claude get this wrong without this?".',
};
