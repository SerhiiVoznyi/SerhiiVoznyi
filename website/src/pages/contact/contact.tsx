import './contact.sass'

import { BackToMap, Decal, DisplayTitle, HazardRule, SocialLinks } from '@/components'
import { PROFILE } from '@/content/profile'
import type { CSSVars } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
} from '@/lib/sheet-stack'

export const ContactPage = () => (
  <SheetScene
    kind="split"
    className="contact"
    overlay={<BackToMap className="spread-back" />}>
    <SheetStackProvider initialOrder={['channels', 'signal']}>
      <Plate
        src="/assets/art/city-plate-street.webp"
        depth={2}
        region="right"
        glitch
        caption={`Open relay // ${PROFILE.location}`}
      />
      <Decal
        src="/assets/art/decal-serpent.webp"
        className="contact__decal"
        rotate={10}
      />
      <div
        className="contact__title layer"
        style={{ '--layer-depth': 1 } as CSSVars}>
        <p className="spread-kicker">Contact // open a channel</p>
        <DisplayTitle
          lines={['Contact']}
          spreadHeading
        />
      </div>
      <SheetStack
        label="Contact sheets"
        region="left">
        <Sheet
          id="channels"
          index={1}
          title="Channels"
          teaser="LinkedIn · GitHub · Email"
          treatment="yellow"
          edge="notched">
          <p className="sheet-text sheet-text--lead">{PROFILE.topics}</p>
          <HazardRule
            tone="ink"
            className="contact__rule"
          />
          <SocialLinks />
        </Sheet>
        <Sheet
          id="signal"
          index={2}
          title="Signal"
          teaser="Base, time zone, handle"
          treatment="ink">
          <dl className="data-rows">
            <dt>Base</dt>
            <dd>{PROFILE.location}</dd>
            <dt>Time zone</dt>
            <dd>CET · UTC+1</dd>
            <dt>Handle</dt>
            <dd>{PROFILE.handle}</dd>
            <dt>Talk about</dt>
            <dd>Architecture · .NET / AWS · Leadership</dd>
          </dl>
        </Sheet>
      </SheetStack>
    </SheetStackProvider>
  </SheetScene>
)
