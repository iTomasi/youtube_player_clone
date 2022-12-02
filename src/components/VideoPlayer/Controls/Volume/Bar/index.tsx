import type { MouseEvent as ReactMouseEvent } from 'react'
import { useRef } from 'react'
import Circle from './Circle'

interface Props {
  percentage: number,
  onPercentage: (percentage: number) => void
}

export default function Bar ({
  percentage: thePercentage,
  onPercentage
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)

  let percentage = thePercentage

  if (percentage > 100) percentage = 100
  else if (percentage < 0) percentage = 0

  const handlePercentage = (clientX: number) => {
    const { current: $div } = divRef

    if (!$div) {
      console.log('Wtf div not exists')
      return
    }

    const { left, right } = $div.getBoundingClientRect()

    const max = right - left
    const value = clientX - left

    if (value <= 0) {
      onPercentage(0)
      return
    }

    else if (value >= max) {
      onPercentage(100)
      return
    }

    const getPercentage = (value * 100) / max

    onPercentage(getPercentage)
  }

  const handleOnMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    handlePercentage(e.clientX)
    window.addEventListener('mousemove', handleOnMouseMove)
    window.addEventListener('mouseup', handleOnMouseUp)
  }

  const handleOnMouseMove = (e: MouseEvent) => {
    handlePercentage(e.clientX)
  }

  const handleOnMouseUp = () => {
    window.removeEventListener('mousemove', handleOnMouseMove)
    window.removeEventListener('mouseup', handleOnMouseUp)
  }

  return (
    <div className="w-0 py-1.5 group-hover:w-[5rem] group-hover:overflow-visible transition-all overflow-hidden">
      <div className="min-w-[5rem] max-w-[5rem]">
        <div className="w-full h-1 bg-[#555555] select-none" ref={divRef} onMouseDown={handleOnMouseDown}>
          <div
            className="bg-white h-full relative flex items-center"
            style={{
              width: `${percentage}%`
            }}
          >
            <Circle/>
          </div>
        </div>
      </div>
    </div>
  )
}