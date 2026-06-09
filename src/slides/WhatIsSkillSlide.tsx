import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import spaceBg from '../assets/skill-space-bg.png?url';
import leftAstronaut from '../assets/skill-was-it-md.png?url';
import rightAstronaut from '../assets/skill-always-been.png?url';

// Slide-level backdrop: dim the nebula so the green/orange terminal copy
// retains contrast, then let the actual nebula bleed full-edge. Layered
// gradient sits ABOVE the image (CSS draws backgrounds top→bottom).
const SLIDE_BG = `
  linear-gradient(180deg,
    rgba(10, 14, 20, 0.62) 0%,
    rgba(10, 14, 20, 0.38) 45%,
    rgba(10, 14, 20, 0.62) 100%
  ),
  url(${spaceBg}) center/cover no-repeat
`;

export const WhatIsSkillSlide: SlideDefinition = {
  id: 'what-is-skill',
  background: SLIDE_BG,
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">all you need is</span>{' '}
      <span className="text-orange">skills</span>
    </>
  ),
  content: ({ revealStage }) => {
    // Sliding window: keep only the last 3 revealed bullets on screen so the
    // newest point always has room. Older bullets have already been spoken;
    // dropping them protects font legibility on a 1920×1080 projector.
    const WINDOW = 3;
    const firstVisible = Math.max(0, revealStage - WINDOW + 1);
    const isVisible = (i: number) => revealStage >= i && i >= firstVisible;

    return (
      <>
        <style>{`
          @keyframes astronautFloat {
            0%, 100% { transform: translateY(0px)   rotate(-2deg); }
            50%       { transform: translateY(-14px) rotate(2deg); }
          }
          @keyframes astronautFloatReverse {
            0%, 100% { transform: translateY(0px)   rotate(2deg); }
            50%       { transform: translateY(-14px) rotate(-2deg); }
          }
          .what-is-skill__astro {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            mix-blend-mode: screen;
            filter: drop-shadow(0 8px 28px rgba(0, 0, 0, 0.55));
            pointer-events: none;
          }
        `}</style>

        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '22% 1fr 22%',
            alignItems: 'center',
            height: 'calc(var(--vh-full) - 220px)',
            width: '100%',
            gap: 'var(--space-md)',
          }}
        >
          {/* Left astronaut — full vertical run, no inner frame clipping */}
          <div style={{ height: '100%', minHeight: 0 }}>
            <img
              src={leftAstronaut}
              alt="wait, it's all .md files?"
              loading="lazy"
              className="what-is-skill__astro"
              style={{ animation: 'astronautFloat 6s ease-in-out infinite' }}
            />
          </div>

          {/* HUD-style bullet card — floats in the nebula */}
          <div
            style={{
              maxWidth: '780px',
              justifySelf: 'center',
              alignSelf: 'center',
              textAlign: 'left',
              padding: 'var(--space-md) var(--space-lg)',
              background:
                'linear-gradient(135deg, rgba(10, 14, 20, 0.72) 0%, rgba(20, 12, 36, 0.62) 100%)',
              border: '1px solid rgba(126, 231, 135, 0.18)',
              borderRadius: '6px',
              backdropFilter: 'blur(8px) saturate(140%)',
              WebkitBackdropFilter: 'blur(8px) saturate(140%)',
              boxShadow:
                '0 24px 64px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            }}
          >
            {isVisible(0) && (
              <SlideItem size="normal" delay={revealStage === 0 ? 0.05 : 0}>
                a skill is just a <Emphasis color="green">SKILL.md</Emphasis> file
                with instructions on how to do something
              </SlideItem>
            )}

            {isVisible(1) && (
              <SlideItem size="normal" delay={0}>
                unlike an <Emphasis color="orange">MCP server</Emphasis>, it
                doesn't take up the context window — it loads only when the model
                needs it
              </SlideItem>
            )}

            {isVisible(2) && (
              <SlideItem size="normal" delay={0}>
                unlike a <Emphasis color="orange">slash command</Emphasis>, the
                model invokes it itself when needed
              </SlideItem>
            )}

            {isVisible(3) && (
              <SlideItem size="normal" delay={0}>
                like a <Emphasis color="orange">subagent</Emphasis>, it can be executed in a separate context
              </SlideItem>
            )}

            {isVisible(4) && (
              <SlideItem size="normal" delay={0}>
                it can be a whole <Emphasis color="green">library</Emphasis> of
                md files with links — the model navigates and loads them as needed
              </SlideItem>
            )}

            {isVisible(5) && (
              <SlideItem size="normal" delay={0}>
                it can contain{' '}
                <Emphasis color="green">TypeScript / Python / bash</Emphasis>{' '}
                scripts for deterministic automation
              </SlideItem>
            )}
          </div>

          {/* Right astronaut — mirror of the left, slightly slower drift */}
          <div style={{ height: '100%', minHeight: 0 }}>
            <img
              src={rightAstronaut}
              alt="always have been."
              loading="lazy"
              className="what-is-skill__astro"
              style={{
                animation: 'astronautFloatReverse 7s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </>
    );
  },
  maxRevealStages: 5,
  notes:
    'A skill is just markdown. Does not consume context (unlike MCP), the model decides when to load it (unlike a slash command), can be a library of md with links, can contain TypeScript/Python/bash scripts for deterministic automation. Sliding-window pattern: only the last 3 revealed bullets stay on screen so newer points have room without shrinking the body font.',
};
