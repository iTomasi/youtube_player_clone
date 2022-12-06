import { useState } from 'react'

// Components
import { SelectVideo } from 'components/inputs'
import VideoPlayer from 'components/VideoPlayer'
import Information from './Information'

export default function Left () {
  const [videoUrl, setVideoUrl] = useState<string>('')

  const handleOnFile = (url: string) => setVideoUrl(url)

  return (
    <div className="w-full flex flex-col gap-3">
      {
        videoUrl
          ? <VideoPlayer url={videoUrl} />
          : <SelectVideo onFile={handleOnFile} />
      }

      <h1 className="text-xl">Youtube video player clone</h1>

      <Information/>
    </div>
  )
}