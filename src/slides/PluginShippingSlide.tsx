import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// Managed settings — how an org force-installs a marketplace and its plugins
// for everyone, with auto-update turned on (custom marketplaces default off).
const SETTINGS = `// settings.json (managed, org-wide)
{
  "extraKnownMarketplaces": {
    "team-tools": {
      "source": { "source": "github",
        "repo": "org/plugins" },
      "autoUpdate": true        // ← custom = off by default
    }
  },
  "enabledPlugins": { "team-tools@quit-vim": true }
}`;

const BULLETS: ReactNode[] = [
  <>
    anyone: <Code>/plugin marketplace add org/repo</Code> then{' '}
    <Code>/plugin install name@market</Code>
  </>,
  <>
    org-wide: <Emphasis color="green">force-install</Emphasis> via{' '}
    <Code>extraKnownMarketplaces</Code> + <Code>enabledPlugins</Code>
  </>,
  <>
    <Emphasis color="orange">custom marketplaces don't auto-update</Emphasis> —
    set <Code>autoUpdate: true</Code> or run <Code>/plugin marketplace update</Code>
  </>,
  <>
    <Emphasis color="green">validate before you publish</Emphasis> —{' '}
    <Code>claude plugin validate ./plugin --strict</Code>
  </>,
];

export const PluginShippingSlide: SlideDefinition = {
  id: 'plugin-shipping',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">shipping</span>{' '}
      <span className="text-orange">plugins</span>
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
      {/* Left — managed settings for org distribution */}
      <div style={{ flex: '0 1 auto', minWidth: 0 }}>
        <CodeBlock language="json" code={SETTINGS} />
      </div>

      {/* Right — how to ship */}
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
    'Plugins refresher (4/4) — shipping. Any user: /plugin marketplace add <github-repo|url|path>, then /plugin install <name>@<marketplace> (or the interactive /plugin menu). Org-wide via managed settings.json: extraKnownMarketplaces pre-registers the marketplace, enabledPlugins force-enables specific plugins non-overridably. Gotcha: official + community marketplaces auto-update by default, but custom/third-party ones do NOT — turn on "autoUpdate": true in the marketplace entry, or users must run /plugin marketplace update manually. Validate before publishing with `claude plugin validate ./plugin --strict` to catch misspelled manifest fields (unknown fields are warnings, not errors, so typos slip through silently).',
};
