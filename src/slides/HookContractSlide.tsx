import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const HOOK_SCRIPT = `#!/usr/bin/env bash
input=$(cat)                       # the event, as JSON on stdin
cmd=$(jq -r '.tool_input.command' <<<"$input")

if [[ "$cmd" == *"rm -rf"* ]]; then
  echo "blocked — too destructive" >&2
  exit 2                           # 2 → BLOCK, stderr goes to Claude
fi
echo '{}'                          # 0 → allow (always print something)`;

const BULLETS: ReactNode[] = [
  <>
    in: the event as <Emphasis color="green">JSON on stdin</Emphasis> — session,
    cwd, <Code>tool_name</Code>, <Code>tool_input</Code>
  </>,
  <>
    out: an <Emphasis color="green">exit code</Emphasis> (see the script), or{' '}
    <Emphasis color="green">JSON on stdout</Emphasis>:
  </>,
  <>
    <Code>permissionDecision</Code>:{' '}
    <Emphasis color="green">allow / deny / ask</Emphasis> — skip the prompt,
    cancel the call, or prompt as normal
  </>,
  <>
    <Code>additionalContext</Code> — inject text straight into{' '}
    <Emphasis color="green">Claude's context</Emphasis>
  </>,
  <>
    <Code>updatedInput</Code> — <Emphasis color="orange">rewrite the tool's
    params</Emphasis> before it runs (add <Code>--dry-run</Code>, fix a path)
  </>,
];

export const HookContractSlide: SlideDefinition = {
  id: 'hook-contract',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">the hook</span>{' '}
      <span className="text-orange">contract</span>
    </>
  ),
  content: ({ revealStage }) => {
    // Sliding window: with 5 bullets the in/out preamble + 3 JSON fields don't
    // all fit, so the opening "in:" bullet drops off once the last field reveals.
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
        {/* Left — a minimal command hook */}
        <div style={{ flex: '0 1 auto', minWidth: 0 }}>
          <CodeBlock language="bash" code={HOOK_SCRIPT} />
        </div>

        {/* Right — the stdin/exit/stdout contract */}
        <div style={{ flex: '1 1 42%', maxWidth: '660px', textAlign: 'left' }}>
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
    'Hooks refresher (3/4) — the I/O contract for a command hook. In: the event arrives as JSON on stdin (session_id, cwd, hook_event_name, and for tool events tool_name + tool_input; PostToolUse adds tool_result; Stop adds stop_hook_active). Out, two ways: (1) exit codes — 0 = success (stdout parsed as JSON, action proceeds), 2 = BLOCK (stderr fed back to Claude as feedback; stdout ignored), 1/other = non-blocking error (logged, proceeds anyway) — the #1 mistake is expecting exit 1 to block. (2) structured JSON on stdout — hookSpecificOutput with permissionDecision allow/deny/ask, permissionDecisionReason, additionalContext (injected into Claude\'s context), updatedInput (modify tool params before run). Always print at least {} on exit 0.',
};
