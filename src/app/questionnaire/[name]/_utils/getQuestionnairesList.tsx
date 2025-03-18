import fs from 'fs/promises'
import path from 'path'

export async function getQuestionnaireFiles(): Promise<string[]> {
  const questionnairesPath = 'public/questionnaires'

  try {
    const files = await fs.readdir(questionnairesPath)

    // Filter out directories
    const fileList = files.filter(async (file) => {
      const filePath = path.join(questionnairesPath, file)
      const stats = await fs.stat(filePath)

      return stats.isFile()
    })

    return fileList
  } catch (error) {
    console.error('Error reading questionnaire files:', error)

    return []
  }
}
