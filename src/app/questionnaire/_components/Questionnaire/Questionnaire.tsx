'use client'

import React, { useState } from 'react'
import { Question, QuestionnaireConfig } from '@/types/questionnaire'
import Screen from '../Screen'

type Props = {
  config: QuestionnaireConfig
}

const Questionnaire = ({ config }: Props) => {
  const [branch, setBranch] = useState(config.branch.index)
  const [questionIndex, setQuestionIndex] = useState(0)

  const handleAnswer = (question: Question, value: string) => {
    // TODO: Add answer to the store

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
