import {
  QuestionnaireData,
  QuestionnaireDataField,
} from '@/redux/questionnaireSlice'
import {
  InfoScreen,
  QuestionScreen,
  QuestionScreenType,
  ScreenType,
} from '@/types/questionnaire'
import { getTextWithDynamicValues } from '@/utils/getTextWithDynamicValues'
import { twJoin } from 'tailwind-merge'
import Button from './_components/Button'
import Header from './_components/Header'
import Answers from './_components/Answers'

type QuestionScreenProps = {
  screenType: QuestionScreenType
  screenData: QuestionScreen
  onAnswer: (screenData: QuestionScreen, value: QuestionnaireDataField) => void
  onNext?: undefined
  questionnaireData: QuestionnaireData
  onPreviousScreen?: () => void
  showPreviousButton: boolean
}

type InfoScreenProps = {
  screenType: ScreenType.Info
  screenData: InfoScreen
  onPreviousScreen?: () => void
  showPreviousButton: boolean
  onAnswer?: undefined
  onNext: () => void
  questionnaireData: QuestionnaireData
}

type Props = QuestionScreenProps | InfoScreenProps

const Screen = ({
  screenType,
  screenData,
  onAnswer,
  onNext,
  questionnaireData,
  onPreviousScreen,
  showPreviousButton,
}: Props) => {
  const isInfoScreen = screenType === ScreenType.Info

  return (
    <div
      className={twJoin(
        'flex items-center font-open-sans flex-col gap-5  min-h-lvh p-4 min-w-fit',
        isInfoScreen
          ? 'bg-linear-[175deg,#202261_0%,#543C97_55%,#6939A1_70%] text-[#FBFBFF]'
          : 'bg-[#FFF0F0] text-[#333333]'
      )}
    >
      <Header
        screenType={screenType}
        showPreviousButton={showPreviousButton}
        onPreviousScreen={onPreviousScreen}
      />

      <div className="flex items-center font-open-sans flex-col gap-5 w-[330px]">
        <h1
          className={twJoin(
            'inline font-bold text-2xl leading-7',
            isInfoScreen && 'justify-center'
          )}
        >
          {getTextWithDynamicValues(screenData.heading, questionnaireData)}
        </h1>

        {isInfoScreen && (
          <div className="text-center text-sm font-light">
            {screenData.text}
          </div>
        )}

        <div className="flex flex-col gap-5 w-full">
          {isInfoScreen ? (
            <Button type="next" onClick={onNext}>
              Next
            </Button>
          ) : (
            <Answers screenData={screenData} onAnswer={onAnswer} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Screen
