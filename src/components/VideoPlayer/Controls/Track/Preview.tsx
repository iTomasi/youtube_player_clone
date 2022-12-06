interface Props {
  image_width: number,
  left: number,
  video_time: string,
  url: string
}

const classNameImg = 'min-w-[144px] max-w-[144px] min-h-[5rem] max-h-[5rem]'

export default function Preview ({
  image_width,
  left,
  video_time,
  url
}: Props) {
  return (
    <div
      className="absolute bottom-[150%] flex-col items-center gap-3 hidden group-hover:flex"
      style={{
        left: `${left}px`
      }}
    >
      <div
        className={`${classNameImg} border-2 border-white overflow-hidden`}
        style={{
          minWidth: `${image_width}px`,
          maxWidth: `${image_width}px`
        }}
      >
        <img
          className={`${classNameImg} object-cover object-center`}
          src={url}
          style={{
            minWidth: `${image_width}px`,
            maxWidth: `${image_width}px`
          }}
        />
      </div>

      <span className="text-sm">{video_time}</span>
    </div>
  )
}