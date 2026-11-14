import { useHotkeys } from '@mantine/hooks'

import { useSoundtrack } from '@/lib/audio'
import { useReader, useSpreadNavigation } from '@/lib/reader'

export const ReaderHotkeys = () => {
  const { index, goPrevious, goNext, goMap } = useSpreadNavigation()
  const { zoom, zoomIn, zoomOut, resetZoom } = useReader()
  const { isAvailable, toggleMute } = useSoundtrack()

  useHotkeys([
    ['ArrowLeft', goPrevious],
    ['ArrowRight', goNext],
    ['m', () => isAvailable && toggleMute()],
    ['[plus]', zoomIn],
    ['shift+[plus]', zoomIn],
    ['=', zoomIn],
    ['-', zoomOut],
    [
      'Escape',
      () => {
        if (zoom > 1) resetZoom()
        else if (index !== 0) goMap()
      },
    ],
  ])

  return null
}
