import { SlideDefinition } from '../types/slides';

// A specimen is one imaginary skill's full frontmatter, shown on the right.
// Each line optionally binds to a field name; when that field is the focus,
// its line lights up in the group accent and every other line dims. The
// values are grounded in real ~/src/superhuman-aidev patterns where the
// field exists there (allowed-tools, agent, model, effort, the two
// invocation flags) and plausible spec values where it doesn't.
interface SpecimenLine {
  text: string;
  field?: string; // links this line to a FieldChip for highlighting
}

interface Specimen {
  filename: string;
  lines: SpecimenLine[];
}

interface FieldChip {
  name: string;
  hint: string; // short description of what the field is
  best?: string[]; // writing best practices (omit when there are none)
  specimen: Specimen;
  // Which specimen line to light up, if it isn't the line bound to `name`
  // (used by the "who invokes" variants, whose headings aren't field names).
  highlight?: string;
}

interface FieldGroup {
  label: string;
  explainer: string;
  accent: string; // CSS color value for --fm-accent
  fields: FieldChip[];
}

const fence = (): SpecimenLine => ({ text: '---' });

// One coherent skill covers the whole identity & activation group.
const SPEC_DEPLOY: Specimen = {
  filename: 'deploy-checklist/SKILL.md',
  lines: [
    fence(),
    { text: 'name: deploy-checklist', field: 'name' },
    { text: 'description: Validate a release. TRIGGER when: cutting a release', field: 'description' },
    { text: 'when_to_use: shipping to prod, version bump on main', field: 'when_to_use' },
    { text: 'argument-hint: [service]', field: 'argument-hint' },
    { text: 'arguments: env service', field: 'arguments' },
    fence(),
  ],
};

// The two invocation flags are mutually exclusive, so each gets its own
// skill — combining them in one frontmatter would be the anti-pattern.
const SPEC_HIDDEN: Specimen = {
  filename: 'render-audio/SKILL.md',
  lines: [
    fence(),
    { text: 'name: render-audio' },
    { text: 'description: Synthesize narration from a script' },
    { text: 'user-invocable: false', field: 'user-invocable' },
    fence(),
  ],
};

const SPEC_USERONLY: Specimen = {
  filename: 'deploy/SKILL.md',
  lines: [
    fence(),
    { text: 'name: deploy' },
    { text: 'description: Ship the current branch to production' },
    { text: 'disable-model-invocation: true', field: 'disable-model-invocation' },
    fence(),
  ],
};

// "Both" is the default — you set neither flag. The highlighted comment makes
// that absence visible so it stays parallel with the two single-flag variants.
const SPEC_BOTH: Specimen = {
  filename: 'commit-helper/SKILL.md',
  lines: [
    fence(),
    { text: 'name: commit-helper' },
    { text: 'description: Write a Conventional Commits message' },
    { text: '# no invocation flags → user + model', field: 'both' },
    fence(),
  ],
};

const SPEC_TOOLS: Specimen = {
  filename: 'git-surgeon/SKILL.md',
  lines: [
    fence(),
    { text: 'name: git-surgeon' },
    { text: 'description: Rebase and fix-up commits safely' },
    { text: 'allowed-tools: Bash(git:*) Read Edit', field: 'allowed-tools' },
    { text: 'disallowed-tools: WebSearch WebFetch', field: 'disallowed-tools' },
    { text: 'shell: powershell', field: 'shell' },
    fence(),
  ],
};

const SPEC_EXEC: Specimen = {
  filename: 'codebase-cartographer/SKILL.md',
  lines: [
    fence(),
    { text: 'name: codebase-cartographer' },
    { text: 'description: Map an unfamiliar subsystem' },
    { text: 'context: fork', field: 'context' },
    { text: 'agent: Explore', field: 'agent' },
    { text: 'model: haiku', field: 'model' },
    { text: 'effort: max', field: 'effort' },
    { text: 'hooks: { Stop: cleanup.sh, once: true }', field: 'hooks' },
    { text: 'paths: src/**/*.tsx', field: 'paths' },
    fence(),
  ],
};

// Custom keys: anything beyond the known fields is simply ignored by Claude
// Code, so a skill can carry whatever metadata its humans or marketplace want.
const SPEC_CUSTOM: Specimen = {
  filename: 'pdf-extractor/SKILL.md',
  lines: [
    fence(),
    { text: 'name: pdf-extractor' },
    { text: 'description: Pull text and tables out of PDFs' },
    { text: 'license: MIT', field: 'custom' },
    { text: 'author: yarik', field: 'custom' },
    { text: 'team: docs-platform', field: 'custom' },
    { text: 'x-jira-epic: DOCS-1421', field: 'custom' },
    fence(),
  ],
};

const GROUPS: FieldGroup[] = [
  {
    label: 'identity & activation',
    explainer:
      'description is the entire activation mechanism — TRIGGER keywords swing it from ~20% to ~90%',
    accent: 'var(--terminal-orange)',
    fields: [
      {
        name: 'name',
        hint: "the skill's identifier",
        best: [
          'lowercase + hyphens, ≤ 64 chars',
          'defaults to the directory name — omit if they match',
        ],
        specimen: SPEC_DEPLOY,
      },
      {
        name: 'description',
        hint: 'what the skill does + when to use it',
        best: [
          'open with an action verb — “Validate…”, “Deploy…”',
          'add “TRIGGER when:” + the keywords users reason in',
          "≤ 1024 chars — it's all the model sees at startup",
        ],
        specimen: SPEC_DEPLOY,
      },
      {
        name: 'when_to_use',
        hint: 'extra trigger phrases',
        best: [
          'stack example requests + synonyms users might type',
          "shares the description's char budget — keep it tight",
        ],
        specimen: SPEC_DEPLOY,
      },
      {
        name: 'argument-hint',
        hint: 'autocomplete hint for the / menu',
        best: [
          'show the expected format, e.g. [issue-number]',
          "keep it brief — it's just an input label",
        ],
        specimen: SPEC_DEPLOY,
      },
      {
        name: 'arguments',
        hint: 'named args, exposed as $name',
        best: [
          'name them ($env, $service), not positional $1',
          'space-separated, mapped by position',
        ],
        specimen: SPEC_DEPLOY,
      },
    ],
  },
  {
    label: 'who invokes',
    explainer: 'two flags, three reachable combinations',
    accent: 'var(--terminal-green)',
    fields: [
      {
        name: 'user only',
        hint: 'disable-model-invocation: true — a deliberate /command, never auto-fired',
        specimen: SPEC_USERONLY,
        highlight: 'disable-model-invocation',
      },
      {
        name: 'model only',
        hint: 'user-invocable: false — a hidden pipeline step Claude runs itself',
        specimen: SPEC_HIDDEN,
        highlight: 'user-invocable',
      },
      {
        name: 'user + model',
        hint: 'the default — set neither flag: in the / menu and autonomous',
        specimen: SPEC_BOTH,
        highlight: 'both',
      },
    ],
  },
  {
    label: 'tool access',
    explainer:
      'pre-approve or strip tools while the skill is active — resets on the next user message',
    accent: 'var(--terminal-cyan)',
    fields: [
      {
        name: 'allowed-tools',
        hint: 'pre-approved while the skill is active',
        best: [
          'grant only what the skill uses repeatedly',
          'space-delimited, e.g. Bash(git:*) Read Edit',
          'pre-approves without per-use prompts',
        ],
        specimen: SPEC_TOOLS,
      },
      {
        name: 'disallowed-tools',
        hint: 'removed while the skill is active',
        best: [
          'use sparingly — strip only tools that must never fire',
          'clears on your next message',
        ],
        specimen: SPEC_TOOLS,
      },
      {
        name: 'shell',
        hint: "which shell runs the skill's inline commands",
        best: [
          'skills are cross-platform by default — you rarely touch this',
          'set powershell only for PowerShell-specific inline commands',
        ],
        specimen: SPEC_TOOLS,
      },
    ],
  },
  {
    label: 'execution',
    explainer:
      'fork into a subagent, override model and reasoning effort, scope hooks, gate activation by file globs',
    accent: 'var(--terminal-blue)',
    fields: [
      {
        name: 'context',
        hint: 'fork → run as a subagent',
        best: [
          'fork only self-contained tasks with explicit instructions',
          'pair with `agent` to pick the subagent type',
        ],
        specimen: SPEC_EXEC,
      },
      {
        name: 'agent',
        hint: 'subagent type for the fork',
        best: [
          'Explore to research, Plan to plan',
          'general-purpose for everything else (the default)',
        ],
        specimen: SPEC_EXEC,
      },
      {
        name: 'model',
        hint: 'model override',
        best: [
          'override only when the task needs a different tier',
          'use in rare situations when you are absolutely sure skill execution needs Haiku or Opus',
        ],
        specimen: SPEC_EXEC,
      },
      {
        name: 'effort',
        hint: 'reasoning effort override',
        best: [
          'low | medium | high | xhigh | max',
          'use in rare situations when you are absolutely sure skill execution needs low or max',
        ],
        specimen: SPEC_EXEC,
      },
      {
        name: 'hooks',
        hint: "scoped to the skill's lifetime",
        best: [
          "scope cleanup or guards to the skill's lifetime",
          'use sparingly — prefer a frontmatter field where one exists',
        ],
        specimen: SPEC_EXEC,
      },
      {
        name: 'paths',
        hint: 'auto-activate only when matching files are in play',
        best: [
          "keeps a skill dormant until you're in the files it's about",
          'comma-separated globs, e.g. src/**/*.tsx',
        ],
        specimen: SPEC_EXEC,
      },
    ],
  },
  {
    label: 'custom fields',
    explainer: 'anything beyond the known fields is simply ignored',
    accent: 'var(--terminal-white-muted)',
    fields: [
      {
        name: 'anything goes',
        hint: "add any keys you need — Claude Code ignores what it doesn't recognise",
        best: [
          'stash license, ownership, marketplace or tooling metadata',
          'the model never reasons over them',
        ],
        specimen: SPEC_CUSTOM,
        highlight: 'custom',
      },
    ],
  },
];

const TOTAL_FIELDS = GROUPS.reduce((sum, g) => sum + g.fields.length, 0);

// Walk the flat reveal sequence to the focused field and its group.
function resolveActive(revealStage: number) {
  let start = 0;
  let group = GROUPS[0];
  for (const g of GROUPS) {
    if (revealStage < start + g.fields.length) {
      group = g;
      break;
    }
    start += g.fields.length;
  }
  const activeIdx = Math.min(revealStage - start, group.fields.length - 1);
  return { group, activeField: group.fields[activeIdx] };
}

export const SkillFrontmatterMapSlide: SlideDefinition = {
  id: 'skill-frontmatter-map',
  // The section name lives in the title now ("> SKILL.md frontmatter — section"),
  // tinted in the group accent so it tracks the highlighted line.
  title: ({ revealStage }) => {
    const { group } = resolveActive(revealStage);
    return (
      <>
        <span className="text-dim">&gt;</span>{' '}
        <span className="text-orange">frontmatter</span>
        <span className="text-dim"> — </span>
        <span className="text-green">{group.label}</span>
      </>
    );
  },
  content: ({ revealStage }) => {
    const { group, activeField } = resolveActive(revealStage);
    const specimen = activeField.specimen;

    return (
      <div
        className="fm-split"
        style={{ '--fm-accent': group.accent } as React.CSSProperties}
      >
        {/* Left — top: field name + short description; bottom: best practices */}
        <div className="fm-left">
          <div key={activeField.name} className="fm-left__head">
            <span className="fm-left__name">{activeField.name}</span>
            <span className="fm-left__hint">{activeField.hint}</span>
          </div>
          {activeField.best && activeField.best.length > 0 && (
            <ul key={`${activeField.name}-tip`} className="fm-left__tip">
              {activeField.best.map((tip, i) => (
                <li key={i} className="fm-left__tip-item">
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right — full frontmatter of an imaginary skill, active line lit */}
        <div className="fm-right">
          <div key={specimen.filename} className="fm-spec">
            <div className="fm-spec__head">
              <span className="fm-spec__dots">
                <span className="fm-spec__dot fm-spec__dot--red" />
                <span className="fm-spec__dot fm-spec__dot--yellow" />
                <span className="fm-spec__dot fm-spec__dot--green" />
              </span>
              <span className="fm-spec__filename">{specimen.filename}</span>
            </div>
            <div className="fm-spec__body">
              {specimen.lines.map((line, i) => {
                const hl = activeField.highlight ?? activeField.name;
                const isActive = !!line.field && line.field === hl;
                return (
                  <span
                    key={i}
                    className={`fm-spec__line${isActive ? ' fm-spec__line--active' : ''}`}
                  >
                    {line.text}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
  maxRevealStages: TOTAL_FIELDS - 1,
  initialRevealStage: 0,
  notes:
    'Full SKILL.md frontmatter field map. Left column frames the concern group + explains the focused field; right column shows a real-world-grounded imaginary skill\'s full frontmatter with the active field highlighted, the rest dimmed. Different fields use different specimen skills (the two invocation flags are mutually exclusive, so each gets its own skill). Identity & activation: description is the sole activation mechanism, quality swings activation ~20%→~90%, name defaults to dir. Invocation: user-invocable false hides from / menu; disable-model-invocation true is user-only; combining both makes it unreachable. Tool access: allowed/disallowed-tools, shell; resets on next user message. Execution: context fork → subagent, agent type, model + effort override, hooks scoped to lifetime, paths globs gate activation. Custom fields: any key beyond the known set (license, ownership, marketplace or tooling metadata) is simply ignored by Claude Code and never reasoned over — so a skill can carry whatever its humans need.',
};
