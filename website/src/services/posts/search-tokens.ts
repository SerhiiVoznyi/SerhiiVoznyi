// Shared by the build-time indexer and the client, so a query splits exactly like the index did.
const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'in',
  'is',
  'it',
  'of',
  'on',
  'or',
  'the',
  'to',
  'with',
  'without',
])

export const tokenize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token))

const TAG_PREFIX = 'tag:'

/** An exact tag marker in the search index, so a search can be narrowed to one tag. */
export const tagToken = (key: string) => `${TAG_PREFIX}${key}`

/** Search shards are keyed by a token's first two characters; each tag marker gets its own. */
export const shardOf = (token: string) =>
  token.startsWith(TAG_PREFIX) ? `tag-${token.slice(TAG_PREFIX.length)}` : token.slice(0, 2)

/** Positions kept per token, newest first; older matches are dropped from the index. */
export const TOKEN_POSITION_CAP = 2000
