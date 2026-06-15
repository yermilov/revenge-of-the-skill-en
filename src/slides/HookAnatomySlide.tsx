import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// The lifecycle, top to bottom — the moments a hook can fire. Only the events
// that can veto the action are marked "← can block" (e.g. PostToolUse can't —
// the tool already ran). Aligned with padEnd so the columns stay tidy.
const EVENTS: [event: string, when: string, canBlock: boolean][] = [
  ['SessionStart', 'load context, set env', false],
  ['UserPromptSubmit', 'you submit a prompt', true],
  ['PreToolUse', 'before a tool runs', true],
  ['PermissionRequest', 'gate the permission prompt', true],
  ['PostToolUse', 'after a tool returns', false],
  ['PostToolUseFailure', 'a tool call errored', false],
  ['SubagentStart', 'a subagent spawns', false],
  ['SubagentStop', 'a subagent finishes', true],
  ['Notification', 'idle / permission alert', false],
  ['PreCompact', 'before context compaction', false],
  ['Stop', 'Claude wraps up', true],
  ['SessionEnd', 'cleanup', false],
];

const LIFECYCLE = EVENTS.map(
  ([event, when, canBlock]) =>
    `${event.padEnd(20)}${canBlock ? `${when.padEnd(28)}← can block` : when}`,
).join('\n');

// One example hooks.json per handler type, shown on the left as its bullet
// reveals (stage 1 = command … stage 4 = agent). Stage 0 keeps the lifecycle.
const HOOK_EXAMPLES: Record<number, string> = {
  1: `// command — run a shell script
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{ "type": "command",
        "command": ".claude/hooks/guard.sh" }]
    }]
  }
}`,
  2: `// http — POST the event to a webhook
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "http",
        "url": "https://ci.acme.dev/lint",
        "allowedEnvVars": ["TOKEN"] }]
    }]
  }
}`,
  3: `// prompt — ask a fast LLM to judge
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{ "type": "prompt",
        "prompt": "destructive command? ok:false + why" }]
    }]
  }
}`,
  4: `// agent — inspect the repo, then judge
{
  "hooks": {
    "Stop": [{
      "hooks": [{ "type": "agent",
        "prompt": "changed files lack tests? ok:false" }]
    }]
  }
}`,
};

const BULLETS: ReactNode[] = [
  <>
    a hook is <Emphasis color="green">deterministic</Emphasis> — it fires on a
    lifecycle event, no model in the loop
  </>,
  <>
    <Emphasis color="green">command</Emphasis> — run a shell script: event JSON
    on stdin, exit code + stdout back
  </>,
  <>
    <Emphasis color="green">http</Emphasis> — POST the event to a URL (webhook);
    a 2xx with <Code>decision: block</Code> can veto
  </>,
  <>
    <Emphasis color="green">prompt</Emphasis> — ask a fast LLM to judge; it
    replies <Code>{'{ok}'}</Code> or <Code>{'{ok, reason}'}</Code>
  </>,
  <>
    <Emphasis color="green">agent</Emphasis> — spawn a subagent with{' '}
    <Code>Read</Code> / <Code>Grep</Code> / <Code>Glob</Code> to inspect the
    codebase first
  </>,
];

export const HookAnatomySlide: SlideDefinition = {
  id: 'hook-anatomy',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">what is</span>{' '}
      <span className="text-orange">a hook</span>
    </>
  ),
  content: ({ revealStage }) => {
    // Sliding window: keep at most WINDOW bullets so the tall lifecycle panel
    // and the bullets both fit. The intro "deterministic" point drops off once
    // the last handler type (agent) reveals — it has done its job by then.
    const WINDOW = 4;
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
        {/* Left — the lifecycle (intro), then an example hooks.json per type */}
        <div style={{ flex: '0 1 auto', minWidth: 0 }}>
          {revealStage === 0 ? (
            <CodeBlock language="text" code={LIFECYCLE} />
          ) : (
            <CodeBlock language="json" code={HOOK_EXAMPLES[revealStage]} />
          )}
        </div>

        {/* Right — what a hook is */}
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
    'Hooks refresher (1/4) — what a hook is. A hook is deterministic event-driven automation: it fires at a fixed point in Claude Code\'s lifecycle with no model in the loop, so unlike a skill (which the model chooses to invoke) a hook always runs — for enforcement, validation, logging, context injection. Lifecycle events shown (a representative subset of ~28): SessionStart, UserPromptSubmit (can block), PreToolUse (can block), PermissionRequest (can block — gate the permission prompt), PostToolUse (cannot block — the tool already ran), PostToolUseFailure, SubagentStart, SubagentStop (can block), Notification, PreCompact, Stop (can block), SessionEnd. Only events that fire BEFORE the action can veto it (exit 2); post-events are observe-only. Four handler types: command (shell), http (webhook), prompt (fast LLM), agent (LLM + Read/Grep/Glob).',
};
