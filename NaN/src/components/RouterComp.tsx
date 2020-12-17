import React, {useEffect, Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom'
import Hello from 'src/page/Hello'
import {RouterCompProps, SwitchRouterProps} from 'src/types'

export default function RouterComp(props: RouterCompProps) {
  return (
    <Router>
      <Suspense fallback={props?.fallback ?? null}>
        <SwitchRouter
          routes={
            props?.routes ?? [
              {
                path: '/',
                component: Hello,
              },
            ]
          }
          onChange={props?.onChange}
        />
      </Suspense>
    </Router>
  )
}

export const SwitchRouter = ({routes, onChange}: SwitchRouterProps) => {
  const location = useLocation()

  useEffect(() => {
    onChange?.()
  }, [location])
  return (
    <Switch>
      {routes &&
        routes?.length > 0 &&
        routes.map((route, i) => (route?.component ? <Route key={i} {...route} /> : null))}
    </Switch>
  )
}
