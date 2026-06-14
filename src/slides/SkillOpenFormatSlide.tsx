import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem, SlideLink } from '../components/SlideElements';

// SKILL.md split into the portable open core (every agent reads it) and the
// Claude-Code-only frontmatter (other agents ignore it). The Claude block
// appears on the second beat to make the "enhancement, not requirement" point.
type Line = { text: string; kind: 'core' | 'claude' | 'note' };

const HEAD: Line[] = [
  { text: '---', kind: 'core' },
  { text: 'name: pdf-extractor', kind: 'core' },
  { text: 'description: Extract text + tables from a PDF', kind: 'core' },
];

const CLAUDE_BLOCK: Line[] = [
  { text: '# Claude Code only — other agents ignore these', kind: 'note' },
  { text: 'allowed-tools: Bash(pdftotext:*) Read', kind: 'claude' },
  { text: 'context: fork', kind: 'claude' },
  { text: 'model: haiku', kind: 'claude' },
  { text: 'hooks: { Stop: cleanup.sh }', kind: 'claude' },
];

const TAIL: Line[] = [
  { text: '---', kind: 'core' },
  { text: '', kind: 'core' },
  { text: '# PDF Extractor', kind: 'core' },
  { text: 'Run scripts/extract.py <file>, read its JSON.', kind: 'core' },
];

const BULLETS: ReactNode[] = [
  <>
    directory, SKILL.md name + description + body —{' '}
    is part of <Emphasis color="green">open standard</Emphasis>
  </>,
  <>
    Claude-only specifics: most frontmatter fields, <Code>!`cmd`</Code>, <Code>$vars</Code>
  </>,
  <>
    discovery differs: <Code>.claude/skills/</Code> vs <Code>.agents/skills/</Code>
  </>,
  <>
    skill body instructions might be tailored to harness or model specifics
  </>,
  <>
    usually other agents <Emphasis color="green">understand even Claude-specific skills well</Emphasis>,{' '}
    but keep an eye if it makes sense to maintain two versions
  </>,
];

export const SkillOpenFormatSlide: SlideDefinition = {
  id: 'skill-open-format',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">skills</span>{' '}
      <span className="text-orange">for other agents</span>
    </>
  ),
  content: ({ revealStage }) => {
    const lines = revealStage >= 1 ? [...HEAD, ...CLAUDE_BLOCK, ...TAIL] : [...HEAD, ...TAIL];
    // Sliding window keeps the newest rules on screen as the (now longer)
    // bullets grow past what fits; the left specimen stays put.
    const WINDOW = 3;
    const firstVisible = Math.max(0, revealStage - WINDOW + 1);
    return (
      <div className="of-wrap">
        {/* Left — one SKILL.md, the open core vs the Claude-only block */}
        <div className="of-left">
          <div className="of-spec">
            <div className="of-spec__head">
              <span className="of-spec__dots">
                <span className="of-spec__dot of-spec__dot--red" />
                <span className="of-spec__dot of-spec__dot--yellow" />
                <span className="of-spec__dot of-spec__dot--green" />
              </span>
              <span className="of-spec__filename">pdf-extractor/SKILL.md</span>
            </div>
            <div className="of-spec__body">
              {lines.map((line, i) => (
                <span key={i} className={`of-line of-line--${line.kind}`}>
                  {line.text || ' '}
                </span>
              ))}
            </div>
          </div>
          <div className="of-legend">
            <span className="of-legend__item of-legend__item--core">open core — every agent</span>
            <span className="of-legend__item of-legend__item--claude">Claude Code only</span>
          </div>
          <div className="of-ref">
            the open standard ·{' '}
            <SlideLink href="https://agentskills.io">agentskills.io</SlideLink>
          </div>
        </div>

        {/* Right — how to keep it portable */}
        <div className="of-right">
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
    'How to keep Claude Code skills portable to the open Agent Skills format (agentskills.io, originally from Anthropic, now adopted across Cursor, Codex, Gemini CLI, Copilot, Goose, OpenHands and many more). The portable core every compatible agent reads: a SKILL.md folder with name (≤64, lowercase+hyphens) + description (≤1024) frontmatter and a markdown body, optionally bundling scripts/ references/ assets/ loaded on demand. Claude-Code-only frontmatter (allowed-tools, disallowed-tools, context: fork, agent, model, effort, hooks, paths, shell, user-invocable, disable-model-invocation, argument-hint, arguments) is progressive enhancement — other agents ignore it, so it never breaks portability, but never depend on it for core behavior. Claude-only execution features: bash-inlining (!`cmd`), $-variable substitution — won\'t run elsewhere, so keep core behavior in plain instructions. Discovery differs: Claude Code scans .claude/skills/ (+ ~/.claude/skills/, plugins, nested); the cross-agent interop convention is .agents/skills/ and ~/.agents/skills/ — publish where each agent looks. Portability test: strip every Claude-only field and ask whether name + description + body still do the job.',
};
