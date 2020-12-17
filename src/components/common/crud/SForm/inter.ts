import {ButtonProps, ButtonShape, ButtonType} from 'antd/lib/button'
import {InputProps, GroupProps, SearchProps, TextAreaProps, PasswordProps} from 'antd/lib/input'
import {RadioGroupProps, RadioChangeEvent} from 'antd/lib/radio/interface'
import {UploadProps} from 'antd/lib/upload'
import {FormProps, Rule, FormItemProps as FormItemProp} from 'antd/lib/form'
import {FormInstance} from 'antd/lib/form'
import {DatePickerProps} from 'antd/lib/date-picker'
import {TimePickerProps} from 'antd/lib/time-picker'
import {AutoCompleteProps} from 'antd/lib/auto-complete'

import {InputNumberProps} from 'antd/lib/input-number'
import {SelectProps} from 'rc-select/lib/'
declare const ButtonHTMLTypes: ['submit', 'button', 'reset']
export declare type ButtonHTMLType = typeof ButtonHTMLTypes[number]
export type SelectFormData = {
  value: React.ReactText
  label: React.ReactNode
  disabled?: boolean
}
export type RadioFormData = {
  value: React.ReactText
  label: React.ReactNode
  disabled?: boolean
}
export type renderForm = {
  disFormItem: boolean
}
export type textForm = {
  style?: any
  className: string
}
export type selectMultipleProps = {
  mode?: string
  defaultValue?: any
  value?: any
}
export interface ButtonGroupData {
  value: React.ReactText
  label: string
  options?: ButtonProps | ButtonShape | ButtonType
  onClick?: ((e: React.MouseEvent) => void) | undefined
  htmlType?: ButtonHTMLType
}
export type FormItemOptionsType =
  | RadioGroupProps
  | RadioGroupProps
  | InputProps
  | GroupProps
  | SearchProps
  | TextAreaProps
  | PasswordProps
  | renderForm
  | textForm
  | selectMultipleProps
  | DatePickerProps
  | TimePickerProps
  | UploadProps
  // | SliderProps
  | InputNumberProps
  | SelectProps
  | undefined
  | AutoCompleteProps
export interface FormItemProps {
  type: string
  label: string
  name?: string
  rules?: Rule[]
  render?: JSX.Element | any
  children?: JSX.Element | React.ReactNode | any
  placeholder?: string
  col?: number
  options?: FormItemOptionsType
  formItemOptions?: FormItemProp
  data?: SelectFormData[] | RadioFormData[] | ButtonGroupData[] | string | number | undefined
  onChange?: ((e: RadioChangeEvent | React.MouseEvent) => void) | undefined
  onSelect?: ((e: RadioChangeEvent | React.MouseEvent) => void) | undefined
  onClick?: ((e: React.MouseEvent) => void) | undefined
}
export interface SFormProps extends Partial<FormProps> {
  dataRef?: React.RefObject<FormInstance>
  options?: FormProps
  onFinish?: ((values: any) => void) | undefined
  onFinishFailed?: ((values: any) => void) | undefined
  items: FormItemProps[]
}
