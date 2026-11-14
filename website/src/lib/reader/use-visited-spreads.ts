import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useLocalStorage } from '@mantine/hooks'

import { entrySlugOf, findSpreadIndex, SPREADS } from '@/content/spreads'

/** Entry slugs remembered individually; older ones only survive in the running count. */
const ENTRY_MEMORY = 500

type VisitLog = { spreads: string[]; entries: string[]; entryCount: number }

const EMPTY: VisitLog = { spreads: [], entries: [], entryCount: 0 }

const useVisitStore = () =>
  useLocalStorage<VisitLog>({
    key: 'sv:visits',
    defaultValue: EMPTY,
    getInitialValueInEffect: false,
  })

export const entryVisitId = (slug: string) => `post:${slug}`

/**
 * What this reader has opened, kept across visits: chapter ids and `post:<slug>` ids for the
 * most recent entries, plus how many distinct entries have been read.
 */
export const useVisits = () => {
  const [log] = useVisitStore()
  return useMemo(
    () => ({
      visited: new Set([...log.spreads, ...log.entries.map(entryVisitId)]),
      entryCount: log.entryCount,
    }),
    [log],
  )
}

/** Marks the spread or entry at the current URL as visited. */
export const useRecordVisit = () => {
  const { pathname } = useLocation()
  const [, setLog] = useVisitStore()

  useEffect(() => {
    const slug = entrySlugOf(pathname)
    if (slug !== null) {
      setLog((log) =>
        log.entries.includes(slug)
          ? log
          : {
              ...log,
              entries: [slug, ...log.entries].slice(0, ENTRY_MEMORY),
              entryCount: log.entryCount + 1,
            },
      )
      return
    }
    const spread = SPREADS[findSpreadIndex(pathname)]
    if (!spread) return
    setLog((log) =>
      log.spreads.includes(spread.id)
        ? log
        : { ...log, spreads: [...log.spreads, spread.id] },
    )
  }, [pathname, setLog])
}
