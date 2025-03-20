export type QuestionOption = {
  value: string
  label: string
}

export type Question = {
  field: string
  text: string
  options: QuestionOption[]
  next?: {
    [key: string]: string
  }
}

export type BranchItem = {
  prev?: string
  questions: Question[]
}

export type Branch = {
  [key: string]: BranchItem
}

export type QuestionnaireConfig = {
  name: string
  branch: Branch
}
