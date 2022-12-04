import { useState, useRef, useEffect } from 'react'

// Components
import Controls from './Controls'

// Helpers
import { formatVideoTime } from 'helpers'

interface Props {
  url: string
}

export default function VideoPlayer ({ url }: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [time, setTime] = useState({
    current: '0:00',
    duration: '0:00'
  })
  const [volumePercentage, setVolumePercentage] = useState<number>(10)
  const [muted, setMuted] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const { current: $video } = videoRef

    if (!$video) return

    $video.volume = volumePercentage / 100

    const videoDuration = formatVideoTime($video.duration)

    setTime((prev) => ({
      ...prev,
      duration: videoDuration
    }))

    const handleOnTimeUpdate = () => {
      const timeFormated = formatVideoTime($video.currentTime)

      setTime((prev) => ({
        ...prev,
        current: timeFormated
      }))
    }

    $video.addEventListener('timeupdate', handleOnTimeUpdate)

    return () => {
      $video.removeEventListener('timeupdate', handleOnTimeUpdate)
    }
  }, [])

  const handleOnClickPlay = () => {
    const { current: $video } = videoRef

    if (!$video) return

    if ($video.paused) $video.play()
    else $video.pause()

    setIsPlaying(!$video.paused)
  }

  const handleOnVolumePercentage = (percentage: number) => {
    const { current: $video } = videoRef

    if (!$video) return

    $video.volume = percentage / 100

    setVolumePercentage(percentage)

    if ($video.muted) setMuted(false)
  }

  const handleOnSwitchMute = () => {
    const { current: $video } = videoRef

    if (!$video) return

    setMuted(!$video.muted)
  }

  return (
    <div className="flex justify-center bg-black relative">
      <video
        className="max-h-[40rem] min-h-[30rem] min-w-[30rem] max-w-full"
        src={url}
        ref={videoRef}
        muted={muted}
      ></video>

      <Controls
        onClickPlay={handleOnClickPlay}
        isPlaying={isPlaying}
        current_time={time.current}
        duration_time={time.duration}
        volume_percentage={volumePercentage}
        onVolumePercentage={handleOnVolumePercentage}
        muted={muted}
        onSwitchMute={handleOnSwitchMute}
      />
    </div>
  )
}