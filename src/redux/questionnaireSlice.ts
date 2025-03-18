import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type QuestionnaireState = {
  currentScreen: number
  answers: { [questionId: string]: string }
}

const initialState: QuestionnaireState = {
  currentScreen: 0,
  answers: {},
}

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    updateAnswer: (
      state,
      action: PayloadAction<{ questionId: string; value: string }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.value
    },
    nextScreen: (state) => {
      state.currentScreen += 1
    },
  },
})

export const { updateAnswer, nextScreen } = questionnaireSlice.actions
export default questionnaireSlice.reducer
