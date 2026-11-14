import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useLocalStorage } from '@mantine/hooks'

import { findSpreadIndex, SPREADS } from '@/content/spreads'

const useVisitedStore = () =>
  useLocalStorage<string[]>({
    key: 'sv:visited',
    defaultValue: [],
    getInitialValueInEffect: false,
  })

/** Ids of every spread this reader has opened, kept across visits. */
export const useVisitedSpreads = () => {
  const [visited] = useVisitedStore()
  return useMemo(() => new Set(visited), [visited])
}

/** Marks the spread at the current URL as visited. */
export const useRecordVisit = () => {
  const { pathname } = useLocation()
  const [, setVisited] = useVisitedStore()

  useEffect(() => {
    const spread = SPREADS[findSpreadIndex(pathname)]
    if (!spread) return
    setVisited((ids) => (ids.includes(spread.id) ? ids : [...ids, spread.id]))
  }, [pathname, setVisited])
}
