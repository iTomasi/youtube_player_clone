import { HiBars3 } from 'react-icons/hi2'

export default function Left () {
  return (
    <div className="w-[25%] flex items-center gap-6">
      <button type="button">
        <HiBars3
          className="min-w-[1.75rem] max-w-[1.75rem] min-h-[1.75rem] max-h-[1.75rem]"
        />
      </button>

      <div className="relative">
        <img
          className="w-24"
          src="/youtube_logo.png"
        />

        <span className="absolute top-[-7px] right-[-17px] text-gray-400 text-[0.6rem] font-medium">CL</span>
      </div>
    </div>
  )
}