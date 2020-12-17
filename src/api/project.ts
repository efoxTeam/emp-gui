import http from 'src/helpers/http'
import {HTTP_RESP} from 'src/typing'

/**
 * 获取已有模版
 */
export const getTemplates = (): Promise<HTTP_RESP<{type: string; repo: string}[]>> => http.get(`/projects/typeList`)

/**
 * 获取当前项目目录结构
 * @param path 当前路径
 */
export const getDirFileList = (data: {path: string}): Promise<{dirs: string[]; path: string}> =>
  http.get('/projects/readDir', {
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
