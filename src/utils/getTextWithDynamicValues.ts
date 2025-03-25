import { QuestionnaireData } from '@/redux/questionnaireSlice'

/**
 * Takes a string with placeholders representing dynamic values from a data object and replaces them with the corresponding values.
 *
 * @param text - string with dynamic values placeholders
 * @param questionnaireData - questionnaire data
 * @returns string with dynamic values instead of placeholders
 */
export const getTextWithDynamicValues = (
  text: string,
  questionnaireData: QuestionnaireData
): string => {
  let replacedText = text

  const placeholders = text.match(/\{([^}]+)\}/g)

  if (placeholders) {
    placeholders.forEach((placeholder) => {
      let fieldName = placeholder.slice(1, -1)
      let replacementValue = ''
      let uppercase = false

      // Check if the field name first letter is uppercase
      if (fieldName === capitalizeFirstLetter(fieldName)) {
        uppercase = true
        // Convert to lowercase for data lookup
        fieldName = lowerCaseFirstLetter(fieldName)
      }

      // Check for conditional mapping
      if (fieldName.includes(':')) {
        const [dataField, mapping] = fieldName.split(':')

        if (questionnaireData.hasOwnProperty(dataField)) {
          const [condition, replacement] = mapping.split('=')

          if (questionnaireData[dataField] === condition) {
            replacementValue = replacement
          }
        }
      } else if (questionnaireData.hasOwnProperty(fieldName)) {
        // Convert to string in case Data or other type of fiend was used
        replacementValue = String(questionnaireData[fieldName])
      }

      // Apply uppercase transformation if needed
      if (uppercase && replacementValue) {
        replacementValue = capitalizeFirstLetter(replacementValue)
      }

      replacedText = replacedText.replace(placeholder, replacementValue)
    })
  }

  const replacedTextWithoutDuplicatedSpaces = replacedText.replace(
    / +(?= )/g,
    ''
  )

  return replacedTextWithoutDuplicatedSpaces
}

const capitalizeFirstLetter = (str: string) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1)
}

const lowerCaseFirstLetter = (str: string) => {
  return String(str).charAt(0).toLowerCase() + String(str).slice(1)
}
