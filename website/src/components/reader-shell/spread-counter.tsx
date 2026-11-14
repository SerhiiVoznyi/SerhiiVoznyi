import { formatSpreadNumber } from '@/content/spreads'
import { useSpreadNavigation } from '@/lib/reader'
import { formatCount } from '@/services'

import { HudButton } from '../hud-button/hud-button'

export const SpreadCounter = () => {
  const { index, total, entry, hasPrevious, hasNext, goPrevious, goNext } =
    useSpreadNavigation()

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
        {entry && (
          <span className="spread-counter__entry">
            {' // '}
            <span className="spread-counter__label">Entry</span>{' '}
            <strong>{formatCount(entry.position)}</strong> <span>of</span>{' '}
            <strong>{formatCount(entry.total)}</strong>
          </span>
        )}
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
