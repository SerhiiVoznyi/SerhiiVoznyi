export type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  cover?: string
  draft: boolean
  html: string
  readingMinutes: number
}
