import { QuestionnaireDataField } from '@/redux/questionnaireSlice'
import { Screen } from '@/types/questionnaire'

export const getNextBranchName = (
  screenData: Screen,
  value: QuestionnaireDataField
): string | undefined => {
  const next = screenData.nextBranch

  if (next && typeof next === 'object' && typeof value === 'string') {
    return next[value]
  } else if (typeof next === 'string') {
    return next
  }

  return
}
