import './reader-shell.sass'

import type { ReactNode } from 'react'
import type { Location } from 'react-router-dom'

import { SpreadTransition } from '@/lib/spread-transition'

import { BottomToolbar } from './bottom-toolbar'
import { ReaderHotkeys } from './reader-hotkeys'
import { SpreadAnnouncer } from './spread-announcer'
import { SpreadStage } from './spread-stage'
import { TopBar } from './top-bar'

type ReaderShellProps = {
  renderSpread: (location: Location) => ReactNode
}

export const ReaderShell = ({ renderSpread }: ReaderShellProps) => (
  <div className="reader">
    <a
      href="#main"
      className="reader__skip">
      Skip to spread
    </a>
    <TopBar />
    <main
      id="main"
      tabIndex={-1}
      className="reader__main">
      <SpreadStage>
        <SpreadTransition>{renderSpread}</SpreadTransition>
      </SpreadStage>
      <span
        className="reader__bleed"
        aria-hidden="true"
      />
    </main>
    <BottomToolbar />
    <SpreadAnnouncer />
    <ReaderHotkeys />
  </div>
)
