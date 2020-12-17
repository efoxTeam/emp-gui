import React from 'react'
import RouterComp from 'src/components/common/RouterComp'
import configStores from 'src/stores/config'
import {routes} from 'src/configs/router'
import ProjectListAction from 'src/components/ProjectListAction'
import 'antd/dist/antd.css'
import {StoreProvider} from './stores'

const App = () => {
  return (
    <StoreProvider stores={configStores}>
      <RouterComp
        routes={routes}
        titleInfo={{
          logo: 'https://setmefree.yy.com/Joyy.png',
          text: <ProjectListAction />,
        }}
        userProfile={null}
      />
    </StoreProvider>
  )
}
export default App
