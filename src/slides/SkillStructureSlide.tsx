import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// The tree grows in lockstep with the bullets: each directory enters the
// listing only at the reveal stage where its bullet introduces it. No inline
// comments — the bullets on the right carry the explanations.
interface TreeNode {
  stage: number;
  label: string;
  children?: string[];
}

const TREE_NODES: TreeNode[] = [
  { stage: 1, label: 'SKILL.md' },
  { stage: 3, label: 'references/', children: ['spec.md', 'examples.md'] },
  { stage: 4, label: 'scripts/', children: ['validate.mjs'] },
  { stage: 5, label: 'templates/', children: ['report.html'] },
];

function buildTree(revealStage: number): string {
  const nodes = TREE_NODES.filter((n) => revealStage >= n.stage);
  const lines = ['quit-vim/'];
  nodes.forEach((node, i) => {
    const isLast = i === nodes.length - 1;
    lines.push((isLast ? '└── ' : '├── ') + node.label);
    const cont = isLast ? '    ' : '│   ';
    node.children?.forEach((child, j) => {
      const childBranch = j === (node.children?.length ?? 0) - 1 ? '└── ' : '├── ';
      lines.push(cont + childBranch + child);
    });
  });
  return lines.join('\n');
}

// The progressive-disclosure bullet is about what lives in SKILL.md, so at
// that stage the left panel zooms from the tree into the file itself: the
// frontmatter (name + description) the model sees at startup, then the body.
const PROGRESSIVE_DISCLOSURE_STAGE = 2;

const SKILL_MD = `---
name: quit-vim
description: Escape a stuck vim session. Use when someone
  is trapped in vim and can't get back to the shell.
---

# Quit Vim

Press Esc, type :q! and hit Enter to exit without
saving. You're free.`;

const BULLETS: ReactNode[] = [
  <>
    skills are distributed as <Emphasis color="green">directories</Emphasis>
  </>,
  <>
    <Code>SKILL.md</Code> is the <Emphasis color="orange">only required file</Emphasis>{' '}
    — everything else is optional
  </>,
  <>
    at startup the model loads into context only{' '}
    <Emphasis color="green">descriptions</Emphasis>, the body loads on
    request, one file (in some cases one section) at a time as needed
  </>,
  <>
    <Code>references/</Code> — extra knowledge, read only when the
    instructions say <Emphasis color="green">read X when Y</Emphasis>
  </>,
  <>
    <Code>scripts/</Code> — it can contain TypeScript / Python / bash scripts for deterministic automation
  </>,
  <>
    directory names aren't prescribed — name them after their{' '}
    <Emphasis color="green">purpose</Emphasis>: <Code>validators/</Code>,{' '}
    <Code>schemas/</Code>, <Code>prompts/</Code>
  </>,
];

export const SkillStructureSlide: SlideDefinition = {
  id: 'skill-structure',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">the skill</span>{' '}
      <span className="text-orange">directory</span>
    </>
  ),
  content: ({ revealStage }) => {
    // Sliding window keeps the newest bullets readable without shrinking
    // the body font (projector legibility beats completeness).
    const WINDOW = 3;
    const firstVisible = Math.max(0, revealStage - WINDOW + 1);
    const isVisible = (i: number) => revealStage >= i && i >= firstVisible;

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
        {/* Left — the specimen: the directory tree, or (on the progressive-
            disclosure beat) the SKILL.md file it zooms into */}
        <div style={{ flex: '0 1 auto', minWidth: 0 }}>
          {revealStage === PROGRESSIVE_DISCLOSURE_STAGE ? (
            <CodeBlock
              language="markdown"
              filename="cat quit-vim/SKILL.md"
              code={SKILL_MD}
            />
          ) : (
            <CodeBlock
              language="bash"
              filename="tree .claude/skills/quit-vim"
              code={buildTree(revealStage)}
            />
          )}
        </div>

        {/* Right — the dissection notes */}
        <div style={{ flex: '1 1 50%', maxWidth: '760px', textAlign: 'left' }}>
          {BULLETS.map((bullet, i) =>
            isVisible(i) ? (
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
    'Skill directory structure. A skill is distributed as a directory. Only SKILL.md is required (frontmatter name+description, body instructions). Progressive disclosure: description at startup → body on activation → bundled files on demand. references/ read only on explicit pointer; scripts run with only their output entering context; other dirs named by domain purpose, spec prescribes nothing.',
};
