import './social-links.sass'

import { PROFILE } from '@/content/profile'
import { cx } from '@/lib/cx'

const CHANNELS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    detail: 'in/serhii-voznyi',
    href: PROFILE.links.linkedIn,
    icon: 'lab la-linkedin',
  },
  {
    id: 'github',
    label: 'GitHub',
    detail: 'SerhiiVoznyi',
    href: PROFILE.links.gitHub,
    icon: 'lab la-github',
  },
  {
    id: 'email',
    label: 'Email',
    detail: 'serhiivoznyi@gmail.com',
    href: PROFILE.links.email,
    icon: 'las la-envelope',
  },
] as const

type SocialLinksProps = {
  variant?: 'rows' | 'inline'
  className?: string
}

export const SocialLinks = ({ variant = 'rows', className }: SocialLinksProps) => (
  <ul className={cx('social-links', `social-links--${variant}`, className)}>
    {CHANNELS.map((channel) => {
      const external = channel.href.startsWith('http')
      return (
        <li key={channel.id}>
          <a
            href={channel.href}
            className="social-links__link"
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}>
            <i
              className={channel.icon}
              aria-hidden="true"
            />
            <span className="social-links__label">{channel.label}</span>
            {variant === 'rows' && (
              <span className="social-links__detail">{channel.detail}</span>
            )}
            {external && <span className="social-links__hint">(opens in a new tab)</span>}
          </a>
        </li>
      )
    })}
  </ul>
)
