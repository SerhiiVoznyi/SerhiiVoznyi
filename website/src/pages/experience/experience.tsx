import './experience.sass'

import {
  BackToMap,
  Decal,
  DisplayTitle,
  HazardRule,
  NdaNote,
  Sticker,
  TagChip,
} from '@/components'
import {
  EMPLOYERS,
  IMPACT,
  IMPACT_HEADLINE,
  IMPACT_INTRO,
  IMPACT_RECORD,
  PROJECTS,
} from '@/content/career'
import { PROFILE } from '@/content/profile'
import { STICKERS } from '@/content/stickers'
import type { CSSVars } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
} from '@/lib/sheet-stack'

import { CareerTimeline } from './career-timeline'
import { ProjectList } from './project-list'

export const ExperiencePage = () => (
  <SheetScene
    kind="split"
    className="experience"
    overlay={<BackToMap className="spread-back" />}>
    <SheetStackProvider initialOrder={['career', 'projects', 'impact', 'stack']}>
      <Plate
        src="/assets/art/server-hall.webp"
        depth={2}
        region="right"
        glitch
        caption="Plate // Where the systems live"
      />
      <Decal
        src="/assets/art/logo-serpent-s.webp"
        className="experience__decal"
      />
      <div
        className="experience__title layer"
        style={{ '--layer-depth': 1 } as CSSVars}>
        <p className="spread-kicker">Experience // {PROFILE.experience} in the field</p>
        <DisplayTitle
          lines={['Experience']}
          size="lg"
          spreadHeading
        />
      </div>
      <SheetStack
        label="Experience sheets"
        region="left">
        <Sheet
          id="career"
          index={1}
          title="Career"
          teaser={`${PROFILE.role} · ${PROFILE.experience}`}
          edge="torn">
          <Sticker
            src={STICKERS.server}
            rotate={8}
          />
          <p className="sheet-text">{PROFILE.careerSummary}</p>
          <CareerTimeline
            entries={EMPLOYERS}
            origin={`${PROFILE.experience} in fintech, banking and enterprise`}
          />
          <NdaNote />
        </Sheet>
        <Sheet
          id="projects"
          index={2}
          title="Projects"
          teaser={`${PROJECTS.length} client projects · fintech, banking, property`}>
          <ProjectList projects={PROJECTS} />
          <NdaNote />
        </Sheet>
        <Sheet
          id="impact"
          index={3}
          title="Impact"
          teaser={IMPACT_HEADLINE}
          treatment="ink">
          <Sticker
            src={STICKERS.nodes}
            rotate={6}
          />
          <p className="sheet-text">{IMPACT_INTRO}</p>
          <dl className="impact-grid">
            {IMPACT.map((metric) => (
              <div
                key={metric.label}
                className="impact-grid__tile">
                <dt>{metric.label}</dt>
                <dd className="impact-grid__value">{metric.value}</dd>
                <dd className="impact-grid__detail">{metric.detail}</dd>
              </div>
            ))}
          </dl>
          {IMPACT_RECORD.map((group) => (
            <section
              key={group.title}
              aria-label={group.title}>
              <h3 className="sheet-subhead">{group.title}</h3>
              <ul className="sheet-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </Sheet>
        <Sheet
          id="stack"
          index={4}
          title="Stack"
          teaser={PROFILE.stack.join(' · ')}
          treatment="yellow"
          edge="notched">
          <HazardRule
            tone="ink"
            className="experience__rule"
          />
          <Sticker
            src={STICKERS.chip}
            rotate={-7}
          />
          <dl className="experience__stack">
            {PROFILE.stackGroups.map((group) => (
              <div key={group.area}>
                <dt>{group.area}</dt>
                <dd>
                  <ul className="chip-row">
                    {group.items.map((item) => (
                      <li key={item}>
                        <TagChip tag={item} />
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Sheet>
      </SheetStack>
    </SheetStackProvider>
  </SheetScene>
)
