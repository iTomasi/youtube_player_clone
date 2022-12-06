import type { MouseEventHandler } from 'react'

interface Props {
  onClick: MouseEventHandler,
  icon: any,
}

export default function Button ({ onClick, icon: Icon }: Props) {
  return (
    <button
      className="h-12 w-12 flex justify-center items-center"
      type="button"
      onClick={onClick}
    >
      <Icon
        className="w-7 h-7"
      />
    </button>
  )
}