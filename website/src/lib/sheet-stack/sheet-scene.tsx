import './sheet-stack.sass'

import { type ReactNode, useRef } from 'react'

import { cx } from '../cx'
import { useReader } from '../reader'
import { usePointerParallax } from './use-pointer-parallax'

type SheetSceneProps = {
  kind: 'map' | 'art' | 'paper' | 'split'
  className?: string
  /** Flat UI drawn above the 3D rig, outside depth sorting and parallax. */
  overlay?: ReactNode
  children: ReactNode
}

export const SheetScene = ({ kind, className, overlay, children }: SheetSceneProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { viewMode } = useReader()
  usePointerParallax(ref)

  return (
    <div
      ref={ref}
      className={cx('sheet-scene', className)}
      data-kind={kind}
      data-view={viewMode}>
      <div className="sheet-scene__rig">{children}</div>
      {overlay && <div className="sheet-scene__overlay">{overlay}</div>}
    </div>
  )
}
