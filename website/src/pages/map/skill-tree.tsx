import './skill-tree.sass'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { CHAPTERS } from '@/content/spreads'
import { type CSSVars, cx } from '@/lib/cx'
import { useVisits } from '@/lib/reader'
import { useSheetStack } from '@/lib/sheet-stack'
import { formatCompactCount, getJournalManifest, prefetchPost } from '@/services'

import {
  BOARD_STUBS,
  MAP_HEIGHT,
  MAP_ROUTE,
  MAP_SOCKETS,
  MAP_TRACES,
  MAP_WIDTH,
  type MapStop,
  type PerkIcon,
  perkIconUrl,
  toPercent,
} from './map-nodes'

type Visits = ReturnType<typeof useVisits>

// Entries and the archive are filed in the Journal, so aiming at one brings its briefing forward.
const briefingFor = (stop: MapStop) => {
  if (stop.kind === 'entry' || stop.kind === 'archive') return 'journal'
  return CHAPTERS.some((chapter) => chapter.id === stop.id) ? stop.id : null
}

const childrenOf = (id: string) => MAP_ROUTE.filter((stop) => stop.parent === id)

const neighbours = (id: string) => {
  const stop = MAP_ROUTE.find((candidate) => candidate.id === id)
  return new Set([
    ...(stop?.parent ? [stop.parent] : []),
    ...childrenOf(id).map(({ id }) => id),
  ])
}

// A perk's level is how much of it the reader has opened: the Journal and its archive count every
// entry read, the Map counts chapters, anything else is one visit.
const levelOf = (stop: MapStop, { visited, entryCount }: Visits) => {
  if (stop.id === 'journal' || stop.kind === 'archive') {
    const { total } = getJournalManifest()
    return { points: Math.min(entryCount, total), max: total }
  }
  const children = childrenOf(stop.id)
  if (children.length > 0) {
    return {
      points: children.filter((child) => visited.has(child.id)).length,
      max: children.length,
    }
  }
  return { points: visited.has(stop.id) ? 1 : 0, max: 1 }
}

const TIP_KIND: Record<MapStop['kind'], string> = {
  root: 'Root',
  chapter: 'Chapter',
  entry: 'Entry',
  archive: 'Archive',
}

const PerkArt = ({ icon }: { icon: PerkIcon }) => (
  <span
    className="skill-tree__art"
    style={{ '--perk-icon': perkIconUrl(icon) } as CSSVars}
  />
)

const Circuit = ({
  aimed,
  visited,
}: {
  aimed: string | null
  visited: ReadonlySet<string>
}) => (
  <svg
    className="skill-tree__circuit"
    viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false">
    <g className="skill-tree__stubs">
      {BOARD_STUBS.map((stub, index) => (
        <g key={index}>
          <path
            className="skill-tree__stub"
            d={stub.d}
          />
          <rect
            className="skill-tree__pad"
            x={stub.pad[0] - 2.5}
            y={stub.pad[1] - 2.5}
            width={5}
            height={5}
          />
          {stub.label && (
            <text
              className="skill-tree__trace-label"
              x={stub.pad[0] + 5}
              y={stub.pad[1] + 2.5}>
              {stub.label}
            </text>
          )}
        </g>
      ))}
    </g>
    {MAP_TRACES.map((trace) => {
      const lit =
        aimed !== null && trace.live && (trace.from === aimed || trace.to === aimed)
      return (
        <g
          key={`${trace.from}-${trace.to}`}
          className={cx(
            'skill-tree__trace',
            !trace.live && 'skill-tree__trace--dead',
            trace.live && visited.has(trace.to) && 'skill-tree__trace--powered',
            lit && 'skill-tree__trace--lit',
          )}>
          {trace.strands.map((d, index) => (
            <path
              key={index}
              className={cx(
                'skill-tree__strand',
                index === (trace.strands.length - 1) / 2 && 'skill-tree__strand--core',
              )}
              d={d}
            />
          ))}
        </g>
      )
    })}
  </svg>
)

const Perk = ({
  stop,
  visits,
  active,
  linked,
  onAim,
  onRelease,
}: {
  stop: MapStop
  visits: Visits
  active: boolean
  linked: boolean
  onAim: () => void
  onRelease: () => void
}) => {
  const level = levelOf(stop, visits)
  const here = stop.kind === 'root'
  const unlocked =
    here || visits.visited.has(stop.id) || (stop.kind === 'archive' && level.points > 0)
  const position = toPercent(stop)

  return (
    <li
      className={cx(
        'skill-tree__perk',
        `skill-tree__perk--tip-${stop.side}`,
        stop.kind === 'entry' && 'skill-tree__perk--entry',
        unlocked ? 'skill-tree__perk--unlocked' : 'skill-tree__perk--available',
        active && 'skill-tree__perk--active',
        linked && 'skill-tree__perk--linked',
      )}
      style={{ '--perk-x': position.x, '--perk-y': position.y } as CSSVars}>
      <Link
        to={stop.spread.path}
        className="skill-tree__tile"
        aria-current={here ? 'page' : undefined}
        onPointerEnter={onAim}
        onPointerLeave={onRelease}
        onFocus={onAim}
        onBlur={onRelease}>
        <span
          className="skill-tree__readout"
          aria-hidden="true">
          <span className="skill-tree__code">{stop.code}</span>
          <span
            className={cx(
              'skill-tree__level',
              level.points === 0 && 'skill-tree__level--empty',
              level.points === level.max && 'skill-tree__level--full',
            )}>
            {formatCompactCount(level.points)}/{formatCompactCount(level.max)}
          </span>
        </span>
        <span
          className="skill-tree__face"
          aria-hidden="true">
          <PerkArt icon={stop.icon} />
        </span>
        <span className="skill-tree__name">{stop.spread.label}</span>
        <span className="skill-tree__tip">
          <span
            className="skill-tree__tip-head"
            aria-hidden="true">
            <span className="skill-tree__tip-index">{stop.number}</span>
            {`${TIP_KIND[stop.kind]} // ${stop.code}`}
          </span>
          {stop.kind === 'entry' && (
            <span
              className="skill-tree__tip-title"
              aria-hidden="true">
              {stop.spread.label}
            </span>
          )}
          <span className="skill-tree__tip-place">{stop.place}</span>
          <span
            className="skill-tree__tip-teaser"
            aria-hidden="true">
            {stop.spread.teaser}
          </span>
        </span>
      </Link>
    </li>
  )
}

/** The website map drawn as a perk tree: every spread is a perk, wired to the one it opens from. */
export const SkillTree = () => {
  const { order, promote } = useSheetStack()
  const visits = useVisits()
  const [aimed, setAimed] = useState<string | null>(null)
  const linked = aimed ? neighbours(aimed) : new Set<string>()

  const aim = (stop: MapStop) => {
    setAimed(stop.id)
    if (stop.kind === 'entry') prefetchPost(stop.id.slice('post:'.length))
    const briefing = briefingFor(stop)
    if (briefing) promote(briefing)
  }
  const release = (id: string) => setAimed((current) => (current === id ? null : current))

  return (
    <nav
      className="skill-tree"
      aria-label="Website map">
      <Circuit
        aimed={aimed}
        visited={visits.visited}
      />
      <div
        className="skill-tree__sockets"
        aria-hidden="true">
        {MAP_SOCKETS.map((socket) => {
          const position = toPercent(socket)
          return (
            <span
              key={socket.id}
              className="skill-tree__perk skill-tree__perk--locked"
              style={{ '--perk-x': position.x, '--perk-y': position.y } as CSSVars}>
              <span className="skill-tree__tile">
                <span className="skill-tree__readout">
                  <span className="skill-tree__code">{socket.code}</span>
                  <span className="skill-tree__level skill-tree__level--empty">0/1</span>
                </span>
                <span className="skill-tree__face">
                  <PerkArt icon="locked" />
                </span>
              </span>
            </span>
          )
        })}
      </div>
      <ol>
        {MAP_ROUTE.map((stop) => (
          <Perk
            key={stop.id}
            stop={stop}
            visits={visits}
            active={order[0] === stop.id}
            linked={linked.has(stop.id)}
            onAim={() => aim(stop)}
            onRelease={() => release(stop.id)}
          />
        ))}
      </ol>
    </nav>
  )
}
