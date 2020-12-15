const demo = require('../controller/demo')
const project = require('../controller/project')

const Routes = [
  {
    path: '/demo',
    method: demo.get,
  },
  {
    path: '/project',
    method: project.get,
  },
  {
    path: '/project/add',
    method: project.post,
  },
  {
    path: '/project/put',
    method: project.put,
  },
  {
    path: '/project/delete',
    method: project.delete,
  },
  {
    path: '/project/readDir',
    method: project.readDir,
  },
]
module.exports = {
  Routes,
}
