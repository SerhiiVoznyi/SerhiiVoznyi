import './cyan-pill.sass'

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { cx } from '@/lib/cx'

type CyanPillProps = {
  children: ReactNode
  icon?: string
  tone?: 'cyan' | 'yellow'
  className?: string
} & (
  | { to: string; href?: never; onClick?: never; newTab?: never }
  | { href: string; to?: never; onClick?: never; newTab?: boolean }
  | { onClick: () => void; to?: never; href?: never; newTab?: never }
)

export const CyanPill = ({
  children,
  icon,
  tone = 'cyan',
  className,
  ...target
}: CyanPillProps) => {
  const classes = cx('cyan-pill', `cyan-pill--${tone}`, className)
  const content = (
    <>
      {icon && (
        <i
          className={cx('las', icon)}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </>
  )

  if (target.to !== undefined) {
    return (
      <Link
        to={target.to}
        className={classes}>
        {content}
      </Link>
    )
  }

  if (target.href !== undefined) {
    const newTab = target.newTab ?? /^https?:\/\//.test(target.href)
    return (
      <a
        href={target.href}
        className={classes}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noreferrer' : undefined}>
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={target.onClick}>
      {content}
    </button>
  )
}
