import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// A marketplace is just a catalog: name + owner + a list of plugins, each
// pointing at a source. One repo can host many plugins.
const MARKETPLACE = `// .claude-plugin/marketplace.json
{
  "name": "team-tools",
  "owner": { "name": "Platform" },
  "plugins": [
    { "name": "quit-vim",
      "source": "./plugins/quit-vim" },
    { "name": "deploy",
      "source": { "source": "github",
        "repo": "org/deploy", "ref": "v2.0" } }
  ]
}`;

const BULLETS: ReactNode[] = [
  <>
    a marketplace is a <Emphasis color="green">catalog</Emphasis> —{' '}
    <Code>name</Code>, <Code>owner</Code>, and a list of{' '}
    <Code>plugins</Code>
  </>,
  <>
    every plugin entry points at a <Emphasis color="orange">source</Emphasis> —
    one repo can host many plugins
  </>,
  <>
    sources: <Emphasis color="green">relative path · github · git url ·
    npm</Emphasis>
  </>,
];

export const MarketplaceManifestSlide: SlideDefinition = {
  id: 'marketplace-manifest',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">the</span>{' '}
      <span className="text-orange">marketplace</span>
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
      {/* Left — the marketplace catalog */}
      <div style={{ flex: '0 1 auto', minWidth: 0 }}>
        <CodeBlock language="json" code={MARKETPLACE} />
      </div>

      {/* Right — how the catalog works */}
      <div style={{ flex: '1 1 42%', maxWidth: '660px', textAlign: 'left' }}>
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
    'Plugins refresher (3/4) — the marketplace. marketplace.json (in .claude-plugin/) is a catalog: required name (kebab-case, used in install: name@marketplace), owner, and a plugins array. Each plugin entry needs name + source. Source types: relative path ("./plugins/x", git-hosted marketplaces only), github ({source:"github", repo, ref/sha}), git url ({source:"url", url, ref} — works with GitLab/Bitbucket/self-hosted), git-subdir (monorepos), npm. Gotcha: relative paths only resolve when the marketplace itself is git-hosted — a raw https JSON URL cannot resolve them, so use github/url sources there.',
};
