import Questionnaire from '../_components/Questionnaire'
import { getFileContent } from './_utils/getFileContent'
import { getQuestionnaireFiles } from './_utils/getQuestionnairesList'

export async function generateStaticParams() {
  const questionnaires = await getQuestionnaireFiles()

  const params = questionnaires.map((questionnaire) => ({
    name: questionnaire,
  }))

  return params
}

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const fileContent = await getFileContent(name)

  return <Questionnaire config={fileContent} />
}
