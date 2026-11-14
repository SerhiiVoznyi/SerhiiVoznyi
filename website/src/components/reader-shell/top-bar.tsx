import { Link } from 'react-router-dom'

import { PROFILE } from '@/content/profile'
import { useSpreadNavigation } from '@/lib/reader'

import { DisplayTitle } from '../display-title/display-title'
import { FxToggle } from '../fx-toggle/fx-toggle'

export const TopBar = () => {
  const { spread } = useSpreadNavigation()

  return (
    <header className="top-bar">
      <Link
        to="/"
        className="top-bar__wordmark"
        aria-label={`${PROFILE.name}, back to the map`}>
        <DisplayTitle
          lines={[PROFILE.name]}
          level="none"
          size="xl"
          tone="yellow"
        />
      </Link>
      <div className="top-bar__chip">
        <span className="top-bar__handle">{PROFILE.handle}</span>
        <FxToggle />
      </div>
      <p className="top-bar__status">
        <span
          className="top-bar__pulse"
          aria-hidden="true"
        />
        <span className="top-bar__status-label">Chapter</span>
        <span className="top-bar__status-value">{spread?.chapter ?? 'Unmapped'}</span>
      </p>
    </header>
  )
}
