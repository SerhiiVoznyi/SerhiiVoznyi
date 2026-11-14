import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '@mantine/hooks'

import { findSpreadIndex } from '@/content/spreads'

import { useReader } from '../reader'

export type SpreadPhase = 'idle' | 'exiting' | 'entering'
export type TurnDirection = 'forward' | 'backward'

export const TURN_EXIT_MS = 280
export const TURN_ENTER_MS = 420
const REDUCED_ENTER_MS = 160

/**
 * Holds the rendered location back while the current spread turns away, then swaps it in.
 * Direction follows the registry order so paging back turns the page the other way.
 */
export const useSpreadTransition = () => {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const { resetZoom } = useReader()

  const [displayed, setDisplayed] = useState(location)
  const [target, setTarget] = useState(location.pathname)
  const [phase, setPhase] = useState<SpreadPhase>('idle')
  const [direction, setDirection] = useState<TurnDirection>('forward')

  if (location.pathname !== target) {
    const from = findSpreadIndex(displayed.pathname)
    const to = findSpreadIndex(location.pathname)
    setTarget(location.pathname)
    setDirection(from >= 0 && to >= 0 && to < from ? 'backward' : 'forward')
    setPhase('exiting')
  }

  const exitMs = reducedMotion ? 0 : TURN_EXIT_MS
  const enterMs = reducedMotion ? REDUCED_ENTER_MS : TURN_ENTER_MS

  useEffect(() => {
    if (phase === 'exiting') {
      const timer = window.setTimeout(() => {
        setDisplayed(location)
        resetZoom()
        setPhase('entering')
      }, exitMs)
      return () => window.clearTimeout(timer)
    }
    if (phase === 'entering') {
      const timer = window.setTimeout(() => setPhase('idle'), enterMs)
      return () => window.clearTimeout(timer)
    }
  }, [phase, location, exitMs, enterMs, resetZoom])

  return { displayed, phase, direction, exitMs, enterMs }
}
