// JSON TYPE
type JSONPrimitive = string | number | boolean | null
type JSONValue = JSONPrimitive | JSONObject | JSONArray
type JSONObject = {[member: string]: JSONValue}
type JSONArray = Array<JSONValue>

declare module '*.css' {
  const classes: {[key: string]: string}
  export default classes
}

declare module '*.scss' {
  const classes: {[key: string]: string}
  export default classes
}

declare module '*.sass' {
  const classes: {[key: string]: string}
  export default classes
}

declare module '*.less' {
  const classes: {[key: string]: string}
  export default classes
}

declare module '*.styl' {
  const classes: {[key: string]: string}
  export default classes
}

declare module 'qs'
