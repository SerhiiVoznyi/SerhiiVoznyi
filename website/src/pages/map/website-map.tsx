import './website-map.sass'

import { memo } from 'react'

import { MAP_ANCHORS, MAP_HEIGHT, MAP_WIDTH } from './map-nodes'
import { seeded } from './seeded'

type Point = readonly [number, number]

const round = (value: number) => Math.round(value * 10) / 10

// Catmull-Rom through the points, emitted as cubic Béziers.
const smoothPath = (points: readonly Point[], closed = false) => {
  const count = points.length
  const at = (index: number) =>
    closed
      ? points[(index + count) % count]
      : points[Math.max(0, Math.min(count - 1, index))]
  let d = `M${points[0][0]} ${points[0][1]}`
  for (let index = 0; index < (closed ? count : count - 1); index += 1) {
    const [x0, y0] = at(index - 1)
    const [x1, y1] = at(index)
    const [x2, y2] = at(index + 1)
    const [x3, y3] = at(index + 2)
    d += ` C${round(x1 + (x2 - x0) / 6)} ${round(y1 + (y2 - y0) / 6)} ${round(x2 - (x3 - x1) / 6)} ${round(y2 - (y3 - y1) / 6)} ${x2} ${y2}`
  }
  return closed ? `${d}Z` : d
}

const linePath = (points: readonly Point[]) =>
  points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join('')

const insidePolygon = ([x, y]: Point, polygon: readonly Point[]) => {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

// Points every `step` units along a polyline.
const sample = (points: readonly Point[], step: number) => {
  const result: Point[] = []
  for (let index = 1; index < points.length; index += 1) {
    const [ax, ay] = points[index - 1]
    const [bx, by] = points[index]
    const count = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / step))
    for (let i = 0; i < count; i += 1) {
      result.push([ax + ((bx - ax) * i) / count, ay + ((by - ay) * i) / count])
    }
  }
  return result
}

// Real sulci wander: subdivide each span and push the midpoints off the line.
const meander = (points: readonly Point[], amplitude: number, seed: number) => {
  const random = seeded(seed)
  const result: Point[] = [points[0]]
  for (let index = 1; index < points.length; index += 1) {
    const [ax, ay] = points[index - 1]
    const [bx, by] = points[index]
    const length = Math.hypot(bx - ax, by - ay) || 1
    const [nx, ny] = [-(by - ay) / length, (bx - ax) / length]
    for (const t of [1 / 3, 2 / 3]) {
      const push = (random() - 0.5) * 2 * amplitude
      result.push([
        round(ax + (bx - ax) * t + nx * push),
        round(ay + (by - ay) * t + ny * push),
      ])
    }
    result.push(points[index])
  }
  return result
}

// Left hemisphere in lateral view, frontal pole facing left, in textbook proportions.
const CEREBRUM: readonly Point[] = [
  [20, 224],
  [34, 156],
  [69, 97],
  [125, 52],
  [202, 22],
  [286, 6],
  [370, 6],
  [454, 20],
  [538, 52],
  [608, 97],
  [664, 152],
  [706, 211],
  [720, 256],
  [699, 297],
  [650, 325],
  [580, 343],
  [510, 370],
  [426, 416],
  [342, 447],
  [272, 461],
  [209, 452],
  [160, 425],
  [139, 379],
  [146, 343],
  [174, 325],
  [125, 325],
  [76, 306],
  [41, 270],
]

const CEREBELLUM: readonly Point[] = [
  [548, 372],
  [610, 352],
  [668, 336],
  [712, 340],
  [735, 370],
  [730, 410],
  [700, 440],
  [645, 458],
  [585, 455],
  [545, 432],
  [528, 400],
]

const BRAINSTEM: readonly Point[] = [
  [478, 398],
  [528, 384],
  [540, 430],
  [528, 500],
  [514, 540],
  [470, 540],
  [466, 480],
  [452, 440],
]

const SULCI = {
  central: [
    [392, 8],
    [384, 50],
    [372, 95],
    [362, 140],
    [352, 185],
    [342, 232],
    [332, 280],
  ],
  precentral: [
    [352, 14],
    [342, 60],
    [330, 110],
    [318, 160],
    [310, 200],
    [300, 248],
    [292, 290],
  ],
  postcentral: [
    [430, 16],
    [420, 70],
    [410, 120],
    [400, 170],
    [392, 215],
    [385, 262],
  ],
  sylvian: [
    [174, 325],
    [240, 305],
    [320, 288],
    [400, 270],
    [470, 252],
    [515, 236],
    [540, 212],
  ],
  superiorFrontal: [
    [334, 85],
    [270, 88],
    [210, 98],
    [160, 115],
    [120, 140],
    [90, 165],
  ],
  inferiorFrontal: [
    [318, 152],
    [260, 162],
    [200, 180],
    [150, 202],
    [105, 230],
  ],
  superiorTemporal: [
    [170, 370],
    [250, 350],
    [330, 334],
    [420, 315],
    [490, 298],
    [560, 280],
    [600, 262],
    [612, 238],
  ],
  inferiorTemporal: [
    [200, 420],
    [290, 405],
    [380, 385],
    [470, 360],
    [550, 335],
  ],
  intraparietal: [
    [405, 140],
    [460, 135],
    [520, 128],
    [580, 140],
    [630, 165],
  ],
  parietoOccipital: [
    [642, 100],
    [632, 135],
  ],
  lunate: [
    [684, 196],
    [672, 240],
    [678, 282],
  ],
} satisfies Record<string, Point[]>

const LOBES: readonly { tone: string; points: readonly Point[] }[] = [
  {
    tone: 'frontal',
    points: [
      [-10, -10],
      [392, -10],
      ...SULCI.central,
      [320, 288],
      [174, 325],
      [-10, 340],
    ],
  },
  {
    tone: 'parietal',
    points: [
      [392, -10],
      [650, -10],
      [632, 135],
      [640, 250],
      [612, 238],
      [540, 212],
      [515, 236],
      [470, 252],
      [400, 270],
      [332, 280],
      ...[...SULCI.central].reverse(),
    ],
  },
  {
    tone: 'occipital',
    points: [
      [650, -10],
      [760, -10],
      [760, 360],
      [640, 360],
      [640, 250],
      [632, 135],
    ],
  },
  {
    tone: 'temporal',
    points: [
      ...SULCI.sylvian,
      [612, 238],
      [640, 250],
      [640, 360],
      [480, 470],
      [120, 470],
      [120, 340],
    ],
  },
]

// Gyri run in characteristic directions: front-to-back in the frontal and temporal lobes,
// top-to-bottom along the motor strip, oblique through the parietal lobe.
// Angles are axial (degrees, y down), blended in doubled-angle space.
const BEARINGS: readonly [number, number, number][] = [
  [150, 45, -12],
  [230, 30, -6],
  [45, 170, -80],
  [70, 110, -50],
  [180, 140, 2],
  [250, 125, 0],
  [150, 245, 12],
  [90, 275, 30],
  [245, 230, -5],
  [340, 100, -75],
  [325, 230, -75],
  [410, 120, -78],
  [490, 90, 12],
  [540, 170, 20],
  [520, 40, 18],
  [650, 140, 62],
  [690, 230, 85],
  [250, 385, -14],
  [350, 365, -16],
  [450, 335, -24],
  [330, 430, -10],
  [550, 305, -30],
]

const bearing = (x: number, y: number): Point => {
  let cos = 0
  let sin = 0
  for (const [bx, by, degrees] of BEARINGS) {
    const weight = 1 / ((x - bx) ** 2 + (y - by) ** 2 + 400)
    const doubled = (degrees * Math.PI) / 90
    cos += Math.cos(doubled) * weight
    sin += Math.sin(doubled) * weight
  }
  const angle =
    Math.atan2(sin, cos) / 2 +
    0.95 * Math.sin(x * 0.11 + y * 0.06) +
    0.75 * Math.cos(y * 0.13 - x * 0.05)
  return [Math.cos(angle), Math.sin(angle)]
}

// Secondary folds are grown as evenly spaced streamlines that stop short of any other fold,
// so the cortex fills with meandering, non-crossing gyri like the real surface.
const CELL = 4
const COLUMNS = Math.ceil(800 / CELL)
const ROWS = Math.ceil(520 / CELL)

const buildFolds = () => {
  const occupied = new Uint8Array(COLUMNS * ROWS)
  const cellOf = (x: number, y: number) => {
    const column = Math.floor(x / CELL)
    const row = Math.floor(y / CELL)
    return column < 0 || row < 0 || column >= COLUMNS || row >= ROWS
      ? -1
      : row * COLUMNS + column
  }
  // Seeds need a full gyrus width of clearance; a growing fold only needs half, so it runs long.
  const isFree = (x: number, y: number, reach = 3) => {
    const column = Math.floor(x / CELL)
    const row = Math.floor(y / CELL)
    for (let dr = -reach; dr <= reach; dr += 1) {
      for (let dc = -reach; dc <= reach; dc += 1) {
        const r = row + dr
        const c = column + dc
        if (r >= 0 && c >= 0 && r < ROWS && c < COLUMNS && occupied[r * COLUMNS + c])
          return false
      }
    }
    return true
  }
  const mark = (points: readonly Point[]) => {
    for (const [x, y] of points) {
      const index = cellOf(x, y)
      if (index >= 0) occupied[index] = 1
    }
  }

  mark(sample(CEREBRUM.concat([CEREBRUM[0]]), 2))
  for (const sulcus of Object.values(SULCI)) mark(sample(sulcus, 2))

  const step = 2.5
  const trace = (sx: number, sy: number, sign: 1 | -1) => {
    const points: Point[] = []
    let [px, py] = bearing(sx, sy)
    px *= sign
    py *= sign
    let x = sx
    let y = sy
    for (let i = 0; i < 140; i += 1) {
      let [dx, dy] = bearing(x, y)
      if (dx * px + dy * py < 0) {
        dx = -dx
        dy = -dy
      }
      x += dx * step
      y += dy * step
      if (!insidePolygon([x, y], CEREBRUM) || !isFree(x, y, 2)) break
      points.push([Math.round(x), Math.round(y)])
      px = dx
      py = dy
    }
    return points
  }

  const random = seeded(1991)
  const seeds: Point[] = []
  for (let y = 4; y < 470; y += 7) {
    for (let x = 20; x < 725; x += 7) seeds.push([x + random() * 6, y + random() * 6])
  }
  for (let i = seeds.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[seeds[i], seeds[j]] = [seeds[j], seeds[i]]
  }

  let folds = ''
  for (const [sx, sy] of seeds) {
    if (!insidePolygon([sx, sy], CEREBRUM) || !isFree(sx, sy)) continue
    const line = [
      ...trace(sx, sy, -1).reverse(),
      [Math.round(sx), Math.round(sy)] as Point,
      ...trace(sx, sy, 1),
    ]
    if (line.length < 5) continue
    mark(line)
    folds += linePath(line)
  }
  return folds
}

// Folia: the fine parallel ridges of the cerebellum.
const buildFolia = () =>
  Array.from({ length: 24 }, (_, index) => {
    const rx = 60 + index * 6
    const ry = rx * 0.7
    return `M${632 - rx} 300A${rx} ${ry} 0 0 0 ${632 + rx} 300`
  }).join('')

// Neurons firing, denser around the memory zones under the chapter pins.
const buildNeurons = () => {
  const random = seeded(7)
  let warm = ''
  let cool = ''
  const hotspots = MAP_ANCHORS
  for (let attempt = 0; attempt < 1800; attempt += 1) {
    const point: Point = [round(random() * 740), round(random() * 470)]
    if (!insidePolygon(point, CEREBRUM)) continue
    const near = Math.min(
      ...hotspots.map(({ x, y }) => Math.hypot(point[0] - x, point[1] - y)),
    )
    if (random() > 0.12 + Math.max(0, 1 - near / 70) * 0.7) continue
    const dot = `M${point[0]} ${point[1]}h0`
    if (random() < 0.55) warm += dot
    else cool += dot
  }
  return { warm, cool }
}

// Beyond the occipital pole the brain hands off into an open neural net: long-term storage.
const buildNetwork = () => {
  const random = seeded(42)
  const nodes: Point[] = []
  while (nodes.length < 70) {
    const point: Point = [round(745 + random() * 460), round(10 + random() * 480)]
    if (!insidePolygon(point, CEREBELLUM)) nodes.push(point)
  }
  let axons = ''
  for (const [x, y] of nodes) {
    const nearest = nodes
      .filter(([ox, oy]) => ox !== x || oy !== y)
      .sort((a, b) => Math.hypot(a[0] - x, a[1] - y) - Math.hypot(b[0] - x, b[1] - y))
      .slice(0, 2)
    for (const [nx, ny] of nearest) axons += `M${x} ${y}L${nx} ${ny}`
  }
  return { axons, somas: nodes.map(([x, y]) => `M${x} ${y}h0`).join('') }
}

// Brain waves: the outline echoed outward, a little looser each time.
const buildWaves = () => {
  const random = seeded(5)
  const [cx, cy] = [370, 240]
  return [1.05, 1.11, 1.18, 1.26].map((scale) =>
    smoothPath(
      CEREBRUM.map(([x, y], index): Point => {
        const wobble =
          1 + Math.sin(index * 1.7 + scale * 9) * 0.015 + (random() - 0.5) * 0.02
        return [
          round(cx + (x - cx) * scale * wobble),
          round(cy + (y - cy) * scale * wobble),
        ]
      }),
      true,
    ),
  )
}

const ZONE_NAMES: readonly [string, number, number, number][] = [
  ['Frontal lobe', 150, 66, 0],
  ['Motor cortex', 324, 150, -75],
  ['Parietal lobe', 486, 40, 0],
  ['Occipital', 602, 330, -90],
  ['Temporal lobe', 250, 400, 0],
  ['Cerebellum', 592, 412, 0],
  ['Brainstem', 506, 500, -80],
  ['Neural net', 880, 108, 0],
  ['Long-term storage', 860, 470, 0],
]

const REGION_NAMES: readonly [string, number, number, number][] = [
  ['Prefrontal cortex', 44, 215, -74],
  ['Superior frontal gyrus', 150, 96, 0],
  ['Broca area', 205, 292, -12],
  ['Central sulcus', 378, 92, -76],
  ['Somatosensory', 394, 140, -78],
  ['Superior parietal', 500, 104, 0],
  ['Intraparietal sulcus', 470, 128, -4],
  ['Supramarginal', 520, 160, 0],
  ['Wernicke area', 430, 232, -14],
  ['Angular gyrus', 586, 262, -60],
  ['Sylvian fissure', 252, 298, -13],
]

const CEREBRUM_PATH = smoothPath(CEREBRUM, true)
const CEREBELLUM_PATH = smoothPath(CEREBELLUM, true)
const BRAINSTEM_PATH = smoothPath(BRAINSTEM, true)
const MAJOR_SULCI = Object.values(SULCI)
  .map((sulcus, index) => smoothPath(meander(sulcus, 5, 300 + index)))
  .join('')
const FOLDS = buildFolds()
const FOLIA = buildFolia()
const NEURONS = buildNeurons()
const NETWORK = buildNetwork()
const WAVES = buildWaves()

const SceneMap = () => (
  <svg
    className="website-map"
    viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false">
    <defs>
      <pattern
        id="website-map-mesh"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse">
        <path
          className="website-map__mesh"
          d="M24 0H0V24"
        />
      </pattern>
      <clipPath id="website-map-cerebrum">
        <path d={CEREBRUM_PATH} />
      </clipPath>
      <clipPath id="website-map-cerebellum">
        <path d={CEREBELLUM_PATH} />
      </clipPath>
      <radialGradient
        id="website-map-volume"
        cx="42%"
        cy="34%"
        r="70%">
        <stop
          offset="0"
          className="website-map__stop-tissue-lit"
        />
        <stop
          offset="1"
          className="website-map__stop-tissue"
        />
      </radialGradient>
      {/* The grooves are drawn black on a white brain, blurred into a height map and lit, so
          every gyrus becomes a rounded, shaded ridge with a wet highlight on its crown. */}
      <filter
        id="website-map-relief"
        filterUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="760"
        height="560"
        colorInterpolationFilters="sRGB">
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="2.6"
          result="soft"
        />
        <feColorMatrix
          in="soft"
          type="luminanceToAlpha"
          result="height"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.55"
          numOctaves="2"
          seed="7"
          result="grain"
        />
        <feColorMatrix
          in="grain"
          type="luminanceToAlpha"
          result="grainHeight"
        />
        <feComposite
          in="height"
          in2="grainHeight"
          operator="arithmetic"
          k2="1"
          k3="0.1"
          result="surface"
        />
        <feDiffuseLighting
          in="surface"
          surfaceScale="5"
          diffuseConstant="1"
          lightingColor="#1c2d6e"
          result="diffuse">
          <feDistantLight
            azimuth="225"
            elevation="46"
          />
        </feDiffuseLighting>
        <feSpecularLighting
          in="surface"
          surfaceScale="5"
          specularConstant="0.42"
          specularExponent="24"
          lightingColor="#7fe9ff"
          result="specular">
          <feDistantLight
            azimuth="225"
            elevation="46"
          />
        </feSpecularLighting>
        <feComposite
          in="specular"
          in2="diffuse"
          operator="arithmetic"
          k2="0.6"
          k3="1"
          result="lit"
        />
        <feComposite
          in="lit"
          in2="SourceAlpha"
          operator="in"
        />
      </filter>
      <filter
        id="website-map-soften"
        x="-10%"
        y="-10%"
        width="120%"
        height="120%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <radialGradient id="website-map-engram">
        <stop
          offset="0"
          className="website-map__stop-warm"
        />
        <stop
          offset="1"
          className="website-map__stop-warm"
          stopOpacity="0"
        />
      </radialGradient>
      <radialGradient
        id="website-map-vignette"
        cx="38%"
        cy="40%"
        r="75%">
        <stop
          offset="55%"
          className="website-map__stop-void"
          stopOpacity="0"
        />
        <stop
          offset="100%"
          className="website-map__stop-void"
          stopOpacity="0.85"
        />
      </radialGradient>
      <linearGradient id="website-map-scan">
        <stop
          offset="0"
          className="website-map__stop-cyan"
          stopOpacity="0"
        />
        <stop
          offset="0.5"
          className="website-map__stop-cyan"
          stopOpacity="0.12"
        />
        <stop
          offset="1"
          className="website-map__stop-cyan"
          stopOpacity="0"
        />
      </linearGradient>
    </defs>

    <rect
      className="website-map__void"
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
    />
    <rect
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      fill="url(#website-map-mesh)"
    />
    {WAVES.map((d, index) => (
      <path
        key={index}
        className="website-map__wave"
        d={d}
      />
    ))}

    <path
      className="website-map__axon"
      d={NETWORK.axons}
    />
    <path
      className="website-map__soma"
      d={NETWORK.somas}
    />

    <path
      className="website-map__organ"
      d={`${BRAINSTEM_PATH}${CEREBELLUM_PATH}${CEREBRUM_PATH}`}
      fill="url(#website-map-volume)"
    />
    <g
      className="website-map__relief"
      filter="url(#website-map-relief)">
      <path
        className="website-map__height"
        d={BRAINSTEM_PATH}
      />
      <path
        className="website-map__height"
        d={CEREBELLUM_PATH}
      />
      <path
        className="website-map__height-groove website-map__height-groove--folia"
        d={FOLIA}
        clipPath="url(#website-map-cerebellum)"
      />
      <path
        className="website-map__height"
        d={CEREBRUM_PATH}
      />
      <g clipPath="url(#website-map-cerebrum)">
        <path
          className="website-map__height-groove"
          d={FOLDS}
        />
        <path
          className="website-map__height-groove website-map__height-groove--major"
          d={MAJOR_SULCI}
        />
      </g>
    </g>

    <g clipPath="url(#website-map-cerebrum)">
      <g
        className="website-map__lobes"
        filter="url(#website-map-soften)">
        {LOBES.map((lobe) => (
          <path
            key={lobe.tone}
            className={`website-map__lobe website-map__lobe--${lobe.tone}`}
            d={linePath(lobe.points)}
          />
        ))}
      </g>
      <path
        className="website-map__fold"
        d={FOLDS}
      />
      <path
        className="website-map__sulcus"
        d={MAJOR_SULCI}
      />
    </g>
    {MAP_ANCHORS.map(({ id, x, y }) => (
      <ellipse
        key={id}
        className="website-map__engram"
        cx={x}
        cy={y}
        rx={62}
        ry={46}
        fill="url(#website-map-engram)"
      />
    ))}
    <path
      className="website-map__outline-glow"
      d={`${CEREBRUM_PATH}${CEREBELLUM_PATH}`}
    />
    <path
      className="website-map__outline"
      d={`${CEREBRUM_PATH}${CEREBELLUM_PATH}`}
    />
    <path
      className="website-map__neurons website-map__neurons--warm"
      d={NEURONS.warm}
    />
    <path
      className="website-map__neurons website-map__neurons--cool"
      d={NEURONS.cool}
    />

    {ZONE_NAMES.map(([name, x, y, angle]) => (
      <text
        key={name}
        className="website-map__zone"
        x={x}
        y={y}
        transform={angle ? `rotate(${angle} ${x} ${y})` : undefined}>
        {name}
      </text>
    ))}
    {REGION_NAMES.map(([name, x, y, angle]) => (
      <text
        key={name}
        className="website-map__region"
        x={x}
        y={y}
        transform={angle ? `rotate(${angle} ${x} ${y})` : undefined}>
        {name}
      </text>
    ))}

    <rect
      className="website-map__scan"
      x={-260}
      width={260}
      height={MAP_HEIGHT}
      fill="url(#website-map-scan)"
    />
    <rect
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      fill="url(#website-map-vignette)"
    />
  </svg>
)

/** The brain plate under the website map; chapter memory zones glow as engrams. */
export const WebsiteMap = memo(SceneMap)
