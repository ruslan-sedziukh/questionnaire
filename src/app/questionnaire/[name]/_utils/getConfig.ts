import { QuestionnaireConfig } from '@/types/questionnaire'
import fs from 'fs/promises'
import path from 'path'

async function readJsonConfig(
  name: string
): Promise<QuestionnaireConfig | null> {
  try {
    const absolutePath = path.join(
      process.cwd(),
      'public',
      'questionnaires',
      `${name}.json`
    )
    const fileContent = await fs.readFile(absolutePath, 'utf8')
    const jsonObject = JSON.parse(fileContent)

    return jsonObject
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error)

    return null
  }
}

export const getConfig = async (
  questionnaire: string
): Promise<QuestionnaireConfig | null> => {
  const fileContent = await readJsonConfig(questionnaire)

  return fileContent ?? null
}
