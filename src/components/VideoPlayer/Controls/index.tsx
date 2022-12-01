import type { MouseEventHandler } from 'react'

// Components
import Button from './Button'
import { HiPlay, HiPause } from 'react-icons/hi'

interface Props {
  onClickPlay: MouseEventHandler<HTMLButtonElement>,
  isPlaying: boolean,
  duration_time: string,
  current_time: string
}

export default function Controls ({
  onClickPlay,
  isPlaying,
  duration_time,
  current_time
}: Props) {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="flex items-center gap-2">
        <Button
          icon={isPlaying ? HiPause : HiPlay}
          onClick={onClickPlay}
        />

        <div className="flex gap-1">
          <span>{current_time}</span>
          <span>/</span>
          <span>{duration_time}</span>
        </div>
      </div>
    </div>
  )
}