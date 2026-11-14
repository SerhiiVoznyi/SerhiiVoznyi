import './map.sass'

import { Link } from 'react-router-dom'

import { CyanPill, DisplayTitle, HazardRule, TagChip } from '@/components'
import { PROFILE } from '@/content/profile'
import {
  DISTRICTS,
  formatSpreadNumber,
  type SpreadMeta,
  SPREADS,
} from '@/content/spreads'
import { type CSSVars, cx } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
  useSheetStack,
} from '@/lib/sheet-stack'
import { getPosts } from '@/services'

const MARKERS: Record<string, { x: string; y: string }> = {
  identity: { x: '7%', y: '17%' },
  dossier: { x: '27%', y: '31%' },
  transmissions: { x: '11%', y: '42%' },
  uplink: { x: '35%', y: '13%' },
}

const spreadNumber = (district: SpreadMeta) =>
  formatSpreadNumber(SPREADS.findIndex((spread) => spread.id === district.id))

const MapMarkers = () => {
  const { order, promote } = useSheetStack()

  return (
    <nav
      className="map__markers"
      aria-label="City map districts">
      <ul>
        {DISTRICTS.map((district) => (
          <li
            key={district.id}
            className={cx(
              'map__marker',
              order[0] === district.id && 'map__marker--active',
            )}
            style={
              {
                '--marker-x': MARKERS[district.id].x,
                '--marker-y': MARKERS[district.id].y,
              } as CSSVars
            }>
            <Link
              to={district.path}
              onPointerEnter={() => promote(district.id)}
              onFocus={() => promote(district.id)}>
              <span
                className="map__marker-pin"
                aria-hidden="true"
              />
              <span className="map__marker-label">
                <span className="map__marker-index">{spreadNumber(district)}</span>
                {district.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const DistrictBriefing = ({ district }: { district: SpreadMeta }) => {
  const posts = getPosts()

  return (
    <div className="map__briefing">
      {district.id === 'identity' && <p className="sheet-text">{PROFILE.summary}</p>}
      {district.id === 'dossier' && (
        <ul className="chip-row">
          {PROFILE.stack.map((item) => (
            <li key={item}>
              <TagChip tag={item} />
            </li>
          ))}
        </ul>
      )}
      {district.id === 'transmissions' && (
        <p className="sheet-text">
          {posts.length} transmissions filed.
          {posts[0] && <> Latest: “{posts[0].title}”.</>}
        </p>
      )}
      {district.id === 'uplink' && <p className="sheet-text">{PROFILE.topics}</p>}
      <CyanPill
        to={district.path}
        icon="la-arrow-right"
        tone="yellow">
        Enter {district.label}
      </CyanPill>
    </div>
  )
}

export const MapPage = () => (
  <SheetScene
    kind="map"
    className="map">
    <SheetStackProvider initialOrder={DISTRICTS.map((district) => district.id)}>
      <Plate
        src="/assets/art/city-plate-night.webp"
        depth={3}
        tone="mono"
        focus="35% center">
        <span
          className="map__shade"
          aria-hidden="true"
        />
        <MapMarkers />
      </Plate>
      <div
        className="map__block layer"
        style={{ '--layer-depth': 2 } as CSSVars}
        aria-hidden="true"
      />
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
        label="District briefings"
        region="map">
        {DISTRICTS.map((district, index) => (
          <Sheet
            key={district.id}
            id={district.id}
            index={index + 1}
            title={district.label}
            teaser={district.teaser}
            treatment="ink"
            edge="notched"
            aside={<>Spread {spreadNumber(district)}</>}>
            <DistrictBriefing district={district} />
          </Sheet>
        ))}
      </SheetStack>
    </SheetStackProvider>
  </SheetScene>
)
