import React from 'react'
import {Menu} from 'antd'
import {MenuProps} from 'antd/lib/menu'
import {SubMenuProps} from 'antd/lib/menu/SubMenu'
import {RoutesType} from 'src/types'
import {useHistory} from 'react-router-dom'
import {useStores} from 'src/stores'
import {useObserver} from 'mobx-react-lite'

const {SubMenu} = Menu

export type TRouteMenu = {
  options: MenuProps
  routes?: RoutesType[]
  topMenuOptions?: SubMenuProps
}

export const IconName = ({route}: {route: RoutesType}) => {
  const {langStore} = useStores()
  return useObserver(() => (
    <span>
      {route.icon && route.icon.render()}
      <span>{(route.langKey && langStore?.$menu && langStore.$menu[route.langKey]) || route.name}</span>
    </span>
  ))
}

const createContent = ({routes, isShow}: {routes: RoutesType[]; isShow: (r: RoutesType) => boolean}) => {
  const {langStore} = useStores()
  const list = routes.filter(r => isShow(r))
  return useObserver(
    () =>
      list.length &&
      list.map(d => {
        const subRoutes = d?.routes?.filter(r => isShow(r)) || []
        if (subRoutes.length) {
          return (
            <SubMenu key={d.url || d.path} title={<IconName route={d} />}>
              {subRoutes.map(s => {
                const group = s?.group?.filter(r => isShow(r)) || []
                return group.length ? (
                  <Menu.ItemGroup key={s.url || s.path} title={<IconName route={s} />}>
                    {group.map(g => (
                      <Menu.Item key={g.url || g.path}>
                        <IconName route={g} />
                      </Menu.Item>
                    ))}
                  </Menu.ItemGroup>
                ) : (
                  createContent({routes: s.routes || [s], isShow})
                )
              })}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={d.url || d.path}>
              <IconName route={d} />
            </Menu.Item>
          )
        }
      }),
  )
}

const RouteMenu = (props: TRouteMenu) => {
  const history = useHistory()
  const {userStore} = useStores()
  const {routes = [], options = {}, topMenuOptions} = props
  const menuOptions = Object.assign(
    {},
    {
      defaultSelectedKeys: [history.location.pathname],
    },
    options,
  )
  const isShow = (route: RoutesType) => {
    const {hide, role} = route
    return !hide && ((role && userStore?.permission.includes(role)) || !role)
  }
  return (
    <Menu {...menuOptions}>
      {(topMenuOptions && <SubMenu {...topMenuOptions}>{createContent({routes, isShow})}</SubMenu>) ||
        createContent({routes, isShow})}
    </Menu>
  )
}

export default RouteMenu
