import { getPosts } from '@/services'

export type SpreadKind = 'map' | 'art' | 'paper' | 'split'

export type SpreadMeta = {
  id: string
  path: string
  label: string
  district: string
  kind: SpreadKind
  teaser: string
}

const postSpreads: SpreadMeta[] = getPosts().map((post) => ({
  id: `post:${post.slug}`,
  path: `/blog/${post.slug}`,
  label: post.title,
  district: 'Transmissions',
  kind: 'split',
  teaser: post.summary,
}))

export const SPREADS: readonly SpreadMeta[] = [
  {
    id: 'map',
    path: '/',
    label: 'Map',
    district: 'Hub',
    kind: 'map',
    teaser: 'Every district of the file, one jump away.',
  },
  {
    id: 'identity',
    path: '/identity',
    label: 'Identity',
    district: 'Identity',
    kind: 'art',
    teaser: 'Who is behind the visor.',
  },
  {
    id: 'dossier',
    path: '/dossier',
    label: 'Dossier',
    district: 'Dossier',
    kind: 'split',
    teaser: 'What I build, and the stack I build it with.',
  },
  {
    id: 'transmissions',
    path: '/blog',
    label: 'Transmissions',
    district: 'Transmissions',
    kind: 'paper',
    teaser: 'Field notes on architecture, cloud and leadership.',
  },
  ...postSpreads,
  {
    id: 'uplink',
    path: '/uplink',
    label: 'Uplink',
    district: 'Uplink',
    kind: 'split',
    teaser: 'Open a channel.',
  },
]

export const DISTRICTS = SPREADS.filter((spread) =>
  ['identity', 'dossier', 'transmissions', 'uplink'].includes(spread.id),
)

const normalize = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

export const findSpreadIndex = (pathname: string) =>
  SPREADS.findIndex((spread) => spread.path === normalize(pathname))

export const formatSpreadNumber = (index: number) =>
  index < 0 ? '--' : String(index + 1).padStart(2, '0')
