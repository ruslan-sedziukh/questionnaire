export type Option = {
  value: string
  label: string
}

export enum ScreenType {
  Info = 'info',
  SelectOne = 'selectOne',
}

export type QuestionScreenType = ScreenType.SelectOne

type ScreenBasic<T extends ScreenType> = {
  screenType: T
  next?: {
    [branchName: string]: string
  }
}

type QuestionBasic = {
  field: string
  heading: string
}

export type SelectOneScreen = {
  options: Option[]
} & ScreenBasic<ScreenType.SelectOne> &
  QuestionBasic

export type InfoScreen = {
  screenType: ScreenType.Info
  heading: string
  text: string
} & ScreenBasic<ScreenType.Info>

export type QuestionScreen = SelectOneScreen

export const isQuestionScreen = (screen: Screen): screen is QuestionScreen => {
  if (screen.screenType === ScreenType.SelectOne) {
    return true
  }

  return false
}

export type Screen = QuestionScreen | InfoScreen

export type BranchItem = {
  prev?: string
  screens: Screen[]
}

export type Branch = {
  [name: string]: BranchItem
}

export type QuestionnaireConfig = {
  name: string
  branch: Branch
}
