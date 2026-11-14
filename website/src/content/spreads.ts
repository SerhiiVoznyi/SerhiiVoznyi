import { getPosts } from '@/services'

export type SpreadKind = 'map' | 'art' | 'paper' | 'split'

export type SpreadMeta = {
  id: string
  path: string
  label: string
  chapter: string
  kind: SpreadKind
  teaser: string
  /** Filing date, for spreads that are journal entries. */
  date?: string
}

const postSpreads: SpreadMeta[] = getPosts().map((post) => ({
  id: `post:${post.slug}`,
  path: `/blog/${post.slug}`,
  label: post.title,
  chapter: 'Journal',
  kind: 'split',
  teaser: post.summary,
  date: post.date,
}))

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
  ...postSpreads,
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

const normalize = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

export const findSpreadIndex = (pathname: string) =>
  SPREADS.findIndex((spread) => spread.path === normalize(pathname))

export const formatSpreadNumber = (index: number) =>
  index < 0 ? '--' : String(index + 1).padStart(2, '0')
