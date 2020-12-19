import Item from 'antd/lib/list/Item'
import {FRONT_LOGO} from './constant'

export function getFrontLogo(name: string) {
  const keys = Object.keys(FRONT_LOGO).sort((a, b) => b.length - a.length)

  const target: any = keys.find(key => name.indexOf(key) !== -1)

  if (target) return (FRONT_LOGO as any)[target]
  return ''
}
