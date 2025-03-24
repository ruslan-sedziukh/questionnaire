'use client'

import React, { useState } from 'react'
import {
  QuestionnaireConfig,
  QuestionScreen,
  isQuestionScreen,
} from '@/types/questionnaire'
import Screen from '../Screen'
import { useDispatch, useSelector } from 'react-redux'
import { updateAnswer } from '@/redux/questionnaireSlice'
import { RootState } from '@/redux/store'

type Props = {
  config: QuestionnaireConfig
}

const Questionnaire = ({ config }: Props) => {
  const { name } = config

  const [branch, setBranch] = useState(config.branch.index)
  const [screenIndex, setScreenIndex] = useState(0)

  const dispatch = useDispatch()
  const questionnaireData = useSelector(
    (state: RootState) => state.questionnaire[name]
  )

  const handlePreviousScreen = () => {
    const prevBranchName = branch.prev

    if (screenIndex > -0) {
      setScreenIndex((prev) => prev - 1)
    } else if (prevBranchName) {
      const prevBranch = config.branch[prevBranchName]

      setBranch(prevBranch)
      setScreenIndex(prevBranch.screens.length - 1)
    }
  }

  const currentScreen = branch.screens[screenIndex]

  if (isQuestionScreen(currentScreen)) {
    const handleAnswer = (screenData: QuestionScreen, value: string) => {
      dispatch(updateAnswer({ name, field: screenData.field, value }))

      if (screenData.next) {
        setBranch(config.branch[screenData.next[value]])
        setScreenIndex(0)
      } else if (branch.screens[screenIndex + 1]) {
        setScreenIndex((prev) => prev + 1)
      }
    }

    return (
      <Screen
        screenType={currentScreen.screenType}
        screenData={currentScreen}
        onAnswer={handleAnswer}
        questionnaireData={questionnaireData}
        onPreviousScreen={handlePreviousScreen}
        showPreviousButton={screenIndex > 0 || !!branch.prev}
      />
    )
  }

  return (
    <Screen
      screenType={currentScreen.screenType}
      screenData={currentScreen}
      questionnaireData={questionnaireData}
      onPreviousScreen={handlePreviousScreen}
      showPreviousButton={screenIndex > 0 || !!branch.prev}
    />
  )
}

export default Questionnaire
