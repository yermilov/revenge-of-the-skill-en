// Ported from dou-days-2026: the "software factory" antipattern, now merged
// with the "every engineer's workflow" beats from what-to-make-your-team-ai-first.
// Stages 0–2: the software-factory antipattern (bullets + photo). Stages 3–4:
// the resolution — every engineer's workflow is different (chaos diagram), but
// the building blocks are the same (structured SDLC diagram).
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { DiagramCanvas, HumanActor, FlowArrow, SparkTrail } from '../components/diagram';
import { EngineerAspireDiagram } from '../components/EngineerAspireDiagram';
import softwareFactoryImg from '../assets/software-factory.jpg?url';

const ORANGE = '#f0883e';
const GREEN  = '#7ee787';
const BLUE   = '#79c0ff';
const YELLOW = '#ffd166';
const CYAN   = '#76e4f7';

const CHAOS_STYLES = `
  @keyframes chaos-drift-1 {
    0%,100% { transform: translate(0,   0);    filter: blur(0px);   opacity: 1;    }
    20%     { transform: translate(4px, -6px); filter: blur(2px);   opacity: 0.85; }
    45%     { transform: translate(-3px, 5px); filter: blur(3.5px); opacity: 0.72; }
    70%     { transform: translate(5px,  2px); filter: blur(1.5px); opacity: 0.9;  }
  }
  @keyframes chaos-drift-2 {
    0%,100% { transform: translate(0,    0);   filter: blur(0px);   opacity: 1;    }
    15%     { transform: translate(-5px, 3px); filter: blur(2.5px); opacity: 0.8;  }
    40%     { transform: translate(4px, -5px); filter: blur(3px);   opacity: 0.7;  }
    72%     { transform: translate(-2px, 6px); filter: blur(1px);   opacity: 0.88; }
  }
  @keyframes chaos-drift-3 {
    0%,100% { transform: translate(0,   0);    filter: blur(0px);   opacity: 1;    }
    25%     { transform: translate(6px,  4px); filter: blur(3px);   opacity: 0.78; }
    55%     { transform: translate(-5px,-3px); filter: blur(2px);   opacity: 0.85; }
    80%     { transform: translate(3px, -5px); filter: blur(3.5px); opacity: 0.72; }
  }
  @keyframes chaos-drift-4 {
    0%,100% { transform: translate(0,    0);   filter: blur(0px);   opacity: 1;    }
    30%     { transform: translate(-4px, 5px); filter: blur(1.5px); opacity: 0.9;  }
    60%     { transform: translate(6px,  3px); filter: blur(3px);   opacity: 0.75; }
    85%     { transform: translate(-3px,-5px); filter: blur(2.5px); opacity: 0.82; }
  }
  @keyframes chaos-drift-5 {
    0%,100% { transform: translate(0,    0);   filter: blur(0px);   opacity: 1;    }
    20%     { transform: translate(5px, -4px); filter: blur(2px);   opacity: 0.83; }
    50%     { transform: translate(-4px, 6px); filter: blur(3.5px); opacity: 0.7;  }
    78%     { transform: translate(3px,  3px); filter: blur(1px);   opacity: 0.92; }
  }
  .chaos-d1 { animation: chaos-drift-1 3.1s ease-in-out infinite; }
  .chaos-d2 { animation: chaos-drift-2 3.8s ease-in-out infinite; }
  .chaos-d3 { animation: chaos-drift-3 4.2s ease-in-out infinite; }
  .chaos-d4 { animation: chaos-drift-4 3.5s ease-in-out infinite; }
  .chaos-d5 { animation: chaos-drift-5 4.7s ease-in-out infinite; }
`;

// The "every engineer's workflow is different" tangle of chaos paths — always
// rendered animated here (the structured resolution lives in EngineerAspireDiagram).
function ChaosDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 700 580">
      <style>{CHAOS_STYLES}</style>

      <g className="chaos-d1">
        <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
          d="M 97 50 C 150 -20, 500 -30, 680 80" />
        <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
          d="M 97 50 C 150 -20, 500 -30, 680 80" />
      </g>
      <g className="chaos-d2">
        <FlowArrow color={GREEN}  strokeWidth={3} glowId="glow-green"  markerId="arrow-green"
          d="M 97 155 C 200 350, 400 450, 690 380" />
        <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
          d="M 97 155 C 200 350, 400 450, 690 380" />
      </g>
      <g className="chaos-d3">
        <FlowArrow color={BLUE}   strokeWidth={3} glowId="glow-blue"   markerId="arrow-blue"
          d="M 97 260 C 250 260, 300 100, 490 260 C 580 350, 640 200, 690 220" />
        <SparkTrail color={BLUE} dur={4.0} glowId="glow-blue"
          d="M 97 260 C 250 260, 300 100, 490 260 C 580 350, 640 200, 690 220" />
      </g>
      <g className="chaos-d4">
        <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
          d="M 97 365 C 180 500, 350 520, 540 400 C 620 330, 650 120, 690 100" />
        <SparkTrail color={YELLOW} dur={3.0} glowId="glow-yellow"
          d="M 97 365 C 180 500, 350 520, 540 400 C 620 330, 650 120, 690 100" />
      </g>
      <g className="chaos-d5">
        <FlowArrow color={CYAN}   strokeWidth={3} glowId="glow-cyan"   markerId="arrow-cyan"
          d="M 97 445 C 300 445, 200 290, 400 370 C 500 425, 600 480, 690 440" />
        <SparkTrail color={CYAN} dur={7.0} glowId="glow-cyan"
          d="M 97 445 C 300 445, 200 290, 400 370 C 500 425, 600 480, 690 440" />
      </g>

      <HumanActor x={65} y={50}  size={62} color={ORANGE} />
      <HumanActor x={65} y={155} size={62} color={GREEN}  />
      <HumanActor x={65} y={260} size={62} color={BLUE}   />
      <HumanActor x={65} y={365} size={62} color={YELLOW} />
      <HumanActor x={65} y={445} size={62} color={CYAN}   />
    </DiagramCanvas>
  );
}

export const SoftwareFactorySlide: SlideDefinition = {
  id: 'software-factory',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">how it doesn't work</span>
      <span className="text-dim">:</span>{' '}
      <span className="text-orange">software factory</span>
    </>
  ),
  maxRevealStages: 4,
  content: ({ revealStage }) =>
    revealStage < 3 ? (
      // ── Stages 0–2: the software-factory antipattern ──
      <div className="software-factory-body">
        <div className="software-factory-bullets">
          <SlideItem delay={0.05}>
            dozens of agents <Emphasis color="orange">autonomously</Emphasis> pick
            up tasks from Jira and deploy to production
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0}>
              <Emphasis color="green">gas town</Emphasis>,{' '}
              <Emphasis color="green">ralph loop</Emphasis>, your in-house
              framework you named <Emphasis color="green">"minion"</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0}>
              why not? a process carefully tuned to your needs is{' '}
              <Emphasis color="orange">very hard</Emphasis> to scale to other
              people, other teams, other needs
            </SlideItem>
          )}
        </div>

        {revealStage >= 1 && (
          <div className="software-factory-shot">
            <img
              src={softwareFactoryImg}
              alt="Are ya shipping, son?"
              loading="lazy"
            />
          </div>
        )}
      </div>
    ) : (
      // ── Stages 3–4: every engineer's workflow differs, blocks are the same ──
      <div className="ai-first-team-body">
        <div className="ai-first-team-bullets">
          <SlideItem delay={0}>
            every engineer builds their own unique daily development workflow
          </SlideItem>

          {revealStage >= 4 && (
            <SlideItem delay={0}>
              the key is: the workflows look different — but the{' '}
              <Emphasis color="green">building blocks are the same</Emphasis>
            </SlideItem>
          )}
        </div>

        <div className="ai-first-team-diagram">
          {/* Stage 3: the chaos of unique workflows */}
          <div
            style={{
              opacity: revealStage < 4 ? 1 : 0,
              transition: 'opacity 0.7s ease',
              height: '100%',
            }}
          >
            <ChaosDiagram />
          </div>
          {/* Stage 4: the same SDLC building blocks underneath */}
          <div
            style={{
              opacity: revealStage >= 4 ? 1 : 0,
              transition: 'opacity 0.7s ease',
              position: 'absolute',
              inset: 0,
            }}
          >
            <EngineerAspireDiagram highlightedNode="" />
          </div>
        </div>
      </div>
    ),
  notes:
    'Antipattern then resolution. Stage 0: the temptation — an autonomous "give it a ticket, get a result" pipeline. Stage 1: examples — gas town, ralph loop, your in-house "minion" framework. Stage 2: tuned to personal needs, doesn\'t scale to other people/teams/needs. Stage 3: because every engineer builds their own unique daily workflow (chaos diagram). Stage 4: the key — workflows look different, but the building blocks are the same (structured SDLC diagram).',
};
