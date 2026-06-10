import { SlideDefinition } from '../types/slides';
import { SlideLink } from '../components/SlideElements';

const AGENTS = [
  'Claude Code',
  'OpenAI Codex',
  'Gemini CLI',
  'Cursor',
  'GitHub Copilot',
  'VS Code',
  'Amp',
  'OpenHands',
  'Junie',
  'Roo Code',
  'Kiro',
  'Factory',
  'Mistral Vibe',
  'Spring AI',
  'Databricks',
  'Snowflake',
];

export const SkillOpenFormatSlide: SlideDefinition = {
  id: 'skill-open-format',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">one skill,</span>{' '}
      <span className="text-orange">every agent</span>
    </>
  ),
  content: ({ revealStage }) => (
    <div className="oa-wrap">
      <div className="oa-statement">
        a skill is <span className="text-orange glow-orange">not a Claude thing</span> —
        SKILL.md is an open standard:{' '}
        <SlideLink href="https://agentskills.io">agentskills.io</SlideLink>
      </div>

      {revealStage >= 1 && (
        <div className="oa-wall">
          {AGENTS.map((agent) => (
            <div
              key={agent}
              className={`oa-chip${agent === 'Claude Code' ? ' oa-chip--hero' : ''}`}
            >
              {agent}
            </div>
          ))}
        </div>
      )}

      {revealStage >= 2 && (
        <div className="fm-example">
          <span className="fm-example__code">
            &lt;project&gt;/.agents/skills/ · ~/.agents/skills/
          </span>
          <span className="fm-example__note"># write once — any agent discovers it</span>
        </div>
      )}
    </div>
  ),
  maxRevealStages: 2,
  initialRevealStage: 0,
  notes:
    'Cross-agent compatibility. SKILL.md follows the open Agent Skills spec (agentskills.io) — frontmatter name + description and a markdown body are the portable core; Claude Code-specific fields degrade gracefully elsewhere. Compatible agents per the spec: Claude Code, OpenAI Codex, Gemini CLI, Cursor, GitHub Copilot, VS Code, Amp, OpenHands, Junie, Roo Code, Kiro, Factory, Mistral Vibe, Spring AI, Databricks, Snowflake, and more. Discovery convention: native <project>/.<agent>/skills/ and the interop paths <project>/.agents/skills/ + ~/.agents/skills/; project-level overrides user-level on name collision.',
};
