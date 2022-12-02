// Helpers
import { formatNumber } from 'helpers'

interface Props {
  title: string,
  img: string,
  author: string,
  views: number,
  time_ago: string,
  url: string,
  duration: string
}

export default function Card ({
  title,
  img,
  author,
  views,
  time_ago,
  url,
  duration
}: Props) {
  return (
    <a className="flex gap-2" href={url} target="_blank">
      <div className="min-w-[168px] max-w-[168px] min-h-[94px] max-h-[94px] rounded-md overflow-hidden relative">
        <img
          className="min-w-[168px] max-w-[168px] min-h-[94px] max-h-[94px]"
          src={img}
        />

        <span className="absolute bottom-1 right-1 text-xs bg-black px-1 py-0.5 rounded">{duration}</span>
      </div>

      <div>
        <h3 
          className="text-sm font-medium text-[#F1F1F1] mb-1.5 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }}
        >
          {title}
        </h3>
        <div className="text-[#AAAAAA] text-xs">
          <span className="block mb-0.5">{author}</span>
          <div className="flex items-center gap-1.5">
            <span>{formatNumber(views)} views</span>
            <span className="h-1 w-1 bg-[#AAAAAA] rounded-full"></span>
            <span>{time_ago}</span>
          </div>
        </div>
      </div>
    </a>
  )
}