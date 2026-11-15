import { getJournalManifest, peekPost } from '@/services'

export type SpreadKind = 'map' | 'art' | 'paper' | 'split'

export type SpreadMeta = {
  id: string
  path: string
  label: string
  chapter: string
  kind: SpreadKind
  teaser: string
  /** Filing date, for journal entries shown alongside the chapters. */
  date?: string
}

/** The chapters, in reading order. Journal entries are read between the Journal and Contact. */
export const SPREADS: readonly SpreadMeta[] = [
  {
    id: 'map',
    path: '/',
    label: 'Map',
    chapter: 'Map',
    kind: 'map',
    teaser: 'Every chapter of the file, one jump away.',
  },
  {
    id: 'profile',
    path: '/profile',
    label: 'Profile',
    chapter: 'Profile',
    kind: 'art',
    teaser: 'Who is behind the visor.',
  },
  {
    id: 'experience',
    path: '/experience',
    label: 'Experience',
    chapter: 'Experience',
    kind: 'split',
    teaser: 'What I build, and the stack I build it with.',
  },
  {
    id: 'journal',
    path: '/blog',
    label: 'Journal',
    chapter: 'Journal',
    kind: 'paper',
    teaser: 'Field notes on architecture, cloud and leadership.',
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'Contact',
    chapter: 'Contact',
    kind: 'split',
    teaser: 'Open a channel.',
  },
]

export const CHAPTERS = SPREADS.filter((spread) =>
  ['profile', 'experience', 'journal', 'contact'].includes(spread.id),
)

export const JOURNAL_INDEX = SPREADS.findIndex((spread) => spread.id === 'journal')

const normalize = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

const ENTRY_PATH = /^\/blog\/([^/]+)$/

/** The slug of a journal entry route, or `null` for any other path. */
export const entrySlugOf = (pathname: string) => {
  const match = ENTRY_PATH.exec(normalize(pathname))
  return match ? decodeURIComponent(match[1]) : null
}

export const entryPath = (slug: string) => `/blog/${encodeURIComponent(slug)}`

/** A plain reading view of an entry, outside the artbook and its reading order. */
export const READ_MODE_ROUTE = '/blog/:slug/read'

export const readModePath = (slug: string) => `${entryPath(slug)}/read`

/** Entries belong to the Journal spread; the counter shows their own position beside it. */
export const findSpreadIndex = (pathname: string) =>
  entrySlugOf(pathname) !== null
    ? JOURNAL_INDEX
    : SPREADS.findIndex((spread) => spread.path === normalize(pathname))

/**
 * A sortable reading position: entries sit between the Journal and the next chapter, newest first,
 * so turning from one entry to an older one turns the page forward.
 */
export const spreadOrder = (pathname: string) => {
  const index = findSpreadIndex(pathname)
  const slug = entrySlugOf(pathname)
  if (index < 0 || slug === null) return index
  const position = peekPost(slug)?.position
  return index + (position ? position / (getJournalManifest().total + 1) : 0.5)
}

export const formatSpreadNumber = (index: number) =>
  index < 0 ? '--' : String(index + 1).padStart(2, '0')
