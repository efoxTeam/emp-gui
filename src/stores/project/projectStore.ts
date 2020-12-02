import http from 'src/helpers/http'
import {Project} from 'src/typing'

export const projectStore = () => {
  return {
    async getProjects() {
      const {data} = await http.get(`/projects`)
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
    async addProject(projects: Project[]) {
      const {data} = await http.post('/project/add', {
        projects,
      })
      return data
    },
    async delProject({id}: {id: string}) {
      const {data} = await http.post('/project/del', {
        id,
      })
      return data
    },
    async alterProject({id, content}: {id: string; content: Partial<Project>}) {
      const {data} = await http.post('/project/alter', {
        id,
        content,
      })
      return data
    },
  }
}
export type TProjectStore = ReturnType<typeof projectStore>
