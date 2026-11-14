import './map.sass'

import { useState } from 'react'
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
import { type CSSVars, cx } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
  useSheetStack,
} from '@/lib/sheet-stack'
import { formatPostDate, getPosts } from '@/services'

import { MAP_HEIGHT, MAP_ROUTE, MAP_WIDTH, type MapStop, toPercent } from './map-nodes'
import { WebsiteMap } from './website-map'

const spreadNumber = (chapter: SpreadMeta) =>
  formatSpreadNumber(SPREADS.findIndex((spread) => spread.id === chapter.id))

// A stop links to the spreads either side of it: the pages previous and next open from there.
const routeNeighbours = (id: string) => {
  const index = MAP_ROUTE.findIndex((stop) => stop.id === id)
  return [MAP_ROUTE[index - 1], MAP_ROUTE[index + 1]].filter(
    (stop): stop is MapStop => stop !== undefined,
  )
}

// Entries are filed in the Journal, so aiming at one brings the Journal briefing forward.
const briefingFor = (stop: MapStop) => {
  if (stop.spread.path.startsWith('/blog/')) return 'journal'
  return CHAPTERS.some((chapter) => chapter.id === stop.id) ? stop.id : null
}

const RouteLinks = ({ from }: { from: string | null }) => {
  const origin = MAP_ROUTE.find((stop) => stop.id === from)

  return (
    <svg
      className="map__links"
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false">
      {origin &&
        routeNeighbours(origin.id).map((target) => (
          <g
            key={`${origin.id}-${target.id}`}
            className="map__link">
            <line
              className="map__link-glow"
              x1={origin.x}
              y1={origin.y}
              x2={target.x}
              y2={target.y}
            />
            <line
              className="map__link-line"
              x1={origin.x}
              y1={origin.y}
              x2={target.x}
              y2={target.y}
            />
            <circle
              className="map__link-end"
              cx={target.x}
              cy={target.y}
              r={4}
            />
          </g>
        ))}
    </svg>
  )
}

const MapMarkers = () => {
  const { order, promote } = useSheetStack()
  const [hovered, setHovered] = useState<string | null>(null)

  const aim = (stop: MapStop) => {
    setHovered(stop.id)
    const briefing = briefingFor(stop)
    if (briefing) promote(briefing)
  }
  const release = (id: string) =>
    setHovered((current) => (current === id ? null : current))

  return (
    <nav
      className="map__markers"
      aria-label="Website map">
      <RouteLinks from={hovered} />
      <ol>
        {MAP_ROUTE.map((stop) => {
          const position = toPercent(stop)
          const linked =
            hovered !== null && routeNeighbours(hovered).some(({ id }) => id === stop.id)
          const here = stop.spread.path === '/'

          return (
            <li
              key={stop.id}
              className={cx(
                'map__marker',
                `map__marker--${stop.side}`,
                `map__marker--${stop.lift}`,
                !stop.anchor && 'map__marker--entry',
                order[0] === stop.id && 'map__marker--active',
                linked && 'map__marker--linked',
              )}
              style={{ '--marker-x': position.x, '--marker-y': position.y } as CSSVars}>
              <Link
                to={stop.spread.path}
                aria-current={here ? 'page' : undefined}
                onPointerEnter={() => aim(stop)}
                onPointerLeave={() => release(stop.id)}
                onFocus={() => aim(stop)}
                onBlur={() => release(stop.id)}>
                <span
                  className="map__marker-pin"
                  aria-hidden="true"
                />
                <span className="map__marker-label">
                  <span className="map__marker-name">
                    <span className="map__marker-index">
                      {formatSpreadNumber(stop.index)}
                    </span>
                    <span className="map__marker-title">{stop.spread.label}</span>
                  </span>
                  <span className="map__marker-place">{stop.place}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

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
      <CyanPill
        to={chapter.path}
        icon="la-arrow-right"
        tone="yellow">
        Enter {chapter.label}
      </CyanPill>
    </div>
  )
}

export const MapPage = () => (
  <SheetScene
    kind="map"
    className="map">
    <SheetStackProvider initialOrder={CHAPTERS.map((chapter) => chapter.id)}>
      <Plate
        depth={3}
        className="map__plate">
        <WebsiteMap />
        <span
          className="map__shade"
          aria-hidden="true"
        />
        <MapMarkers />
      </Plate>
      <div
        className="map__title layer"
        style={{ '--layer-depth': 1 } as CSSVars}>
        <p className="spread-kicker">Night file // {PROFILE.location}</p>
        <DisplayTitle
          lines={[PROFILE.firstName, PROFILE.lastName]}
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
