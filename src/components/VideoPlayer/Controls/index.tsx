import type { MouseEventHandler } from 'react'

// Components
import Button from './Button'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import Volume from './Volume'

interface Props {
  onClickPlay: MouseEventHandler<HTMLButtonElement>,
  isPlaying: boolean,
  duration_time: string,
  current_time: string,
  volume_percentage: number,
  onVolumePercentage: (percentage: number) => void
}

export default function Controls ({
  onClickPlay,
  isPlaying,
  duration_time,
  current_time,
  volume_percentage,
  onVolumePercentage
}: Props) {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="flex items-center">
        <Button
          icon={isPlaying ? BsPauseFill : BsPlayFill}
          onClick={onClickPlay}
        />

        <Volume
          percentage={volume_percentage}
          onPercentage={onVolumePercentage}
        />

        <div className="flex gap-1 ml-2">
          <span>{current_time}</span>
          <span>/</span>
          <span>{duration_time}</span>
        </div>
      </div>
    </div>
  )
}