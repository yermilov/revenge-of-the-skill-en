// Ported from how-to-make-your-team-ai-first-en: agent session traces as
// the audit log, training data, and improvement loop. Right panel shows the
// uploader code (stages 1–2), then the vibes UI screenshot (stage 3).
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';
import vibesImage from '/vibes.png?url';

const TRACER_CODE = `export function getSessionFilePath(
  sessionId: string, workDir: string,
): string {
  const encodedPath = workDir.replace(/\\//g, "-");
  return join(
    homedir(), ".claude", "projects",
    encodedPath, \`\${sessionId}.jsonl\`,
  );
}

export async function uploadSession(
  sessionId: string, workDir: string,
) {
  const filePath = getSessionFilePath(sessionId, workDir);
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([await readFile(filePath)]),
    \`\${sessionId}.jsonl\`,
  );
  await fetch(VIBES_API_URL, { method: "POST", body: formData });
}`;

export const AgentTracesSlide: SlideDefinition = {
  id: 'agent-traces',
  title: (
    <>
      <span className="text-dim">$</span>{' '}
      <span className="text-green">agents</span>{' '}
      <span className="text-orange">--traces</span>
    </>
  ),
  maxRevealStages: 3,
  initialRevealStage: 1,
  content: ({ revealStage }) => (
    <div className="agent-traces-body">
      {/* ── Left column: bullets — sliding window so the long UI bullets
            at stage 3 don't overflow under the earlier ones ── */}
      <div className="agent-traces-bullets">
        {revealStage === 1 && (
          <SlideItem delay={0} reveal>
            since agents work autonomously, you need an{' '}
            <Emphasis color="green">observability system</Emphasis> — you
            can't review every decision, but you must be able to audit them
          </SlideItem>
        )}
        {revealStage <= 2 && (
          <SlideItem delay={0.08} reveal>
            build a thin wrapper around <Emphasis color="orange">S3</Emphasis>{' '}
            and have all agents upload their session log <code>.jsonl</code>{' '}
            files there after every run
          </SlideItem>
        )}
        {revealStage === 2 && (
          <SlideItem delay={0} reveal>
            create a <Emphasis color="green">skill</Emphasis> that downloads a
            sample of sessions, analyzes them, and suggests improvements to
            skills and agent instructions — agents improving agents
          </SlideItem>
        )}
        {revealStage >= 3 && (
          <SlideItem delay={0} reveal>
            vibe-code a nice <Emphasis color="orange">UI</Emphasis> around it
            so humans can also upload their own sessions for knowledge sharing
            and debugging — shared context between human and machine runs
          </SlideItem>
        )}
        {revealStage >= 3 && (
          <SlideItem delay={0.08} reveal>
            <SlideLink href="https://entire.io">entire.io</SlideLink> and the{' '}
            <code>share-session</code> Claude Code feature are the first steps
            in this direction
          </SlideItem>
        )}
      </div>

      {/* ── Right column: transmission panel — uploader code on stages 1–2,
            the vibes screenshot on stage 3. Keyed so the swap re-animates. ── */}
      <div key={revealStage >= 3 ? 'image' : 'code'} className="agent-traces-panel">
        <div className="agent-traces-panel__chrome agent-traces-panel__chrome--top">
          ░░░ {revealStage >= 3 ? 'vibes — session sharing UI' : 'vibes.ts — session uploader'} ░░░
        </div>
        {revealStage < 3 ? (
          <div className="agent-traces-panel__viewport">
            <CodeBlock language="typescript" code={TRACER_CODE} />
          </div>
        ) : (
          <div className="agent-traces-panel__viewport agent-traces-panel__viewport--image">
            <img src={vibesImage} alt="Vibes session sharing UI" loading="lazy" />
          </div>
        )}
        <div className="agent-traces-panel__chrome agent-traces-panel__chrome--bottom">
          [END OF TRANSMISSION]
        </div>
      </div>
    </div>
  ),
  notes:
    "Session traces are your audit log, your training data, and your improvement loop all in one. The UI makes it social — engineers start reading each other's sessions.",
};
