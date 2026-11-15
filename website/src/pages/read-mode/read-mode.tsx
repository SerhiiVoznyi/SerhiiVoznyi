import './read-mode.sass'

import { Suspense, use } from 'react'
import { Link, useParams } from 'react-router-dom'

import { CyanPill, DisplayTitle, HazardRule, TagChip } from '@/components'
import { entryPath, JOURNAL_INDEX, readModePath, SPREADS } from '@/content/spreads'
import { fetchPost, formatPostDate } from '@/services'

const JOURNAL_PATH = SPREADS[JOURNAL_INDEX].path

const ReadModeLoading = () => (
  <div
    className="read-mode__sheet read-mode__sheet--loading"
    role="status">
    <p className="read-mode__kicker">Journal entry // decrypting shard</p>
    <span className="read-mode__bar" />
    <span className="read-mode__bar read-mode__bar--short" />
  </div>
)

const ReadModeMissing = () => (
  <div className="read-mode__sheet">
    <title>Entry not found — Serhii Voznyi</title>
    <p className="read-mode__kicker read-mode__kicker--red">
      Error 404 // entry not found
    </p>
    <DisplayTitle
      lines={['Signal lost']}
      size="md"
      tone="ink"
      className="read-mode__title"
    />
    <p className="read-mode__lead">
      Nothing is filed under this entry. It may have moved, or the link was mistyped.
    </p>
    <CyanPill
      to={JOURNAL_PATH}
      icon="la-book"
      tone="yellow">
      Open the journal
    </CyanPill>
  </div>
)

const ReadModeContent = ({ slug }: { slug: string }) => {
  const post = use(fetchPost(slug))
  if (!post) return <ReadModeMissing />

  return (
    <article className="read-mode__sheet">
      <title>{`${post.title} — Serhii Voznyi`}</title>
      <header className="read-mode__header">
        <p className="read-mode__kicker">
          Journal entry // <time dateTime={post.date}>{formatPostDate(post.date)}</time>{' '}
          // {post.readingMinutes} min read
        </p>
        <DisplayTitle
          lines={[post.title]}
          size="md"
          tone="ink"
          className="read-mode__title"
        />
        {post.tags.length > 0 && (
          <ul
            className="chip-row"
            aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag}>
                <TagChip tag={tag} />
              </li>
            ))}
          </ul>
        )}
        <p className="read-mode__lead">{post.summary}</p>
      </header>
      <HazardRule
        tone="ink"
        className="read-mode__rule"
      />
      <div
        className="prose read-mode__prose"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      {(post.newer || post.older) && (
        <nav
          className="read-mode__pager"
          aria-label="More entries">
          {post.newer && (
            <Link
              to={readModePath(post.newer)}
              className="read-mode__turn"
              rel="prev">
              <i
                className="las la-arrow-left"
                aria-hidden="true"
              />
              Newer entry
            </Link>
          )}
          {post.older && (
            <Link
              to={readModePath(post.older)}
              className="read-mode__turn read-mode__turn--older"
              rel="next">
              Older entry
              <i
                className="las la-arrow-right"
                aria-hidden="true"
              />
            </Link>
          )}
        </nav>
      )}
    </article>
  )
}

const ReadMode = ({ slug }: { slug: string }) => (
  <div className="read-mode">
    <header className="read-mode__topbar">
      <Link
        to={JOURNAL_PATH}
        className="read-mode__brand">
        Serhii Voznyi <span aria-hidden="true">//</span> <span>Read mode</span>
      </Link>
      <CyanPill
        to={entryPath(slug)}
        icon="la-layer-group">
        Artbook view
      </CyanPill>
    </header>
    <main className="read-mode__main">
      <Suspense fallback={<ReadModeLoading />}>
        <ReadModeContent slug={slug} />
      </Suspense>
    </main>
  </div>
)

export const ReadModePage = () => {
  const { slug = '' } = useParams()

  // Keyed so turning to another entry remounts the scroll container at the top.
  return (
    <ReadMode
      key={slug}
      slug={slug}
    />
  )
}
