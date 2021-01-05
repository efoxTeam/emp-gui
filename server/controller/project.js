const Base = require('./base')
const Path = require('path')
const {readDir, openDir, downloadRepo, readFile, getFiles, writeJson} = require('../lib/file')
const template = require('@efox/emp-cli/config/template')
const {dbService} = require('../data/index')
function projectDetail(id) {
  const data = dbService.retrieve('project', {id})
  const project = data.list[0] || {}
  const empJson = readFile(Path.join(project.path || '', project.name || '', 'emp.json'))
  project.remotes = []
  project.exposes = {}
  if (empJson) {
    Object.keys(empJson.remotes).map(key => {
      project.remotes.push({alias: key, aliasUrl: empJson.remotes[key]})
    })
    project.exposes = empJson.exposes || {}
  }
  return project
}
function getEmpJson(id) {
  const project = projectDetail(id)
  const empPath = Path.join(project.path, project.name, 'emp.json')
  const empJson = readFile(empPath)
  return {empPath, empJson}
}
class ProjectRest extends Base {
  constructor(...args) {
    super(...args)
  }
  async post(req, res) {
    console.log('post')
    this.params = req.body
    const downloadPath = Path.join(req.body.path, req.body.name)
    const repo = template[req.body.type] || template.react
    await downloadRepo(repo, downloadPath)
    return super.post(req, res)
  }
  async import(req, res) {
    const importPath = req.body.path
    const importName = importPath?.split('/')?.slice(-1)?.[0]
    const files = await getFiles(importPath)
    req.body.name = importName
    if (!files.includes('package.json')) {
      res.setHeader('Content-Type', 'application/json')
      res.json(super.errorJson(-1, '导入项目没有package.json文件', importPath))
      return
    } else if (!files.includes('emp-config.js')) {
      res.setHeader('Content-Type', 'application/json')
      res.json(super.errorJson(-2, '导入项目没有emp-config.js文件', importPath))
      return
    } else if (!files.includes('emp.json')) {
      res.setHeader('Content-Type', 'application/json')
      res.json(super.errorJson(-3, '导入项目需要改造成有emp.json文件', importPath))
      return
    }
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
    const currentPath = req.query.path || process.cwd().split('/').slice(0, -1).join('/')
    const path = req.query.path || '../'
    const dirs = readDir(path)
    res.setHeader('Content-Type', 'application/json')
    res.json(super.successJson({path: currentPath, dirs}))
  }
  openDir(req, res) {
    const dirpath = req.query.path
    if (dirpath) {
      openDir(dirpath)
    }
    res.setHeader('Content-Type', 'application/json')
    res.json(super.successJson({}))
  }
  detail(req, res) {
    const project = projectDetail(req.query.id)
    res.setHeader('Content-Type', 'application/json')
    res.json(super.successJson(project))
  }
  deleteRemote(req, res) {
    const {id, alias} = req.query
    const {empPath, empJson} = getEmpJson(id)
    delete empJson.remotes[alias]
    writeJson(empPath, empJson)
    res.json(super.successJson())
  }
  addRemote(req, res) {
    const {id, path, projectName, alias} = req.body
    const {empPath, empJson} = getEmpJson(id)
    empJson.remotes[alias] = projectName + '@' + path
    writeJson(empPath, empJson)
    res.json(super.successJson())
  }
  updateRemote(req, res) {
    const {id, path, projectName, alias, updateAlias} = req.body
    const {empPath, empJson} = getEmpJson(id)
    delete empJson.remotes[updateAlias]
    empJson.remotes[alias] = projectName + '@' + path
    writeJson(empPath, empJson)
    res.json(super.successJson())
  }
  remoteDetail(req, res) {
    const {empPath} = req.query
    const host = empPath.replace(/\/{1,}emp\.js/, '')
    res.json(
      super.successJson({
        empPath: empPath,
        declarationPath: host + '/index.d.ts',
        exposes: {
          list: 'src/expose.js',
        },
      }),
    )
  }
}
const project = new ProjectRest('project')
module.exports = project
