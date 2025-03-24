import { QuestionnaireConfig } from '@/types/questionnaire'
import fs from 'fs/promises'
import path from 'path'
import { questionnairesPath } from './questionnairesPath'

async function getConfigFromJSON(name: string): Promise<QuestionnaireConfig> {
  const absolutePath = path.join(questionnairesPath, `${name}.json`)

  const jsonString = await fs.readFile(absolutePath, 'utf8')

  return JSON.parse(jsonString)
}

export const getConfig = async (
  questionnaire: string
): Promise<QuestionnaireConfig | null> => {
  let config = null

  try {
    config = await getConfigFromJSON(questionnaire)
  } catch (e) {
    console.error(e)
  }

  return config
}
