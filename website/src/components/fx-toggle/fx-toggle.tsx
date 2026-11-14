import { useReader } from '@/lib/reader'

import { HudButton } from '../hud-button/hud-button'

export const FxToggle = () => {
  const { fx, toggleFx } = useReader()

  return (
    <HudButton
      icon="la-power-off"
      label="Reduce visual effects"
      pressed={fx === 'reduced'}
      onClick={toggleFx}
    />
  )
}
