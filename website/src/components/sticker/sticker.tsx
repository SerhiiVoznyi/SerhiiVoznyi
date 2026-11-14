import './sticker.sass'

import { type CSSVars, cx } from '@/lib/cx'

type StickerProps = {
  src: string
  rotate?: number
  size?: 'sm' | 'md' | 'lg'
  /** `float` wraps sheet text around the sticker; `inline` sits in a row, e.g. a list marker. */
  placement?: 'float' | 'inline'
  className?: string
}

export const Sticker = ({
  src,
  rotate = 6,
  size = 'md',
  placement = 'float',
  className,
}: StickerProps) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    draggable={false}
    loading="lazy"
    decoding="async"
    className={cx('sticker', `sticker--${size}`, `sticker--${placement}`, className)}
    style={{ '--sticker-rotate': `${rotate}deg` } as CSSVars}
  />
)
