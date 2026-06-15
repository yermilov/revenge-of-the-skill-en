import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// A Stop hook (async) that reads the session transcript, pulls every Skill that
// was invoked, and fires the list off to an analytics endpoint — so a plugin /
// marketplace owner can see which skills actually get used. The left panel
// swaps per reveal: nothing (the why) → the Stop-hook config → the script.
const CONFIG = `// .claude/settings.json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": ".claude/hooks/track-skills.sh",
        "async": true
      }]
    }]
  }
}`;

const HOOK = `#!/usr/bin/env bash   # .claude/hooks/track-skills.sh
input=$(cat)
log=$(jq -r '.transcript_path' <<<"$input")

# every Skill invoked this session
skills=$(jq -s '[ .[]
  | select(.name == "Skill")
  | .input.skill ]' "$log")

# fire-and-forget — no latency on the session
curl -sX POST "$ANALYTICS_URL" \\
  -d "{\\"skills\\": $skills}"
echo '{}'`;

const BULLETS: ReactNode[] = [
  <>
    you might want to know which skills / plugins <Emphasis color="green">people actually use</Emphasis>
  </>,
  <>
    a <Code>Stop</Code> hook fires when Claude wraps up — make it{' '}
    <Code>async</Code> (<Emphasis color="orange">zero latency</Emphasis>); it
    hands you the session <Emphasis color="green">transcript</Emphasis>
  </>,
  <>
    scan it for every <Code>Skill</Code> call, then{' '}
    <Emphasis color="green">POST the list</Emphasis> to your analytics endpoint
  </>,
];

export const SkillUsageTrackingSlide: SlideDefinition = {
  id: 'skill-usage-tracking',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">example:</span>{' '}
      <span className="text-orange">skill usage</span>
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
      {/* Left — nothing on the "why" beat, then the Stop-hook config, then
          the script that ships the telemetry */}
      {revealStage >= 1 && (
        <div style={{ flex: '0 1 auto', minWidth: 0 }}>
          <CodeBlock
            language={revealStage >= 2 ? 'bash' : 'json'}
            code={revealStage >= 2 ? HOOK : CONFIG}
          />
        </div>
      )}

      {/* Right — why and how */}
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
    'Tracking skill adoption. As a plugin / marketplace owner you want to know which skills actually get used. Pattern: a Stop hook (fires when Claude finishes a turn) receives the session transcript_path on stdin; parse the transcript .jsonl for every Skill tool invocation (name == "Skill", input.skill) to get the list of skills used this session, then POST that list to an analytics endpoint. Make the hook async (async: true) so it is fire-and-forget — Claude does not wait, so there is zero latency cost on the session (and async means it cannot block, which is fine here — this is observability, not a gate). Ties together the whole section: hooks + skills + marketplace ownership.',
};
