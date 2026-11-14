import './map.sass'

import { Link } from 'react-router-dom'

import {
  CorpName,
  CyanPill,
  DisplayTitle,
  HazardRule,
  NdaNote,
  Sticker,
  TagChip,
} from '@/components'
import { EMPLOYERS, IMPACT_HEADLINE } from '@/content/career'
import { PROFILE } from '@/content/profile'
import { CHAPTERS, formatSpreadNumber, type SpreadMeta, SPREADS } from '@/content/spreads'
import { STICKERS } from '@/content/stickers'
import { type CSSVars } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
} from '@/lib/sheet-stack'
import { formatPostDate, getPosts } from '@/services'

import { MapBackdrop } from './map-backdrop'
import { SkillTree } from './skill-tree'

const spreadNumber = (chapter: SpreadMeta) =>
  formatSpreadNumber(SPREADS.findIndex((spread) => spread.id === chapter.id))

const BRIEFING_STICKERS: Record<string, string> = {
  profile: STICKERS.terminal,
  experience: STICKERS.server,
  journal: STICKERS.nodes,
  contact: STICKERS.antenna,
}

const Chips = ({ items }: { items: readonly string[] }) => (
  <ul className="chip-row">
    {items.map((item) => (
      <li key={item}>
        <TagChip tag={item} />
      </li>
    ))}
  </ul>
)

const ChapterBriefing = ({ chapter }: { chapter: SpreadMeta }) => {
  const posts = getPosts()
  const current = EMPLOYERS.at(0)
  const sticker = BRIEFING_STICKERS[chapter.id]

  return (
    <div className="map__briefing">
      {sticker && (
        <Sticker
          src={sticker}
          rotate={7}
        />
      )}
      {chapter.id === 'profile' && (
        <>
          <p className="sheet-text">{PROFILE.summary}</p>
          <dl className="glance-strip">
            {PROFILE.glance.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
      {chapter.id === 'experience' && (
        <>
          <p className="map__briefing-role">
            {PROFILE.role}
            {current && (
              <>
                {' '}
                at <CorpName corp={current.corp} />
              </>
            )}
          </p>
          <p className="sheet-text">{IMPACT_HEADLINE}</p>
          <Chips items={PROFILE.stack} />
          <NdaNote />
        </>
      )}
      {chapter.id === 'journal' && (
        <>
          <p className="sheet-text">{posts.length} entries filed. Latest:</p>
          <ul className="map__briefing-posts">
            {posts.slice(0, 2).map((post) => (
              <li key={post.slug}>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {chapter.id === 'contact' && (
        <>
          <p className="status-tag">{PROFILE.availability.status}</p>
          <p className="sheet-text">
            {PROFILE.availability.statement} If you have something to propose, I am happy
            to discuss it.
          </p>
          <Chips items={PROFILE.talkAbout} />
        </>
      )}
      <div className="map__briefing-action">
        <CyanPill
          to={chapter.path}
          icon="la-arrow-right"
          tone="yellow">
          Enter {chapter.label}
        </CyanPill>
      </div>
    </div>
  )
}

export const MapPage = () => (
  <SheetScene
    kind="map"
    className="map">
    <SheetStackProvider initialOrder={CHAPTERS.map((chapter) => chapter.id)}>
      <Plate
        src="/assets/art/map-netrunner.webp"
        focus="right center"
        depth={3}
        glitch
        className="map__plate">
        <MapBackdrop />
        <span
          className="map__shade"
          aria-hidden="true"
        />
        <SkillTree />
      </Plate>
      <div
        className="map__title layer"
        style={{ '--layer-depth': 1 } as CSSVars}>
        <p className="spread-kicker">Night file // {PROFILE.location}</p>
        <DisplayTitle
          lines={[PROFILE.firstName, PROFILE.lastName]}
          size="lg"
          spreadHeading
        />
        <HazardRule className="map__rule" />
        <p className="map__role">
          {PROFILE.role}
          <br />
          {PROFILE.title}
        </p>
      </div>
      <SheetStack
        label="Chapter briefings"
        region="map">
        {CHAPTERS.map((chapter, index) => (
          <Sheet
            key={chapter.id}
            id={chapter.id}
            index={index + 1}
            title={chapter.label}
            teaser={chapter.teaser}
            treatment="ink"
            edge="notched"
            aside={<>Spread {spreadNumber(chapter)}</>}>
            <ChapterBriefing chapter={chapter} />
          </Sheet>
        ))}
      </SheetStack>
    </SheetStackProvider>
  </SheetScene>
)
