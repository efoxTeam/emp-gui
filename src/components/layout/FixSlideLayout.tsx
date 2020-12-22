import {Col, Layout, Row, Button} from 'antd'
import {useHistory} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import RouteMenu from 'src/components/common/RouteMenu'
import LogoBox from 'src/components/layout/LogoBox'
import style from './FixSlideLayout.module.scss'
import {TLayoutProps} from 'src/types'
import {observer} from 'mobx-react-lite'
import ProjectListAction from 'src/components/ProjectListAction'
import CreateProject from 'src/components/CreateProject'
const {Header, Footer} = Layout
const {Content, Sider} = Layout

const FixSlideLayout = (props: TLayoutProps) => {
  const routes = props.routes || []
  const history = useHistory()
  const {pathname} = history.location
  const selectKey = [pathname]
  const [openKey, setOpenKey] = useState<string[]>(props.menuOptions?.defaultOpenKeys || [])
  const [withoutLayout, setWithoutLayout] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [showCreateProject, showCreateProjectAction] = useState(false) // useStores().projectStore

  useEffect(() => {
    setOpenKey([...openKey, ...[`/${pathname.split('/')[1]}`]])
    const t = routes.findIndex(element => {
      return element.path === history.location.pathname && element.withoutLayout
    })
    setWithoutLayout(t >= 0)
  }, [history.location.pathname])

  return withoutLayout ? (
    <>{props.children}</>
  ) : (
    <>
      <CreateProject visible={showCreateProject} onClose={() => showCreateProjectAction(false)} />
      <Layout className={`light`}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme={'light'} className={style.AsideSider}>
          <LogoBox titleInfo={props.titleInfo} />
          <RouteMenu
            options={{
              theme: 'light',
              onClick: e => {
                history.push(e.key.toString())
              },
              mode: 'inline',
              openKeys: openKey,
              defaultSelectedKeys: selectKey,
              ...props.menuOptions,
            }}
            routes={routes}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{background: '#fff'}}>
            <ProjectListAction />
            <Button type="primary" style={{marginLeft: '20px'}} onClick={() => showCreateProjectAction(true)}>
              创建项目
            </Button>
          </Header>
          <Content style={{margin: '24px', overflow: 'initial'}}>
            <div>{props.children}</div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: '#fff',
              color: 'rgba(0, 0, 0, 0.65)',
            }}>
            ©2020 Created by Efox EMP Micro FE
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default observer(FixSlideLayout)
