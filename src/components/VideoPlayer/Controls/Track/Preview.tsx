import { useEffect, useRef } from 'react'

interface Props {
  width: number,
  left: number,
  currentTime: number,
  video_time: string,
  url: string
}

const classNameImg = 'min-w-[144px] max-w-[144px] min-h-[5rem] max-h-[5rem]'

export default function Preview ({
  width,
  left,
  currentTime,
  video_time,
  url
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const { current: $video } = videoRef

    if (!$video) return

    $video.currentTime = currentTime
  }, [currentTime])

  return (
    <div
      className="absolute bottom-[150%] flex-col items-center gap-3 hidden group-hover:flex"
      style={{
        left: `${left}px`
      }}
    >
      <div
        className={`${classNameImg} border-2 border-white overflow-hidden`}
        style={{
          minWidth: `${width}px`,
          maxWidth: `${width}px`
        }}
      >
        <video
          ref={videoRef}
          className={`${classNameImg} object-cover object-center`}
          src={url}
          style={{
            minWidth: `${width}px`,
            maxWidth: `${width}px`
          }}
        ></video>
      </div>

      <span className="text-sm">{video_time}</span>
    </div>
  )
}