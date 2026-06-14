import { SlideDefinition } from '../types/slides';
import { Code, Emphasis } from '../components/SlideElements';

// Same punchline, this time for the plugin/marketplace arc: don't memorize it —
// capture it in a plugin-dev skill with the right activation keywords.
export const PluginDevSkillSlide: SlideDefinition = {
  id: 'plugin-dev-skill',
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
        <Code>plugin-dev</Code> skill
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
    'Punchline after the plugin/marketplace arc — same joke again. Do not memorize the manifest/marketplace/shipping mechanics: capture them in a plugin-dev skill (point it at /plugin-dev). The activation keywords / description are what make it fire when you start building or distributing a plugin.',
};
