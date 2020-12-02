import {demoStore, TDemoStore} from 'src/stores/demo/demoStore'
import {projectStore, TProjectStore} from 'src/stores/project/projectStore'

const stores: {[key: string]: () => any} = {
  demoStore,
  projectStore,
}
export type TconfigStore = {
  demoStore: TDemoStore
  projectStore: TProjectStore
}
export default stores
