import { QuestionnaireData } from '@/redux/questionnaireSlice'
import { getTextWithDynamicValues } from '@/utils/getTextWithDynamicValues'
import { twJoin } from 'tailwind-merge'

type Props = {
  text: string
  centered: boolean
}

const Heading = ({ text, centered = false }: Props) => {
  return (
    <h1
      className={twJoin(
        'inline font-bold text-2xl leading-7',
        centered && 'text-center'
      )}
    >
      {text}
    </h1>
  )
}

export default Heading
