import { useContext } from 'react'

import { SoundtrackContext } from './audio-context'

export const useSoundtrack = () => {
  const value = useContext(SoundtrackContext)
  if (!value) throw new Error('useSoundtrack must be used inside <AudioProvider>.')
  return value
}
