import type { ReactNode, MouseEventHandler } from 'react'

interface Props {
  className?: string,
  type?: 'submit' | 'button' | 'link',
  href?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  children: ReactNode,
  color?: 'primary',
  target?: '_blank' | '_self'
}

const theClassName = 'rounded-full px-4 py-2 flex justify-center items-center'
const colors = {
  primary: 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
}

export default function Button ({
  className = '',
  type = 'submit',
  href = '#',
  onClick,
  children,
  color = 'primary',
  target = '_self'
}: Props) {
  if (type === 'link' && onClick) throw new Error(`<Button type="${type}" /> can not use onClick prop`)
  else if (type !== 'link' && href !== '#') throw new Error(`<Button type="${type}"/> can not use href prop`)
  else if (type !== 'link' && target !== '_self') throw new Error(`<Button type="${type}"/> can not use target prop`)

  if (type === 'link') {
    return (
      <a
        className={`${theClassName} ${colors[color]} ${className}`}
        href={href}
        target={target}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={`${theClassName} ${colors[color]} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}