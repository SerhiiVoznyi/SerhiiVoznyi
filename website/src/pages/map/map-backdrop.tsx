import './map-backdrop.sass'

import { memo } from 'react'

import { MAP_HEIGHT, MAP_WIDTH } from './map-nodes'

type Wave = {
  tone: 'cyan' | 'violet' | 'yellow' | 'red'
  y: number
  /** Amplitude and whole cycles per board width of each harmonic, so two widths tile seamlessly. */
  harmonics: readonly (readonly [number, number, number])[]
  /** Seconds for one board width of drift; negative drifts right. */
  drift: number
  glow?: boolean
  breathe?: boolean
}

const WAVES: readonly Wave[] = [
  {
    tone: 'cyan',
    y: 150,
    harmonics: [
      [26, 2, 0],
      [9, 7, 1.2],
      [3, 19, 0.4],
    ],
    drift: 24,
    glow: true,
    breathe: true,
  },
  {
    tone: 'violet',
    y: 205,
    harmonics: [
      [34, 1, 2.1],
      [12, 5, 0.3],
    ],
    drift: -38,
  },
  {
    tone: 'cyan',
    y: 265,
    harmonics: [
      [18, 3, 1.7],
      [7, 11, 2.6],
      [2, 29, 0],
    ],
    drift: 16,
  },
  {
    tone: 'yellow',
    y: 320,
    harmonics: [
      [22, 2, 4.2],
      [6, 9, 1.1],
    ],
    drift: -30,
    breathe: true,
  },
  {
    tone: 'violet',
    y: 380,
    harmonics: [
      [28, 1, 0.9],
      [10, 4, 3.3],
      [3, 17, 1.9],
    ],
    drift: 44,
  },
  {
    tone: 'red',
    y: 430,
    harmonics: [
      [12, 3, 2.4],
      [5, 13, 0.7],
    ],
    drift: -20,
  },
]

const STEP = 6

// Each harmonic completes a whole number of cycles across the board, and an envelope with the same
// period swells the signal into packets, so the path drawn over two board widths loops cleanly.
const wavePath = ({ y, harmonics }: Wave) => {
  let d = ''
  for (let x = 0; x <= MAP_WIDTH * 2; x += STEP) {
    const phase = (x / MAP_WIDTH) * Math.PI * 2
    const envelope = 0.65 + 0.35 * Math.sin(phase * 2 + y)
    const offset = harmonics.reduce(
      (sum, [amplitude, cycles, shift]) =>
        sum + amplitude * Math.sin(phase * cycles + shift),
      0,
    )
    d += `${x === 0 ? 'M' : 'L'}${x} ${Math.round((y + offset * envelope) * 10) / 10}`
  }
  return d
}

const PATHS = WAVES.map((wave) => ({ wave, d: wavePath(wave) }))

const WaveSet = ({ variant }: { variant?: 'red' | 'cyan' }) => (
  <svg
    className={`map-backdrop__waves${variant ? ` map-backdrop__waves--${variant}` : ''}`}
    viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
    preserveAspectRatio="none"
    focusable="false">
    {PATHS.map(({ wave, d }, index) => (
      <g
        key={index}
        className="map-backdrop__drift"
        style={{
          animationDuration: `${Math.abs(wave.drift)}s`,
          animationDirection: wave.drift < 0 ? 'reverse' : 'normal',
        }}>
        <g className={wave.breathe ? 'map-backdrop__breathe' : undefined}>
          {wave.glow && !variant && (
            <path
              className="map-backdrop__wave-glow"
              d={d}
            />
          )}
          <path
            className={`map-backdrop__wave map-backdrop__wave--${wave.tone}`}
            d={d}
          />
        </g>
      </g>
    ))}
  </svg>
)

const BLOCKS: readonly [number, number, number, number, string][] = [
  [8, 22, 7, 1.6, 'cyan'],
  [41, 64, 12, 1.1, 'yellow'],
  [57, 13, 5, 2.4, 'red'],
  [22, 81, 9, 1.4, 'cyan'],
  [73, 47, 14, 1.8, 'cyan'],
  [86, 72, 6, 1.2, 'yellow'],
]

const Backdrop = () => (
  <div
    className="map-backdrop"
    aria-hidden="true">
    <WaveSet />
    <div className="map-backdrop__glitch">
      <WaveSet variant="red" />
      <WaveSet variant="cyan" />
      <span className="map-backdrop__tear map-backdrop__tear--a" />
      <span className="map-backdrop__tear map-backdrop__tear--b" />
      <span className="map-backdrop__tear map-backdrop__tear--c" />
      {BLOCKS.map(([left, top, width, height, tone], index) => (
        <span
          key={index}
          className={`map-backdrop__block map-backdrop__block--${tone}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${width}%`,
            height: `${height}%`,
            animationDelay: `${-index * 1.37}s`,
          }}
        />
      ))}
      <span className="map-backdrop__scanlines" />
      <span className="map-backdrop__roll" />
    </div>
  </div>
)

/** Signal waves drifting across the map plate, broken up by bursts of glitch. */
export const MapBackdrop = memo(Backdrop)
