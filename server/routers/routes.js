const demo = require('../controller/demo')
const project = require('../controller/project')
const Routes = [
  {
    path: '/demoapi/get',
    method: demo.test,
  },
  {
    path: '/projects/get',
    method: project.get,
  },
  {
    path: '/projects/add',
    method: project.post,
  },
  {
    path: '/projects/put',
    method: project.put,
  },
  {
    path: '/projects/delete',
    method: project.delete,
  },
  {
    path: '/projects/readDir',
    method: project.readDir,
  },
]
module.exports = {
  Routes,
}
