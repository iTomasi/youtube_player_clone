import Author from './Author'
import Likes from './Likes'

export default function Information () {
  return (
    <div className="flex justify-between items-center">
      <Author/>
      <Likes
        likes={10000}
      />
    </div>
  )
}