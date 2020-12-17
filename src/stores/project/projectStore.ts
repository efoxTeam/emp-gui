import http from 'src/helpers/http'
import {HTTP_RESP, Project} from 'src/typing'
import envStorage from 'src/helpers/envStorage'
import {getProjectInfo, getProjectList, getTemplates, TProjectDedetail} from 'src/api/project'

export const projectStore = () => {
  const templates: {type: string; repo: string}[] = []
  const projectInfo: TProjectDedetail = {
    id: '0',
    name: '',
    type: '',
    path: '',
    remotes: [],
    expose: [],
  }
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
    async getProjectInfo({id}: {id: string}) {
      const {code, data} = await getProjectInfo({id})
      if (code === 0) {
        this.setProjectInfo(data)
      }
      return data
    },
  }
}
export type TProjectStore = ReturnType<typeof projectStore>
