import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// A polished marketplace entry — the description sells the value, the category
// places it, the homepage points at docs. Terse plugin.json label lives apart.
const ENTRY = `// .claude-plugin/marketplace.json
{
  "name": "quit-vim",
  "description": "Escape vim for good —
    :q, :wq, and the panic exits, explained",
  "category": "productivity",
  "homepage": "github.com/org/plugins/quit-vim"
}`;

const BULLETS: ReactNode[] = [
  <>
    <Code>description</Code>: action-oriented and{' '}
    <Emphasis color="green">user-facing</Emphasis> — sell the value, richer than
    plugin.json's terse label
  </>,
  <>
    <Code>category</Code>: pick one —{' '}
    <Emphasis color="orange">development · agents · frontend · infra ·
    productivity · workflows</Emphasis>
  </>,
  <>
    <Code>keywords</Code> (in plugin.json): 3+ covering the{' '}
    <Emphasis color="green">domain + adjacent tools</Emphasis> — that's how
    people find it
  </>,
  <>
    a <Emphasis color="orange">README is required</Emphasis> — name · install ·
    every component listed, no silent skills or hooks
  </>,
  <>
    keep components <Emphasis color="green">on-topic</Emphasis> — a CI plugin
    shouldn't ship a design-system skill
  </>,
];

// Sliding window keeps the newest practices readable as the list fills.
const WINDOW = 4;

export const PluginDiscoverabilitySlide: SlideDefinition = {
  id: 'plugin-discoverability',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">make it</span>{' '}
      <span className="text-orange">discoverable</span>
    </>
  ),
  content: ({ revealStage }) => {
    const firstVisible = Math.max(0, revealStage - WINDOW + 1);
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-xl)',
          width: '100%',
          height: '100%',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* Left — a polished marketplace entry */}
        <div style={{ flex: '0 1 auto', minWidth: 0 }}>
          <CodeBlock language="json" code={ENTRY} />
        </div>

        {/* Right — the discoverability practices */}
        <div style={{ flex: '1 1 46%', maxWidth: '700px', textAlign: 'left' }}>
          {BULLETS.map((bullet, i) =>
            revealStage >= i && i >= firstVisible ? (
              <SlideItem key={i} delay={revealStage === i ? 0.05 : 0}>
                {bullet}
              </SlideItem>
            ) : null,
          )}
        </div>
      </div>
    );
  },
  maxRevealStages: BULLETS.length - 1,
  initialRevealStage: 0,
  notes:
    'Plugins refresher — discoverability & polish. 1) description: action-oriented and user-facing; the marketplace.json description should sell the value and be richer than plugin.json\'s terse technical label (it powers the /plugin UI). 2) category: pick from the marketplace taxonomy — base, development, agents, frontend, infrastructure, productivity, workflows, experimental. 3) keywords (plugin.json): at least 3, covering the primary domain plus adjacent tools — drives discovery. 4) README.md is required, with a strict section order (name, description, maintainer, installation, components) and it MUST list every component the plugin ships — no silent skills/hooks. 5) component relevance: every skill/command/agent/hook must match the plugin\'s stated purpose; a CI plugin shipping a design-system skill belongs in a different plugin.',
};
