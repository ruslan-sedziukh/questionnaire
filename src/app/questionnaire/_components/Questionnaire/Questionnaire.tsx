'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { QuestionnaireConfig } from '@/types/questionnaire'

type Props = {
  config: QuestionnaireConfig
}

const Questionnaire = ({ config }: Props) => {
  const currentScreen = useSelector(
    (state: RootState) => state.questionnaire.currentScreen
  )

  return (
    <div>
      <h1>Current Screen: {currentScreen}</h1>
      <p>{JSON.stringify(config)}</p>
    </div>
  )
}

export default Questionnaire
