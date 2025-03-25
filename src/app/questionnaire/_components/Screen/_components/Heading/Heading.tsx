import { QuestionnaireData } from '@/redux/questionnaireSlice'
import { getTextWithDynamicValues } from '@/utils/getTextWithDynamicValues'
import { twJoin } from 'tailwind-merge'

type Props = {
  questionnaireData: QuestionnaireData
  text: string
  centered: boolean
}

const Heading = ({ questionnaireData, text, centered = false }: Props) => {
  return (
    <h1
      className={twJoin(
        'inline font-bold text-2xl leading-7',
        centered && 'text-center'
      )}
    >
      {getTextWithDynamicValues(text, questionnaireData)}
    </h1>
  )
}

export default Heading
