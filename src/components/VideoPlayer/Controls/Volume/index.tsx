// Components
import Button from '../Button'
import Bar from './Bar'
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from 'react-icons/io'

interface Props {
  percentage: number,
  onPercentage: (percentage: number) => void
}

export default function Volume ({
  percentage,
  onPercentage
}: Props) {
  return (
    <div className="flex items-center group cursor-pointer">
      <Button
        icon={IoMdVolumeHigh}
        onClick={() => {}}
      />

      <Bar
        percentage={percentage}
        onPercentage={onPercentage}
      />
    </div>
  )
}