import './skill-tree.sass'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { CHAPTERS, formatSpreadNumber } from '@/content/spreads'
import { type CSSVars, cx } from '@/lib/cx'
import { useVisitedSpreads } from '@/lib/reader'
import { useSheetStack } from '@/lib/sheet-stack'

import {
  BOARD_STUBS,
  MAP_HEIGHT,
  MAP_ROUTE,
  MAP_SOCKETS,
  MAP_TRACES,
  MAP_WIDTH,
  type MapStop,
  toPercent,
} from './map-nodes'

// Entries are filed in the Journal, so aiming at one brings the Journal briefing forward.
const briefingFor = (stop: MapStop) => {
  if (stop.spread.path.startsWith('/blog/')) return 'journal'
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

// A perk's level is how much of it the reader has opened: a chapter with entries counts them.
const levelOf = (stop: MapStop, visited: ReadonlySet<string>) => {
  const entries = childrenOf(stop.id)
  if (entries.length > 0) {
    return {
      points: entries.filter((entry) => visited.has(entry.id)).length,
      max: entries.length,
    }
  }
  return { points: visited.has(stop.id) ? 1 : 0, max: 1 }
}

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
          <path
            className="skill-tree__trace-bus"
            d={trace.d}
          />
          <path
            className="skill-tree__trace-gap"
            d={trace.d}
          />
          <path
            className="skill-tree__trace-core"
            d={trace.d}
          />
        </g>
      )
    })}
  </svg>
)

const Perk = ({
  stop,
  visited,
  active,
  linked,
  onAim,
  onRelease,
}: {
  stop: MapStop
  visited: ReadonlySet<string>
  active: boolean
  linked: boolean
  onAim: () => void
  onRelease: () => void
}) => {
  const level = levelOf(stop, visited)
  const here = stop.spread.path === '/'
  const unlocked = here || visited.has(stop.id)
  const position = toPercent(stop)

  return (
    <li
      className={cx(
        'skill-tree__perk',
        `skill-tree__perk--tip-${stop.side}`,
        stop.tier === 2 && 'skill-tree__perk--entry',
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
            {level.points}/{level.max}
          </span>
        </span>
        <span
          className="skill-tree__face"
          aria-hidden="true">
          <i className={cx('las', stop.icon)} />
        </span>
        <span className="skill-tree__name">{stop.spread.label}</span>
        <span className="skill-tree__tip">
          <span
            className="skill-tree__tip-head"
            aria-hidden="true">
            <span className="skill-tree__tip-index">
              {formatSpreadNumber(stop.index)}
            </span>
            {stop.tier === 2 ? 'Entry' : stop.tier === 0 ? 'Root' : 'Chapter'} //{' '}
            {stop.code}
          </span>
          {stop.tier === 2 && (
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
  const visited = useVisitedSpreads()
  const [aimed, setAimed] = useState<string | null>(null)
  const linked = aimed ? neighbours(aimed) : new Set<string>()

  const aim = (stop: MapStop) => {
    setAimed(stop.id)
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
        visited={visited}
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
                  <i className="las la-lock" />
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
            visited={visited}
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
