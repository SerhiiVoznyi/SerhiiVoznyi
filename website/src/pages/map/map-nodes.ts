import { type SpreadMeta, SPREADS } from '@/content/spreads'
import { formatPostDate } from '@/services'

import { seeded } from './seeded'

/** Shared coordinate space for the circuit board, the perk tiles and the backdrop waves. */
export const MAP_WIDTH = 1200
export const MAP_HEIGHT = 500
/** Perk tiles are square, this many plate units across. */
export const PERK_SIZE = 62

type Point = readonly [number, number]

export type MapStop = {
  id: string
  /** Position in `SPREADS`, so keyboard order is the reading order. */
  index: number
  spread: SpreadMeta
  x: number
  y: number
  /** 0 is the Map itself, 1 the chapters, 2 the entries filed under the Journal. */
  tier: 0 | 1 | 2
  parent: string | null
  icon: string
  code: string
  /** Which way the tooltip opens, so it stays on the open board. */
  side: 'left' | 'right'
  place: string
}

/** A locked socket: board furniture with no spread behind it. */
export type MapSocket = { id: string; x: number; y: number; parent: string; code: string }

export type MapTrace = {
  from: string
  to: string
  d: string
  /** Decorative traces never light up; only spread-to-spread wiring does. */
  live: boolean
}

const ROOT: Point = [96, 252]
const CHAPTER_X = 276
const ENTRY_X = 470
const ENTRY_COLUMN_STEP = 160
const ROW_STEP = 104
const ROW_MIN = 96
const ROW_MAX = 408
const ENTRIES_PER_COLUMN = 4

const CHAPTERS: Record<string, { row: number; icon: string; place: string }> = {
  profile: { row: 96, icon: 'la-user-astronaut', place: 'Identity core' },
  experience: { row: 200, icon: 'la-microchip', place: 'Combat record' },
  journal: { row: 304, icon: 'la-book-open', place: 'Memory shards' },
  contact: { row: 408, icon: 'la-satellite-dish', place: 'Open channel' },
}

const codeOf = (index: number) => `PRK_${String(index + 1).padStart(4, '0')}`

// A column of entries centres on the Journal row, then slides to stay inside the board.
const entryRows = (count: number) => {
  const centre = CHAPTERS.journal.row
  const rows = Array.from(
    { length: count },
    (_, index) => centre + (index - (count - 1) / 2) * ROW_STEP,
  )
  const shift =
    Math.min(0, ROW_MAX - Math.max(...rows)) || Math.max(0, ROW_MIN - Math.min(...rows))
  return rows.map((row) => Math.round(row + shift))
}

const buildRoute = (spreads: readonly SpreadMeta[]): MapStop[] => {
  const entries = spreads.filter((spread) => spread.path.startsWith('/blog/'))

  return spreads.map((spread, index): MapStop => {
    const base = { id: spread.id, index, spread, code: codeOf(index) }

    if (spread.path === '/') {
      return {
        ...base,
        x: ROOT[0],
        y: ROOT[1],
        tier: 0,
        parent: null,
        icon: 'la-map-marked-alt',
        side: 'right',
        place: 'You are here',
      }
    }

    const chapter = CHAPTERS[spread.id]
    if (chapter) {
      return {
        ...base,
        x: CHAPTER_X,
        y: chapter.row,
        tier: 1,
        parent: 'map',
        icon: chapter.icon,
        side: 'right',
        place: chapter.place,
      }
    }

    const position = entries.indexOf(spread)
    const column = Math.floor(position / ENTRIES_PER_COLUMN)
    const inColumn = Math.min(
      ENTRIES_PER_COLUMN,
      entries.length - column * ENTRIES_PER_COLUMN,
    )
    const x = ENTRY_X + column * ENTRY_COLUMN_STEP
    return {
      ...base,
      x,
      y: entryRows(inColumn)[position % ENTRIES_PER_COLUMN],
      tier: 2,
      parent: 'journal',
      icon: 'la-file-alt',
      side: x > 560 ? 'left' : 'right',
      place: spread.date ? `Filed ${formatPostDate(spread.date)}` : spread.chapter,
    }
  })
}

/** Every navigable spread, in reading order: the counter, prev/next and the map agree. */
export const MAP_ROUTE: readonly MapStop[] = buildRoute(SPREADS)

const SOCKET_CELLS: readonly Point[] = [
  [470, 96],
  [640, 148],
  [640, 356],
]

// Sockets fill open cells only, each wired to the closest tile to its left.
const buildSockets = (): MapSocket[] => {
  const nodes: { id: string; x: number; y: number }[] = [...MAP_ROUTE]
  const sockets: MapSocket[] = []

  SOCKET_CELLS.forEach(([x, y], index) => {
    if (nodes.some((node) => Math.hypot(node.x - x, node.y - y) < 90)) return
    const parent = nodes
      .filter((node) => node.x < x - 60)
      .sort(
        (a, b) =>
          Math.abs(a.y - y) + (x - a.x) * 0.3 - (Math.abs(b.y - y) + (x - b.x) * 0.3),
      )[0]
    if (!parent) return
    const socket = {
      id: `socket:${index}`,
      x,
      y,
      parent: parent.id,
      code: `PRK_${(0x0a10 + index * 0x37).toString(16).toUpperCase()}`,
    }
    sockets.push(socket)
    nodes.push(socket)
  })

  return sockets
}

export const MAP_SOCKETS: readonly MapSocket[] = buildSockets()

const HALF = PERK_SIZE / 2
const CHAMFER = 10

const round = (value: number) => Math.round(value * 10) / 10

// Board wiring runs out of the right edge of a tile and into the left edge of the next: horizontal,
// a 45-degree chamfer, vertical, another chamfer, horizontal again.
const wire = (from: Point, to: Point, lane: number, spread: number) => {
  const [sx, sy] = [from[0] + HALF + 4, from[1] + spread]
  const [ex, ey] = [to[0] - HALF - 4, to[1]]
  const dy = ey - sy
  if (Math.abs(dy) < 1) return `M${sx} ${sy}H${ex}`
  const mid = round((sx + ex) / 2 + lane)
  const c = Math.min(CHAMFER, Math.abs(dy) / 2)
  const s = Math.sign(dy)
  return `M${sx} ${sy}H${mid - c}L${mid} ${sy + s * c}V${ey - s * c}L${mid + c} ${ey}H${ex}`
}

const buildTraces = (): MapTrace[] => {
  const nodes = new Map<string, { x: number; y: number }>(
    [...MAP_ROUTE, ...MAP_SOCKETS].map((node) => [node.id, node]),
  )
  const edges = [
    ...MAP_ROUTE.filter((stop) => stop.parent).map((stop) => ({
      from: stop.parent as string,
      to: stop.id,
      live: true,
    })),
    ...MAP_SOCKETS.map((socket) => ({ from: socket.parent, to: socket.id, live: false })),
  ]

  return edges.map((edge) => {
    const siblings = edges.filter((other) => other.from === edge.from)
    const order = siblings.indexOf(edge) - (siblings.length - 1) / 2
    const from = nodes.get(edge.from)!
    const to = nodes.get(edge.to)!
    return {
      ...edge,
      d: wire([from.x, from.y], [to.x, to.y], order * 9, Math.round(order * 10)),
    }
  })
}

export const MAP_TRACES: readonly MapTrace[] = buildTraces()

export type BoardStub = { d: string; pad: Point; label: string }

// Loose wiring that runs off each tile and out toward the board edges, like the reference's bus lines.
const buildStubs = (): BoardStub[] => {
  const random = seeded(2077)
  const stubs: BoardStub[] = []
  const hex = () =>
    Math.floor(random() * 0xffff)
      .toString(16)
      .toUpperCase()
      .padStart(4, '0')

  for (let lane = 0; lane < 4; lane += 1) {
    const y = ROOT[1] - 18 + lane * 12
    const bend = ROOT[0] - HALF - 14 - lane * 8
    const drop = (lane < 2 ? -1 : 1) * (18 + Math.abs(lane - 1.5) * 24)
    stubs.push({
      d: `M${ROOT[0] - HALF - 4} ${y}H${bend}L${bend - 12} ${y + Math.sign(drop) * 12}V${y + drop}H0`,
      pad: [0, y + drop],
      label: '',
    })
  }

  // A stub only leaves a tile on a side with no tile stacked there, so it never crosses a caption.
  const nodes = [...MAP_ROUTE, ...MAP_SOCKETS]
  for (const node of nodes) {
    const column = nodes.filter(
      (other) => other !== node && Math.abs(other.x - node.x) < 40,
    )
    const freeAbove = !column.some((other) => other.y < node.y && node.y - other.y < 150)
    const freeBelow = !column.some((other) => other.y > node.y && other.y - node.y < 150)
    if (!freeAbove && !freeBelow) continue
    const s = freeAbove && (!freeBelow || random() < 0.5) ? -1 : 1
    const x = Math.round(node.x - HALF + 12 + random() * (PERK_SIZE - 24))
    const start = node.y + s * (HALF + 22)
    const endY = start + s * (10 + Math.round(random() * 10))
    const run = (random() < 0.5 ? -1 : 1) * (22 + Math.round(random() * 34))
    const endX = x + run
    stubs.push({
      d: `M${x} ${start}V${endY - s * 6}L${x + Math.sign(run) * 6} ${endY}H${endX}`,
      pad: [endX, endY],
      label: `CN_${hex()}`,
    })
  }

  return stubs
}

export const BOARD_STUBS: readonly BoardStub[] = buildStubs()

export const toPercent = ({ x, y }: { x: number; y: number }) => ({
  x: `${(x / MAP_WIDTH) * 100}%`,
  y: `${(y / MAP_HEIGHT) * 100}%`,
})
