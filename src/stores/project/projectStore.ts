import http from 'src/helpers/http'
import {Project} from 'src/typing'
import envStorage from 'src/helpers/envStorage'
export type TprojectList = {id: number; name: string; type: string; path: string}[]
export type TprojectListParam = {
  name?: string
  type?: string
  page: number
  pageSize: number
  id?: string
}
export const projectStore = () => {
  const templates: {id: number; name: string}[] = []
  const projectInfo: any = {}
  return {
    templates,
    projectInfo,
    setProjectInfo(val: any) {
      envStorage.set('prodId', val.id)
      this.projectInfo = val
    },
    async getTemplates(): Promise<{id: number; name: string}[]> {
      const {data} = await http.get(`/projects/templates`).catch(err => err)
      this.templates = [
        {id: 1, name: 'react-base'},
        {id: 2, name: 'vue-base'},
      ]
      return data
    },
    async getProjects() {
      const {data} = await http.get(`/projects/get`)
      return data
    },
    async searchProjects({
      id,
      name,
      template,
      technologyType,
    }: {
      id?: string
      name?: string
      template?: string
      technologyType?: string
    }) {
      const {data} = await http.get(`/project/search`, {
        params: {
          id,
          name,
          template,
          technologyType,
        },
      })
      return data
    },
    async getProjectList(info: TprojectListParam): Promise<{total: number; list: TprojectList}> {
      const {data} = await http.get('/projects/get', {
        params: info,
      })
      return data.data
    },
    async addProject(projects: {name: string; type: string; path: string}): Promise<any> {
      const {data} = await http.post('/project/add', {
        projects,
      })
      return data
    },
    async delProject({id}: {id: number}): Promise<any> {
      const {data} = await http.post('/project/del', {
        id,
      })
      return data
    },
    async alterProject({id, content}: {id: string; content: Partial<Project>}): Promise<any> {
      const {data} = await http.post('/project/alter', {
        id,
        content,
      })
      return data
    },
    async getProjectInfo({
      id,
    }: {
      id: number
    }): Promise<{
      id: number
      name: string
      type: string
      path: string
      remote: Record<string, string>
      expose: Record<string, string>
    }> {
      const {data} = await http.get('/project/get', {
        params: {id},
      })
      return data
    },
    async getDirFileList({path}: {path: string}): Promise<{dirs: string[]; path: string}> {
      const {data} = await http
        .get('/projects/readDir', {
          params: {path},
        })
        .catch(err => err)
      return data
    },
  }
}
export type TProjectStore = ReturnType<typeof projectStore>
