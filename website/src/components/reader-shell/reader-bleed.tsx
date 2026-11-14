import { useMemo } from 'react'
import { useElementSize } from '@mantine/hooks'

type Point = readonly [number, number]
// Position along the edge (fraction of its length), flat width in px, depth in px.
// Positive depth raises a tab off the band, negative bites a notch into it.
type Tab = readonly [at: number, width: number, depth: number]

const TOP_THICKNESS = 5
const CORNER = 12
const TIP = 14
const END_SLANT = 26

const TOP_TABS: readonly Tab[] = [
  [0.05, 18, 4],
  [0.17, 44, -2],
  [0.31, 10, 5],
  [0.46, 26, 3],
  [0.6, 64, -2],
  [0.76, 12, 4],
  [0.9, 30, 2],
]

const TOP_TICKS = [0.11, 0.39, 0.55, 0.71, 0.84]

const RIGHT_TICKS = [0.2, 0.6, 0.84]

// Tabs are 45-degree trapezoids, so every bend reads as a cut rather than a slope.
const edge = (length: number, tabs: readonly Tab[]): Point[] =>
  tabs.flatMap(([at, width, depth]) => {
    const start = at * length
    const ramp = Math.abs(depth)
    return [
      [start, 0],
      [start + ramp, depth],
      [start + ramp + width, depth],
      [start + ramp * 2 + width, 0],
    ]
  })

const rect = (x: number, y: number, width: number, height: number) =>
  `M${x} ${y}h${width}v${height}h${-width}Z`

const round = (value: number) => Math.round(value * 10) / 10

const toPath = (points: readonly Point[]) =>
  points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`)
    .join('') + 'Z'

const buildBleed = (width: number, height: number) => {
  // Mirrors --app-chrome-gutter (clamp(0.75rem, 3vw, 2.5rem)); the bar fills half of it.
  const side = Math.min(40, Math.max(12, width * 0.03)) * 0.5
  const notch = -side * 0.35
  const startX = width * 0.36
  const endY = height * 0.74
  const inner = width - side
  const rightTop = TOP_THICKNESS + CORNER
  const rightBottom = endY - END_SLANT
  const rightLength = rightBottom - rightTop
  const topRight = inner - CORNER
  const topLength = topRight - (startX + TIP)

  const rightTabs: readonly Tab[] = [
    [0.08, 34, notch],
    [0.27, 14, 4],
    [0.42, rightLength * 0.15, notch],
    [0.64, 10, 5],
    [0.74, 40, 3],
    [0.9, 16, 4],
  ]

  const band = toPath([
    [startX, 0],
    [width, 0],
    [width, endY],
    [inner, rightBottom],
    ...edge(rightLength, rightTabs).map(([s, d]): Point => [inner - d, rightBottom - s]),
    [inner, rightTop],
    [topRight, TOP_THICKNESS],
    ...edge(topLength, TOP_TABS).map(([s, d]): Point => [
      topRight - s,
      TOP_THICKNESS + d,
    ]),
    [startX + TIP, TOP_THICKNESS],
  ])

  const barcode = (count: number, draw: (index: number) => string) =>
    Array.from({ length: count }, (_, index) => draw(index)).join('')

  const ticks = [
    ...TOP_TICKS.map((at) => {
      const x = round(topRight - at * topLength)
      return barcode(6, (index) => rect(x - index * 3, TOP_THICKNESS + 2, 1, 3))
    }),
    ...RIGHT_TICKS.map((at) => {
      const y = round(rightBottom - at * rightLength)
      return barcode(5, (index) => rect(inner - 5, y - index * 3, 3, 1))
    }),
    barcode(5, (index) => rect(round(inner - 14.4), round(endY - 3 - index * 7), 5, 3)),
  ].join('')

  return { band, ticks }
}

/** Yellow hazard band hugging the top and right edges of the reader. */
export const ReaderBleed = () => {
  const { ref, width, height } = useElementSize<HTMLSpanElement>()
  const paths = useMemo(
    () => (width && height ? buildBleed(width, height) : null),
    [width, height],
  )

  return (
    <span
      ref={ref}
      className="reader__bleed"
      aria-hidden="true">
      {paths && (
        <svg
          width={width}
          height={height}
          focusable="false">
          <path d={paths.band} />
          <path d={paths.ticks} />
        </svg>
      )}
    </span>
  )
}
