import { twJoin } from 'tailwind-merge'

type Props = {
  text: string
  weight: 'light' | 'bold'
  size: 'sm' | 'lg'
}

const Text = ({ text, weight, size }: Props) => {
  return (
    <div
      className={twJoin(
        'text-center',

        weight === 'light' ? 'font-light' : 'font-bold',
        size === 'sm' ? 'text-sm' : 'text-lg'
      )}
    >
      {text}
    </div>
  )
}

export default Text
