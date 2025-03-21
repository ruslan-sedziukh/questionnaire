'use client'

import React, { useState } from 'react'
import { ScreenData, QuestionnaireConfig } from '@/types/questionnaire'
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
  const [questionIndex, setQuestionIndex] = useState(0)
  const dispatch = useDispatch()
  const questionnaireData = useSelector(
    (state: RootState) => state.questionnaire[name]
  )

  const handleAnswer = (screenData: ScreenData, value: string) => {
    dispatch(updateAnswer({ name, field: screenData.field, value }))

    // Set next screen
    if (screenData.next) {
      setBranch(config.branch[screenData.next[value]])
      setQuestionIndex(0)
    } else if (branch.screens[questionIndex + 1]) {
      setQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    const prevBranchName = branch.prev

    if (questionIndex > -0) {
      setQuestionIndex((prev) => prev - 1)
    } else if (prevBranchName) {
      const prevBranch = config.branch[prevBranchName]

      setBranch(prevBranch)
      setQuestionIndex(prevBranch.screens.length - 1)
    }
  }

  return (
    <Screen
      screenData={branch.screens[questionIndex]}
      onAnswer={handleAnswer}
      questionnaireData={questionnaireData}
      onPreviousScreen={handlePreviousQuestion}
      showPreviousButton={questionIndex > 0 || !!branch.prev}
    />
  )
}

export default Questionnaire
