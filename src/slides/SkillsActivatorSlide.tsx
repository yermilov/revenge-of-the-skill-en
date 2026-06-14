import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const SKILL_MD_CODE = `---
activation:
  keywords:
    # block until loaded
    - { keyword: "create pr", action: require }
    # hint to load
    - { keyword: "commit",    action: suggest }
  tools:
    # match tool calls
    - { tool: Bash, match: "git (push|commit)" }
  directories:
    # required in this dir
    - { match: "my-service", action: require }
---`;

const HOOKS_CODE = `{
  "SessionStart":
    "scan SKILL.md files → index activations",
  "UserPromptSubmit":
    "match prompt keywords → suggest / block",
  "PreToolUse":
    "match tool name+input → suggest / block",
  "PostToolUse":
    "suggest skills based on tool result",
  "PostToolUseFailure":
    "suggest skills on tool failure",
  "SessionEnd":
    "cleanup session index"
}`;

const SUGGEST_CODE = `// suggest — additionalContext injection
console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "UserPromptSubmit",
    additionalContext:
      "Relevant skills:\\n" +
      formatSkill(skill) +
      "\\n\\nConsider using Skill.",
  },
}));
process.exit(0);`;

const BLOCK_CODE = `// block — stderr + exit 2
console.error(
  "BLOCKED: Required skill not loaded: " +
  skillList + "\\n\\n" +
  "ACTION REQUIRED:\\n" +
  "1. Use Skill tool to load NOW.\\n" +
  "2. READ and INTERNALIZE the skill.\\n" +
  "3. REEVALUATE your approach."
);
process.exit(2);`;

type PanelVariant = {
  key: string;
  label: string;
  language: 'yaml' | 'json' | 'typescript';
  code: string;
};

function panelFor(revealStage: number): PanelVariant | null {
  if (revealStage >= 4) {
    return { key: 'block', label: 'match-prompt.js — block path', language: 'typescript', code: BLOCK_CODE };
  }
  if (revealStage >= 3) {
    return { key: 'suggest', label: 'match-prompt.js — suggest path', language: 'typescript', code: SUGGEST_CODE };
  }
  if (revealStage >= 2) {
    return { key: 'hooks', label: '~/.claude/hooks.json — runtime', language: 'json', code: HOOKS_CODE };
  }
  if (revealStage >= 1) {
    return { key: 'skill', label: 'SKILL.md — activation rules', language: 'yaml', code: SKILL_MD_CODE };
  }
  return null;
}

function SkillsActivatorContent({ revealStage }: { revealStage: number }) {
  const panel = panelFor(revealStage);

  return (
    <div className="skills-activator-body">
      {/* Left column: bullets accumulate across reveal stages */}
      <div className="skills-activator-bullets">
        {revealStage === 0 && (
          <SlideItem delay={0.05}>
            Claude is still unreliable at loading{' '}
            <Emphasis color="orange">the right skills</Emphasis>
          </SlideItem>
        )}

        {revealStage === 1 && (
          <SlideItem delay={0} reveal>
            you can build a <Emphasis color="green">skills-activator</Emphasis> — in{' '}
            <Emphasis color="orange">SKILL.md</Emphasis> we describe activation
            rules: keywords, tool-call patterns, directories
          </SlideItem>
        )}

        {/* Sliding window of 2 from stage 2 onward — older bullets have
            already been spoken by the time the next two are on screen. */}
        {revealStage >= 2 && revealStage <= 3 && (
          <SlideItem delay={0} reveal>
            Claude Code <Emphasis color="green">hooks</Emphasis> intercept session
            events and <Emphasis color="green">analyze</Emphasis> prompts, bash
            commands, tool calls and their{' '}
            <Emphasis color="orange">outputs</Emphasis>
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0} reveal>
            when a hook sees a required skill is not loaded — it{' '}
            <Emphasis color="green">nudges</Emphasis> Claude by injecting context
            into the prompt via{' '}
            <Emphasis color="green">additionalContext</Emphasis>
          </SlideItem>
        )}

        {revealStage >= 4 && (
          <SlideItem delay={0} reveal>
            and for critical cases — it <Emphasis color="orange">blocks</Emphasis>{' '}
            the call via <Emphasis color="orange">exit 2</Emphasis> + stderr with
            instructions on which skill to load
          </SlideItem>
        )}
      </div>

      {/* Right column: framed panel — appears from stage 1 onwards. */}
      {panel && (
        <div className="skills-activator-panel" key={panel.key}>
          <div className="skills-activator-panel__viewport">
            <CodeBlock language={panel.language} code={panel.code} />
          </div>
        </div>
      )}
    </div>
  );
}

export const SkillsActivatorSlide: SlideDefinition = {
  id: 'skills-activator',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">customization example —</span>{' '}
      <span className="text-orange">skills activator</span>
    </>
  ),
  maxRevealStages: 4,
  content: ({ revealStage }) => <SkillsActivatorContent revealStage={revealStage} />,
  notes:
    'Skills discovery — the last-mile problem. Stage 0: the problem (single line, no panel). Stage 1: SKILL.md activation rules (keywords / tools / directories). Stage 2: ~/.claude/hooks.json — the full set of 6 hooks (SessionStart → SessionEnd) analyzing prompts, bash commands, tool calls and their outputs. Stage 3: suggest — prompt injection via additionalContext, exit 0. Stage 4: block — stderr + exit 2 for critical cases.',
};
