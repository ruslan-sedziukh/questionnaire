'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const Questionnaire = ({ config }: { config: string }) => {
  const currentScreen = useSelector(
    (state: RootState) => state.questionnaire.currentScreen
  )

  return (
    <div>
      <h1>Current Screen: {currentScreen}</h1>
      <p>{config}</p>
    </div>
  )
}

export default Questionnaire
