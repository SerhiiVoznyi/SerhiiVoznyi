import './journal.sass'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BackToMap, DisplayTitle, PlateCard, TagChip } from '@/components'
import type { CSSVars } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
  useSheetStack,
} from '@/lib/sheet-stack'
import { formatPostDate, getPosts, getTags, type Post } from '@/services'

const plateNumber = (posts: readonly Post[], post: Post) => posts.indexOf(post) + 1

type FrequencyTunerProps = {
  activeTag: string | null
  onSelect: (tag: string | null) => void
}

// Selecting a frequency is a layout rule: the filtered index is promoted back to the front.
const FrequencyTuner = ({ activeTag, onSelect }: FrequencyTunerProps) => {
  const { promote } = useSheetStack()
  const posts = getPosts()

  const select = (tag: string | null) => {
    onSelect(tag)
    promote('index', { focus: true })
  }

  return (
    <>
      <p className="sheet-text">Tune the index to a single frequency.</p>
      <ul className="chip-row">
        <li>
          <button
            type="button"
            className="journal__all"
            aria-pressed={activeTag === null}
            onClick={() => select(null)}>
            All {posts.length}
          </button>
        </li>
        {getTags().map((tag) => (
          <li key={tag}>
            <TagChip
              tag={tag}
              count={posts.filter((post) => post.tags.includes(tag)).length}
              active={activeTag === tag}
              onToggle={(value) => select(activeTag === value ? null : value)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export const JournalPage = () => {
  const posts = getPosts()
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const visible = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts

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
            {posts.length} filed // architecture · cloud · leadership
          </p>
        </div>
        <SheetStack
          label="Journal sheets"
          className="journal__stack">
          <Sheet
            id="index"
            index={1}
            title={activeTag ? `Index · #${activeTag}` : 'Index'}
            teaser="Every entry, newest first"
            aside={<>{visible.length} plates</>}>
            {visible.length === 0 ? (
              <p className="sheet-text">No entries on this frequency yet.</p>
            ) : (
              <div className="journal__grid">
                {visible.map((post) => (
                  <PlateCard
                    key={post.slug}
                    post={post}
                    plate={plateNumber(posts, post)}
                  />
                ))}
              </div>
            )}
            {activeTag && (
              <button
                type="button"
                className="journal__clear"
                onClick={() => setActiveTag(null)}>
                Clear #{activeTag} filter
              </button>
            )}
          </Sheet>
          <Sheet
            id="frequencies"
            index={2}
            title="Frequencies"
            teaser="Filter the index by tag"
            treatment="yellow"
            edge="notched">
            <FrequencyTuner
              activeTag={activeTag}
              onSelect={setActiveTag}
            />
          </Sheet>
          <Sheet
            id="archive"
            index={3}
            title="Archive"
            teaser="Chronological log"
            treatment="ink">
            <ol className="journal__log">
              {posts.map((post) => (
                <li key={post.slug}>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ol>
          </Sheet>
        </SheetStack>
      </SheetStackProvider>
    </SheetScene>
  )
}
