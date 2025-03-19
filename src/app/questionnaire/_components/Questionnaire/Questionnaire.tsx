'use client'

import React, { useState } from 'react'
import { Question, QuestionnaireConfig } from '@/types/questionnaire'
import Screen from '../Screen'

type Props = {
  config: QuestionnaireConfig
}

const Questionnaire = ({ config }: Props) => {
  const [currentScreen, setScreen] = useState(config.branch.index.questions[0])

  const handleAnswer = (question: Question, value: string) => {
    // TODO: Add answer to the store
    // Set next screen
  }

  return <Screen question={currentScreen} />
}

export default Questionnaire
