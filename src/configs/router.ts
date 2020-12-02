import {RoutesType} from '@emp-antd/base/types'
import {lazy} from 'react'

export const routes: Array<RoutesType> = [
  {
    path: '/',
    name: '主页',
    component: lazy(() => import('src/pages/Main')),
    withoutLayout: true,
  },
  {
    path: '/projects', // 项目列表
    component: lazy(() => import('src/pages/Project/list')),
  },
  {
    path: '/project/add', // 项目新建
    component: lazy(() => import('src/pages/Project/add')),
  },
  {
    path: '/project/detail/:projectid', // 项目详情
    component: lazy(() => import('src/pages/Project/detail')),
  },
  {
    path: '/remotes/:projectid', // 基站列表
    component: lazy(() => import('src/pages/Remotes/list')),
  },
  {
    path: '/remotes/:projectid/:remoteid/', // 基站详情
    component: lazy(() => import('src/pages/Remotes/detail')),
  },
  {
    path: '/remotes/:projectid/add', // 新建基站
    component: lazy(() => import('src/pages/Remotes/add')),
  },
  {
    path: '/shareds/:projectid', // 组件列表
    component: lazy(() => import('src/pages/Shared/list')),
  },
  {
    path: '/shareds/add', // 新增组件
    component: lazy(() => import('src/pages/Shared/add')),
  },
]

export type Troutes = RoutesType
