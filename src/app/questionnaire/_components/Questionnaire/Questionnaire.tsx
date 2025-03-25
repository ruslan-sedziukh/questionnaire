'use client'

import React, { useState } from 'react'
import {
  QuestionnaireConfig,
  isQuestionScreen,
  ScreenType,
  Screen as ScreenData,
} from '@/types/questionnaire'
import Screen from '../Screen'
import { useDispatch, useSelector } from 'react-redux'
import { removeAnswer, updateAnswer } from '@/redux/questionnaireSlice'
import { RootState } from '@/redux/store'
import { handleNextScreenError } from './utils'
import { getNextBranchName } from './utils'
import { getPrevScreen } from './utils'
import { HandleAnswer } from './types'
import Results from '../Results'

const INDEX_BRANCH = 'index'

type Props = {
  config: QuestionnaireConfig
}

const Questionnaire = ({ config }: Props) => {
  const { name } = config

  const [prevBranchNames, setPrevBranchNames] = useState<string[]>([])
  const [branchName, setBranchName] = useState(INDEX_BRANCH)
  const [screenIndex, setScreenIndex] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const dispatch = useDispatch()
  const questionnaireData = useSelector(
    (state: RootState) => state.questionnaire[name]
  )

  const branch = config.branch[branchName]
  const showPrevButton = screenIndex > 0 || prevBranchNames.length > 0
  const currentScreen = branch.screens[screenIndex]

  const handlePreviousScreen = () => {
    const prevBranchName = prevBranchNames[prevBranchNames.length - 1]
    const prevScreen = getPrevScreen({
      config,
      branchName,
      prevBranchName,
      screenIndex,
    })

    if (screenIndex > 0) {
      setScreenIndex((prev) => prev - 1)
    } else if (prevBranchName) {
      const prevBranch = config.branch[prevBranchName]

      setPrevBranchNames((prev) => prev.slice(0, prev.length - 1))
      setBranchName(prevBranchName)
      setScreenIndex(prevBranch.screens.length - 1)
    }

    if (prevScreen.screenType !== ScreenType.Info) {
      dispatch(removeAnswer({ name, field: prevScreen.field }))
    }
  }

  const switchToNextBranch = (
    screenData: ScreenData,
    nextBranchName: string | undefined
  ) => {
    if (!screenData.nextBranch && !branch.screens[screenIndex + 1]) {
      setShowResults(true)
    } else if (nextBranchName) {
      setPrevBranchNames((prev) => [...prev, branchName])
      setBranchName(nextBranchName)
      setScreenIndex(0)
    } else if (branch.screens[screenIndex + 1]) {
      setScreenIndex((prev) => prev + 1)
    } else {
      handleNextScreenError(branchName, screenIndex)
    }
  }

  const handleAnswer: HandleAnswer = ({
    screenData,
    value,
    heading,
    text,
    label,
  }) => {
    dispatch(
      updateAnswer({
        questionnaireName: name,
        field: screenData.field,
        value,
        heading,
        text,
        label,
      })
    )

    const nextBranchName = getNextBranchName(screenData, value)

    switchToNextBranch(screenData, nextBranchName)
  }

  const handleNext = () => {
    const questionnaireFields = Object.values(questionnaireData)
    const lastAnswer = questionnaireFields[questionnaireFields.length - 1].value
    const screen = branch.screens[screenIndex]

    const nextBranchName = getNextBranchName(screen, lastAnswer)

    switchToNextBranch(screen, nextBranchName)
  }

  if (showResults) {
    return <Results questionnaireData={questionnaireData} />
  }

  return isQuestionScreen(currentScreen) ? (
    <Screen
      screenType={currentScreen.screenType}
      screenData={currentScreen}
      onAnswer={handleAnswer}
      questionnaireData={questionnaireData}
      onPreviousScreen={handlePreviousScreen}
      showPreviousButton={showPrevButton}
    />
  ) : (
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
