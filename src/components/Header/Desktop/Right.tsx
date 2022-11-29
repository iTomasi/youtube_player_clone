import { HiBell, HiVideoCamera } from 'react-icons/hi'

const iconClassName = 'w-6 h-6'

export default function Right () {
  return (
    <div className="w-[25%] flex items-center justify-end gap-6">
      <HiVideoCamera className={iconClassName} />
      <HiBell className={iconClassName} />
      <img
        className="w-8 h-8 rounded-full"
        src="https://yt3.ggpht.com/ytc/AMLnZu_z3tnXFUrUSSd49RirGoRQJkHAAsWe7bYXyQpq=s88-c-k-c0x00ffffff-no-rj-mo"
        alt="iTomasi"
      />
      
    </div>
  )
}