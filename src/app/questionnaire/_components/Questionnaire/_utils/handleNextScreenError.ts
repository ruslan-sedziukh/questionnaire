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
