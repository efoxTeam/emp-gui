export {Project} from './project'

export type HTTP_RESP<T> = {
  code: number
  data: T
  msg: string
}
