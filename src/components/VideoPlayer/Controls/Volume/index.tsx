import type { MouseEventHandler } from 'react'

// Components
import Button from '../Button'
import Bar from './Bar'
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from 'react-icons/io'

interface Props {
  percentage: number,
  onPercentage: (percentage: number) => void,
  onSwitchMute: MouseEventHandler<HTMLButtonElement>,
  muted: boolean
}

export default function Volume ({
  percentage,
  onPercentage,
  onSwitchMute,
  muted
}: Props) {
  let theIcon = IoMdVolumeHigh

  if (percentage === 0 || muted) theIcon = IoMdVolumeOff
  else if (percentage < 50) theIcon = IoMdVolumeLow
  

  return (
    <div className="flex items-center group cursor-pointer">
      <Button
        icon={theIcon}
        onClick={onSwitchMute}
      />

      <Bar
        percentage={muted ? 0 : percentage}
        onPercentage={onPercentage}
      />
    </div>
  )
}