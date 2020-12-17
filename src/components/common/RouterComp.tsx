import React, {Suspense, useEffect} from 'react'
import {Route, BrowserRouter as Router, Switch, useLocation, RouteProps} from 'react-router-dom'
// import MarginLayout from 'src/components/layout/MarginLayout'
import FixSlideLayout from 'src/components/layout/FixSlideLayout'
import LoadingComp from './LoadingComp'
import P404Comp from './P404Comp'
import P403Comp from './P403Comp'
import {useObserver} from 'mobx-react-lite'
import {RoutesType, RouterCompType} from 'src/types'
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

const IsFinishRoleLoading = ({userStore}: {userStore: any}) =>
  userStore.permissionIsLoad === true ? <P403Comp /> : <LoadingComp />

const RoutersComp = () => {
  return (
    <>
      {routes.length > 0 &&
        routes.map((route, i) => {
          return route.path === '/' ? (
            <PrivateRoute role={route.role} exact path="/" key={i} component={route.component} />
          ) : (
            <RouteWithSubRoutes key={i} {...route} />
          )
        })}
    </>
  )
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
    // <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
    <Route exact path={route.path} render={props => <PrivateRouteComponent props={props} route={route} />} />
  )) || <SwitchRouter routes={route.group ? route.group : route.routes} />

export const SwitchRouter = ({routes}: {routes?: RoutesType[]}) => {
  return (
    <Switch>
      {routes && routes.length > 0 && routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>
  )
}
