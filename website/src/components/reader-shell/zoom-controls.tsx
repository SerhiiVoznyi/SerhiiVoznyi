import { useReader, ZOOM_MAX, ZOOM_MIN } from '@/lib/reader'

import { HudButton } from '../hud-button/hud-button'

export const ZoomControls = () => {
  const { zoom, zoomIn, zoomOut } = useReader()

  return (
    <div
      className="zoom-controls"
      role="group"
      aria-label="Zoom">
      <HudButton
        icon="la-search-minus"
        label="Zoom out"
        variant="ghost"
        disabled={zoom <= ZOOM_MIN}
        onClick={zoomOut}
      />
      <HudButton
        icon="la-search-plus"
        label="Zoom in"
        variant="ghost"
        disabled={zoom >= ZOOM_MAX}
        onClick={zoomIn}
      />
    </div>
  )
}
