import {demoStore, TDemoStore} from 'src/stores/demo/demoStore'
import {projectStore, TProjectStore} from 'src/stores/project/projectStore'
import {remoteStore, TRemoteStore} from 'src/stores/remote'
import {StoresType} from 'src/types'

export type TconfigStore = {
  // demoStore: TDemoStore
  projectStore: TProjectStore
  remoteStore: TRemoteStore
}
const stores: StoresType = {
  // demoStore,
  projectStore,
  remoteStore,
}
export default stores
