import { useState } from 'react'

// Components
import { SelectVideo } from 'components/inputs'
import VideoPlayer from 'components/VideoPlayer'

export default function Left () {
  const [videoUrl, setVideoUrl] = useState<string>('/iW-Waifu.mp4')

  const handleOnFile = (url: string) => setVideoUrl(url)

  return (
    <div className="w-full">
      {
        videoUrl
          ? <VideoPlayer url={videoUrl} />
          : <SelectVideo onFile={handleOnFile} />
      }
    </div>
  )
}