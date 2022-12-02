// Components
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'

// Helpers
import { formatNumber } from 'helpers'

interface Props {
  likes: number
}

const classNameButton = 'py-2 first:pl-4 last:pr-4 last:pl-2 bg-white bg-opacity-10 hover:bg-opacity-20'
const classNameSpan = 'block px-2'
const classNameIcon = 'w-6 h-6'

export default function Likes ({
  likes
}: Props) {
  return (
    <div className="flex rounded-full overflow-hidden">
      <button
        className={classNameButton}
        type="button"
      >
        <span className={`${classNameSpan} pr-4 flex items-center gap-2 border-r border-[#555555]`}>
          <AiOutlineLike
            className={classNameIcon}
          />

          <span className="text-sm font-medium">{formatNumber(likes)}</span>
        </span>
      </button>

      <button
        className={classNameButton}
        type="button"
      >
        <span className={classNameSpan}>
          <AiOutlineDislike
            className={`${classNameIcon} scale-x-[-1]`}
          />
        </span>
      </button>
    </div>
  )
}