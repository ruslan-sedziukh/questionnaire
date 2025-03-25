import { QuestionnaireData } from '@/redux/questionnaireSlice'
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
import { HandleAnswer } from '../Questionnaire/types'
import { ReactNode } from 'react'

type QuestionScreenProps = {
  screenType: QuestionScreenType
  screenData: QuestionScreen
  onAnswer: HandleAnswer
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

type Props = {
  render: {
    header: ReactNode
    heading: ReactNode
    text: ReactNode
    answer: ReactNode
  }
  variant: 'light' | 'dark'
}

const Screen = ({ render, variant }: Props) => {
  return (
    <div
      className={twJoin(
        'flex items-center font-open-sans flex-col gap-5 min-h-lvh p-4 min-w-fit',
        variant === 'dark'
          ? 'bg-linear-[175deg,#202261_0%,#543C97_55%,#6939A1_70%] text-[#FBFBFF]'
          : 'bg-[#FFF0F0] text-[#333333]'
      )}
    >
      {render.header}

      <div className="flex items-center font-open-sans flex-col gap-5 w-[330px]">
        {render.heading}

        {render.text}

        <div className="flex flex-col gap-5 w-full">{render.answer}</div>
      </div>
    </div>
  )
}

export default Screen
