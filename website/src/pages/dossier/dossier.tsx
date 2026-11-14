import './dossier.sass'

import { BackToMap, Decal, DisplayTitle, HazardRule, TagChip } from '@/components'
import { PROFILE } from '@/content/profile'
import type { CSSVars } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
} from '@/lib/sheet-stack'

export const DossierPage = () => (
  <SheetScene
    kind="split"
    className="dossier"
    overlay={<BackToMap className="spread-back" />}>
    <SheetStackProvider initialOrder={['about', 'focus', 'stack']}>
      <Plate
        src="/assets/art/server-hall.webp"
        depth={2}
        region="right"
        glitch
        magnify
        caption="Plate // Where the systems live"
      />
      <Decal
        src="/assets/art/decal-serpent.webp"
        className="dossier__decal"
      />
      <div
        className="dossier__title layer"
        style={{ '--layer-depth': 1 } as CSSVars}>
        <p className="spread-kicker">Dossier // {PROFILE.experience} in the field</p>
        <DisplayTitle
          lines={['Dossier']}
          size="lg"
          spreadHeading
        />
      </div>
      <SheetStack
        label="Dossier sheets"
        region="left">
        <Sheet
          id="about"
          index={1}
          title="About"
          teaser={`${PROFILE.experience} of enterprise software`}
          edge="torn">
          <p className="sheet-text sheet-text--lead">{PROFILE.about}</p>
          <p className="sheet-text">{PROFILE.summary}</p>
        </Sheet>
        <Sheet
          id="focus"
          index={2}
          title="What I do"
          teaser="Architecture · distributed systems · leadership">
          <ul className="focus-list">
            {PROFILE.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Sheet>
        <Sheet
          id="stack"
          index={3}
          title="Primary stack"
          teaser={PROFILE.stack.join(' · ')}
          treatment="yellow"
          edge="notched">
          <HazardRule
            tone="ink"
            className="dossier__rule"
          />
          <ul className="chip-row">
            {PROFILE.stack.map((item) => (
              <li key={item}>
                <TagChip tag={item} />
              </li>
            ))}
          </ul>
        </Sheet>
      </SheetStack>
    </SheetStackProvider>
  </SheetScene>
)
