import Questionnaire from '../_components/Questionnaire'
import { getConfig } from './_utils/getConfig'
import { getPreBuildPagesNames } from './_utils/getQuestionnairesList'

export async function generateStaticParams() {
  const preBuildPageNames = await getPreBuildPagesNames()

  const paramsWithDynamicSegments = preBuildPageNames.map((name) => ({ name }))

  return paramsWithDynamicSegments
}

const Page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params
  const config = await getConfig(name)

  // TODO: Add config validation

  return config ? <Questionnaire config={config} /> : <div>Error</div>
}

export default Page
