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
  questions: Question[]
}

export type Branch = {
  index: BranchItem
  [key: string]: BranchItem
}

export type QuestionnaireConfig = {
  name: string
  branch: Branch
}
