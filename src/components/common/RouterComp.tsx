import React, {Suspense} from 'react'
import {Route, BrowserRouter as Router, Switch, RouteProps} from 'react-router-dom'
import FixSlideLayout from 'src/components/layout/FixSlideLayout'
import LoadingComp from './LoadingComp'
import P404Comp from './P404Comp'
import {useObserver} from 'mobx-react-lite'
import {RoutesType, RouterCompType} from 'src/types'
import {useStores} from 'src/stores'
import Main from 'src/pages/Main'
////////////////
let routes: RoutesType[] = []
// 返回 component 的模型使用
type PrivateRouteProps = RouteProps & {role?: string}
function PrivateRoute({component: Component, role, ...rest}: PrivateRouteProps) {
  return useObserver(() => (
    <Route
      {...rest}
      render={props => {
        return Component ? <Component {...props} /> : null
      }}
    />
  ))
}
const RoutersComp = () => {
  const {projectStore} = useStores()
  return useObserver(() => (
    <>
      {routes.length > 0 && projectStore.projectInfo.id ? (
        routes.map((route, i) => {
          return route.path === '/' ? (
            <PrivateRoute role={route.role} exact path="/" key={i} component={route.component} />
          ) : (
            <RouteWithSubRoutes key={i} {...route} />
          )
        })
      ) : (
        <Main />
      )}
    </>
  ))
}
const SwitchMainRouter = () => {
  return (
    <Switch>
      <RoutersComp />
      <Route>
        <P404Comp />
      </Route>
    </Switch>
  )
}

export default function RouterComp(props: RouterCompType) {
  const LayoutMap: Record<string, any> = {
    FixSlideLayout: FixSlideLayout,
  }
  const {layout = 'FixSlideLayout'} = props
  const Layout = typeof layout === 'string' ? LayoutMap[layout] || LayoutMap['FixSlideLayout'] : layout
  routes = props?.routes || routes || []
  return (
    <Router>
      <Layout {...props} routes={routes}>
        <Suspense fallback={<LoadingComp />}>
          <SwitchMainRouter />
        </Suspense>
      </Layout>
    </Router>
  )
}
// route.componen 403配置
type PrivateRouteComponentProps = {
  props: any
  route: RoutesType
}
const PrivateRouteComponent = ({props, route}: PrivateRouteComponentProps) => {
  return useObserver(() => <route.component {...props} routes={route.routes} />)
}
//
const RouteWithSubRoutes = (route: RoutesType) =>
  (route.component && (
    <Route exact path={route.path} render={props => <PrivateRouteComponent props={props} route={route} />} />
  )) || <SwitchRouter routes={route.group ? route.group : route.routes} />

export const SwitchRouter = ({routes}: {routes?: RoutesType[]}) => {
  return (
    <Switch>
      {routes && routes.length > 0 && routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>
  )
}
