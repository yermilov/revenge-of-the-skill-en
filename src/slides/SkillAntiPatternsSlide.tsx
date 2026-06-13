import { SlideDefinition } from '../types/slides';
import { CodeBlock } from '../components/CodeBlock';

// The best practices from the previous slide, turned into lint checks — each
// rule is a few lines of validate.mjs. Checks accumulate one per reveal.
const HEADER = `// validate.mjs — lint a SKILL.md against the rules
const { fm, body, refs } = parseSkill('SKILL.md')`;

const CHECKS = [
  `if (lines(body) > 500) fail('too long — split into references/')`,
  `if (refs.some(f => depth(f) > 1)) fail('one level of nesting max')`,
  `if (/NEVER|MUST/.test(body) && !/because/.test(body)) warn('add the "because"')`,
  `if (/\\/v1\\/|https?:\\/\\//.test(body)) warn('pasted facts drift — grep instead')`,
  `if (/(brew|npm|pip) install/.test(body)) warn('setup → troubleshooting.md')`,
  `if (!/TRIGGER|use when/i.test(fm.description)) warn('weak activation keywords')`,
];

export const SkillAntiPatternsSlide: SlideDefinition = {
  id: 'skill-antipatterns',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">lint</span>{' '}
      <span className="text-orange">the rules</span>
    </>
  ),
  content: ({ revealStage }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-md)',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1040px' }}>
        <CodeBlock
          language="javascript"
          filename="validate.mjs"
          code={`${HEADER}\n\n${CHECKS.slice(0, revealStage + 1).join('\n')}`}
        />
      </div>
    </div>
  ),
  maxRevealStages: CHECKS.length - 1,
  initialRevealStage: 0,
  notes:
    'The best practices from the previous slide turned into a validate.mjs linter — each rule is a few lines, checks accumulate per reveal. Bare MUST/NEVER without "because" → warn; pasted URLs/versioned paths that drift → prefer a grep; body over 500 lines → overflow into references/; references nested deeper than one level → fail; install commands in the body → move setup to troubleshooting.md; description without trigger keywords → weak activation. The point: these are mechanical writing checks, so they belong in CI or a pre-commit hook (skill-dev ships exactly such a validate.mjs).',
};
