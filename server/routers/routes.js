const project = require('../controller/project')
const Routes = [
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
  {
    path: '/projects/typeList',
    method: project.typeList,
  },
  {
    path: '/projects/remotes',
    method: project.remotes,
  },
]
module.exports = {
  Routes,
}
