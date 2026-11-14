import { useSpreadNavigation } from '@/lib/reader'

import { SoundtrackControls } from './soundtrack-controls'
import { SpreadCounter } from './spread-counter'
import { ViewModeToggle } from './view-mode-toggle'
import { ZoomControls } from './zoom-controls'

export const BottomToolbar = () => {
  const { spread } = useSpreadNavigation()

  return (
    <footer className="bottom-toolbar">
      <p className="bottom-toolbar__title">
        <span aria-hidden="true">// </span>
        {spread?.label ?? 'Signal lost'}
      </p>
      <div className="bottom-toolbar__controls">
        <SpreadCounter />
        <ViewModeToggle />
        <SoundtrackControls />
        <ZoomControls />
      </div>
    </footer>
  )
}
