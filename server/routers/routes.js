const demo = require('../controller/demo')
const project = require('../controller/project')

const Routes = [
  {
    path: '/demo',
    method: demo.get,
  },
  {
    path: '/projects',
    method: project.get,
  },
  {
    path: '/projects/search',
    method: project.get,
  },
  {
    path: '/project/add',
    method: project.post,
  },
  {
    path: '/project/readDir',
    method: project.readDir,
  },
]
module.exports = {
  Routes,
}
