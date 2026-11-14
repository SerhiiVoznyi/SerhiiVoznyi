import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'

import { SOUNDTRACK, type Track } from '@/content/soundtrack'

import { SoundtrackContext } from './audio-context'

const VOLUME = 0.35

// The dev server and SPA hosts answer missing files with index.html, so a 200 is not enough.
const probeTrack = async (track: Track) => {
  try {
    const response = await fetch(track.src, { method: 'HEAD' })
    const type = response.headers.get('content-type') ?? ''
    return response.ok && type.startsWith('audio') ? track : null
  } catch {
    return null
  }
}

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [tracks, setTracks] = useState<readonly Track[]>([])
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useLocalStorage({ key: 'sv:muted', defaultValue: true })

  useEffect(() => {
    let cancelled = false
    void Promise.all(SOUNDTRACK.map(probeTrack)).then((results) => {
      if (!cancelled) setTracks(results.filter((track): track is Track => track !== null))
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'none'
    audio.volume = VOLUME
    audioRef.current = audio

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || tracks.length === 0) return
    // Advancing a one-track playlist lands on the same index, which would not trigger a reload.
    const onEnded = () => {
      if (tracks.length === 1) {
        audio.currentTime = 0
        void audio.play().catch(() => setIsPlaying(false))
      } else {
        setIndex((current) => (current + 1) % tracks.length)
      }
    }
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [tracks.length])

  const track = tracks[index]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track) return
    const nextSrc = new URL(track.src, window.location.origin).href
    if (audio.src === nextSrc) return
    const resume = !audio.paused || audio.ended
    audio.src = nextSrc
    if (resume) void audio.play().catch(() => setIsPlaying(false))
  }, [track])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted
  }, [isMuted])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !track) return
    if (audio.paused) {
      // Pressing play is a clear request to hear something, so it also lifts the mute.
      setIsMuted(false)
      audio.muted = false
      void audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [track, setIsMuted])

  const step = useCallback(
    (delta: number) => {
      if (tracks.length === 0) return
      setIndex((current) => (current + delta + tracks.length) % tracks.length)
    },
    [tracks.length],
  )
  const next = useCallback(() => step(1), [step])
  const previous = useCallback(() => step(-1), [step])
  const toggleMute = useCallback(() => setIsMuted((muted) => !muted), [setIsMuted])

  const value = useMemo(
    () => ({
      isAvailable: tracks.length > 0,
      track,
      trackNumber: index + 1,
      isPlaying,
      isMuted,
      togglePlay,
      next,
      previous,
      toggleMute,
    }),
    [
      tracks.length,
      track,
      index,
      isPlaying,
      isMuted,
      togglePlay,
      next,
      previous,
      toggleMute,
    ],
  )

  return <SoundtrackContext value={value}>{children}</SoundtrackContext>
}
