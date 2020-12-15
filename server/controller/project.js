const Base = require('./base')
const {readDir, downloadRepo} = require('../lib/file')
class ProjectRest extends Base {
  constructor(...args) {
    super(...args)
  }
  post(req, res){
    console.log('post')
    this.params = req.body
    const downloadPath = req.body.path + req.body.name
    downloadRepo(downloadPath)
    return super.post(req, res)
  }
  readDir(req, res){
    const currentPath = process.cwd().replace('emp-gui', '')
    const path = req.query.path || '../'
    const dirs = readDir(path)
    res.setHeader('Content-Type', 'application/json')
    res.json({path: currentPath, dirs})
  }
}
const project = new ProjectRest('project')
module.exports = project


