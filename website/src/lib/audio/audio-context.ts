import { createContext } from 'react'

import type { Track } from '@/content/soundtrack'

export type SoundtrackValue = {
  isAvailable: boolean
  track: Track | undefined
  trackNumber: number
  isPlaying: boolean
  isMuted: boolean
  togglePlay: () => void
  next: () => void
  previous: () => void
  toggleMute: () => void
}

export const SoundtrackContext = createContext<SoundtrackValue | null>(null)
