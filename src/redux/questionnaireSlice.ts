import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type QuestionnaireState = {
  [name: string]: {
    [field: string]: string
  }
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
      action: PayloadAction<{ name: string; field: string; value: string }>
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
