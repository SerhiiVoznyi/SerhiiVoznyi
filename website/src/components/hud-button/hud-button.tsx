import './hud-button.sass'

import type { ButtonHTMLAttributes } from 'react'
import { Tooltip } from '@mantine/core'

import { cx } from '@/lib/cx'

type HudButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: string
  label: string
  /** Set for toggle buttons; renders aria-pressed. */
  pressed?: boolean
  variant?: 'ghost' | 'boxed'
}

export const HudButton = ({
  icon,
  label,
  pressed,
  variant = 'boxed',
  className,
  ...rest
}: HudButtonProps) => (
  <Tooltip
    label={label}
    events={{ hover: true, focus: true, touch: false }}
    openDelay={120}
    classNames={{ tooltip: 'hud-tooltip' }}>
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      className={cx('hud-button', `hud-button--${variant}`, className)}
      {...rest}>
      <i
        className={cx('las', icon)}
        aria-hidden="true"
      />
    </button>
  </Tooltip>
)
