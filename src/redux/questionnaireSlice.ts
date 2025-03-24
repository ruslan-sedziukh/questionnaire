import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type QuestionnaireDataField = string | Date

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
        name: string
        field: string
        value: QuestionnaireDataField
      }>
    ) => {
      if (!state[action.payload.name]) {
        state[action.payload.name] = {}
      }

      state[action.payload.name][action.payload.field] = action.payload.value
    },
  },
})

export const { updateAnswer } = questionnaireSlice.actions
export default questionnaireSlice.reducer
