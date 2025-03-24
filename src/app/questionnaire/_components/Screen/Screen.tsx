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
import Image from 'next/image'
import { twJoin } from 'tailwind-merge'
import Button from './_components/Button'

type Props =
  | {
      screenType: QuestionScreenType
      screenData: QuestionScreen
      onAnswer: (
        screenData: QuestionScreen,
        value: QuestionnaireDataField
      ) => void
      onNext?: undefined
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
      onNext: () => void
      questionnaireData: QuestionnaireData
    }

const Screen = ({
  screenType,
  screenData,
  onAnswer,
  onNext,
  questionnaireData,
  onPreviousScreen,
  showPreviousButton,
}: Props) => {
  return (
    <div
      className={twJoin(
        'flex items-center font-open-sans flex-col gap-5  min-h-lvh p-4 min-w-fit',
        screenType === ScreenType.Info
          ? 'bg-linear-[175deg,#202261_0%,#543C97_55%,#6939A1_70%] text-[#FBFBFF]'
          : 'bg-[#FFF0F0] text-[#333333]'
      )}
    >
      <header className="relative flex justify-center w-full max-w-5xl">
        {showPreviousButton && (
          <Image
            className="absolute left-0 cursor-pointer"
            src={
              screenType === ScreenType.Info
                ? '/chevron_white.svg'
                : '/chevron_black.svg'
            }
            width={24}
            height={24}
            alt="chevron"
            onClick={onPreviousScreen}
          />
        )}

        <Image
          src={
            screenType === ScreenType.Info
              ? '/logo_white.svg'
              : '/logo_black.svg'
          }
          width={24}
          height={24}
          alt="logo"
        />
      </header>

      <div className="flex items-center font-open-sans flex-col gap-5 w-[330px]">
        <h1
          className={twJoin(
            'inline font-bold text-2xl leading-7',
            screenType === ScreenType.Info && 'justify-center'
          )}
        >
          {getTextWithDynamicValues(screenData.heading, questionnaireData)}
        </h1>

        {screenType === ScreenType.Info && (
          <div className="text-[#FBFBFF] text-center text-sm font-light">
            {screenData.text}
          </div>
        )}

        <div className="flex flex-col gap-5 w-full">
          {screenType !== ScreenType.Info &&
            screenData.options.map((option) => (
              <Button
                key={option.value}
                type="option"
                onClick={() => onAnswer(screenData, option.value)}
              >
                {option.label}
              </Button>
            ))}

          {screenType === ScreenType.Info && (
            <>
              <Button type="next" onClick={onNext}>
                Next
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Screen
