import http from 'src/helpers/http'
import {HTTP_RESP} from 'src/typing'

export type TRemoteInfo = {
  host: string
  empPath: string
  declarationPath: string
  exposes: Record<string, string>
}

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

/**
 * 修改远程基站仓库
 */
export const remoteDetail = async (data: {empPath: string}): Promise<HTTP_RESP<TRemoteInfo>> =>
  http.get('/projects/remoteDetail', {params: data})

/**
 * 获取远端组件md
 */
export const remoteMdContent = async (data: {url: string}): Promise<HTTP_RESP<string>> =>
  http.get('/projects/remoteComponentMd', {params: data})
