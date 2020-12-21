import React from 'react'
import RouterComp from 'src/components/common/RouterComp'
import configStores from 'src/stores/config'
import {routes} from 'src/configs/router'
import ProjectListAction from 'src/components/ProjectListAction'
import 'antd/dist/antd.css'
import {StoreProvider, useStores} from './stores'
import {observer, useObserver} from 'mobx-react-lite'

const LogoComp = observer(() => {
  const {name} = useStores().projectStore.projectInfo

  return useObserver(() => (
    <span style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{name || '暂无项目'}</span>
  ))
})

const App = () => {
  return (
    <StoreProvider stores={configStores}>
      <RouterComp
        routes={routes}
        titleInfo={{
          logo: require('src/assets/img/efox.png'),
          text: <LogoComp />,
          link: location.href,
        }}
        userProfile={null}
      />
    </StoreProvider>
  )
}
export default App
