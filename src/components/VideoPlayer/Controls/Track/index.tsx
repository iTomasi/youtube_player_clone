import type { MouseEvent as ReactMouseEvent } from 'react'
import { useRef } from 'react'
import Circle from './Circle'

interface Props {
  percentage: number,
  onPercentage: (value: number) => void,
  onMouseDown: () => void,
  onMouseUp: () => void
}

export default function Track ({
  percentage,
  onPercentage,
  onMouseDown,
  onMouseUp
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)

  const handlePercentage = (clientX: number) => {
    const { current: $div } = divRef

    if (!$div) {
      console.log('<div></div> tag ref not exists track')
      return
    }

    const { left, right } = $div.getBoundingClientRect()

    if (left >= clientX) {
      onPercentage(0)
      return
    }

    else if (clientX >= right) {
      onPercentage(100)
      return
    }

    const max = right - left
    const value = clientX - left

    const calculate = (value * 100) / max

    onPercentage(calculate)
  }

  const handleOnMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    onMouseDown()
    handlePercentage(e.clientX)
    window.addEventListener('mousemove', handleOnMouseMove)
    window.addEventListener('mouseup', handleOnMouseUp)
  }

  const handleOnMouseMove = (e: MouseEvent) => {
    handlePercentage(e.clientX)
  }

  const handleOnMouseUp = () => {
    onMouseUp()
    window.removeEventListener('mousemove', handleOnMouseMove)
    window.removeEventListener('mouseup', handleOnMouseUp)
  }

  return (
    <div className="px-2">
      <div className="py-2 group cursor-pointer select-none" onMouseDown={handleOnMouseDown}>
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