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
      userProfile={null}
    />
  </>
)
export default App
