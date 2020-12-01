import {lazy} from 'react'

export const routes: Array<Troutes> = [
  {
    path: '/',
    component: lazy(() => import('src/pages/Main')),
  },
]

export type Troutes = {
  path: string
  component?: any
  routes?: Array<Troutes>
  exact?: boolean
}
