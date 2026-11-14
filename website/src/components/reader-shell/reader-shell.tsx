import './reader-shell.sass'

import type { ReactNode } from 'react'
import type { Location } from 'react-router-dom'

import { useRecordVisit } from '@/lib/reader'
import { SpreadTransition } from '@/lib/spread-transition'

import { BottomToolbar } from './bottom-toolbar'
import { ReaderBleed } from './reader-bleed'
import { ReaderHotkeys } from './reader-hotkeys'
import { SpreadAnnouncer } from './spread-announcer'
import { SpreadStage } from './spread-stage'
import { TopBar } from './top-bar'

type ReaderShellProps = {
  renderSpread: (location: Location) => ReactNode
}

export const ReaderShell = ({ renderSpread }: ReaderShellProps) => {
  useRecordVisit()

  return (
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
      </main>
      <ReaderBleed />
      <BottomToolbar />
      <SpreadAnnouncer />
      <ReaderHotkeys />
    </div>
  )
}
