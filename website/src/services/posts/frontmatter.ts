export type FrontmatterValue = string | boolean | string[]

export type FrontmatterResult = {
  data: Record<string, FrontmatterValue>
  body: string
}

const FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

const unquote = (value: string) => value.replace(/^(['"])(.*)\1$/, '$2')

const parseScalar = (raw: string): FrontmatterValue => {
  const value = raw.trim()
  if (value === 'true') return true
  if (value === 'false') return false
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => unquote(item.trim()))
      .filter(Boolean)
  }
  return unquote(value)
}

/**
 * Supports the subset our posts use: `key: scalar`, `key: [a, b]` and `key:` followed by
 * `- item` lines. Nested maps and multi-line strings are intentionally unsupported.
 */
export const parseFrontmatter = (source: string): FrontmatterResult => {
  const match = FENCE.exec(source)
  if (!match) return { data: {}, body: source }

  const data: Record<string, FrontmatterValue> = {}
  let listKey: string | null = null

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue

    const listItem = /^\s+-\s+(.*)$/.exec(line)
    if (listItem && listKey) {
      const list = data[listKey]
      if (Array.isArray(list)) list.push(unquote(listItem[1].trim()))
      continue
    }

    const pair = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line)
    if (!pair) continue

    const [, key, value] = pair
    if (value.trim() === '') {
      data[key] = []
      listKey = key
    } else {
      data[key] = parseScalar(value)
      listKey = null
    }
  }

  return { data, body: source.slice(match[0].length) }
}
