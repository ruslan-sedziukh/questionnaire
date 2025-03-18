import fs from 'fs/promises'
import path from 'path'

async function readTestFile(questionnaire: string): Promise<string | null> {
  const filePath = path.join(`public/questionnaires/${questionnaire}`)

  try {
    const fileContent = await fs.readFile(filePath, 'utf8')

    return fileContent
  } catch (error) {
    console.error('Error reading file:', error)

    return null
  }
}

export async function getFileContent(questionnaire: string): Promise<string> {
  const fileContent = await readTestFile(questionnaire)

  return fileContent ?? ''
}
