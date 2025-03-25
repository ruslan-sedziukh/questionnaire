import { QuestionnaireDataFieldValue } from '@/redux/questionnaireSlice'
import { QuestionScreen } from '@/types/questionnaire'

export type HandleAnswer = ({
  screenData,
  value,
  heading,
  text,
  label,
}: {
  screenData: QuestionScreen
  value: QuestionnaireDataFieldValue
  heading: string
  text?: string
  label: string
}) => void
