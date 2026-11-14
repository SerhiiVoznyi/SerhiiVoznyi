import { type SpreadMeta, SPREADS } from '@/content/spreads'
import { formatPostDate } from '@/services'

import { seeded, seedOf } from './seeded'

/** Shared coordinate space for the drawn brain, the route pins and the hover links. */
export const MAP_WIDTH = 1200
export const MAP_HEIGHT = 500

export type MapStop = {
  id: string
  /** Position in `SPREADS`, so the route is the reading order. */
  index: number
  spread: SpreadMeta
  x: number
  y: number
  /** Which way the label hangs off the pin, so it never runs into the title block or plate edge. */
  side: 'left' | 'right'
  lift: 'above' | 'below'
  /** The memory zone of the drawn brain the pin stands on, or the filing date for an entry. */
  place: string
  /** Chapters carry a memory zone and an engram glow; entries are plain stops. */
  anchor: boolean
}

// Pins scatter across the open top-left of the plate: the briefing stack covers the lower left
// from 47% down and the title block everything right of 52% below the top band.
const AREA = { left: 55, right: 590, top: 45, bottom: 205 }
const CANDIDATES = 8
const SHUFFLE = 'night-file-2'

const PLACES: Record<string, string> = {
  map: 'You are here',
  profile: 'Self memory',
  experience: 'Procedural memory',
  journal: 'Episodic memory',
  contact: 'Language centre',
}

const placeOf = (spread: SpreadMeta) =>
  PLACES[spread.id] ??
  (spread.date ? `Filed ${formatPostDate(spread.date)}` : spread.chapter)

const buildRoute = (spreads: readonly SpreadMeta[]): MapStop[] => {
  const stops: MapStop[] = []

  spreads.forEach((spread, index) => {
    // Best-candidate scatter: of a few seeded points anywhere in the open area, a stop takes the one
    // farthest from the stops already placed, so pins spread out without looking gridded.
    const random = seeded(seedOf(`${SHUFFLE}:${spread.id}`))
    let best = { x: AREA.left, y: AREA.top, clearance: -1 }

    for (let attempt = 0; attempt < CANDIDATES; attempt += 1) {
      const x = AREA.left + random() * (AREA.right - AREA.left)
      const y = AREA.top + random() * (AREA.bottom - AREA.top)
      const clearance = Math.min(
        Infinity,
        ...stops.map((stop) => Math.hypot(stop.x - x, stop.y - y)),
      )
      if (clearance > best.clearance) best = { x, y, clearance }
    }

    const x = Math.round(best.x)
    const y = Math.round(best.y)
    stops.push({
      id: spread.id,
      index,
      spread,
      x,
      y,
      side: x > 470 ? 'left' : 'right',
      lift: y < 105 ? 'below' : 'above',
      place: placeOf(spread),
      anchor: spread.id in PLACES,
    })
  })

  return stops
}

/** Every navigable spread, in reading order: the counter, prev/next and the map agree. */
export const MAP_ROUTE: readonly MapStop[] = buildRoute(SPREADS)

export const MAP_ANCHORS = MAP_ROUTE.filter((stop) => stop.anchor)

export const toPercent = ({ x, y }: Pick<MapStop, 'x' | 'y'>) => ({
  x: `${(x / MAP_WIDTH) * 100}%`,
  y: `${(y / MAP_HEIGHT) * 100}%`,
})
