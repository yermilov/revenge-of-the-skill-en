import { SlideDefinition } from '../types/slides';
import { Code, Emphasis } from '../components/SlideElements';

// The punchline after four dense hook slides: don't memorize any of it —
// capture it in a hook-dev skill. Mirrors MetaSkillSlide's joke for skills.
export const HookDevSkillSlide: SlideDefinition = {
  id: 'hook-dev-skill',
  content: (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        gap: 'var(--space-lg)',
        padding: '0 var(--space-xl)',
      }}
    >
      <div style={{ fontSize: 'var(--font-size-h2)', lineHeight: 1.25 }}>
        <span className="text-dim">&gt;</span> obviously, create a{' '}
        <Code>hook-dev</Code> skill
        <br />
        instead of <Emphasis color="orange">memorizing all this</Emphasis>
      </div>
      <div style={{ fontSize: '1.6rem', opacity: 0.7 }}>
        …and configure the right{' '}
        <Emphasis color="green">activation keywords</Emphasis>
      </div>
    </div>
  ),
  notes:
    'Punchline after the four hook slides — same joke as the skills meta-slide. You do not memorize any of this: you capture it in a hook-dev skill (and point it at /hook-dev). The crucial part is the description / activation keywords so the skill actually fires when you are wiring up a hook.',
};
