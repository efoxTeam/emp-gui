import React from 'react'
import EMPApp from '@emp-antd/base/App'
import configStores from 'src/stores/config'
import {routes} from 'src/configs/router'

const App = () => (
  <>
    <EMPApp
      stores={configStores}
      routes={routes}
      titleInfo={{
        logo: 'https://setmefree.yy.com/Joyy.png',
        text: <>EMP UI</>,
      }}
      pageview={(location, useStore) => {
        // 路由更改的时候可以执行某些操作
        // console.log('ssss', location, useStore)
      }}
    />
  </>
)
export default App
