import { InfoScreen as InfoScreenData } from '@/types/questionnaire'
import { QuestionnaireData } from '@/redux/questionnaireSlice'
import Screen from '../Screen'
import Header from '../Screen/_components/Header'
import Heading from '../Screen/_components/Heading'
import Text from '../Screen/_components/Text'
import Button from '../Screen/_components/Button'
import { getTextWithDynamicValues } from '@/utils/getTextWithDynamicValues'

type Props = {
  screenData: InfoScreenData
  onPreviousScreen?: () => void
  showPreviousButton: boolean
  onNext: () => void
  questionnaireData: QuestionnaireData
}

const InfoScreen = ({
  screenData,
  showPreviousButton,
  onPreviousScreen,
  questionnaireData,
  onNext,
}: Props) => {
  const header = (
    <Header
      iconsVariant="white"
      showPreviousButton={showPreviousButton}
      onPreviousScreen={onPreviousScreen}
    />
  )

  const heading = (
    <Heading
      text={getTextWithDynamicValues(screenData.heading, questionnaireData)}
      centered={!!screenData.text}
    />
  )

  const text = screenData.text ? (
    <Text text={screenData.text} weight="light" size="sm" />
  ) : null

  const answer = (
    <Button type="next" onClick={onNext}>
      Next
    </Button>
  )

  return (
    <Screen
      render={{
        header,
        heading,
        text,
        answer,
      }}
      variant="dark"
    />
  )
}

export default InfoScreen
