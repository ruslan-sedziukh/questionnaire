import { QuestionnaireDataField } from '@/redux/questionnaireSlice'
import { QuestionnaireConfig, Screen } from '@/types/questionnaire'
import { handleError } from '@/utils/handleError'

export const handleNextScreenError = (
  branchName: string,
  screenIndex: number
) => {
  handleError(
    'An unexpected error occurred. Please try again later.',
    `Error with branch "${branchName}". Could not proceed to next from screen ${screenIndex}.`
  )
}

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

export const getPrevScreen = ({
  config,
  screenIndex,
  prevBranchName,
  branchName,
}: {
  config: QuestionnaireConfig
  screenIndex: number
  prevBranchName: string
  branchName: string
}) => {
  if (screenIndex > 0) {
    return config.branch[branchName].screens[screenIndex - 1]
  }

  const prevBranch = config.branch[prevBranchName]
  const lastPrevBranchScreenIndex = prevBranch.screens.length - 1

  return prevBranch.screens[lastPrevBranchScreenIndex]
}
