import http from 'src/helpers/http'
import {HTTP_RESP, Project} from 'src/typing'
import envStorage from 'src/helpers/envStorage'
import {getTemplates} from 'src/api/project'
export type TprojectList = {id: number; name: string; type: string; path: string}[]
export type TprojectListParam = {
  name?: string
  type?: string
  page: number
  pageSize: number
  id?: string
}
export const projectStore = () => {
  const templates: {type: string; repo: string}[] = []
  const projectInfo: any = {}
  return {
    templates,
    projectInfo,
    setProjectInfo(val: any) {
      envStorage.set('prodId', val.id)
      this.projectInfo = val
    },
    async getTemplates() {
      const {data} = await getTemplates()
      console.log(data)
      if (Array.isArray(data)) {
        this.templates = data
      }
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
  }
}
export type TProjectStore = ReturnType<typeof projectStore>
