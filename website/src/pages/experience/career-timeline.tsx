import { CorpName } from '@/components'
import type { Employer } from '@/content/career'

type CareerTimelineProps = {
  entries: readonly Employer[]
  /** Closing marker at the end of the rail, e.g. total years in the field. */
  origin?: string
}

export const CareerTimeline = ({ entries, origin }: CareerTimelineProps) => (
  <ol className="career-timeline">
    {entries.map((entry) => {
      const [role, ...previous] = entry.roles

      return (
        <li
          key={`${entry.corp}-${entry.period}`}
          className="career-timeline__entry">
          <p className="career-timeline__period">{entry.period}</p>
          <h3 className="career-timeline__role">{role}</h3>
          <p className="career-timeline__where">
            <span className="career-timeline__company">
              <CorpName corp={entry.corp} />
            </span>
            <span>{entry.location}</span>
          </p>
          {previous.length > 0 && (
            <p className="career-timeline__previous">Previously {previous.join(', ')}</p>
          )}
          {entry.highlights.length > 0 && (
            <ul className="career-timeline__highlights">
              {entry.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </li>
      )
    })}
    {origin && (
      <li className="career-timeline__entry career-timeline__entry--origin">
        <p className="career-timeline__period">{origin}</p>
      </li>
    )}
  </ol>
)
