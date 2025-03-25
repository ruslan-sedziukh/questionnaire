import { QuestionnaireDataFieldValue } from '@/redux/questionnaireSlice'
import { QuestionScreen } from '@/types/questionnaire'

export type HandleAnswer = ({
  screenData,
  value,
  heading,
  text,
}: {
  screenData: QuestionScreen
  value: QuestionnaireDataFieldValue
  heading: string
  text?: string
}) => void
