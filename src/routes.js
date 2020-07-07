import loadable from '@loadable/component'

export default [
  {
    path: '/test',
    component: loadable(() => import('./pages/Dashboard')),
    exact: true,
  },
]
