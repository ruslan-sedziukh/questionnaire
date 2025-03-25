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
import { handleNextScreenError } from './_utils/handleNextScreenError'
import { getNextBranchName } from './_utils/getNextBranchName'

const INDEX_BRANCH = 'index'

type Props = {
  config: QuestionnaireConfig
}

const Questionnaire = ({ config }: Props) => {
  const { name } = config

  const [prevBranchNames, setPrevBranchNames] = useState<string[]>([])
  const [branchName, setBranchName] = useState(INDEX_BRANCH)
  const [screenIndex, setScreenIndex] = useState(0)

  const dispatch = useDispatch()
  const questionnaireData = useSelector(
    (state: RootState) => state.questionnaire[name]
  )

  const branch = config.branch[branchName]
  const showPrevButton = screenIndex > 0 || prevBranchNames.length > 0
  const currentScreen = branch.screens[screenIndex]

  const handlePreviousScreen = () => {
    const prevBranchName = prevBranchNames[prevBranchNames.length - 1]

    if (screenIndex > 0) {
      setScreenIndex((prev) => prev - 1)
    } else if (prevBranchName) {
      const prevBranch = config.branch[prevBranchName]

      setPrevBranchNames((prev) => prev.slice(0, prev.length - 1))
      setBranchName(prevBranchName)
      setScreenIndex(prevBranch.screens.length - 1)
    }
  }

  if (isQuestionScreen(currentScreen)) {
    const handleAnswer = (
      screenData: QuestionScreen,
      value: QuestionnaireDataField
    ) => {
      dispatch(updateAnswer({ name, field: screenData.field, value }))

      const nextBranchName = getNextBranchName(screenData, value)

      if (nextBranchName) {
        setPrevBranchNames((prev) => [...prev, branchName])
        setBranchName(nextBranchName)
        setScreenIndex(0)
      } else if (branch.screens[screenIndex + 1]) {
        setScreenIndex((prev) => prev + 1)
      } else {
        handleNextScreenError(branchName, screenIndex)
      }
    }

    return (
      <Screen
        screenType={currentScreen.screenType}
        screenData={currentScreen}
        onAnswer={handleAnswer}
        questionnaireData={questionnaireData}
        onPreviousScreen={handlePreviousScreen}
        showPreviousButton={showPrevButton}
      />
    )
  }

  const handleNext = () => {
    if (currentScreen.nextBranch) {
      const keys = Object.keys(questionnaireData)
      const lastAnswer = questionnaireData[keys[keys.length - 1]]
      const screen = branch.screens[screenIndex]

      const nextBranchName = getNextBranchName(screen, lastAnswer)

      if (nextBranchName) {
        setPrevBranchNames((prev) => [...prev, branchName])
        setBranchName(nextBranchName)
        setScreenIndex(0)
      } else {
        handleNextScreenError(branchName, screenIndex)
      }
    } else if (branch.screens[screenIndex + 1]) {
      setScreenIndex((prev) => prev + 1)
    } else {
      handleNextScreenError(branchName, screenIndex)
    }
  }

  return (
    <Screen
      screenType={currentScreen.screenType}
      screenData={currentScreen}
      questionnaireData={questionnaireData}
      onPreviousScreen={handlePreviousScreen}
      showPreviousButton={showPrevButton}
      onNext={handleNext}
    />
  )
}

export default Questionnaire
