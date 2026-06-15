import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// The manifest — lean on purpose. name + version do the heavy lifting;
// everything else auto-discovers from the directory layout.
const MANIFEST = `// .claude-plugin/plugin.json
{
  "name": "quit-vim",
  "version": "1.2.0",
  "description": "Escape vim, finally",
  "author": { "name": "you", "email": "you@org" },
  "keywords": ["vim", "escape", "survival"]
}`;

const BULLETS: ReactNode[] = [
  <>
    <Code>name</Code> + <Code>version</Code> are what matter — the rest is
    discovery <Emphasis color="green">metadata</Emphasis>
  </>,
  <>
    <Code>version</Code> is the <Emphasis color="orange">single source of
    truth</Emphasis> — bump it or users stay on the cached copy
  </>,
  <>
    pull in other plugins with <Code>dependencies</Code> — installed
    automatically alongside yours
  </>,
];

export const PluginManifestSlide: SlideDefinition = {
  id: 'plugin-manifest',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">the plugin</span>{' '}
      <span className="text-orange">manifest</span>
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
      {/* Left — the manifest */}
      <div style={{ flex: '0 1 auto', minWidth: 0 }}>
        <CodeBlock language="json" code={MANIFEST} />
      </div>

      {/* Right — how the manifest behaves */}
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
    'Plugins refresher (2/4) — the manifest. plugin.json lives in .claude-plugin/. Required: name (kebab-case, used for namespacing). version is the single source of truth for updates — if you push commits without bumping the version string, existing users stay on the cached old copy (omit version entirely to fall back to the git commit SHA). Keep the manifest lean — components auto-discover from the directory layout, so you rarely list paths explicitly. Declare dependencies (v2.1.110+) to auto-install other plugins; bare-string form tracks the current marketplace version, versioned form needs {name}--v{version} git tags.',
};
