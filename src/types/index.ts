import {MenuProps} from 'antd/lib/menu'

// 头部目录
export type TmenuItem = {
  path: string
  name: string
  langKey?: string
}
export type RoutesType = {
  path?: string
  component?: any
  name?: string
  url?: string
  icon?: any
  routes?: RoutesType[]
  langKey?: string
  hide?: boolean //是否不在菜单可见
  role?: string // 权限管理
  group?: RoutesType[] // 分组
  withoutLayout?: boolean // 路由是否有框架
}
export interface TLayoutProps {
  children?: React.ReactNode
  routes?: RoutesType[]
  headerMenu?: TmenuItem[]
  headerChildren?: React.ReactNode
  userProfile?: React.ReactNode
  layoutOptions?: TLayoutOptions
  footerText?: React.ReactText
  titleInfo?: TitleInfo
  aside?: React.ReactNode
  menuOptions?: MenuProps
  header?: React.ReactNode
  footer?: React.ReactNode
  titleBox?: React.ReactNode
  menuClick?: (e: any, history: any) => any
  // withoutLayout?: boolean
}
export interface RouterCompType extends TLayoutProps {
  layout?: 'FixSlideLayout' | 'MarginLayout' | React.ReactNode
  stores?: StoresType
  pageview?: <T>(d: T, s: T) => any
}
export type TCrumb = {
  rootname?: string
  forceShow?: boolean
}

export type TitleInfo = {
  logo?: string
  link?: (() => void) | string
  text?: React.ReactNode
}
export declare type Theme = 'light' | 'dark'
export type TLayoutOptions = {
  crumb?: TCrumb
  theme?: Theme
}
export interface StoresType {
  [key: string]: (...args: any) => any
}
