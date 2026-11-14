import { createContext, useContext } from 'react'

export type PromoteOptions = {
  /** Move focus to the promoted sheet's heading, for promotions that unmount the focused control. */
  focus?: boolean
}

export type Promotion = { id: string; focus: boolean }

export type SheetStackValue = {
  order: readonly string[]
  promotion: Promotion | null
  promote: (id: string, options?: PromoteOptions) => void
  advance: (step: 1 | -1) => void
}

export const SheetStackContext = createContext<SheetStackValue | null>(null)

export const useSheetStack = () => {
  const value = useContext(SheetStackContext)
  if (!value) throw new Error('useSheetStack must be used inside <SheetStackProvider>.')
  return value
}

export const useSheetState = (id: string) => {
  const { order, promotion, promote } = useSheetStack()
  const depth = order.indexOf(id)
  const wasPromoted = promotion?.id === id
  return {
    depth,
    count: order.length,
    isFront: depth === 0,
    wasPromoted,
    shouldTakeFocus: wasPromoted && promotion.focus,
    promote: (options?: PromoteOptions) => promote(id, options),
  }
}
