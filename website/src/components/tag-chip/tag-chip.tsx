import './tag-chip.sass'

import { cx } from '@/lib/cx'

type TagChipProps = {
  tag: string
  count?: number
  active?: boolean
  onToggle?: (tag: string) => void
  className?: string
}

export const TagChip = ({
  tag,
  count,
  active = false,
  onToggle,
  className,
}: TagChipProps) => {
  const content = (
    <>
      <span aria-hidden="true">#</span>
      {tag}
      {count !== undefined && <span className="tag-chip__count">{count}</span>}
    </>
  )

  if (!onToggle) return <span className={cx('tag-chip', className)}>{content}</span>

  return (
    <button
      type="button"
      className={cx('tag-chip', 'tag-chip--interactive', className)}
      aria-pressed={active}
      onClick={() => onToggle(tag)}>
      {content}
    </button>
  )
}
