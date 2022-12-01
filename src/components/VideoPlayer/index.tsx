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
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const { current: $video } = videoRef

    if (!$video) return

    $video.volume = 0.01

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

  return (
    <div className="flex justify-center bg-black relative">
      <video
        className="max-h-[40rem] min-h-[30rem] min-w-[30rem] max-w-full"
        src={url}
        ref={videoRef}
      ></video>

      <Controls
        onClickPlay={handleOnClickPlay}
        isPlaying={isPlaying}
        current_time={time.current}
        duration_time={time.duration}
      />
    </div>
  )
}