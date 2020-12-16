const Base = require('./base')
const {readDir, downloadRepo, readFile} = require('../lib/file')
const template = require('@efox/emp-cli/config/template')
const {dbService} = require('../data/index')
class ProjectRest extends Base {
  constructor(...args) {
    super(...args)
  }
  post(req, res){
    console.log('post')
    this.params = req.body
    const downloadPath = req.body.path + req.body.name
    const repo = template[req.body.type] || template.react
    downloadRepo(repo, downloadPath)
    return super.post(req, res)
  }
  typeList(req, res){
    res.setHeader('Content-Type', 'application/json')
    res.json(super.successJson(template))
  }
  readDir(req, res){
    const currentPath = req.query.path || process.cwd().replace('emp-gui', '')
    const path = req.query.path || '../'
    const dirs = readDir(path)
    res.setHeader('Content-Type', 'application/json')
    res.json({path: currentPath, dirs})
  }
  remotes(req, res){
    const data = dbService.retrieve('project', {id: req.query.id})
    const project = data.list[0]
    const empJson = readFile(project.path + project.name + '/emp.json')
    const remotes = []
    Object.keys(empJson.remotes).map((key)=>{
      remotes.push({alias: key, aliasUrl: empJson.remotes[key]})
    })
    res.setHeader('Content-Type', 'application/json')
    res.json(super.successJson(remotes))
  }
}
const project = new ProjectRest('project')
module.exports = project


