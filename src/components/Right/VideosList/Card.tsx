interface Props {
  title: string,
  img: string,
  author: string,
  views: number,
  time_ago: string
}

export default function Card ({
  title,
  img,
  author,
  views,
  time_ago
}: Props) {
  return (
    <div className="flex gap-2">
      <div className="w-[168px] h-[94x] rounded-md overflow-hidden">
        <img
          className="w-full h-full"
          src={img}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-[#F1F1F1] mb-1.5">{title}</h3>
        <div className="text-[#AAAAAA] text-xs">
          <span className="block mb-0.5">{author}</span>
          <div className="flex items-center gap-1.5">
            <span>{views} views</span>
            <span className="h-1 w-1 bg-[#AAAAAA] rounded-full"></span>
            <span>{time_ago}</span>
          </div>
        </div>
      </div>
    </div>
  )
}