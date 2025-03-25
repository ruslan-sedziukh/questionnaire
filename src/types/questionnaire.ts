export type Option = {
  value: string
  label: string
}

export enum ScreenType {
  Info = 'info',
  SelectOne = 'selectOne',
}

type ScreenBasic<T extends ScreenType> = {
  screenType: T
  nextBranch?:
    | string
    | {
        [optionValue: string]: string
      }
  heading: string
  text: string
}

type QuestionScreenBasic = {
  field: string
}

export type SelectOneScreen = {
  options: Option[]
  nextBranch?: {
    [optionValue: string]: string
  }
} & ScreenBasic<ScreenType.SelectOne> &
  QuestionScreenBasic

export type InfoScreen = {
  screenType: ScreenType.Info
  heading: string
  text: string
} & ScreenBasic<ScreenType.Info>

export type QuestionScreen = SelectOneScreen
export type QuestionScreenType = QuestionScreen['screenType']

export const isQuestionScreen = (screen: Screen): screen is QuestionScreen => {
  if (screen.screenType === ScreenType.SelectOne) {
    return true
  }

  return false
}

export type Screen = QuestionScreen | InfoScreen

export type BranchItem = {
  name: string
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
