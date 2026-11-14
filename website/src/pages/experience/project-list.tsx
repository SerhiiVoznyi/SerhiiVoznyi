import { CorpName, TagChip } from '@/components'
import type { Project } from '@/content/career'

export const ProjectList = ({ projects }: { projects: readonly Project[] }) => (
  <ol className="project-list">
    {projects.map((project) => (
      <li key={project.id}>
        <article
          className="project-card"
          aria-labelledby={`project-${project.id}`}>
          <header className="project-card__header">
            <img
              className="project-card__emblem"
              src={`/assets/art/projects/${project.id}.webp`}
              alt=""
              width={88}
              height={88}
              loading="lazy"
              decoding="async"
            />
            <div>
              {project.period && <p className="project-card__period">{project.period}</p>}
              <h3
                id={`project-${project.id}`}
                className="project-card__title">
                {project.title}
              </h3>
              <p className="project-card__domain">{project.domain}</p>
            </div>
          </header>
          <dl className="project-card__meta">
            <div>
              <dt>Client</dt>
              <dd>
                <CorpName corp={project.customer} />
              </dd>
            </div>
            {project.role && (
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            {project.team && (
              <div>
                <dt>Team</dt>
                <dd>{project.team}</dd>
              </div>
            )}
          </dl>
          <p className="project-card__context">{project.context}</p>
          <ul className="project-card__highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul
            className="chip-row"
            aria-label="Stack">
            {project.stack.map((item) => (
              <li key={item}>
                <TagChip tag={item} />
              </li>
            ))}
          </ul>
        </article>
      </li>
    ))}
  </ol>
)
