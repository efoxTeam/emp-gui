const Base = require('./base')
const {readDir} = require('../lib/file')
class ProjectRest extends Base {
  constructor(...args) {
    super(...args)
  }
  post(...args){
    return super.post(...args)
  }
  readDir(req, res){
    console.log(process.cwd())
    const path = req.query.path || './'
    const dirs = readDir(path)
    res.setHeader('Content-Type', 'application/json')
    res.json(dirs)
  }
}
const project = new ProjectRest('project')
module.exports = project


