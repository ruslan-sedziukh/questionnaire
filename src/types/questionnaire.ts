export type Option = {
  value: string
  label: string
}

export type ScreenData = {
  field: string
  text: string
  options: Option[]
  next?: {
    [key: string]: string
  }
}

export type BranchItem = {
  prev?: string
  screens: ScreenData[]
}

export type Branch = {
  [key: string]: BranchItem
}

export type QuestionnaireConfig = {
  name: string
  branch: Branch
}
