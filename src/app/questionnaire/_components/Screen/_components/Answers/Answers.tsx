import { QuestionScreen } from '@/types/questionnaire'
import Button from '../Button'
import { HandleAnswer } from '../../../Questionnaire/types'

type Props = {
  screenData: QuestionScreen
  onAnswer: HandleAnswer
}

const Answers = ({ screenData, onAnswer }: Props) => {
  return (
    <>
      {screenData.options.map((option) => {
        const { heading, text } = screenData

        return (
          <Button
            key={option.value}
            type="option"
            onClick={() =>
              onAnswer({
                screenData,
                value: option.value,
                heading,
                text,
                label: option.label,
              })
            }
          >
            {option.label}
          </Button>
        )
      })}
    </>
  )
}

export default Answers
