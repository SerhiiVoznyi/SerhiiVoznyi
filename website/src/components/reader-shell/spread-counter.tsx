import { formatSpreadNumber } from '@/content/spreads'
import { useSpreadNavigation } from '@/lib/reader'

import { HudButton } from '../hud-button/hud-button'

export const SpreadCounter = () => {
  const { index, total, hasPrevious, hasNext, goPrevious, goNext } = useSpreadNavigation()

  return (
    <nav
      className="spread-counter"
      aria-label="Spread pagination">
      <HudButton
        icon="la-arrow-left"
        label="Previous spread"
        disabled={!hasPrevious}
        onClick={goPrevious}
      />
      <p className="spread-counter__readout">
        <span className="spread-counter__label">Spread:</span>{' '}
        <strong>{formatSpreadNumber(index)}</strong> <span>of</span>{' '}
        <strong>{String(total).padStart(2, '0')}</strong>
      </p>
      <HudButton
        icon="la-arrow-right"
        label="Next spread"
        disabled={!hasNext}
        onClick={goNext}
      />
    </nav>
  )
}
