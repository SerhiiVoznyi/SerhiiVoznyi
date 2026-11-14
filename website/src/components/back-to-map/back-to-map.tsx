import { cx } from '@/lib/cx'

import { CyanPill } from '../cyan-pill/cyan-pill'

export const BackToMap = ({ className }: { className?: string }) => (
  <CyanPill
    to="/"
    icon="la-map-marked-alt"
    className={cx('back-to-map', className)}>
    Back to map
  </CyanPill>
)
