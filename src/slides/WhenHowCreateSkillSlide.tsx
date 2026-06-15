import { SlideDefinition } from '../types/slides';

// Two scenarios that should make you reach for a skill, each as a WHEN? trigger
// (prose) + a HOW? block of claude> prompts. Stage 0 is empty; scenario 1
// reveals its WHEN then HOW (stages 1–2), scenario 2 the same (stages 3–4).
// Both cards stay on screen at the end so the two triggers sit side by side.
// Copy is kept verbatim.
interface Scenario {
  whenStage: number;
  howStage: number;
  when: string;
  how: string[];
}

const SCENARIOS: Scenario[] = [
  {
    whenStage: 1,
    howStage: 2,
    when:
      'when you see model makes systematic mistake (it has infinite knowledge about world, but may not know some internal specifics or your personal preference or just mix things)',
    how: ['instead of X do Y and remember this info by creating a skill do-X'],
  },
  {
    whenStage: 3,
    howStage: 4,
    when:
      'you have a repeatable process of doing something (find performance bottlenecks, do code review, compose release notes)',
    how: [
      'do X1',
      'do X2',
      'do X3',
      'based on the current session create skill to remember process X',
    ],
  },
];

const STYLES = `
  .wh-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--space-xl);
    width: 100%;
    height: 100%;
    min-height: 0;
  }
  .wh-card {
    flex: 0 1 48%;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
    animation: wh-rise 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }
  @keyframes wh-rise {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: none; }
  }
  .wh-tag {
    display: inline-block;
    font-weight: 700;
    letter-spacing: 1.5px;
    font-size: 1rem;
    padding: 3px 14px;
    border-radius: 7px;
  }
  .wh-tag--when {
    color: #f0883e;
    border: 1px solid color-mix(in srgb, #f0883e 50%, transparent);
    background: color-mix(in srgb, #f0883e 12%, transparent);
    text-shadow: 0 0 14px color-mix(in srgb, #f0883e 35%, transparent);
  }
  .wh-tag--how {
    color: #7ee787;
    border: 1px solid color-mix(in srgb, #7ee787 50%, transparent);
    background: color-mix(in srgb, #7ee787 12%, transparent);
    text-shadow: 0 0 14px color-mix(in srgb, #7ee787 35%, transparent);
  }
  .wh-when {
    font-size: clamp(1rem, 1.25vw, 1.3rem);
    line-height: 1.42;
    color: #e2e8f0;
  }
  .wh-term {
    border: 1px solid color-mix(in srgb, #7ee787 28%, transparent);
    border-radius: 10px;
    background:
      linear-gradient(180deg,
        color-mix(in srgb, #7ee787 7%, #0a0e14),
        #0a0e14);
    box-shadow: inset 0 0 40px -26px #7ee787;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    animation: wh-rise 0.4s ease both;
  }
  .wh-line {
    font-size: clamp(0.92rem, 1.1vw, 1.15rem);
    line-height: 1.35;
  }
  .wh-prompt {
    color: #76e4f7;
    font-weight: 700;
    margin-right: 8px;
  }
`;

export const WhenHowCreateSkillSlide: SlideDefinition = {
  id: 'when-how-create-skill',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">when and how</span>{' '}
      <span className="text-orange">create skill?</span>
    </>
  ),
  maxRevealStages: 4,
  initialRevealStage: 0,
  content: ({ revealStage }) => (
    <div className="wh-body">
      <style>{STYLES}</style>
      {SCENARIOS.filter((s) => revealStage >= s.whenStage).map((s) => (
        <div key={s.whenStage} className="wh-card">
          <div>
            <span className="wh-tag wh-tag--when">WHEN?</span>
          </div>
          <div className="wh-when">{s.when}</div>

          {revealStage >= s.howStage && (
            <>
              <div style={{ marginTop: '4px' }}>
                <span className="wh-tag wh-tag--how">HOW?</span>
              </div>
              <div className="wh-term">
                {s.how.map((line, i) => (
                  <div key={i} className="wh-line">
                    <span className="wh-prompt">claude&gt;</span>
                    {line}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  ),
  notes:
    'When and how to create a skill — two triggers. Scenario 1 (stages 1–2): WHEN the model makes a systematic mistake — it knows the world but not your internal specifics / personal preference, or it mixes things up. HOW: tell it "instead of X do Y" and ask it to remember by creating a skill do-X. Scenario 2 (stages 3–4): WHEN you have a repeatable process (find perf bottlenecks, code review, release notes). HOW: drive it through the steps once (do X1, X2, X3), then ask it to turn the current session into a skill that remembers process X.',
};
