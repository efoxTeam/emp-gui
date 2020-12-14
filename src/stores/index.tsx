import React, {createContext, useContext} from 'react'
import {useLocalStore} from 'mobx-react-lite'
import configStores, {TconfigStore} from 'src/stores/config'

export interface StoresType {
  [key: string]: (...args: any) => any
}

type TstoreProviderProps = {
  children: React.ReactNode
  stores?: StoresType
}
//
const StoreContext = createContext<TconfigStore>({} as TconfigStore)
// StoreProvider
export const StoreProvider = ({children, stores}: TstoreProviderProps) => {
  const Stores: any = {}
  for (const k in configStores) {
    Stores[k] = useLocalStore(configStores[k])
  }
  // remote store
  for (const k in stores) {
    Stores[k] = useLocalStore(stores[k])
  }
  return <StoreContext.Provider value={Stores}>{children}</StoreContext.Provider>
}
// Store hook
export const useStores: () => TconfigStore = () => {
  const stores = useContext(StoreContext)
  if (!stores) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return stores
}
