export const NDA_NOTICE =
  'Due to security reasons and non-disclosure agreements, all real company names were replaced with Cyberpunk 2077 corporations. The rest of the information is real.'

export const NDA_FOOTNOTE = 'Real company names replaced under NDA'

export const CORPS = {
  arasaka: 'Arasaka',
  militech: 'Militech',
  nightCorp: 'Night Corp',
  kangTao: 'Kang Tao',
  ziggurat: 'Ziggurat',
  zetatech: 'Zetatech',
  petrochem: 'Petrochem',
} as const

export type CorpId = keyof typeof CORPS
