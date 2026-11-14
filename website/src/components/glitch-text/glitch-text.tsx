import './glitch-text.sass'

import { cx } from '@/lib/cx'

type GlitchTextProps = {
  text: string
  as?: 'span' | 'p' | 'strong'
  className?: string
}

export const GlitchText = ({ text, as: Tag = 'span', className }: GlitchTextProps) => (
  <Tag
    className={cx('glitch-text', className)}
    data-text={text}>
    {text}
  </Tag>
)
