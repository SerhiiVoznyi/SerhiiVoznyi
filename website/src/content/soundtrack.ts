export type Track = {
  id: string
  title: string
  artist: string
  src: string
}

// Files live in public/assets/audio/; tracks whose files are missing are hidden from the player.
export const SOUNDTRACK: readonly Track[] = [
  {
    id: 'the-rebel-path',
    title: 'The Rebel Path',
    artist: 'Cyberpunk 2077 OST',
    src: '/assets/audio/the-rebel-path.mp3',
  },
  {
    id: 'v',
    title: 'V',
    artist: 'Cyberpunk 2077 OST',
    src: '/assets/audio/v.mp3',
  },
]
