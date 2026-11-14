import { VisuallyHidden } from '@mantine/core'

import { useSpreadNavigation } from '@/lib/reader'

export const SpreadAnnouncer = () => {
  const { index, total, spread, entry } = useSpreadNavigation()
  const message = !spread
    ? 'Signal lost: this spread does not exist'
    : entry
      ? `Spread ${index + 1} of ${total}: ${spread.label} entry ${entry.position} of ${entry.total}: ${entry.title}`
      : `Spread ${index + 1} of ${total}: ${spread.label}`

  return (
    <VisuallyHidden
      role="status"
      aria-live="polite">
      {message}
    </VisuallyHidden>
  )
}
