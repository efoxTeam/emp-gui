import React, {Suspense} from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import LoadingComp from 'src/components/LoadingComp'
import P404Comp from 'src/components/P404Comp'
import {routes, Troutes} from 'src/configs/router'

const RoutersComp = () => routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)

const SwitchMainRouter = () => {
  return (
    <Switch>
      {RoutersComp()}
      <Route>
        <P404Comp />
      </Route>
    </Switch>
  )
}

const RouterComp = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingComp />}>
        <SwitchMainRouter />
      </Suspense>
    </Router>
  )
}
export default RouterComp

const RouteWithSubRoutes = (route: Troutes) => {
  return (
    (route.component && (
      <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
    )) || <SwitchRouter routes={route.routes} />
  )
}

export const SwitchRouter = ({routes}: {routes?: Array<Troutes>}) => {
  return (
    <Switch>
      {routes && routes.length > 0 && routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>
  )
}
