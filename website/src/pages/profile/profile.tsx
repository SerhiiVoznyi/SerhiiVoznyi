import './profile.sass'

import {
  BackToMap,
  CorpName,
  Decal,
  DisplayTitle,
  HalftoneOverlay,
  NdaNote,
  SocialLinks,
  Sticker,
  TagChip,
} from '@/components'
import { EMPLOYERS } from '@/content/career'
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

const current = EMPLOYERS.at(0)

export const ProfilePage = () => (
  <SheetScene
    kind="art"
    className="profile"
    overlay={<BackToMap className="spread-back" />}>
    <SheetStackProvider initialOrder={['summary', 'role', 'education', 'channels']}>
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
          <Sticker
            src={STICKERS.terminal}
            rotate={7}
          />
          <p className="sheet-text sheet-text--lead">{PROFILE.summary}</p>
          <dl className="glance-strip">
            {PROFILE.glance.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="sheet-text">{PROFILE.about}</p>
          <h3 className="sheet-subhead">What I focus on</h3>
          <ul className="sheet-list">
            {PROFILE.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="sheet-text">{PROFILE.values}</p>
        </Sheet>
        <Sheet
          id="role"
          index={2}
          title="Role"
          teaser={`${PROFILE.title} · ${PROFILE.location}`}
          treatment="ink">
          <Sticker
            src={STICKERS.nodes}
            rotate={-6}
          />
          <dl className="data-rows">
            <dt>Role</dt>
            <dd>{PROFILE.role}</dd>
            {current && (
              <>
                <dt>Company</dt>
                <dd>
                  <CorpName corp={current.corp} />
                </dd>
              </>
            )}
            <dt>Discipline</dt>
            <dd>{PROFILE.title}</dd>
            <dt>Base</dt>
            <dd>{PROFILE.location}</dd>
            <dt>Experience</dt>
            <dd>{PROFILE.experience}</dd>
            <dt>Stack</dt>
            <dd>{PROFILE.stack.slice(0, 4).join(' · ')}</dd>
          </dl>
          <NdaNote />
        </Sheet>
        <Sheet
          id="education"
          index={3}
          title="Education"
          teaser={`${PROFILE.education.degree} · languages · credentials`}>
          <Sticker
            src={STICKERS.chip}
            rotate={5}
          />
          <h3 className="sheet-subhead">{PROFILE.education.degree}</h3>
          <p className="sheet-text">
            {PROFILE.education.field}
            <br />
            <strong>{PROFILE.education.school}</strong> · {PROFILE.education.note}
          </p>
          <h3 className="sheet-subhead">Languages</h3>
          <dl className="data-rows profile__languages">
            {PROFILE.languages.map((language) => (
              <div key={language.name}>
                <dt>{language.name}</dt>
                <dd>{language.level}</dd>
              </div>
            ))}
          </dl>
          <h3 className="sheet-subhead">Credentials</h3>
          <ul className="chip-row">
            {PROFILE.credentials.map((item) => (
              <li key={item}>
                <TagChip tag={item} />
              </li>
            ))}
          </ul>
        </Sheet>
        <Sheet
          id="channels"
          index={4}
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
