import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  entryPath,
  entrySlugOf,
  findSpreadIndex,
  JOURNAL_INDEX,
  SPREADS,
} from '@/content/spreads'
import { fetchPost, getJournalManifest, peekPost, type PostDetail } from '@/services'

// The entry on screen, from the cache the article page fills; the toolbar never suspends.
const useEntry = (slug: string | null) => {
  const [loaded, setLoaded] = useState<PostDetail | null>(null)

  useEffect(() => {
    if (slug === null) return
    let live = true
    fetchPost(slug)
      .then((post) => {
        if (live) setLoaded(post)
      })
      .catch(() => undefined)
    return () => {
      live = false
    }
  }, [slug])

  if (slug === null) return null
  if (loaded?.slug === slug) return loaded
  return peekPost(slug) ?? null
}

export type EntryPosition = { position: number; total: number; title: string }

export const useSpreadNavigation = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const index = findSpreadIndex(pathname)
  const total = SPREADS.length
  const slug = entrySlugOf(pathname)
  const entry = useEntry(slug)
  const journal = getJournalManifest()

  const goTo = useCallback(
    (target: number) => {
      const spread = SPREADS[target]
      if (spread) navigate(spread.path)
    },
    [navigate],
  )

  // Reading order runs Journal, then its entries newest to oldest, then the next chapter.
  const goPrevious = useCallback(() => {
    if (slug !== null) {
      navigate(entry?.newer ? entryPath(entry.newer) : SPREADS[JOURNAL_INDEX].path)
    } else if (index === JOURNAL_INDEX + 1 && journal.oldest) {
      navigate(entryPath(journal.oldest))
    } else if (index > 0) {
      goTo(index - 1)
    }
  }, [slug, entry, index, journal.oldest, navigate, goTo])

  const goNext = useCallback(() => {
    if (slug !== null) {
      if (entry?.older) navigate(entryPath(entry.older))
      else goTo(JOURNAL_INDEX + 1)
    } else if (index === JOURNAL_INDEX && journal.latest[0]) {
      navigate(entryPath(journal.latest[0].slug))
    } else {
      goTo(index < 0 ? 0 : index + 1)
    }
  }, [slug, entry, index, journal.latest, navigate, goTo])

  const goMap = useCallback(() => goTo(0), [goTo])

  return {
    index,
    total,
    spread: index >= 0 ? SPREADS[index] : undefined,
    entry:
      slug !== null && entry
        ? ({
            position: entry.position,
            total: journal.total,
            title: entry.title,
          } as EntryPosition)
        : null,
    hasPrevious: index > 0,
    hasNext: slug !== null || index < total - 1,
    goPrevious,
    goNext,
    goMap,
  }
}
