import { type FrontmatterValue, parseFrontmatter } from './frontmatter'
import { estimateReadingMinutes, renderMarkdown } from './markdown'
import type { Post } from './posts.types'

const files = import.meta.glob<string>('../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const asString = (value: FrontmatterValue | undefined) =>
  typeof value === 'string' ? value : ''

const asList = (value: FrontmatterValue | undefined) => {
  if (Array.isArray(value)) return value
  return typeof value === 'string' && value ? [value] : []
}

const toPost = (path: string, source: string): Post | null => {
  const { data, body } = parseFrontmatter(source)
  const fileSlug = path.split('/').pop()?.replace(/\.md$/, '') ?? ''
  const slug = asString(data.slug) || fileSlug
  const title = asString(data.title)
  const date = asString(data.date)

  if (!title || !date || Number.isNaN(Date.parse(date))) {
    console.error(`[posts] Skipping ${path}: "title" and a valid "date" are required.`)
    return null
  }

  return {
    slug,
    title,
    date,
    tags: asList(data.tags).map((tag) => tag.toLowerCase()),
    summary: asString(data.summary),
    cover: asString(data.cover) || undefined,
    draft: data.draft === true,
    html: renderMarkdown(body),
    readingMinutes: estimateReadingMinutes(body),
  }
}

const POSTS: readonly Post[] = Object.entries(files)
  .map(([path, source]) => toPost(path, source))
  .filter((post): post is Post => post !== null)
  .filter((post) => !(import.meta.env.PROD && post.draft))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

export const getPosts = () => POSTS

export const getPost = (slug: string) => POSTS.find((post) => post.slug === slug)

export const getTags = () => [...new Set(POSTS.flatMap((post) => post.tags))].sort()

export const getRelatedPosts = (post: Post, limit = 3) =>
  POSTS.filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      shared: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ candidate }) => candidate)

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export const formatPostDate = (date: string) =>
  DATE_FORMAT.format(new Date(date)).toUpperCase()
