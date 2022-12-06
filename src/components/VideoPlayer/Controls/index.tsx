import type { MouseEventHandler } from 'react'

// Components
import Button from './Button'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import Volume from './Volume'
import Track from './Track'

interface Props {
  onClickPlay: MouseEventHandler<HTMLButtonElement>,
  isPlaying: boolean,
  duration_time: string,
  duration_time_number: number,
  current_time: string,
  track_percentage: number,
  volume_percentage: number,
  onVolumePercentage: (percentage: number) => void,
  onTrackPercentage: (percentage: number) => void,
  onTrackMouseDown: () => void,
  onTrackMouseUp: () => void,
  muted: boolean,
  onSwitchMute: () => void
}

export default function Controls ({
  onClickPlay,
  isPlaying,
  duration_time,
  duration_time_number,
  current_time,
  track_percentage,
  volume_percentage,
  onVolumePercentage,
  onTrackPercentage,
  onTrackMouseDown,
  onTrackMouseUp,
  muted,
  onSwitchMute
}: Props) {
  return (
    <div className="absolute bottom-0 left-0 right-0">

      <Track
        video_duration={duration_time_number}
        url="/iW-Waifu.mp4"
        percentage={track_percentage}
        onPercentage={onTrackPercentage}
        onMouseDown={onTrackMouseDown}
        onMouseUp={onTrackMouseUp}
      />

      <div className="flex items-center">
        <Button
          icon={isPlaying ? BsPauseFill : BsPlayFill}
          onClick={onClickPlay}
        />

        <Volume
          percentage={volume_percentage}
          onPercentage={onVolumePercentage}
          muted={muted}
          onSwitchMute={onSwitchMute}
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