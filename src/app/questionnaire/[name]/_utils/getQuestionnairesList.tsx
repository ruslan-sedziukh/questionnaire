import fs from 'fs/promises'
import path from 'path'

export const getQuestionnaireList = async (): Promise<string[]> => {
  const questionnairesPath = path.join(
    process.cwd(),
    'public',
    'questionnaires'
  )

  try {
    const files = await fs.readdir(questionnairesPath)

    // Filter out directories
    const fileList = files.filter(async (file) => {
      const filePath = path.join(questionnairesPath, file)
      const stats = await fs.stat(filePath)

      return stats.isFile()
    })

    const fileListWithoutExtension = fileList.map((file) => file.split('.')[0])

    return fileListWithoutExtension
  } catch (error) {
    console.error('Error reading questionnaire files:', error)

    return []
  }
}
