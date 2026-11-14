import { type ReactNode, useCallback, useMemo, useState } from 'react'

import {
  type PromoteOptions,
  type Promotion,
  SheetStackContext,
} from './sheet-stack-context'

type SheetStackProviderProps = {
  /** Sheet ids ordered front to back. */
  initialOrder: readonly string[]
  children: ReactNode
}

// Promotion rotates the stack instead of swapping, so sheets that were in front cycle to the back.
const rotateTo = (order: readonly string[], index: number) =>
  index <= 0 ? order : [...order.slice(index), ...order.slice(0, index)]

export const SheetStackProvider = ({
  initialOrder,
  children,
}: SheetStackProviderProps) => {
  const [order, setOrder] = useState(initialOrder)
  const [promotion, setPromotion] = useState<Promotion | null>(null)

  const promote = useCallback(
    (id: string, options?: PromoteOptions) => {
      const index = order.indexOf(id)
      if (index <= 0) return
      setOrder(rotateTo(order, index))
      setPromotion({ id, focus: options?.focus ?? false })
    },
    [order],
  )

  const advance = useCallback(
    (step: 1 | -1) => {
      if (order.length < 2) return
      const next = rotateTo(order, step > 0 ? 1 : order.length - 1)
      setOrder(next)
      setPromotion({ id: next[0], focus: false })
    },
    [order],
  )

  const value = useMemo(
    () => ({ order, promotion, promote, advance }),
    [order, promotion, promote, advance],
  )

  return <SheetStackContext value={value}>{children}</SheetStackContext>
}
