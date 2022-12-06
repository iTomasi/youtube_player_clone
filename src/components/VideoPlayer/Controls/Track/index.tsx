import type { MouseEvent as ReactMouseEvent } from 'react'
import { useState, useRef } from 'react'
import Circle from './Circle'
import Preview from './Preview'

// Helpers
import { formatVideoTime, formatTrackToCurrentTime } from 'helpers'

// Utils
import { videoScreenshot } from 'utils'
interface Props {
  percentage: number,
  video_duration: number,
  url: string,
  onPercentage: (value: number) => void,
  onMouseDown: () => void,
  onMouseUp: () => void
}

interface IPreviewScreenshot {
  [key: number]: string
}

const PREVIEW_IMAGE_WIDTH = 144
const PREVIEW_IMAGE_TOTAL = 5

let savedPreviewScreenshots: IPreviewScreenshot = {}

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
  const isGeneratingImageRef = useRef<boolean>(false)
  const divRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [preview, setPreview] = useState({
    left: 0,
    video_time: '0:00',
    url: 'https://images3.alphacoders.com/716/716428.png'
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

  const getTrackImage = async (thePercentage: number) => {
    const { current: $video } = videoRef

    if (!$video || isGeneratingImageRef.current) return

    console.log(savedPreviewScreenshots)

    const percentageForPreview = thePercentage - (thePercentage % (100 / PREVIEW_IMAGE_TOTAL))

    $video.currentTime = formatTrackToCurrentTime({ percentage: percentageForPreview, duration: video_duration })

    let theUrl = ''

    const getSavedScreenshot = savedPreviewScreenshots[percentageForPreview]

    if (getSavedScreenshot) theUrl = getSavedScreenshot

    else {
      isGeneratingImageRef.current = true
      const generateScreenshot = await videoScreenshot($video)
      isGeneratingImageRef.current = false

      savedPreviewScreenshots[percentageForPreview] = generateScreenshot.url

      theUrl = generateScreenshot.url
    }


    setPreview((prev) => ({
      ...prev,
      url: theUrl
    }))
  }

  const handleOnMouseMove = async (e: ReactMouseEvent<HTMLDivElement>) => {
    const { current: $div } = divRef

    if (!$div) return

    const { clientX } = e
    const { left, right } = $div.getBoundingClientRect()
    const opImageWidth = PREVIEW_IMAGE_WIDTH / 2

    let theLeft = clientX - left - opImageWidth

    if (theLeft < 0) theLeft = 0
    else if (clientX > right - opImageWidth) theLeft = (right - left) - PREVIEW_IMAGE_WIDTH

    const thePercentage = getPercentage(divRef.current, clientX)
    const theVideoTime = formatVideoTime((thePercentage / 100) * video_duration)

    getTrackImage(thePercentage)

    setPreview((prev) => ({
      ...prev,
      left: theLeft,
      video_time: theVideoTime
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
          image_width={PREVIEW_IMAGE_WIDTH}
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

      <video
        className="absolute invisible w-10 h-10"
        ref={videoRef}
        src={url}
      ></video>
    </div>
  )
}