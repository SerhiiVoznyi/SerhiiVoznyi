import { Marked } from 'marked'

const isExternal = (href: string) => /^https?:\/\//.test(href)

const escapeAttribute = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Post markdown is first-party content from this repository, so the output is not sanitized.
const marked = new Marked({
  gfm: true,
  renderer: {
    // The spread owns the h1 and each sheet owns an h2, so post headings start at h3.
    heading({ tokens, depth }) {
      const level = Math.min(depth + 1, 6)
      return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const titleAttr = title ? ` title="${escapeAttribute(title)}"` : ''
      const externalAttr = isExternal(href) ? ' target="_blank" rel="noreferrer"' : ''
      return `<a href="${escapeAttribute(href)}"${titleAttr}${externalAttr}>${text}</a>`
    },
  },
})

export const renderMarkdown = (source: string) => marked.parse(source, { async: false })

const WORDS_PER_MINUTE = 220

export const estimateReadingMinutes = (source: string) => {
  const words = source.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
