'use client'

import React, { useState } from 'react'
import { Question, QuestionnaireConfig } from '@/types/questionnaire'
import Screen from '../Screen'
import { useDispatch } from 'react-redux'
import { updateAnswer } from '@/redux/questionnaireSlice'

type Props = {
  config: QuestionnaireConfig
}

const Questionnaire = ({ config }: Props) => {
  const { name } = config
  const [branch, setBranch] = useState(config.branch.index)
  const [questionIndex, setQuestionIndex] = useState(0)
  const dispatch = useDispatch()

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

  return (
    <Screen
      question={branch.questions[questionIndex]}
      onAnswer={handleAnswer}
    />
  )
}

export default Questionnaire
