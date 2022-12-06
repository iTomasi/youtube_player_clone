import { VideoIcon, BellIcon } from 'components/icons'

const iconClassName = 'w-6 h-6'

export default function Right () {
  return (
    <div className="w-[25%] flex items-center justify-end gap-6">
      <VideoIcon className={iconClassName}/>
      <BellIcon className={iconClassName} />
      <img
        className="w-8 h-8 rounded-full"
        src="/img/profile.jpeg"
        alt="iTomasi"
      />
      
    </div>
  )
}