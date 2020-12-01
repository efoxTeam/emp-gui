import React, {useContext} from 'react'
import {useLocalStore} from 'mobx-react-lite'
import configStores, {TconfigStore} from 'src/stores/config'

const storeContext = React.createContext<TconfigStore | null>(null)
type storeProviderPropsType = {
  children: React.ReactNode
}
export const StoreProvider = ({children}: storeProviderPropsType) => {
  const Stores: TconfigStore | any = {}
  for (const k in configStores) {
    Stores[k] = useLocalStore(configStores[k]) // eslint-disable-line
  }
  return <storeContext.Provider value={Stores}>{children}</storeContext.Provider>
}

export const useStores = () => {
  const stores = useContext(storeContext)
  if (!stores) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return stores
}
