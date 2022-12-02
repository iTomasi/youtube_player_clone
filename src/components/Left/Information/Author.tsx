import { Button } from 'components/Buttons'
import { FaGithub } from 'react-icons/fa'

// Helpers
import { formatNumber } from 'helpers'

export default function Author () {
  return (
    <div className="flex gap-4 items-center">
      <a className="flex gap-2.5 items-start" href="#">
        <div className="min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem] rounded-full overflow-hidden">
          <img
            className="min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem]"
            src="/img/profile.jpeg"
          />
        </div>

        <div>
          <h3 className="leading-4 pt-1.5">iTomasi</h3>

          <span className="text-[#AAAAAA] text-xs">{formatNumber(581000)} followers</span>
        </div>
      </a>

      <Button
        className="gap-2"
        type="link"
      >
        <FaGithub
          className="w-5 h-5"
        />

        <span>GitHub</span>
      </Button>
    </div>
  )
}