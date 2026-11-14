import type { ReactNode } from 'react'

import { type CSSVars, cx } from '../cx'

type PlateProps = {
  /** Raster art for the plate; omit it when the children draw the artwork themselves. */
  src?: string
  depth: number
  region?: 'full' | 'left' | 'right' | 'figure'
  tone?: 'color' | 'mono' | 'dim'
  glitch?: boolean
  caption?: string
  /** CSS object-position for the artwork crop. */
  focus?: string
  className?: string
  children?: ReactNode
}

/** A fixed art layer: it takes part in depth and parallax but is never promoted. */
export const Plate = ({
  src,
  depth,
  region = 'full',
  tone = 'color',
  glitch = false,
  caption,
  focus = 'center',
  className,
  children,
}: PlateProps) => {
  return (
    <div
      className={cx('plate', 'layer', `plate--${region}`, className)}
      data-tone={tone}
      data-glitch={glitch ? '' : undefined}
      style={
        {
          '--layer-depth': depth,
          '--plate-src': src ? `url('${src}')` : undefined,
          '--plate-focus': focus,
        } as CSSVars
      }>
      {src && (
        <div
          className="plate__art"
          aria-hidden="true"
        />
      )}
      {children}
      {caption && (
        <p className="plate__caption">
          <span aria-hidden="true">// </span>
          {caption}
        </p>
      )}
    </div>
  )
}
