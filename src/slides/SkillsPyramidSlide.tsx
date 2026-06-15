import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis } from '../components/SlideElements';

// The skills pyramid, built from the base up: basic knowledge skills are the
// widest foundation, task skills compose them, workflow skills sit at the apex.
// Each reveal stacks the next tier on top, so the structure literally grows into
// a pyramid. Tones run green → cyan → orange up the tiers (the deck's palette).
// The tier copy is kept verbatim from the original bullets.
interface Tier {
  stage: number;
  tone: string;
  width: string;
  content: ReactNode;
}

// Listed top → bottom so the rendered stack reads apex-first; gated by stage so
// only the base shows at stage 0, then task, then workflow.
const TIERS: Tier[] = [
  {
    stage: 2,
    tone: '#f0883e',
    width: '64%',
    content: (
      <>
        <Emphasis color="green">Workflow instruction skills</Emphasis> — combine smaller task and knowledge{' '}
        skills to achieve larger tasks. <Code>investigate-bug</Code>,{' '}
        <Code>review-pr</Code>
      </>
    ),
  },
  {
    stage: 1,
    tone: '#76e4f7',
    width: '80%',
    content: (
      <>
        <Emphasis color="green">Task instruction skills</Emphasis> — explain how to
        achieve small tasks based on basic skills. <Code>create-pr</Code>{' '}
        (based on <Code variant="orange">github</Code>),{' '}
        <Code>search-code</Code> (based on{' '}
        <Code variant="orange">sourcegraph</Code>)
      </>
    ),
  },
  {
    stage: 0,
    tone: '#7ee787',
    width: '97%',
    content: (
      <>
        <Emphasis color="green">Basic knowledge skills</Emphasis> teach how to use a tool via CLI / API / MCP / WebUI.{' '}
        <Code>github</Code>, <Code>gitlab</Code>, <Code>sourcegraph</Code>,{' '}
        <Code>victoriametrics</Code>, …
      </>
    ),
  },
];

const PYRAMID_STYLES = `
  .sp-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    width: 100%;
    height: 100%;
    min-height: 0;
  }
  .sp-tier {
    --glow: color-mix(in srgb, var(--sp-tone) 32%, transparent);
    box-sizing: border-box;
    position: relative;
    border-radius: 14px;
    padding: 16px 32px 18px;
    text-align: center;
    line-height: 1.4;
    font-size: clamp(1rem, 1.35vw, 1.35rem);
    border: 1px solid color-mix(in srgb, var(--sp-tone) 55%, transparent);
    background:
      linear-gradient(180deg,
        color-mix(in srgb, var(--sp-tone) 18%, transparent),
        color-mix(in srgb, var(--sp-tone) 5%, transparent));
    box-shadow:
      0 0 26px -6px var(--glow),
      inset 0 1px 0 0 color-mix(in srgb, var(--sp-tone) 45%, transparent),
      inset 0 0 34px -20px var(--sp-tone);
    animation: sp-rise 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }
  /* Crown the apex with a small triangular cap so the silhouette reads pyramid. */
  .sp-tier--cap::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -17px;
    transform: translateX(-50%);
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 17px solid color-mix(in srgb, var(--sp-tone) 60%, transparent);
    filter: drop-shadow(0 0 10px var(--glow));
  }
  @keyframes sp-rise {
    from { opacity: 0; transform: translateY(16px) scale(0.985); }
    to   { opacity: 1; transform: none; }
  }
`;

export const SkillsPyramidSlide: SlideDefinition = {
  id: 'skills-pyramid',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">skills</span>{' '}
      <span className="text-orange">pyramid</span>
    </>
  ),
  maxRevealStages: 2,
  content: ({ revealStage }) => (
    <div className="sp-body">
      <style>{PYRAMID_STYLES}</style>
      {TIERS.filter((t) => revealStage >= t.stage).map((t) => (
        <div
          key={t.stage}
          className={`sp-tier${t.stage === 2 ? ' sp-tier--cap' : ''}`}
          style={{ width: t.width, ['--sp-tone' as string]: t.tone }}
        >
          {t.content}
        </div>
      ))}
    </div>
  ),
  notes:
    'Skills pyramid, built from the base up. Stage 0 — basic knowledge skills: the wide foundation, one per tool (github, gitlab, sourcegraph, victoriametrics), teaching how to use it via CLI/API/MCP/WebUI; these replace MCP definitions. Stage 1 — task instruction skills: compose basic skills for one small task (create-pr on github, search-code on sourcegraph). Stage 2 — workflow instruction skills: combine task + knowledge skills for a larger job (investigate-bug, review-pr). Higher tiers are built on lower ones — that is the whole point of the pyramid.',
};
