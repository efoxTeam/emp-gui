import React, {useState} from 'react'
import EMPApp from '@emp-antd/base/App'
import configStores from 'src/stores/config'
import {routes} from 'src/configs/router'
import CardList from 'src/components/CardList'
import CreateProject from 'src/components/createProject'
import {Dropdown, Card, Avatar, Button} from 'antd'
import 'antd/dist/antd.css'
import {StoreProvider} from './stores'
const {Meta} = Card
const PROJECTS = [
  {
    id: 1,
    name: 'react-base',
    type: 'react-base',
    img:
      'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
    description: '描述',
    fullPath: '/User/project/react-base',
  },
  {
    id: 2,
    name: 'vue-base',
    type: 'vue-base',
    img: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png',
    description: '描述',
    fullPath: '/Users/project/vue-base',
  },
]
const App = () => {
  const [createProjectShow, createProjectShowAction] = useState(false)

  return (
    <StoreProvider>
      <EMPApp
        stores={configStores}
        routes={routes}
        titleInfo={{
          logo: 'https://setmefree.yy.com/Joyy.png',
          text: (
            <Dropdown
              overlay={
                <div style={{width: '400px'}}>
                  <CardList
                    list={PROJECTS}
                    nextPage={() => {}}
                    span={24}
                    page={1}
                    pageSize={10}
                    count={2}
                    paginationOpt={{showSizeChanger: false}}
                    // pagination={null}
                    paginationJustify={'end'}
                    cardDom={item => (
                      <Card style={{margin: '0 0 10px'}}>
                        <Meta
                          avatar={<Avatar src={item.img} />}
                          title={item.name}
                          description={`地址：${item.fullPath}`}
                        />
                      </Card>
                    )}
                    footer={
                      <div style={{flex: 1}}>
                        <Button type="primary" onClick={() => createProjectShowAction(true)}>
                          创建项目
                        </Button>
                      </div>
                    }
                  />
                </div>
              }
              trigger={['click']}
              placement="topRight">
              {/* <Button color="#fff" type="link">
              react-base
            </Button> */}
              <a style={{color: '#fff'}} href="javascript:;">
                react-base
              </a>
            </Dropdown>
          ),
        }}
        userProfile={null}
      />

      {/*  */}
      <CreateProject visible={createProjectShow} onClose={() => createProjectShowAction(false)} />
    </StoreProvider>
  )
}
export default App
