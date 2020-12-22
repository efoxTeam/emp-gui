import http from 'src/helpers/http'
import {HTTP_RESP} from 'src/typing'

/**
 * 添加远程基站仓库
 */
export const addRemote = async (data: {
  id: string
  path: string
  projectName: string
  alias: string
}): Promise<HTTP_RESP<any>> => http.post('/projects/addRemote', data)
/**
 * 修改远程基站仓库
 */
export const updateRemote = async (data: {
  id: string
  path: string
  projectName: string
  alias: string
  updateAlias: string
}): Promise<HTTP_RESP<any>> => http.post('/projects/updateRemote', data)
