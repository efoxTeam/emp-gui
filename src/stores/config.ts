import {demoStore, TDemoStore} from 'src/stores/demo/demoStore'

const stores: {[key: string]: () => any} = {
  demoStore,
}
export type TconfigStore = {
  demoStore: TDemoStore
}
export default stores
