import { useReader } from '@/lib/reader'

import { HudButton } from '../hud-button/hud-button'

export const ViewModeToggle = () => {
  const { viewMode, canToggleView, toggleViewMode } = useReader()

  return (
    <HudButton
      icon="la-columns"
      label="Two-page spread view"
      pressed={viewMode === 'spread'}
      disabled={!canToggleView}
      onClick={toggleViewMode}
      className="view-mode-toggle"
    />
  )
}
