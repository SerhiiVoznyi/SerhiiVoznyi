import './plate-card.sass'

import { Link } from 'react-router-dom'

import { entryPath } from '@/content/spreads'
import { type CSSVars, cx } from '@/lib/cx'
import { formatPostDate, type PostSummary, prefetchPost } from '@/services'

type PlateCardProps = {
  post: PostSummary
  compact?: boolean
  className?: string
}

export const PlateCard = ({ post, compact = false, className }: PlateCardProps) => (
  <article
    className={cx('plate-card', compact && 'plate-card--compact', className)}
    style={{ '--plate-src': post.cover ? `url('${post.cover}')` : 'none' } as CSSVars}>
    <Link
      to={entryPath(post.slug)}
      className="plate-card__link"
      onPointerEnter={() => prefetchPost(post.slug)}
      onFocus={() => prefetchPost(post.slug)}>
      {!compact && post.cover && (
        <span
          className="plate-card__art"
          aria-hidden="true"
        />
      )}
      <span className="plate-card__meta">
        <span>PLATE {String(post.position).padStart(2, '0')}</span>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span>{post.readingMinutes} MIN</span>
      </span>
      <h3 className="plate-card__title">{post.title}</h3>
      {!compact && <p className="plate-card__summary">{post.summary}</p>}
      {!compact && post.tags.length > 0 && (
        <span className="plate-card__tags">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </span>
      )}
    </Link>
  </article>
)

/** Placeholder with the card's footprint while a page of entries loads. */
export const PlateCardSkeleton = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={cx('plate-card', 'plate-card--skeleton', compact && 'plate-card--compact')}
    aria-hidden="true">
    <span className="plate-card__meta">
      <span>PLATE --</span>
    </span>
    <span className="plate-card__bar" />
    <span className="plate-card__bar plate-card__bar--short" />
  </div>
)
