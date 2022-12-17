import { Button } from 'components/Buttons'
import { GitHubIcon } from 'components/icons'

// Helpers
import { formatNumber } from 'helpers'

// Types
import type { IAuthor as Props } from 'types'

export default function Author ({
  username,
  followers,
  profile_picture
}: Props) {
  return (
    <div className="flex gap-4 items-center">
      <a className="flex gap-2.5 items-start" href={'https://github.com/' + username} target="_blank">
        <div className="min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem] rounded-full overflow-hidden">
          <img
            className="min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem]"
            src={profile_picture}
          />
        </div>

        <div>
          <h3 className="leading-4 pt-1.5">{username}</h3>

          <span className="text-[#AAAAAA] text-xs">{formatNumber(followers)} followers</span>
        </div>
      </a>

      <Button
        className="gap-2"
        type="link"
        href="https://github.com/iTomasi/youtube_player_clone"
        target="_blank"
      >
        <GitHubIcon
          className="w-5 h-5"
        />

        <span>GitHub</span>
      </Button>
    </div>
  )
}