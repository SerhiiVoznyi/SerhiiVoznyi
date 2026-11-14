import './identity.sass'

import {
  BackToMap,
  Decal,
  DisplayTitle,
  HalftoneOverlay,
  SocialLinks,
} from '@/components'
import { PROFILE } from '@/content/profile'
import type { CSSVars } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
} from '@/lib/sheet-stack'

export const IdentityPage = () => (
  <SheetScene
    kind="art"
    className="identity"
    overlay={<BackToMap className="spread-back" />}>
    <SheetStackProvider initialOrder={['profile', 'role', 'channels']}>
      <Plate
        src="/assets/art/city-plate-street.webp"
        depth={3}
        tone="dim"
      />
      <Plate
        src="/assets/art/identity-figure.webp"
        depth={1}
        region="figure"
        glitch
        caption={`Subject // ${PROFILE.name}`}
        className="identity__figure"
      />
      <Decal
        src="/assets/art/decal-serpent.webp"
        className="identity__decal"
        rotate={14}
      />
      <div
        className="identity__title layer"
        style={{ '--layer-depth': 1 } as CSSVars}>
        <p className="spread-kicker">Subject file // {PROFILE.handle}</p>
        <DisplayTitle
          lines={['Identity']}
          size="lg"
          spreadHeading
        />
      </div>
      <SheetStack
        label="Identity sheets"
        className="identity__stack">
        <Sheet
          id="profile"
          index={1}
          title="Profile"
          teaser={PROFILE.role}
          edge="torn">
          <HalftoneOverlay />
          <p className="sheet-text sheet-text--lead">{PROFILE.summary}</p>
          <p className="sheet-text">{PROFILE.about}</p>
        </Sheet>
        <Sheet
          id="role"
          index={2}
          title="Role"
          teaser={`${PROFILE.title} · ${PROFILE.location}`}
          treatment="ink">
          <dl className="data-rows">
            <dt>Role</dt>
            <dd>{PROFILE.role}</dd>
            <dt>Discipline</dt>
            <dd>{PROFILE.title}</dd>
            <dt>Base</dt>
            <dd>{PROFILE.location}</dd>
            <dt>Experience</dt>
            <dd>{PROFILE.experience}</dd>
          </dl>
        </Sheet>
        <Sheet
          id="channels"
          index={3}
          title="Channels"
          teaser="LinkedIn · GitHub · Email"
          treatment="yellow"
          edge="notched">
          <SocialLinks />
        </Sheet>
      </SheetStack>
    </SheetStackProvider>
  </SheetScene>
)
