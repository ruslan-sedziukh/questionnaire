import fs from 'fs/promises'
import path from 'path'
import { questionnairesPath } from './questionnairesPath'

const checkIfEntryIsJSON = async (
  folderPath: string,
  entryName: string
): Promise<boolean> => {
  const entryPath = path.join(folderPath, entryName)
  const stats = await fs.stat(entryPath)

  const isFile = stats.isFile()
  const isJSON = entryName.split('.')[1] === 'json'

  return isFile && isJSON
}

const getEntryNameWithoutFormat = (entryName: string) => entryName.split('.')[0]

export const getPreBuildPagesNames = async (): Promise<string[]> => {
  const entryNames = await fs.readdir(questionnairesPath)

  const files = []

  for (const entryName of entryNames) {
    const isJSON = await checkIfEntryIsJSON(questionnairesPath, entryName)

    if (isJSON) {
      files.push(getEntryNameWithoutFormat(entryName))
    }
  }

  return files
}
