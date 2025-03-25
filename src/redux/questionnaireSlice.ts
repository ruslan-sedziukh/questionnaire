import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type QuestionnaireDataFieldValue = string | Date

export type QuestionnaireDataField = {
  value: QuestionnaireDataFieldValue
  heading: string
  text?: string
}

export type QuestionnaireData = {
  [field: string]: QuestionnaireDataField
}

export type QuestionnaireState = {
  [questionnaireName: string]: QuestionnaireData
}

const initialState: QuestionnaireState = {
  questionnaire: {},
}

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    updateAnswer: (
      state,
      action: PayloadAction<{
        questionnaireName: string
        field: string
        value: QuestionnaireDataFieldValue
        heading: string
        text?: string
      }>
    ) => {
      const { questionnaireName, value, heading, text, field } = action.payload

      if (!state[action.payload.questionnaireName]) {
        state[action.payload.questionnaireName] = {}
      }

      state[questionnaireName][field] = {
        value,
        heading,
        text,
      }
    },
    removeAnswer: (
      state,
      action: PayloadAction<{
        name: string
        field: string
      }>
    ) => {
      if (!state[action.payload.name]) {
        state[action.payload.name] = {}

        return
      }

      delete state[action.payload.name][action.payload.field]
    },
  },
})

export const { updateAnswer, removeAnswer } = questionnaireSlice.actions
export default questionnaireSlice.reducer
