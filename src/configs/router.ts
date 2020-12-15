import {RoutesType} from '@emp-antd/base/types'
import {lazy} from 'react'

export const routes: Array<RoutesType> = [
  // {
  //   path: '/',
  //   name: '主页',
  //   hide: true,
  //   component: lazy(() => import('src/pages/Main')),
  //   withoutLayout: true,
  // },
  // {
  //   path: '/projects', // 项目列表
  //   component: lazy(() => import('src/pages/Project/list')),
  // },
  {
    path: '/',
    name: '项目信息',
    component: lazy(() => import('src/pages/Project')),
  },
  {
    path: '/remotes', // 基站列表
    name: '远程基站管理',
    component: lazy(() => import('src/pages/Remotes')),
  },
  // {
  //   path: '/shareds', // 组件列表
  //   name: '共享资源管理',
  //   component: lazy(() => import('src/pages/Shared')),
  // },
]

export type Troutes = RoutesType
