const Base = require('./base')
const Path = require('path')
const {readDir, downloadRepo, readFile, writeJson} = require('../lib/file')
const template = require('@efox/emp-cli/config/template')
const {dbService} = require('../data/index')
function projectDetail(id) {
  const data = dbService.retrieve('project', {id})
  const project = data.list[0]
  const empJson = readFile(Path.join(project.path, project.name, 'emp.json'))
  if(empJson){
    project.remotes = []
    Object.keys(empJson.remotes).map(key => {
      project.remotes.push({alias: key, aliasUrl: empJson.remotes[key]})
    })
  }
  return project
}
class ProjectRest extends Base {
  constructor(...args) {
    super(...args)
  }
  post(req, res) {
    console.log('post')
    this.params = req.body
    const downloadPath = Path.join(req.body.path, req.body.name)
    const repo = template[req.body.type] || template.react
    downloadRepo(repo, downloadPath)
    return super.post(req, res)
  }
  typeList(req, res) {
    const templateList = []
    Object.keys(template).map(key => {
      templateList.push({type: key, repo: template[key]})
    })
    res.setHeader('Content-Type', 'application/json')
    res.json(super.successJson(templateList))
  }
  readDir(req, res) {
    const currentPath = req.query.path || process.cwd().replace('emp-gui', '')
    const path = req.query.path || '../'
    const dirs = readDir(path)
    res.setHeader('Content-Type', 'application/json')
    res.json(super.successJson({path: currentPath, dirs}))
  }
  detail(req, res) {
    const project = projectDetail(req.query.id)
    res.setHeader('Content-Type', 'application/json')
    res.json(super.successJson(project))
  }
  deleteRemote(req, res) {
    const {id, alias} = req.query
    const project = projectDetail(id)
    const empPath = Path.join(project.path, project.name, 'emp.json')
    const empJson = readFile(empPath)
    delete empJson.remotes[alias]
    writeJson(empPath, empJson)
    res.json(super.successJson())
  }
  addRemote(req, res) {
    const {id, path, projectName, alias} = req.body
    const project = projectDetail(id)
    const empPath = Path.join(project.path, project.name, 'emp.json')
    const empJson = readFile(empPath)
    empJson.remotes[alias] = projectName + '@' + path
    console.log('empJson', empJson)
    writeJson(empPath, empJson)
    res.json(super.successJson())
  }
}
const project = new ProjectRest('project')
module.exports = project
