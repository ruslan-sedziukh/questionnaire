'use client'

import React, { useState } from 'react'
import {
  QuestionnaireConfig,
  QuestionScreen,
  isQuestionScreen,
} from '@/types/questionnaire'
import Screen from '../Screen'
import { useDispatch, useSelector } from 'react-redux'
import {
  QuestionnaireDataField,
  updateAnswer,
} from '@/redux/questionnaireSlice'
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
    const handleAnswer = (
      screenData: QuestionScreen,
      value: QuestionnaireDataField
    ) => {
      dispatch(updateAnswer({ name, field: screenData.field, value }))

      const nextBranchName = getNextBranchName(screenData, value)

      if (nextBranchName) {
        setBranch(config.branch[nextBranchName])
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

  const handleNext = () => {
    if (currentScreen.nextBranch) {
      setBranch(config.branch[currentScreen.nextBranch])
      setScreenIndex(0)
    } else {
      setScreenIndex((prev) => prev + 1)
    }
  }

  return (
    <Screen
      screenType={currentScreen.screenType}
      screenData={currentScreen}
      questionnaireData={questionnaireData}
      onPreviousScreen={handlePreviousScreen}
      showPreviousButton={screenIndex > 0 || !!branch.prev}
      onNext={handleNext}
    />
  )
}

const getNextBranchName = (
  screenData: QuestionScreen,
  value: QuestionnaireDataField
): string | undefined => {
  const next = screenData.nextBranch

  if (next && typeof next === 'object' && typeof value === 'string') {
    return next[value]
  } else if (typeof next === 'string') {
    return next
  }

  return
}

export default Questionnaire
