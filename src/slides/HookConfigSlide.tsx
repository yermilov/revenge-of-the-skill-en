import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const CONFIG = `// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash|Edit",
      "hooks": [
        { "type": "command",
          "command": ".claude/hooks/guard.sh" }
      ]
    }]
  }
}`;

const BULLETS: ReactNode[] = [
  <>
    <Emphasis color="green">event</Emphasis> →{' '}
    <Emphasis color="green">matcher</Emphasis> →{' '}
    <Emphasis color="green">handler</Emphasis>, in <Code>settings.json</Code>{' '}
    (user · project · .local)
  </>,
  <>
    the matcher is a <Emphasis color="orange">case-sensitive regex</Emphasis> on
    the tool name — <Code>Bash|Edit</Code>, <Code>mcp__*</Code>, or{' '}
    <Code>""</Code> for all
  </>,
  <>
    ship them in a <Emphasis color="green">plugin</Emphasis> too —{' '}
    <Code>hooks/hooks.json</Code>, auto-loaded when the plugin is on
  </>,
];

export const HookConfigSlide: SlideDefinition = {
  id: 'hook-config',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">wiring</span>{' '}
      <span className="text-orange">a hook</span>
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
      {/* Left — the settings.json wiring */}
      <div style={{ flex: '0 1 auto', minWidth: 0 }}>
        <CodeBlock language="json" code={CONFIG} />
      </div>

      {/* Right — how the wiring works */}
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
    'Hooks refresher (2/4) — wiring. Hooks live under the "hooks" key of a settings file: ~/.claude/settings.json (personal, all projects), .claude/settings.json (shared, version-controlled), or .claude/settings.local.json (personal, gitignored). Shape: event → array of { matcher, hooks: [{ type, command, timeout, ... }] }. The matcher is a case-sensitive regex on the tool name for tool events (Bash|Edit, mcp__server__*, "" = all); SessionStart matches startup/resume/clear/compact; events like UserPromptSubmit / Stop always fire (no matcher). Plugins ship hooks in hooks/hooks.json, auto-loaded when enabled. Hot-reloaded on file save.',
};
