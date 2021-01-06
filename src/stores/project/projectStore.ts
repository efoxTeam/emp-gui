import http from 'src/helpers/http'
import {HTTP_RESP, Project} from 'src/typing'
import envStorage from 'src/helpers/envStorage'
import {getProjectInfo, getProjectList, getTemplates, TProjectDedetail} from 'src/api/project'
import {message} from 'antd'

const initProjectInfo = {
  id: envStorage.get('prodId') !== 'undefined' ? envStorage.get('prodId') : '',
  name: '',
  type: '',
  path: '',
  remotes: [],
  exposes: {},
}

export const projectStore = () => {
  const templates: {type: string; repo: string}[] = []
  const projectInfo: TProjectDedetail = JSON.parse(JSON.stringify(initProjectInfo))
  return {
    templates,
    projectInfo,
    showCreateProject: false,
    showCreateProjectAction(is: boolean) {
      this.showCreateProject = is
    },
    setProjectInfo(val: any) {
      envStorage.set('prodId', val.id)
      this.projectInfo = {
        ...initProjectInfo,
        ...val,
      }
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
      try {
        const {code, data} = await getProjectInfo({id})
        if (code === 0) {
          this.setProjectInfo(data)
        }
        return data
      } catch (response) {
        message.error(response?.data?.msg || '请求出错')
      }
    },
  }
}
export type TProjectStore = ReturnType<typeof projectStore>
