import http from 'src/helpers/http'

export const demoStore = () => {
  return {
    async getDemoinfo({id}: {id: number}) {
      const {data} = await http.get(`/demo/search/${id}`)
      return data
    },
    async setDemoInfo({id, name}: {id: number; name: string}) {
      const {data} = await http.post('/demo/alert', {
        id,
        name,
      })
      return data
    },
  }
}
export type TDemoStore = ReturnType<typeof demoStore>
