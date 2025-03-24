import { QuestionnaireData } from '@/redux/questionnaireSlice'
import {
  InfoScreen,
  QuestionScreen,
  QuestionScreenType,
  ScreenType,
} from '@/types/questionnaire'
import { getTextWithDynamicValues } from '@/utils/getTextWithDynamicValues'
import Image from 'next/image'

type Props =
  | {
      screenType: QuestionScreenType
      screenData: QuestionScreen
      onAnswer: (screenData: QuestionScreen, value: string) => void
      questionnaireData: QuestionnaireData
      onPreviousScreen?: () => void
      showPreviousButton: boolean
    }
  | {
      screenType: ScreenType.Info
      screenData: InfoScreen
      onPreviousScreen?: () => void
      showPreviousButton: boolean
      onAnswer?: undefined
      questionnaireData: QuestionnaireData
    }

const Screen = ({
  screenType,
  screenData,
  onAnswer,
  questionnaireData,
  onPreviousScreen,
  showPreviousButton,
}: Props) => {
  return (
    <div className="flex items-center font-open-sans flex-col gap-5 bg-[#FFF0F0] min-h-lvh p-4 min-w-fit">
      <header className="relative flex justify-center w-full max-w-5xl">
        {showPreviousButton && (
          <Image
            className="absolute left-0 cursor-pointer"
            src="/chevron.svg"
            width={24}
            height={24}
            alt="chevron"
            onClick={onPreviousScreen}
          />
        )}

        <Image src="/logo_black.svg" width={24} height={24} alt="logo" />
      </header>

      <h1 className="inline font-bold text-2xl leading-7 w-[330px]">
        {getTextWithDynamicValues(screenData.heading, questionnaireData)}
      </h1>

      <div className="flex flex-col gap-5 w-[330px]">
        {screenType !== ScreenType.Info &&
          screenData.options.map((option) => (
            <button
              className="
                py-3 px-5 rounded-2xl h-16 text-sm font-normal cursor-pointer
              bg-[#EAEEF7] border-[1px] border-[#E0E0E0] shadow-[2px_2px_6px_#543C9740] 
                active:bg-linear-[180deg,#202261_15%,#543C97_50%,#6939A1] active:text-[#FBFBFF]
              "
              key={option.value}
              onClick={() => onAnswer(screenData, option.value)}
            >
              {option.label}
            </button>
          ))}
      </div>
    </div>
  )
}

export default Screen
