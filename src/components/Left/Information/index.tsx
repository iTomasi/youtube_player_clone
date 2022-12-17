import Author from './Author'
import Likes from './Likes'
import type { IAuthor } from 'types'

interface Props {
  author: IAuthor
}

export default function Information ({
  author
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <Author {...author} />
      <Likes
        likes={10000}
      />
    </div>
  )
}