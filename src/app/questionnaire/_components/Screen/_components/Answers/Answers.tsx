import { QuestionScreen } from '@/types/questionnaire'
import Button from '../Button'
import { QuestionnaireDataField } from '@/redux/questionnaireSlice'

type Props = {
  screenData: QuestionScreen
  onAnswer: (screenData: QuestionScreen, value: QuestionnaireDataField) => void
}

const Answers = ({ screenData, onAnswer }: Props) => {
  return (
    <>
      {screenData.options.map((option) => (
        <Button
          key={option.value}
          type="option"
          onClick={() => onAnswer(screenData, option.value)}
        >
          {option.label}
        </Button>
      ))}
    </>
  )
}

export default Answers
