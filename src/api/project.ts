import http from 'src/helpers/http'
import {HTTP_RESP} from 'src/typing'

export type TprojectList = {id: string; name: string; type: string; path: string}[]
export type TprojectListParam = {
  name?: string
  type?: string
  page: number
  pageSize: number
  id?: string
}
export type TProjectDedetail = {
  id: string
  name: string
  type: string
  path: string
  remotes: {alias: string; aliasUrl: string}[]
  exposes: Record<string, string>
}

/**
 * 获取已有模版
 */
export const getTemplates = (): Promise<HTTP_RESP<{type: string; repo: string}[]>> => http.get(`/projects/typeList`)

/**
 * 获取当前项目目录结构
 * @param path 当前路径
 */
export const getDirFileList = (data: {path: string}): Promise<HTTP_RESP<{dirs: string[]; path: string}>> =>
  http.get('/projects/readDir', {
    params: data,
  })

/**
 * 获取当前项目目录结构
 * @param path 当前路径
 */
export const openDir = (data: {path: string}): Promise<void> =>
  http.get('/projects/openDir', {
    params: data,
  })
/**
 * 创建项目
 * @param name 项目名称
 * @param type 模版
 * @param path 哪个路径创建
 */
export const addProject = (data: {name: string; type: string; path: string}): Promise<HTTP_RESP<{id: string}>> =>
  http.post('/projects/add', data)

/**
 * 获取项目详情
 * @param id 项目id
 */
export const getProjectInfo = (data: {id: string}): Promise<HTTP_RESP<TProjectDedetail>> =>
  http.get('/projects/detail', {
    params: data,
  })

export const getProjectList = (data: TprojectListParam): Promise<HTTP_RESP<{total: number; list: TprojectList}>> =>
  http.get('/projects/get', {
    params: data,
  })
