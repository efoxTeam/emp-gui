const demo = require('../controller/demo')
const project = require('../controller/project')

const Routes = [
  {
    path: '/demo/search/:id',
    method: demo.search
  },
  {
    path: '/demo/alert',
    method: demo.alert
  },
  {
    path: '/projects',
    method: project.list
  },
  {
    path: '/projects/search',
    method: project.search
  },
  {
    path: '/project/add',
    method: project.add
  },
  {
    path: '/project/del',
    method: project.del
  },
  {
    path: '/project/alter',
    method: project.alter
  }
]
module.exports = {
  Routes
}

