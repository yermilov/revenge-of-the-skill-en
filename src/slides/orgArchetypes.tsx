import type { ReactNode } from 'react';
import { Emphasis } from '../components/SlideElements';

// Shared archetype metadata for the AI-adoption bell curve
// (EveryOrgRightNowSlide). Colors and ordering match the curve's
// left-to-right axis. Ported from dou-days-2026 and translated.
export interface OrgSection {
  key: string;
  label: string;
  color: string;
  glowColor: string;
  x1Pct: number;
  x2Pct: number;
  items: ReactNode[];
  growItems: ReactNode[];
}

export const ORG_SECTIONS: OrgSection[] = [
  {
    key: 'multipliers',
    label: 'multipliers',
    color: '#f0883e',
    glowColor: 'rgba(240,136,62,0.4)',
    x1Pct: 0,
    x2Pct: 0.18,
    items: [
      'scale AI across teams',
      'write skills, plugins, tooling',
      'build software factories',
    ],
    growItems: [
      '1–2 per company to kick off the process',
      <>the <Emphasis color="orange">"AI-enablement team"</Emphasis> with blueprints is an antipattern — build AI infrastructure instead</>,
    ],
  },
  {
    key: 'engineers',
    label: 'AI-first engineers',
    color: '#7ee787',
    glowColor: 'rgba(126,231,135,0.35)',
    x1Pct: 0.18,
    x2Pct: 0.42,
    items: [
      'explore plugins and skills',
      'try new approaches',
      'end-to-end agentic engineering',
      'delegate high-level tasks to AI',
    ],
    growItems: [
      '1–2 per team to kick off the process',
      'give them space and time to experiment',
      'connect the successful ones across teams',
      'popularize the work — demos, fun days, slack',
    ],
  },
  {
    key: 'majority',
    label: 'conservative majority',
    color: '#79c0ff',
    glowColor: 'rgba(121,192,255,0.3)',
    x1Pct: 0.42,
    x2Pct: 0.74,
    items: [
      'generate methods and tests',
      'explore codebases with AI agents',
      'vibe-code in unfamiliar stacks',
      '"explain what X does"',
    ],
    growItems: [
      <>the <Emphasis color="orange">"AI from the top"</Emphasis> antipattern — leadership mandates don't work</>,
    ],
  },
  {
    key: 'deniers',
    label: 'AI skeptics',
    color: '#d2a8ff',
    glowColor: 'rgba(210,168,255,0.3)',
    x1Pct: 0.74,
    x2Pct: 1,
    items: [
      '"haven\'t tried it yet"',
      '"tried it, didn\'t work"',
      '"I\'m faster without it"',
      '"it\'s just LinkedIn hype"',
    ],
    growItems: [],
  },
];
