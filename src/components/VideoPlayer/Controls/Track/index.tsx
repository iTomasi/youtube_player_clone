import type { MouseEvent as ReactMouseEvent } from 'react'
import { useState, useRef } from 'react'
import Circle from './Circle'
import Preview from './Preview'

// Helpers
import { formatVideoTime, formatTrackToCurrentTime } from 'helpers'
interface Props {
  percentage: number,
  video_duration: number,
  url: string,
  onPercentage: (value: number) => void,
  onMouseDown: () => void,
  onMouseUp: () => void
}

const PREVIEW_VIDEO_WIDTH = 144
const PREVIEW_IMAGE_TOTAL = 50

const getPercentage = ($div: null | HTMLDivElement, clientX: number) => {
  if (!$div) {
    console.log('<div></div> tag ref not exists track')
    return 0
  }

  const { left, right } = $div.getBoundingClientRect()

  if (left >= clientX) return 0
  else if (clientX >= right) return 100

  const max = right - left
  const value = clientX - left

  const calculate = (value * 100) / max

  return calculate
}

export default function Track ({
  percentage,
  url,
  video_duration,
  onPercentage,
  onMouseDown,
  onMouseUp
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)

  const [preview, setPreview] = useState({
    left: 0,
    video_time: '0:00',
    currentTime: 0,
    url
  })

  const handleOnMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    onMouseDown()
    onPercentage(getPercentage(divRef.current, e.clientX))
    window.addEventListener('mousemove', handleOnMouseMoveWindow)
    window.addEventListener('mouseup', handleOnMouseUp)
  }

  const handleOnMouseMoveWindow = (e: MouseEvent) => {
    onPercentage(getPercentage(divRef.current, e.clientX))
  }

  const handleOnMouseUp = () => {
    onMouseUp()
    window.removeEventListener('mousemove', handleOnMouseMoveWindow)
    window.removeEventListener('mouseup', handleOnMouseUp)
  }

  const handleOnMouseMove = async (e: ReactMouseEvent<HTMLDivElement>) => {
    const { current: $div } = divRef

    if (!$div) return

    const { clientX } = e
    const { left, right } = $div.getBoundingClientRect()
    const opImageWidth = PREVIEW_VIDEO_WIDTH / 2

    let theLeft = clientX - left - opImageWidth

    if (theLeft < 0) theLeft = 0
    else if (clientX > right - opImageWidth) theLeft = (right - left) - PREVIEW_VIDEO_WIDTH

    const thePercentage = getPercentage(divRef.current, clientX)
    const theVideoTime = formatVideoTime((thePercentage / 100) * video_duration)
    const percentageForPreview = thePercentage - (thePercentage % (100 / PREVIEW_IMAGE_TOTAL))
    const theCurrentTime = formatTrackToCurrentTime({ duration: video_duration, percentage: percentageForPreview })

    setPreview((prev) => ({
      ...prev,
      left: theLeft,
      video_time: theVideoTime,
      currentTime: theCurrentTime
    }))
  }

  return (
    <div className="px-2">
      <div
        className="py-2 group cursor-pointer select-none relative"
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
      >
        <Preview
          width={PREVIEW_VIDEO_WIDTH}
          {...preview}
        />
        <div className="bg-white bg-opacity-30 h-1 group-hover:h-1.5 transition-all" ref={divRef}>
          <div
            className="bg-[#FF0000] h-full relative flex items-center"
            style={{
              width:`${percentage}%`
            }}
          >
            <Circle/>
          </div>
        </div>
      </div>
    </div>
  )
}