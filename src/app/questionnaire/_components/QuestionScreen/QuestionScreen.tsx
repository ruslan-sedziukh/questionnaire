import { QuestionScreen as QuestionScreenData } from '@/types/questionnaire'
import { HandleAnswer } from '../Questionnaire/types'
import { QuestionnaireData } from '@/redux/questionnaireSlice'
import Screen from '../Screen'
import Header from '../Screen/_components/Header'
import Heading from '../Screen/_components/Heading'
import Text from '../Screen/_components/Text'
import Answers from '../Screen/_components/Answers'

type Props = {
  screenData: QuestionScreenData
  onAnswer: HandleAnswer
  questionnaireData: QuestionnaireData
  onPreviousScreen?: () => void
  showPreviousButton: boolean
}

const QuestionScreen = ({
  screenData,
  showPreviousButton,
  onPreviousScreen,
  questionnaireData,
  onAnswer,
}: Props) => {
  const header = (
    <Header
      iconsVariant="black"
      showPreviousButton={showPreviousButton}
      onPreviousScreen={onPreviousScreen}
    />
  )

  const heading = (
    <Heading
      text={screenData.heading}
      centered={!!screenData.text}
      questionnaireData={questionnaireData}
    />
  )

  const text = screenData.text ? (
    <Text text={screenData.text} weight="bold" size="lg" />
  ) : null

  const answer = <Answers screenData={screenData} onAnswer={onAnswer} />

  return (
    <Screen
      render={{
        header,
        heading,
        text,
        answer,
      }}
      variant="light"
    />
  )
}

export default QuestionScreen
