import './profile.sass'

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

export const ProfilePage = () => (
  <SheetScene
    kind="art"
    className="profile"
    overlay={<BackToMap className="spread-back" />}>
    <SheetStackProvider initialOrder={['summary', 'role', 'channels']}>
      <Plate
        src="/assets/art/city-plate-street.webp"
        depth={3}
        tone="dim"
      />
      <Plate
        src="/assets/art/profile-figure.webp"
        depth={1}
        region="figure"
        glitch
        caption={`Subject // ${PROFILE.name}`}
        className="profile__figure"
      />
      <Decal
        src="/assets/art/decal-serpent.webp"
        className="profile__decal"
        rotate={14}
      />
      <div
        className="profile__title layer"
        style={{ '--layer-depth': 1 } as CSSVars}>
        <p className="spread-kicker">Subject file // {PROFILE.handle}</p>
        <DisplayTitle
          lines={['Profile']}
          size="lg"
          spreadHeading
        />
      </div>
      <SheetStack
        label="Profile sheets"
        className="profile__stack">
        <Sheet
          id="summary"
          index={1}
          title="Summary"
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
