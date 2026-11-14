import { type ReactNode, useRef } from 'react'

import { type CSSVars, cx } from '../cx'
import { useSheetStack } from './sheet-stack-context'
import { useScrollDepth } from './use-scroll-depth'

export type SheetRegion = 'full' | 'left' | 'right' | 'map'

type SheetStackProps = {
  label: string
  region?: SheetRegion
  scrollDepth?: boolean
  className?: string
  children: ReactNode
}

export const SheetStack = ({
  label,
  region = 'full',
  scrollDepth = true,
  className,
  children,
}: SheetStackProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { order, advance } = useSheetStack()
  useScrollDepth(ref, advance, scrollDepth && order.length > 1)

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={cx('sheet-stack', `sheet-stack--${region}`, className)}
      style={{ '--sheet-count': order.length } as CSSVars}>
      {children}
    </div>
  )
}
