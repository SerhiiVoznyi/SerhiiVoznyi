import manifest from 'virtual:journal-manifest'

import type { MonthEntry, PostDetail, PostSummary, TagEntry } from './posts.types'
import { shardOf, tagToken, tokenize } from './search-tokens'

const BASE = `${import.meta.env.BASE_URL}journal/`
const CACHE_LIMIT = 240
const SEARCH_LIMIT = 240

export class JournalError extends Error {
  constructor(
    readonly status: number,
    file: string,
  ) {
    super(`[journal] ${file} answered ${status}`)
  }
}

const isMissing = (error: unknown) =>
  (error instanceof JournalError && error.status === 404) || error instanceof SyntaxError

// Promises are cached by key so React's `use()` sees the same promise on every render;
// resolved values are kept alongside for synchronous peeks.
const pending = new Map<string, Promise<unknown>>()
const settled = new Map<string, unknown>()

const remember = <T>(key: string, factory: () => Promise<T>): Promise<T> => {
  const hit = pending.get(key)
  if (hit) {
    pending.delete(key)
    pending.set(key, hit)
    return hit as Promise<T>
  }
  const request = factory().then((value) => {
    settled.set(key, value)
    return value
  })
  request.catch(() => pending.delete(key))
  pending.set(key, request)
  while (pending.size > CACHE_LIMIT) {
    const oldest = pending.keys().next().value as string
    pending.delete(oldest)
    settled.delete(oldest)
  }
  return request
}

const load = <T>(file: string) =>
  remember<T>(file, async () => {
    const response = await fetch(`${BASE}${file}?v=${manifest.version}`)
    if (!response.ok) throw new JournalError(response.status, file)
    return (await response.json()) as T
  })

export const getJournalManifest = () => manifest

/** Where a list of entries comes from: the whole journal, one tag, or one month. */
export type JournalSource =
  | { kind: 'all' }
  | { kind: 'tag'; key: string }
  | { kind: 'month'; month: MonthEntry['month'] }

const pageFile = (source: JournalSource, page: number) => {
  if (source.kind === 'tag') return `tags/${source.key}/p-${page}.json`
  if (source.kind === 'month') return `months/${source.month}/p-${page}.json`
  return `index/p-${page}.json`
}

/** Entries `start` to `start + count` of a source, stitched from the 100-entry files. */
export const fetchRange = (source: JournalSource, start: number, count: number) =>
  remember(`range:${pageFile(source, 0)}:${start}:${count}`, async () => {
    if (count <= 0) return [] as PostSummary[]
    const size = manifest.filePageSize
    const first = Math.floor(start / size) + 1
    const last = Math.floor((start + count - 1) / size) + 1
    const pages = await Promise.all(
      Array.from({ length: last - first + 1 }, (_, index) =>
        load<PostSummary[]>(pageFile(source, first + index)).catch((error) =>
          isMissing(error) ? [] : Promise.reject(error),
        ),
      ),
    )
    const offset = start - (first - 1) * size
    return pages.flat().slice(offset, offset + count)
  })

/** Summaries for exact positions, in the order given. */
export const fetchPositions = (positions: readonly number[]) =>
  remember(`at:${positions.join(',')}`, async () => {
    const size = manifest.filePageSize
    const pages = [...new Set(positions.map((position) => Math.ceil(position / size)))]
    const loaded = await Promise.all(
      pages.map((page) => load<PostSummary[]>(pageFile({ kind: 'all' }, page))),
    )
    const byPosition = new Map(
      loaded.flat().map((summary) => [summary.position, summary]),
    )
    return positions.flatMap((position) => byPosition.get(position) ?? [])
  })

/**
 * Title and tag search: every query word must prefix-match a word of the entry, and `tagKey`
 * narrows to one tag. Resolves to matching positions, newest first, so only the visible page
 * of results is ever fetched.
 */
export const searchEntries = (query: string, tagKey?: string | null) => {
  const words = [...new Set(tokenize(query))]
  if (words.length === 0) return Promise.resolve([] as number[])
  const terms = [
    ...words.map((token) => ({ token, exact: false })),
    ...(tagKey ? [{ token: tagToken(tagKey), exact: true }] : []),
  ]

  return remember(`search:${words.join(' ')}:${tagKey ?? ''}`, async () => {
    const hits = await Promise.all(
      terms.map(async ({ token, exact }) => {
        const shard = await load<Record<string, number[]>>(
          `search/${shardOf(token)}.json`,
        ).catch((error) => (isMissing(error) ? {} : Promise.reject(error)))
        const positions = new Set<number>()
        for (const [word, list] of Object.entries(shard)) {
          if (exact ? word === token : word.startsWith(token)) {
            list.forEach((position) => positions.add(position))
          }
        }
        return positions
      }),
    )
    const [narrowest, ...others] = hits.sort((a, b) => a.size - b.size)
    return [...narrowest]
      .filter((position) => others.every((set) => set.has(position)))
      .sort((a, b) => a - b)
      .slice(0, SEARCH_LIMIT)
  })
}

export const fetchTagIndex = () => load<TagEntry[]>('tags.json')

/** One entry with its body and neighbours; resolves to `null` when the slug does not exist. */
export const fetchPost = (slug: string) =>
  remember(`post:${slug}`, () =>
    load<PostDetail>(`posts/${encodeURIComponent(slug)}.json`).catch((error) =>
      isMissing(error) ? null : Promise.reject(error),
    ),
  )

/** An entry already loaded, without waiting; `undefined` when it has not been fetched yet. */
export const peekPost = (slug: string) =>
  settled.get(`post:${slug}`) as PostDetail | null | undefined

export const prefetchPost = (slug: string) => {
  fetchPost(slug).catch(() => undefined)
}

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export const formatPostDate = (date: string) =>
  DATE_FORMAT.format(new Date(date)).toUpperCase()

const COUNT_FORMAT = new Intl.NumberFormat('en-GB')
const COMPACT_FORMAT = new Intl.NumberFormat('en-GB', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const formatCount = (value: number) => COUNT_FORMAT.format(value)

/** Short counts for tight HUD readouts: 999, 1.2K, 100K. */
export const formatCompactCount = (value: number) =>
  value < 1000 ? String(value) : COMPACT_FORMAT.format(value)
