import { SlideDefinition } from '../types/slides';
import chatComparison from '/junior-engineer-comparison.png?url';

function KeyInsightArrow() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        margin: '0 0.5rem',
        color: 'var(--terminal-orange)',
        animation: 'arrowPulse 2s ease-in-out infinite',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: 'drop-shadow(0 0 4px var(--terminal-orange-glow))' }}
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}


export const JuniorEngineerSlide: SlideDefinition = {
  id: 'junior-engineer',
  title: (
    <>
      <span className="text-dim">&gt;</span> what to type in that terminal?
    </>
  ),
  content: (
    <div className="junior-engineer-final">
      <style>{`
        @keyframes arrowPulse {
          0%, 100% { opacity: 1; transform: translateX(0); }
          50%       { opacity: 0.7; transform: translateX(4px); }
        }
      `}</style>

      <div className="key-insight junior-engineer-punchline">
        what would you write to a human?
        <KeyInsightArrow />
        <span className="text-emphasis text-emphasis--orange">write it to Claude Code</span>
      </div>

      <img
        src={chatComparison}
        alt="The same request sent in Slack and in the Claude Code terminal"
        className="junior-engineer-combined"
        loading="lazy"
      />
    </div>
  ),
};
