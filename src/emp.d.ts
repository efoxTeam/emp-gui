/*
 * @Author: zhangjianping3
 * @Date: 2020-08-24 17:01:07
 * @LastEditors: zhangjianping3
 * @LastEditTime: 2020-09-12 19:22:02
 */
// JSON TYPE
type JSONPrimitive = string | number | boolean | null
type JSONValue = JSONPrimitive | JSONObject | JSONArray
type JSONObject = {[member: string]: JSONValue}
type JSONArray = Array<JSONValue>

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.less' {
  const content: any
  export default content
}

declare module 'classnames'

declare interface PromiseConstructor {
  retry(
    promiseFunc: (...args: any[]) => any,
    num?: number,
    ...args: any[]
  ): Promise<{status: 'fulfilled' | 'rejected'; value?: any; reason?: any}>
}

// import picture
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.scss'
declare module '*.less'
