import type { ChangeEvent } from 'react'
import { useState, useRef, useEffect } from 'react'

// Components
import Controls from './Controls'
import LoaderSpinner from './LoaderSpinner'

// Helpers
import { formatVideoTime, formatTrackToPercentage, formatTrackToCurrentTime } from 'helpers'

interface Props {
  url: string
}

export default function VideoPlayer ({ url }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [time, setTime] = useState({
    current: '0:00',
    duration: '0:00',
    duration_number: 0
  })
  const [volumePercentage, setVolumePercentage] = useState<number>(10)
  const [trackPercentage, setTrackPercentage] = useState<number>(0)
  const [trackLoadedPercentage, setTrackLoadedPercentage] = useState<number>(0)
  const [muted, setMuted] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isPlayingRef = useRef<boolean>(false)

  useEffect(() => {
    const { current: $video } = videoRef

    if (!$video) return

    setIsLoading(true)

    $video.src = url
  }, [url])

  useEffect(() => {
    const { current: $video } = videoRef

    if (!$video) return

    if (isPlaying) {
      $video.play()
      return
    }

    $video.pause()
  }, [isPlaying])

  useEffect(() => {
    const { current: $video } = videoRef

    if (!$video) return

    const theVolume = volumePercentage / 100

    $video.volume = theVolume

    if ($video.muted) setMuted(false)

  }, [volumePercentage])

  const handleOnLoadedData = (e: any) => {
    const $video = e.currentTarget

    $video.volume = volumePercentage / 100

    const videoDuration = formatVideoTime($video.duration)

    setTime((prev) => ({
      ...prev,
      duration: videoDuration,
      duration_number: $video.duration
    }))

    setIsLoading(false)
  }

  const handleOnClickPlay = () => setIsPlaying((prev) => !prev)
  const handleOnVolumePercentage = (percentage: number) => setVolumePercentage(percentage)

  const handleOnTimeUpdate = (e: ChangeEvent<HTMLVideoElement>) => {
    const $video = e.currentTarget

    const timeFormated = formatVideoTime($video.currentTime)
    const trackPercentage = formatTrackToPercentage({ currentTime: $video.currentTime, duration: $video.duration })

    setTime((prev) => ({
      ...prev,
      current: timeFormated
    }))

    setTrackPercentage(trackPercentage)
  }

  const handleOnProgress = (e: any) => {
    const $video = e.currentTarget as HTMLVideoElement

    const buffered = $video.buffered
    const duration = $video.duration

    if (duration <= 0 || buffered.length <= 0) return

    const percentage = (buffered.end(0) * 100) / duration

    setTrackLoadedPercentage(percentage)
  }

  const handleOnTrackPercentage = (percentage: number) => {
    const { current: $video } = videoRef

    if (!$video) return

    const theCurrentTime = formatTrackToCurrentTime({
      duration: $video.duration,
      percentage
    })

    $video.currentTime = theCurrentTime
    setTrackPercentage(percentage)
  }

  const handleOnTrackMouseDown = () => {
    isPlayingRef.current = isPlaying

    if (!isPlaying) return

    setIsPlaying(false)
  }

  const handleOnTrackMouseUp = () => {
    const { current: theIsPlaying } = isPlayingRef

    if (!theIsPlaying) return

    setIsPlaying(true)
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
        ref={videoRef}
        muted={muted}
        onLoadedData={handleOnLoadedData}
        onTimeUpdate={handleOnTimeUpdate}
        onProgress={handleOnProgress}
      ></video>

      {
        isLoading ? (
          <LoaderSpinner/>
        ) : (
          <Controls
            onClickPlay={handleOnClickPlay}
            isPlaying={isPlaying}
            current_time={time.current}
            duration_time={time.duration}
            duration_time_number={time.duration_number}
            track_percentage={trackPercentage}
            track_loaded_percentage={trackLoadedPercentage}
            volume_percentage={volumePercentage}
            onVolumePercentage={handleOnVolumePercentage}
            onTrackPercentage={handleOnTrackPercentage}
            onTrackMouseDown={handleOnTrackMouseDown}
            onTrackMouseUp={handleOnTrackMouseUp}
            muted={muted}
            onSwitchMute={handleOnSwitchMute}
            url={url}
          />
        )
      }
    </div>
  )
}