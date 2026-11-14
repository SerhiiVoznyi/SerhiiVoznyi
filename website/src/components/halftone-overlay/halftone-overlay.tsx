import './halftone-overlay.sass'

import { cx } from '@/lib/cx'

type HalftoneOverlayProps = {
  tone?: 'ink' | 'light'
  className?: string
}

export const HalftoneOverlay = ({ tone = 'ink', className }: HalftoneOverlayProps) => (
  <div
    className={cx('halftone-overlay', `halftone-overlay--${tone}`, className)}
    aria-hidden="true"
  />
)
