import Card from './Card'

// Config
import { videosSuggested } from 'config'

export default function VideosList () {
  return (
    <div>
      {
        videosSuggested.map((video, index) => (
          <Card
            key={index}
            {...video}
          />
        ))
      }
    </div>
  )
}