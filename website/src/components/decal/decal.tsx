import './decal.sass'

import { type CSSVars, cx } from '@/lib/cx'

type DecalProps = {
  src: string
  /** Layer depth; negative values float in front of the front sheet. */
  depth?: number
  rotate?: number
  className?: string
}

export const Decal = ({ src, depth = -1, rotate = -8, className }: DecalProps) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    draggable={false}
    className={cx('decal', 'layer', className)}
    style={{ '--layer-depth': depth, '--decal-rotate': `${rotate}deg` } as CSSVars}
  />
)
