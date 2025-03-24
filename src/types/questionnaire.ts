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
  next?: {
    [branchName: string]: string
  }
}

export type SelectOneScreen = {
  field: string
  heading: string
  options: Option[]
} & ScreenBasic<ScreenType.SelectOne>

export type InfoScreen = {
  screenType: ScreenType.Info
  heading: string
  text: string
} & ScreenBasic<ScreenType.Info>

export type Screen = SelectOneScreen | InfoScreen

export type BranchItem = {
  prev?: string
  screens: Screen[]
}

export type Branch = {
  [key: string]: BranchItem
}

export type QuestionnaireConfig = {
  name: string
  branch: Branch
}
