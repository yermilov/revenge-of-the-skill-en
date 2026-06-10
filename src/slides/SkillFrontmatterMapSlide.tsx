import { SlideDefinition } from '../types/slides';

interface FieldChip {
  name: string;
  hint: string;
  example: string;
  note?: string;
}

interface FieldGroup {
  label: string;
  explainer: string;
  accent: string; // CSS color value for --fm-accent
  fields: FieldChip[];
}

const GROUPS: FieldGroup[] = [
  {
    label: 'identity & activation',
    explainer:
      'description is the entire activation mechanism — TRIGGER keywords swing it from ~20% to ~90%',
    accent: 'var(--terminal-orange)',
    fields: [
      { name: 'name', hint: 'defaults to dir name', example: 'deploy-checklist' },
      {
        name: 'description',
        hint: 'what + when → drives activation',
        example: '"Validate deploys. TRIGGER when: preparing a release"',
      },
      {
        name: 'when_to_use',
        hint: 'extra trigger phrases',
        example: '"shipping to prod, version bump on main"',
      },
      { name: 'argument-hint', hint: 'autocomplete hint', example: '[issue-number]' },
      {
        name: 'arguments',
        hint: 'named args → $name',
        example: 'env service',
        note: 'available as $env, $service',
      },
    ],
  },
  {
    label: 'who invokes',
    explainer:
      'hide it from the / menu, or make it user-only — but never combine both, or nobody can reach it',
    accent: 'var(--terminal-green)',
    fields: [
      {
        name: 'user-invocable',
        hint: 'false → hidden from / menu',
        example: 'false',
        note: 'model-only pipeline step',
      },
      {
        name: 'disable-model-invocation',
        hint: 'true → user-only',
        example: 'true',
        note: 'manual /deploy only',
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
        hint: 'pre-approved while active',
        example: 'Bash(git:*) Read Edit',
        note: 'space-delimited',
      },
      { name: 'disallowed-tools', hint: 'removed while active', example: 'WebSearch WebFetch' },
      { name: 'shell', hint: 'bash | powershell', example: 'powershell' },
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
        example: 'fork',
        note: 'fresh context, no conversation history',
      },
      { name: 'agent', hint: 'subagent type for fork', example: 'Explore' },
      {
        name: 'model',
        hint: 'model override',
        example: 'haiku',
        note: 'cheap model for a mechanical step',
      },
      { name: 'effort', hint: 'reasoning effort override', example: 'max' },
      { name: 'hooks', hint: 'scoped to skill lifetime', example: '{ Stop: cleanup.sh, once: true }' },
      {
        name: 'paths',
        hint: 'globs gating activation',
        example: 'src/**/*.tsx',
        note: 'frontend files only',
      },
    ],
  },
  {
    label: 'housekeeping',
    explainer:
      'open-spec extras for humans and marketplaces — the model doesn’t reason over these',
    accent: 'var(--terminal-white-muted)',
    fields: [
      { name: 'license', hint: 'name or bundled file', example: 'MIT' },
      { name: 'compatibility', hint: 'env requirements', example: 'requires bun ≥ 1.2' },
      { name: 'metadata', hint: 'arbitrary key-values', example: '{ author: yarik }' },
    ],
  },
];

const TOTAL_FIELDS = GROUPS.reduce((sum, g) => sum + g.fields.length, 0);

export const SkillFrontmatterMapSlide: SlideDefinition = {
  id: 'skill-frontmatter-map',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">SKILL.md</span>{' '}
      <span className="text-orange">frontmatter</span>
    </>
  ),
  content: ({ revealStage }) => {
    // One group on screen at a time: find the group containing the focused
    // field; earlier groups are dismissed entirely (their job is done).
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
    const activeField = group.fields[activeIdx];

    return (
      <div
        className="fm-map fm-map--solo"
        style={{ '--fm-accent': group.accent } as React.CSSProperties}
      >
        {/* Current group only — header + chips revealed up to the focus */}
        <div key={group.label} className="fm-group">
          <div className="fm-group__head">
            <span className="fm-group__label" style={{ color: group.accent }}>
              {group.label}
            </span>
            <span className="fm-group__explainer">{group.explainer}</span>
          </div>
          <div className="fm-group__chips">
            {group.fields.map((field, i) =>
              i <= activeIdx ? (
                <div
                  key={field.name}
                  className={`fm-chip${i === activeIdx ? ' fm-chip--active' : ''}`}
                >
                  <span className="fm-chip__name">{field.name}</span>
                  <span className="fm-chip__hint">{field.hint}</span>
                </div>
              ) : null,
            )}
          </div>
        </div>

        {/* Example bar — the focused field as a real YAML line */}
        <div key={activeField.name} className="fm-example">
          <span className="fm-example__code">
            {activeField.name}: {activeField.example}
          </span>
          {activeField.note && (
            <span className="fm-example__note"># {activeField.note}</span>
          )}
        </div>
      </div>
    );
  },
  maxRevealStages: TOTAL_FIELDS - 1,
  initialRevealStage: 0,
  notes:
    'Full SKILL.md frontmatter field map, one group on screen at a time, fields revealed one per stage; the focused field renders as a real YAML example line in the bar below. Identity & activation: description is the sole activation mechanism (model reasons over it, no classifiers/regex); quality swings activation ~20%→~90%; name defaults to the directory name. Invocation control: user-invocable false hides from / menu but Claude can still load; disable-model-invocation true makes it user-only; combining both makes the skill unreachable. Tool access: allowed-tools pre-approves, disallowed-tools removes, shell picks bash/powershell for inlining; resets on next user message. Execution: context fork runs as subagent, agent picks the type, model + effort override, hooks scoped to skill lifetime, paths gates activation by glob. Housekeeping (open spec): license, compatibility, metadata.',
};
