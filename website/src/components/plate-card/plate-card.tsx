import './plate-card.sass'

import { Link } from 'react-router-dom'

import { type CSSVars, cx } from '@/lib/cx'
import { formatPostDate, type Post } from '@/services'

type PlateCardProps = {
  post: Post
  plate: number
  compact?: boolean
  className?: string
}

export const PlateCard = ({
  post,
  plate,
  compact = false,
  className,
}: PlateCardProps) => (
  <article
    className={cx('plate-card', compact && 'plate-card--compact', className)}
    style={{ '--plate-src': post.cover ? `url('${post.cover}')` : 'none' } as CSSVars}>
    <Link
      to={`/blog/${post.slug}`}
      className="plate-card__link">
      {!compact && (
        <span
          className="plate-card__art"
          aria-hidden="true"
        />
      )}
      <span className="plate-card__meta">
        <span>PLATE {String(plate).padStart(2, '0')}</span>
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
