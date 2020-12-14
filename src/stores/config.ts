import {demoStore, TDemoStore} from 'src/stores/demo/demoStore'
import {projectStore, TProjectStore} from 'src/stores/project/projectStore'
import {StoresType} from './index'

export type TconfigStore = {
  // demoStore: TDemoStore
  projectStore: TProjectStore
}
const stores: StoresType = {
  // demoStore,
  projectStore,
}
export default stores
