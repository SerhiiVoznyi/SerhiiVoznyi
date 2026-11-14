import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'

import {
  type FrontmatterValue,
  parseFrontmatter,
} from '../src/services/posts/frontmatter'
import { estimateReadingMinutes, renderMarkdown } from '../src/services/posts/markdown'
import type {
  JournalManifest,
  MonthEntry,
  PostDetail,
  PostSummary,
  TagEntry,
} from '../src/services/posts/posts.types'
import {
  shardOf,
  tagToken,
  TOKEN_POSITION_CAP,
  tokenize,
} from '../src/services/posts/search-tokens'

const POSTS_DIR = 'src/content/posts'
const VIRTUAL_ID = 'virtual:journal-manifest'
const RESOLVED_ID = `\0${VIRTUAL_ID}`
const ROUTE = '/journal/'
// Two pages of twelve cards per file: a page of the index is one request, and a page of search
// results touches at most twelve small files.
const FILE_PAGE_SIZE = 24
const LATEST = 12
const TOP_TAGS = 200
const RELATED = 3
const RELATED_WINDOW = 8

type Source = {
  file: string
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  cover?: string
  draft: boolean
  body: string
}

type Compiled = { manifest: JournalManifest; files: Map<string, string> }

const asString = (value: FrontmatterValue | undefined) =>
  typeof value === 'string' ? value : ''

const asList = (value: FrontmatterValue | undefined) => {
  if (Array.isArray(value)) return value
  return typeof value === 'string' && value ? [value] : []
}

const readSources = (dir: string): Source[] => {
  let names: string[]
  try {
    names = readdirSync(dir).filter((name) => name.endsWith('.md'))
  } catch {
    return []
  }

  return names.flatMap((name) => {
    const file = path.join(dir, name)
    const { data, body } = parseFrontmatter(readFileSync(file, 'utf8'))
    const title = asString(data.title)
    const date = asString(data.date)
    if (!title || !date || Number.isNaN(Date.parse(date))) {
      console.error(
        `[journal] Skipping ${name}: "title" and a valid "date" are required.`,
      )
      return []
    }
    return [
      {
        file: name,
        slug: asString(data.slug) || name.replace(/\.md$/, ''),
        title,
        date,
        tags: asList(data.tags).map((tag) => tag.toLowerCase()),
        summary: asString(data.summary),
        cover: asString(data.cover) || undefined,
        draft: data.draft === true,
        body,
      },
    ]
  })
}

// Deterministic stand-in entries for load testing: `JOURNAL_FIXTURES=100000 npm run build`.
const FIXTURE_WORDS = [
  'signal',
  'monolith',
  'edge',
  'cache',
  'lambda',
  'queue',
  'mesh',
  'kernel',
  'vector',
  'shard',
  'proxy',
  'cold',
  'start',
  'night',
  'city',
  'ice',
  'daemon',
  'cluster',
  'latency',
  'token',
  'gateway',
  'schema',
  'drift',
  'replica',
  'outage',
  'rollout',
  'budget',
  'contract',
  'event',
  'saga',
]
const FIXTURE_TAGS = [
  'aws',
  'azure',
  'dotnet',
  'architecture',
  'leadership',
  'serverless',
  'ai',
  'security',
  'data',
  'devops',
  'testing',
  'performance',
  'messaging',
  'migration',
  'cloud',
  'api',
  ...Array.from({ length: 44 }, (_, index) => `ops-${index + 1}`),
]

const fixtures = (count: number): Source[] => {
  let state = 2077
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
  const pick = <T>(list: readonly T[]) => list[Math.floor(random() * list.length)]
  const start = Date.UTC(2026, 9, 31)

  return Array.from({ length: count }, (_, index) => {
    const words = Array.from({ length: 3 + Math.floor(random() * 3) }, () =>
      pick(FIXTURE_WORDS),
    )
    const title = `${words.join(' ').replace(/^\w/, (c) => c.toUpperCase())} ${index + 1}`
    const tags = [
      ...new Set(
        Array.from({ length: 1 + Math.floor(random() * 3) }, () => pick(FIXTURE_TAGS)),
      ),
    ]
    const paragraph = () =>
      Array.from({ length: 40 }, () => pick(FIXTURE_WORDS))
        .join(' ')
        .replace(/^\w/, (c) => c.toUpperCase())
    return {
      file: `fixture-${index + 1}`,
      slug: `fixture-${index + 1}`,
      title,
      date: new Date(start - index * 3 * 3600_000).toISOString().slice(0, 10),
      tags,
      summary: `${paragraph().slice(0, 140)}.`,
      draft: false,
      body: `## Field note\n\n${paragraph()}.\n\n${paragraph()}.\n`,
    }
  })
}

const tagKey = (tag: string) =>
  tag.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'tag'

const chunk = <T>(list: readonly T[], size: number) =>
  Array.from({ length: Math.ceil(list.length / size) }, (_, index) =>
    list.slice(index * size, index * size + size),
  )

const compile = (sources: readonly Source[], includeDrafts: boolean): Compiled => {
  const seen = new Set<string>()
  const entries = sources
    .filter((source) => includeDrafts || !source.draft)
    .sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date) || a.slug.localeCompare(b.slug),
    )
    .filter((source) => {
      if (seen.has(source.slug)) {
        console.error(
          `[journal] Skipping ${source.file}: slug "${source.slug}" is already taken.`,
        )
        return false
      }
      seen.add(source.slug)
      return true
    })

  const summaries: PostSummary[] = entries.map((source, index) => ({
    slug: source.slug,
    title: source.title,
    date: source.date,
    tags: source.tags,
    summary: source.summary,
    ...(source.cover ? { cover: source.cover } : {}),
    readingMinutes: estimateReadingMinutes(source.body),
    position: index + 1,
  }))

  const files = new Map<string, string>()
  const write = (name: string, value: unknown) => files.set(name, JSON.stringify(value))

  chunk(summaries, FILE_PAGE_SIZE).forEach((page, index) =>
    write(`index/p-${index + 1}.json`, page),
  )

  // Tag lists hold indexes into `summaries`, ascending, so newest first.
  const byTag = new Map<string, number[]>()
  summaries.forEach((summary, index) => {
    for (const tag of summary.tags) {
      const list = byTag.get(tag) ?? []
      list.push(index)
      byTag.set(tag, list)
    }
  })
  const keys = new Set<string>()
  const tags: TagEntry[] = [...byTag]
    .map(([tag, list]) => {
      let key = tagKey(tag)
      while (keys.has(key)) key = `${key}-x`
      keys.add(key)
      chunk(list, FILE_PAGE_SIZE).forEach((page, index) =>
        write(
          `tags/${key}/p-${index + 1}.json`,
          page.map((at) => summaries[at]),
        ),
      )
      return { tag, key, count: list.length }
    })
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
  write('tags.json', tags)

  const byMonth = new Map<string, PostSummary[]>()
  for (const summary of summaries) {
    const month = summary.date.slice(0, 7)
    const list = byMonth.get(month) ?? []
    list.push(summary)
    byMonth.set(month, list)
  }
  const months: MonthEntry[] = [...byMonth].map(([month, list]) => {
    chunk(list, FILE_PAGE_SIZE).forEach((page, index) =>
      write(`months/${month}/p-${index + 1}.json`, page),
    )
    return { month, count: list.length }
  })

  const keyOfTag = new Map(tags.map((entry) => [entry.tag, entry.key]))
  const shards = new Map<string, Map<string, number[]>>()
  for (const summary of summaries) {
    const words = tokenize(`${summary.title} ${summary.tags.join(' ')}`)
    const tagTokens = summary.tags.map((tag) =>
      tagToken(keyOfTag.get(tag) ?? tagKey(tag)),
    )
    for (const token of new Set([...words, ...tagTokens])) {
      const shard = shards.get(shardOf(token)) ?? new Map<string, number[]>()
      shards.set(shardOf(token), shard)
      const positions = shard.get(token) ?? []
      if (positions.length < TOKEN_POSITION_CAP) positions.push(summary.position)
      shard.set(token, positions)
    }
  }
  for (const [key, shard] of shards)
    write(`search/${key}.json`, Object.fromEntries(shard))

  // Related entries come from each shared tag's neighbours by date, not an all-pairs scan.
  const relatedOf = (index: number) => {
    const scores = new Map<number, number>()
    for (const tag of summaries[index].tags) {
      const list = byTag.get(tag) ?? []
      let low = 0
      let high = list.length - 1
      while (low < high) {
        const mid = (low + high) >> 1
        if (list[mid] < index) low = mid + 1
        else high = mid
      }
      for (
        let at = Math.max(0, low - RELATED_WINDOW);
        at <= Math.min(list.length - 1, low + RELATED_WINDOW);
        at += 1
      ) {
        if (list[at] !== index) scores.set(list[at], (scores.get(list[at]) ?? 0) + 1)
      }
    }
    return [...scores]
      .sort((a, b) => b[1] - a[1] || Math.abs(a[0] - index) - Math.abs(b[0] - index))
      .slice(0, RELATED)
      .map(([at]) => summaries[at])
  }

  const hash = createHash('sha1')
  entries.forEach((source, index) => {
    const detail: PostDetail = {
      ...summaries[index],
      html: renderMarkdown(source.body),
      newer: summaries[index - 1]?.slug ?? null,
      older: summaries[index + 1]?.slug ?? null,
      related: relatedOf(index),
    }
    write(`posts/${source.slug}.json`, detail)
    hash.update(source.slug).update(source.date).update(source.title).update(source.body)
  })

  const manifest: JournalManifest = {
    version: hash.digest('hex').slice(0, 10),
    total: summaries.length,
    filePageSize: FILE_PAGE_SIZE,
    latest: summaries.slice(0, LATEST),
    oldest: summaries.at(-1)?.slug ?? null,
    tags: tags.slice(0, TOP_TAGS),
    tagTotal: tags.length,
    months: months.sort((a, b) => b.month.localeCompare(a.month)),
  }

  return { manifest, files }
}

/**
 * Compiles the journal at build time: a small manifest module for the bundle, plus paged JSON
 * (index, tags, months, search shards, one file per entry) emitted under `/journal/`.
 */
export const journal = (): Plugin => {
  let root = process.cwd()
  let includeDrafts = false
  let compiled: Compiled | null = null
  const fixtureCount = Number(process.env.JOURNAL_FIXTURES ?? 0) || 0

  const build = () => {
    if (!compiled) {
      const started = Date.now()
      compiled = compile(
        [...readSources(path.join(root, POSTS_DIR)), ...fixtures(fixtureCount)],
        includeDrafts,
      )
      if (fixtureCount) {
        console.info(
          `[journal] ${compiled.manifest.total} entries, ${compiled.files.size} files in ${Date.now() - started} ms`,
        )
      }
    }
    return compiled
  }

  return {
    name: 'journal',

    configResolved(config) {
      root = config.root
      includeDrafts = config.command === 'serve'
    },

    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined
    },

    load(id) {
      return id === RESOLVED_ID
        ? `export default ${JSON.stringify(build().manifest)}`
        : undefined
    },

    configureServer(server) {
      const dir = path.normalize(path.join(root, POSTS_DIR))
      server.watcher.add(dir)
      const refresh = (file: string) => {
        if (!path.normalize(file).startsWith(dir) || !file.endsWith('.md')) return
        compiled = null
        const module = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (module) server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('change', refresh)
      server.watcher.on('unlink', refresh)

      server.middlewares.use((request, response, next) => {
        const url = request.url?.split('?')[0] ?? ''
        if (!url.startsWith(ROUTE)) return next()
        const body = build().files.get(decodeURIComponent(url.slice(ROUTE.length)))
        if (body === undefined) {
          response.statusCode = 404
          response.end()
          return
        }
        response.setHeader('Content-Type', 'application/json')
        response.setHeader('Cache-Control', 'no-cache')
        response.end(body)
      })
    },

    // A hundred thousand entries are too many to route through the bundler as assets,
    // so the JSON is written straight into the output folder once the bundle is on disk.
    async writeBundle(options) {
      const outDir = options.dir ?? path.join(root, 'dist')
      const queue = [...build().files]
      const folders = new Set(
        queue.map(([name]) => path.dirname(path.join(outDir, 'journal', name))),
      )
      await Promise.all([...folders].map((folder) => mkdir(folder, { recursive: true })))
      const worker = async () => {
        for (let next = queue.pop(); next; next = queue.pop()) {
          await writeFile(path.join(outDir, 'journal', next[0]), next[1])
        }
      }
      await Promise.all(Array.from({ length: 64 }, worker))
    },
  }
}
