import type { ReactNode } from 'react'

import { type CSSVars, cx } from '../cx'
import { useReader } from '../reader'

type PlateProps = {
  src: string
  depth: number
  region?: 'full' | 'left' | 'right' | 'figure'
  tone?: 'color' | 'mono' | 'dim'
  glitch?: boolean
  magnify?: boolean
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
  magnify = false,
  caption,
  focus = 'center',
  className,
  children,
}: PlateProps) => {
  const { zoom, zoomTo } = useReader()

  return (
    <div
      className={cx('plate', 'layer', `plate--${region}`, className)}
      data-tone={tone}
      data-glitch={glitch ? '' : undefined}
      style={
        {
          '--layer-depth': depth,
          '--plate-src': `url('${src}')`,
          '--plate-focus': focus,
        } as CSSVars
      }>
      <div
        className="plate__art"
        aria-hidden="true"
      />
      {children}
      {caption && (
        <p className="plate__caption">
          <span aria-hidden="true">// </span>
          {caption}
        </p>
      )}
      {magnify && (
        <button
          type="button"
          className="plate__magnify"
          onClick={() => zoomTo(zoom > 1 ? 1 : 2)}
          aria-label={zoom > 1 ? 'Zoom back out' : 'Zoom in on artwork'}>
          <i
            className={cx('las', zoom > 1 ? 'la-search-minus' : 'la-search-plus')}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  )
}
