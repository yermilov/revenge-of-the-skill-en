import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// The plugin directory layout — only plugin.json lives in .claude-plugin/,
// every component directory sits at the plugin root.
const STRUCTURE = `my-plugin/
├── .claude-plugin/
│   └── plugin.json     ← manifest (the only file here)
├── skills/             ← skills/<name>/SKILL.md
├── agents/             ← subagents (*.md)
├── commands/           ← slash commands (*.md)
├── hooks/hooks.json    ← lifecycle hooks
└── .mcp.json           ← MCP servers`;

const BULLETS: ReactNode[] = [
  <>
    a plugin is a <Emphasis color="green">versioned bundle</Emphasis> of
    everything you've built — one install, one update
  </>,
  <>
    it can ship <Emphasis color="orange">skills · agents · hooks · commands ·
    MCP servers</Emphasis> — all namespaced <Code>plugin:name</Code>
  </>,
  <>
    only <Code>plugin.json</Code> goes in <Code>.claude-plugin/</Code> — every
    component dir lives at the <Emphasis color="green">root</Emphasis>
  </>,
];

export const PluginAnatomySlide: SlideDefinition = {
  id: 'plugin-anatomy',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">what is</span>{' '}
      <span className="text-orange">a plugin</span>
    </>
  ),
  content: ({ revealStage }) => (
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
      {/* Left — the plugin directory tree */}
      <div style={{ flex: '0 1 auto', minWidth: 0 }}>
        <CodeBlock language="text" code={STRUCTURE} />
      </div>

      {/* Right — what a plugin is */}
      <div style={{ flex: '1 1 44%', maxWidth: '680px', textAlign: 'left' }}>
        {BULLETS.map((bullet, i) =>
          revealStage >= i ? (
            <SlideItem key={i} delay={revealStage === i ? 0.05 : 0}>
              {bullet}
            </SlideItem>
          ) : null,
        )}
      </div>
    </div>
  ),
  maxRevealStages: BULLETS.length - 1,
  initialRevealStage: 0,
  notes:
    'Plugins refresher (1/4) — what a plugin is. A plugin is a self-contained, versioned directory that bundles components — skills, agents, hooks, slash commands, MCP/LSP servers — so a whole toolkit installs and updates as one unit. Everything it ships is namespaced under the plugin name (plugin:skill). Structure gotcha: ONLY plugin.json lives inside .claude-plugin/; skills/, agents/, commands/, hooks/, .mcp.json all sit at the plugin root, not inside .claude-plugin/.',
};
