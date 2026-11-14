import { useSoundtrack } from '@/lib/audio'

import { HudButton } from '../hud-button/hud-button'

export const SoundtrackControls = () => {
  const {
    isAvailable,
    track,
    trackNumber,
    isPlaying,
    isMuted,
    togglePlay,
    next,
    previous,
    toggleMute,
  } = useSoundtrack()

  return (
    <>
      <div
        className="soundtrack"
        role="group"
        aria-label="Soundtrack">
        <p className="soundtrack__readout">
          {isAvailable && track ? (
            <>
              <span>{String(trackNumber).padStart(2, '0')}</span> — {track.title}
            </>
          ) : (
            <>
              <span>00</span> — Soundtrack offline
            </>
          )}
        </p>
        <HudButton
          icon="la-step-backward"
          label="Previous track"
          variant="ghost"
          disabled={!isAvailable}
          onClick={previous}
          className="soundtrack__skip"
        />
        <HudButton
          icon={isPlaying ? 'la-pause' : 'la-play'}
          label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
          variant="ghost"
          disabled={!isAvailable}
          onClick={togglePlay}
        />
        <HudButton
          icon="la-step-forward"
          label="Next track"
          variant="ghost"
          disabled={!isAvailable}
          onClick={next}
          className="soundtrack__skip"
        />
      </div>
      <HudButton
        icon={isMuted ? 'la-volume-mute' : 'la-volume-up'}
        label="Mute soundtrack"
        pressed={isMuted}
        disabled={!isAvailable}
        onClick={toggleMute}
      />
    </>
  )
}
