import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { findSpreadIndex, SPREADS } from '@/content/spreads'

export const useSpreadNavigation = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const index = findSpreadIndex(pathname)
  const total = SPREADS.length

  const goTo = useCallback(
    (target: number) => {
      const spread = SPREADS[target]
      if (spread) navigate(spread.path)
    },
    [navigate],
  )

  const goPrevious = useCallback(() => {
    if (index > 0) goTo(index - 1)
  }, [goTo, index])

  const goNext = useCallback(() => {
    goTo(index < 0 ? 0 : index + 1)
  }, [goTo, index])

  const goMap = useCallback(() => goTo(0), [goTo])

  return {
    index,
    total,
    spread: index >= 0 ? SPREADS[index] : undefined,
    hasPrevious: index > 0,
    hasNext: index < total - 1,
    goPrevious,
    goNext,
    goMap,
  }
}
