/** What every list of entries carries: enough for a card, never the article body. */
export type PostSummary = {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  cover?: string
  readingMinutes: number
  /** 1 is the newest entry; positions are stable for a given build. */
  position: number
}

export type PostDetail = PostSummary & {
  html: string
  /** Neighbours in reading order: the Journal reads newest first. */
  newer: string | null
  older: string | null
  related: PostSummary[]
}

export type TagEntry = {
  tag: string
  /** File-safe name of the tag's page folder. */
  key: string
  count: number
}

export type MonthEntry = {
  /** `YYYY-MM` */
  month: string
  count: number
}

/** The only journal data in the main bundle; everything else is fetched per page. */
export type JournalManifest = {
  version: string
  total: number
  /** Entries per paged index, tag and month file. */
  filePageSize: number
  latest: PostSummary[]
  oldest: string | null
  /** The most used tags; the full list lives in `tags.json`. */
  tags: TagEntry[]
  tagTotal: number
  months: MonthEntry[]
}
