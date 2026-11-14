import type { CSSProperties } from 'react'

export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

export type CSSVars = CSSProperties & Record<`--${string}`, string | number | undefined>
