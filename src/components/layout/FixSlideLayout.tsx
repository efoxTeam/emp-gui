import {Col, Layout, Row} from 'antd'
import {useHistory} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import RouteMenu from 'src/components/common/RouteMenu'
import LogoBox from 'src/components/layout/LogoBox'
import './FixSlideLayout.less'
import {TLayoutProps} from 'src/types'
import {observer} from 'mobx-react-lite'
const {Header, Footer} = Layout
const {Content, Sider} = Layout

const FixSlideLayout = (props: TLayoutProps) => {
  const routes = props.routes || []
  const theme = props.layoutOptions?.theme
  const history = useHistory()
  const {titleBox, aside} = props
  const {pathname} = history.location
  const selectKey = [pathname]
  const [openKey, setOpenKey] = useState<string[]>(props.menuOptions?.defaultOpenKeys || [])
  const [withoutLayout, setWithoutLayout] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const TitleBox: any = titleBox || LogoBox

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
    <Layout className={`light`}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme={'light'} className={`AsideSider`}>
        <TitleBox theme={'light'} titleInfo={props.titleInfo} />
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
        <Header className={`fixlayout-header light`}></Header>
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
  )
}

export default observer(FixSlideLayout)
