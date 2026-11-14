import './journal.sass'

import {
  Component,
  type FormEvent,
  type ReactNode,
  Suspense,
  use,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import {
  BackToMap,
  DisplayTitle,
  HudButton,
  PlateCard,
  PlateCardSkeleton,
  TagChip,
} from '@/components'
import { entryPath } from '@/content/spreads'
import type { CSSVars } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
  useSheetStack,
} from '@/lib/sheet-stack'
import {
  fetchPositions,
  fetchRange,
  fetchTagIndex,
  formatCount,
  formatPostDate,
  getJournalManifest,
  type MonthEntry,
  type PostSummary,
  prefetchPost,
  searchEntries,
  type TagEntry,
} from '@/services'

const CARDS_PER_PAGE = 12
const TAGS_SHOWN = 24
const MONTH_STEP = 48
const SEARCH_DEBOUNCE_MS = 250

type JournalQuery = { q: string; tag: string | null; page: number }

// Search, tag and page live in the URL, so a filtered index deep-links and Back undoes a step.
const readQuery = (params: URLSearchParams): JournalQuery => ({
  q: params.get('q') ?? '',
  tag: params.get('tag'),
  page: Math.max(1, Math.floor(Number(params.get('page'))) || 1),
})

type UpdateQuery = (next: Partial<JournalQuery>, replace?: boolean) => void

const useJournalQuery = () => {
  const [params, setParams] = useSearchParams()

  const update = useCallback<UpdateQuery>(
    (next, replace = false) =>
      setParams(
        (current) => {
          const merged = { ...readQuery(current), ...next }
          const result = new URLSearchParams(current)
          if (merged.q.trim()) result.set('q', merged.q)
          else result.delete('q')
          if (merged.tag) result.set('tag', merged.tag)
          else result.delete('tag')
          if (merged.page > 1) result.set('page', String(merged.page))
          else result.delete('page')
          return result
        },
        { replace },
      ),
    [setParams],
  )

  return { query: readQuery(params), update }
}

const findTag = (tag: string, all: readonly TagEntry[]) =>
  all.find((entry) => entry.tag === tag)

class JournalErrorBoundary extends Component<
  { children: ReactNode; resetKey: string },
  { failed: boolean; resetKey: string }
> {
  state = { failed: false, resetKey: this.props.resetKey }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  static getDerivedStateFromProps(
    props: { resetKey: string },
    state: { failed: boolean; resetKey: string },
  ) {
    return props.resetKey === state.resetKey
      ? null
      : { failed: false, resetKey: props.resetKey }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <p
        className="journal__notice"
        role="alert">
        Signal lost while loading the journal. Check the connection and try again.
      </p>
    )
  }
}

const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <div className="journal__grid">
    {Array.from({ length: count }, (_, index) => (
      <PlateCardSkeleton key={index} />
    ))}
  </div>
)

type PagerProps = { page: number; pages: number; onPage: (page: number) => void }

const Pager = ({ page, pages, onPage }: PagerProps) => {
  const [draft, setDraft] = useState('')

  const jump = (event: FormEvent) => {
    event.preventDefault()
    const target = Math.floor(Number(draft))
    if (target >= 1 && target <= pages) onPage(target)
    setDraft('')
  }

  if (pages <= 1) return null

  return (
    <nav
      className="journal__pager"
      aria-label="Index pages">
      <HudButton
        icon="la-angle-double-left"
        label="First page"
        disabled={page <= 1}
        onClick={() => onPage(1)}
      />
      <HudButton
        icon="la-angle-left"
        label="Previous page"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      />
      <p className="journal__pager-readout">
        Page <strong>{formatCount(page)}</strong> of <strong>{formatCount(pages)}</strong>
      </p>
      <HudButton
        icon="la-angle-right"
        label="Next page"
        disabled={page >= pages}
        onClick={() => onPage(page + 1)}
      />
      <HudButton
        icon="la-angle-double-right"
        label="Last page"
        disabled={page >= pages}
        onClick={() => onPage(pages)}
      />
      <form
        className="journal__jump"
        onSubmit={jump}>
        <label>
          <span>Go to</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={pages}
            value={draft}
            placeholder={String(page)}
            onChange={(event) => setDraft(event.target.value)}
          />
        </label>
      </form>
    </nav>
  )
}

type ResultsProps = JournalQuery & { onPage: (page: number) => void }

const Results = ({
  items,
  total,
  page,
  empty,
  onPage,
}: {
  items: readonly PostSummary[]
  total: number
  page: number
  empty: string
  onPage: (page: number) => void
}) => {
  const pages = Math.max(1, Math.ceil(total / CARDS_PER_PAGE))
  const start = (page - 1) * CARDS_PER_PAGE

  if (total === 0) return <p className="sheet-text">{empty}</p>

  return (
    <>
      <p
        className="journal__count"
        role="status">
        {formatCount(start + 1)}–{formatCount(start + items.length)} of{' '}
        {formatCount(total)}
      </p>
      <div className="journal__grid">
        {items.map((post) => (
          <PlateCard
            key={post.slug}
            post={post}
          />
        ))}
      </div>
      <Pager
        page={page}
        pages={pages}
        onPage={onPage}
      />
    </>
  )
}

const SearchResults = ({ q, tag, page, onPage }: ResultsProps) => {
  const manifest = getJournalManifest()
  const tagEntry = tag
    ? (findTag(tag, manifest.tags) ?? findTag(tag, use(fetchTagIndex())))
    : undefined
  const matches = use(searchEntries(q, tag ? (tagEntry?.key ?? tag) : null))
  const pages = Math.max(1, Math.ceil(matches.length / CARDS_PER_PAGE))
  const current = Math.min(page, pages)
  const start = (current - 1) * CARDS_PER_PAGE
  const items = use(fetchPositions(matches.slice(start, start + CARDS_PER_PAGE)))

  return (
    <Results
      items={items}
      total={matches.length}
      page={current}
      empty="No entries match that search."
      onPage={onPage}
    />
  )
}

const IndexResults = ({ tag, page, onPage }: ResultsProps) => {
  const manifest = getJournalManifest()
  const entry = tag
    ? (findTag(tag, manifest.tags) ?? findTag(tag, use(fetchTagIndex())))
    : undefined
  const total = tag ? (entry?.count ?? 0) : manifest.total
  const pages = Math.max(1, Math.ceil(total / CARDS_PER_PAGE))
  const current = Math.min(page, pages)
  const start = (current - 1) * CARDS_PER_PAGE
  const items = use(
    fetchRange(
      entry ? { kind: 'tag', key: entry.key } : { kind: 'all' },
      start,
      Math.min(CARDS_PER_PAGE, total - start),
    ),
  )

  return (
    <Results
      items={items}
      total={total}
      page={current}
      empty="No entries on this frequency yet."
      onPage={onPage}
    />
  )
}

const IndexSheet = ({ query, update }: { query: JournalQuery; update: UpdateQuery }) => {
  const [draft, setDraft] = useState(query.q)
  const [seen, setSeen] = useState(query.q)
  // Back and Forward change the URL under the field, so the draft follows it.
  if (query.q !== seen) {
    setSeen(query.q)
    setDraft(query.q)
  }

  // Previous results stay on screen while the next page or search loads behind them.
  const q = useDeferredValue(query.q)
  const tag = useDeferredValue(query.tag)
  const page = useDeferredValue(query.page)

  // Typing settles into the URL after a pause; the URL stays the source of truth for results.
  useEffect(() => {
    if (draft === query.q) return
    const timer = window.setTimeout(
      () => update({ q: draft, page: 1 }, true),
      SEARCH_DEBOUNCE_MS,
    )
    return () => window.clearTimeout(timer)
  }, [draft, query.q, update])

  const onPage = (next: number) => update({ page: next })
  const settled = { q, tag, page }
  const resetKey = `${q}|${tag}|${page}`

  return (
    <>
      <form
        className="journal__search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault()
          update({ q: draft, page: 1 })
        }}>
        <label>
          <span className="journal__search-label">Search the journal</span>
          <input
            type="search"
            value={draft}
            placeholder="Title or tag, e.g. serverless"
            onChange={(event) => setDraft(event.target.value)}
          />
        </label>
        {query.tag && (
          <button
            type="button"
            className="journal__clear"
            onClick={() => update({ tag: null, page: 1 })}>
            Clear #{query.tag}
          </button>
        )}
      </form>
      <JournalErrorBoundary resetKey={resetKey}>
        <Suspense fallback={<SkeletonGrid />}>
          {settled.q.trim() ? (
            <SearchResults
              {...settled}
              onPage={onPage}
            />
          ) : (
            <IndexResults
              {...settled}
              onPage={onPage}
            />
          )}
        </Suspense>
      </JournalErrorBoundary>
    </>
  )
}

const TagMatches = ({
  needle,
  active,
  onSelect,
}: {
  needle: string
  active: string | null
  onSelect: (tag: string) => void
}) => {
  const matches = use(fetchTagIndex())
    .filter((entry) => entry.tag.includes(needle))
    .slice(0, TAGS_SHOWN)

  if (matches.length === 0) return <p className="sheet-text">No frequency matches.</p>

  return (
    <ul className="chip-row">
      {matches.map((entry) => (
        <li key={entry.key}>
          <TagChip
            tag={entry.tag}
            count={entry.count}
            active={active === entry.tag}
            onToggle={onSelect}
          />
        </li>
      ))}
    </ul>
  )
}

// Selecting a frequency is a layout rule: the filtered index is promoted back to the front.
const FrequencyTuner = ({
  active,
  onSelect,
}: {
  active: string | null
  onSelect: (tag: string | null) => void
}) => {
  const { promote } = useSheetStack()
  const manifest = getJournalManifest()
  const [needle, setNeedle] = useState('')
  const search = useDeferredValue(needle.trim().toLowerCase())

  const select = (tag: string | null) => {
    onSelect(active === tag ? null : tag)
    promote('index', { focus: true })
  }

  return (
    <>
      <p className="sheet-text">
        Tune the index to a single frequency. {formatCount(manifest.tagTotal)} on file.
      </p>
      <label className="journal__tag-search">
        <span>Find a frequency</span>
        <input
          type="search"
          value={needle}
          placeholder="e.g. aws"
          onChange={(event) => setNeedle(event.target.value)}
        />
      </label>
      {search ? (
        <Suspense fallback={<p className="sheet-text">Scanning frequencies…</p>}>
          <TagMatches
            needle={search}
            active={active}
            onSelect={select}
          />
        </Suspense>
      ) : (
        <ul className="chip-row">
          <li>
            <button
              type="button"
              className="journal__all"
              aria-pressed={active === null}
              onClick={() => select(null)}>
              All {formatCount(manifest.total)}
            </button>
          </li>
          {manifest.tags.slice(0, TAGS_SHOWN).map((entry) => (
            <li key={entry.key}>
              <TagChip
                tag={entry.tag}
                count={entry.count}
                active={active === entry.tag}
                onToggle={select}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

const MONTH_FORMAT = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  timeZone: 'UTC',
})

const MonthLog = ({ month, count }: MonthEntry) => {
  const [requested, setRequested] = useState(MONTH_STEP)
  const shown = useDeferredValue(Math.min(requested, count))
  const posts = use(fetchRange({ kind: 'month', month }, 0, shown))

  return (
    <>
      <ol className="journal__log">
        {posts.map((post) => (
          <li key={post.slug}>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <Link
              to={entryPath(post.slug)}
              onPointerEnter={() => prefetchPost(post.slug)}
              onFocus={() => prefetchPost(post.slug)}>
              {post.title}
            </Link>
          </li>
        ))}
      </ol>
      {shown < count && (
        <button
          type="button"
          className="journal__clear"
          onClick={() => setRequested((value) => value + MONTH_STEP)}>
          Show {formatCount(Math.min(MONTH_STEP, count - shown))} more
        </button>
      )}
    </>
  )
}

const ArchiveTree = () => {
  const { months } = getJournalManifest()
  const [open, setOpen] = useState<string | null>(null)
  const years = [...new Set(months.map(({ month }) => month.slice(0, 4)))]

  if (months.length === 0) return <p className="sheet-text">Nothing filed yet.</p>

  return (
    <div className="journal__archive">
      {years.map((year, index) => {
        const inYear = months.filter(({ month }) => month.startsWith(year))
        const count = inYear.reduce((sum, entry) => sum + entry.count, 0)
        return (
          <details
            key={year}
            className="journal__year"
            open={index === 0}>
            <summary>
              {year} <span>{formatCount(count)}</span>
            </summary>
            <ul className="journal__months">
              {inYear.map(({ month, count: monthCount }) => (
                <li key={month}>
                  <button
                    type="button"
                    aria-expanded={open === month}
                    onClick={() =>
                      setOpen((current) => (current === month ? null : month))
                    }>
                    {MONTH_FORMAT.format(new Date(`${month}-01T00:00:00Z`))}{' '}
                    <span>{formatCount(monthCount)}</span>
                  </button>
                  {open === month && (
                    <JournalErrorBoundary resetKey={month}>
                      <Suspense fallback={<p className="sheet-text">Loading {month}…</p>}>
                        <MonthLog
                          month={month}
                          count={monthCount}
                        />
                      </Suspense>
                    </JournalErrorBoundary>
                  )}
                </li>
              ))}
            </ul>
          </details>
        )
      })}
    </div>
  )
}

export const JournalPage = () => {
  const manifest = getJournalManifest()
  const { query, update } = useJournalQuery()
  const indexTitle = query.q.trim()
    ? `Index · “${query.q.trim()}”`
    : query.tag
      ? `Index · #${query.tag}`
      : 'Index'

  return (
    <SheetScene
      kind="paper"
      className="journal"
      overlay={<BackToMap className="spread-back" />}>
      <SheetStackProvider initialOrder={['index', 'frequencies', 'archive']}>
        <Plate
          src="/assets/art/city-plate-night.webp"
          depth={3}
          tone="dim"
        />
        <div
          className="journal__title layer"
          style={{ '--layer-depth': 1 } as CSSVars}>
          <DisplayTitle
            lines={['Journal']}
            size="lg"
            spreadHeading
          />
          <p className="spread-kicker">
            {formatCount(manifest.total)} filed // architecture · cloud · leadership
          </p>
        </div>
        <SheetStack
          label="Journal sheets"
          className="journal__stack">
          <Sheet
            id="index"
            index={1}
            title={indexTitle}
            teaser="Search every entry, newest first"
            aside={<>{formatCount(manifest.total)} plates</>}>
            <IndexSheet
              query={query}
              update={update}
            />
          </Sheet>
          <Sheet
            id="frequencies"
            index={2}
            title="Frequencies"
            teaser="Filter the index by tag"
            treatment="yellow"
            edge="notched">
            <FrequencyTuner
              active={query.tag}
              onSelect={(tag) => update({ tag, page: 1 })}
            />
          </Sheet>
          <Sheet
            id="archive"
            index={3}
            title="Archive"
            teaser="Browse by year and month"
            treatment="ink">
            <ArchiveTree />
          </Sheet>
        </SheetStack>
      </SheetStackProvider>
    </SheetScene>
  )
}
