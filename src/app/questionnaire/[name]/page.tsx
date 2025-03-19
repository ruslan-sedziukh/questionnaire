import Questionnaire from '../_components/Questionnaire'
import { getConfig } from './_utils/getConfig'
import { getQuestionnaireList } from './_utils/getQuestionnairesList'

export async function generateStaticParams() {
  const questionnaires = await getQuestionnaireList()

  const params = questionnaires.map((questionnaire) => ({
    name: questionnaire,
  }))

  return params
}

const Page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params
  const fileContent = await getConfig(name)

  const error = <div>Error</div>

  const content = fileContent ? <Questionnaire config={fileContent} /> : error

  return content
}

export default Page
