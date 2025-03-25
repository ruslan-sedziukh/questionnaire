import { ReactNode } from 'react'
import { twJoin } from 'tailwind-merge'

type Props = {
  onClick: () => void
  children: ReactNode
  type: 'option' | 'next'
}

const Button = ({ onClick, children, type }: Props) => {
  return (
    <button
      className={twJoin(
        'py-3 px-5 rounded-2xl h-16 text-sm font-normal cursor-pointer bg-[#FBFBFF] border-[1px] border-[#E0E0E0]  active:bg-linear-[180deg,#202261_15%,#543C97_50%,#6939A1] active:text-[#FBFBFF]',
        type === 'next' && 'text-[#6A3AA2]',
        type === 'next'
          ? 'shadow-[0px_4px_4px_#D8D6D640]'
          : 'shadow-[2px_2px_6px_#543C9740]'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
