import './display-title.sass'

import { cx } from '@/lib/cx'

type DisplayTitleProps = {
  lines: readonly string[]
  level?: 1 | 2
  size?: 'xl' | 'lg' | 'md'
  tone?: 'yellow' | 'ink' | 'red'
  /** Marks the heading that receives focus after a page turn. */
  spreadHeading?: boolean
  className?: string
}

export const DisplayTitle = ({
  lines,
  level = 1,
  size = 'xl',
  tone = 'yellow',
  spreadHeading = false,
  className,
}: DisplayTitleProps) => {
  const Tag = level === 1 ? 'h1' : 'h2'

  return (
    <Tag
      className={cx(
        'display-title',
        `display-title--${size}`,
        `display-title--${tone}`,
        className,
      )}
      tabIndex={spreadHeading ? -1 : undefined}
      data-spread-heading={spreadHeading ? '' : undefined}>
      {lines.map((line, index) => (
        <span
          key={line}
          className="display-title__line">
          {line}
          {index < lines.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
