// Ported from dou-days-2026: the "software factory" antipattern.
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import softwareFactoryImg from '../assets/software-factory.jpg?url';

export const SoftwareFactorySlide: SlideDefinition = {
  id: 'software-factory',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">antipattern</span>
      <span className="text-dim">:</span>{' '}
      <span className="text-orange">software factory</span>
    </>
  ),
  maxRevealStages: 2,
  content: ({ revealStage }) => (
    <div className="software-factory-body">
      {/* Left column — bullets */}
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
            why an antipattern? a process carefully tuned to your needs is{' '}
            <Emphasis color="orange">very hard</Emphasis> to scale to other
            people, other teams, other needs
          </SlideItem>
        )}
      </div>

      {/* Right column — image appears on reveal 1 */}
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
  ),
  notes:
    'Antipattern: building an autonomous "software factory" workflow. Stage 0: the temptation — a "give it a ticket, get a result" pipeline. Stage 1: examples — gas town, ralph loop, your in-house "minion" framework. Stage 2: tuned to personal needs, doesn\'t scale to other people, teams, or needs.',
};
