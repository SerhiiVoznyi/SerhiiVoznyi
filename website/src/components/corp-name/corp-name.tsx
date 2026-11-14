import './corp-name.sass'

import { Tooltip } from '@mantine/core'

import { type CorpId, CORPS, NDA_FOOTNOTE, NDA_NOTICE } from '@/content/corps'
import { cx } from '@/lib/cx'

type CorpNameProps = {
  corp: CorpId
  className?: string
}

export const CorpName = ({ corp, className }: CorpNameProps) => (
  <Tooltip
    label={NDA_NOTICE}
    multiline
    w={280}
    events={{ hover: true, focus: true, touch: true }}
    openDelay={120}
    classNames={{ tooltip: 'hud-tooltip corp-name__tooltip' }}>
    <button
      type="button"
      className={cx('corp-name', className)}>
      {CORPS[corp]}
      <span
        className="corp-name__mark"
        aria-hidden="true">
        *
      </span>
      <span className="corp-name__notice"> (real name replaced under NDA)</span>
    </button>
  </Tooltip>
)

export const NdaNote = ({ className }: { className?: string }) => (
  <p className={cx('nda-note', className)}>
    <span aria-hidden="true">* </span>
    {NDA_FOOTNOTE}
  </p>
)
