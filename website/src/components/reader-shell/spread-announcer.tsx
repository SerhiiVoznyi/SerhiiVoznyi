import { VisuallyHidden } from '@mantine/core'

import { useSpreadNavigation } from '@/lib/reader'

export const SpreadAnnouncer = () => {
  const { index, total, spread } = useSpreadNavigation()
  const message = spread
    ? `Spread ${index + 1} of ${total}: ${spread.label}`
    : 'Signal lost: this spread does not exist'

  return (
    <VisuallyHidden
      role="status"
      aria-live="polite">
      {message}
    </VisuallyHidden>
  )
}
