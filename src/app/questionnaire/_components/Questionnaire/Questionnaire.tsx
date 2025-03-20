'use client'

import React, { useState } from 'react'
import { Question, QuestionnaireConfig } from '@/types/questionnaire'
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

  const handleAnswer = (question: Question, value: string) => {
    dispatch(updateAnswer({ name, field: question.field, value }))

    // Set next screen
    if (question.next) {
      setBranch(config.branch[question.next[value]])
      setQuestionIndex(0)
    } else if (branch.questions[questionIndex + 1]) {
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
      setQuestionIndex(prevBranch.questions.length - 1)
    }
  }

  return (
    <Screen
      question={branch.questions[questionIndex]}
      onAnswer={handleAnswer}
      questionnaireData={questionnaireData}
      onPreviousQuestion={handlePreviousQuestion}
      showPreviousButton={questionIndex > 0 || !!branch.prev}
    />
  )
}

export default Questionnaire
