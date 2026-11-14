import './hazard-rule.sass'

import { cx } from '@/lib/cx'

type HazardRuleProps = {
  tone?: 'yellow' | 'ink' | 'red'
  className?: string
}

export const HazardRule = ({ tone = 'yellow', className }: HazardRuleProps) => (
  <div
    className={cx('hazard-rule', `hazard-rule--${tone}`, className)}
    aria-hidden="true"
  />
)
