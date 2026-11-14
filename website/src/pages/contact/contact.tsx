import './contact.sass'

import {
  BackToMap,
  Decal,
  DisplayTitle,
  HazardRule,
  SocialLinks,
  Sticker,
  TagChip,
} from '@/components'
import { PROFILE } from '@/content/profile'
import { STICKERS } from '@/content/stickers'
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
          teaser={PROFILE.availability.status}
          treatment="yellow"
          edge="notched">
          <p className="status-tag">{PROFILE.availability.status}</p>
          <p className="sheet-text sheet-text--lead">{PROFILE.availability.statement}</p>
          <p className="sheet-text">{PROFILE.availability.invitation}</p>
          <h3 className="sheet-subhead">Topics</h3>
          <p className="sheet-text">{PROFILE.topics}</p>
          <ul
            className="chip-row"
            aria-label="Topics">
            {PROFILE.talkAbout.map((item) => (
              <li key={item}>
                <TagChip tag={item} />
              </li>
            ))}
          </ul>
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
          teaser="Status, base, time zone, languages"
          treatment="ink">
          <Sticker
            src={STICKERS.antenna}
            rotate={6}
            size="lg"
          />
          <dl className="data-rows">
            <dt>Status</dt>
            <dd>{PROFILE.availability.status}</dd>
            <dt>Role</dt>
            <dd>{PROFILE.role}</dd>
            <dt>Base</dt>
            <dd>{PROFILE.location}</dd>
            <dt>Time zone</dt>
            <dd>CET · UTC+1</dd>
            <dt>Handle</dt>
            <dd>{PROFILE.handle}</dd>
            <dt>Languages</dt>
            <dd>{PROFILE.languages.map((language) => language.name).join(' · ')}</dd>
          </dl>
        </Sheet>
      </SheetStack>
    </SheetStackProvider>
  </SheetScene>
)
