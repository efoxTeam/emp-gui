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
    path: '/projects/import',
    method: project.import,
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
    path: '/projects/openDir',
    method: project.openDir,
  },
  {
    path: '/projects/typeList',
    method: project.typeList,
  },
  {
    path: '/projects/detail',
    method: project.detail,
  },
  {
    path: '/projects/addRemote',
    method: project.addRemote,
  },
  {
    path: '/projects/deleteRemote',
    method: project.deleteRemote,
  },
  {
    path: '/projects/updateRemote',
    method: project.updateRemote,
  },
  {
    path: '/projects/remoteDetail',
    method: project.remoteDetail,
  },
  {
    path: '/projects/remoteComponentMd',
    method: project.remoteComponentMd,
  },
]
module.exports = {
  Routes,
}
