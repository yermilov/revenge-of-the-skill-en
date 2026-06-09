import { SlideDefinition } from '../types/slides';
import { Code, SlideItem } from '../components/SlideElements';

// Command styling (orange code)
function Command({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

export const VibeFlowStepsSlide: SlideDefinition = {
  id: 'vibe-flow-steps',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">vibe</span>{' '}
      <span className="text-orange">flow</span>
    </>
  ),
  content: (
    <div
      style={{
        textAlign: 'left',
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <SlideItem delay={0.05}>
        <Command>/clear</Command> clear the context window
      </SlideItem>

      <SlideItem delay={0}>
        switch to <Code>plan mode</Code>
      </SlideItem>

      <SlideItem delay={0}>
        describe the feature / bug,{' '}
        <span
          className="text-orange"
          style={{ textShadow: '0 0 8px rgba(240, 136, 62, 0.9), 0 0 20px rgba(240, 136, 62, 0.6), 0 0 40px rgba(240, 136, 62, 0.3)' }}
        >
          build the context
        </span>
      </SlideItem>

      <SlideItem delay={0}>iterate on the plan</SlideItem>

      <SlideItem delay={0}>approve the plan — Claude Code executes it</SlideItem>

      <SlideItem delay={0}>
        <Command>/commit-push-pr</Command>
      </SlideItem>

      <SlideItem delay={0}>
        <Command>/clear</Command>
      </SlideItem>

      <SlideItem delay={0}>
        <Command>/simplify</Command> or <Command>/review</Command>
      </SlideItem>
    </div>
  ),
  notes:
    'Workflow: clear the session, plan mode, describe the problem, iterate on the plan, auto-accept, commit',
};
