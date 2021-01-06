const Base = require('./base')
const Path = require('path')
const {readDir, openDir, downloadRepo, readFile, getFiles, writeJson, isExist} = require('../lib/file')
const template = require('@efox/emp-cli/config/template')
const {dbService} = require('../data/index')
const fetch = require('node-fetch')
const {type} = require('os')
const {existsSync} = require('fs')

function projectDetail(id) {
  const data = dbService.retrieve('project', {id})
  const project = data.list[0] || {}
  const empJsonPath = Path.join(project.path || '', project.name || '', 'emp.json')
  const empJson = readFile(empJsonPath)

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

    const data = dbService.retrieve('project', {name: importName})

    if (data.total) {
      const has = data.list.some(item => Path.join(item.path, item.name) == importPath)
      if (has) {
        res.json(super.errorJson(-4, '该项目已经导入过了', importPath))
        return
      }
    }
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
      if (!['react-base', 'react-project', 'vue3-base', 'vue3-project'].includes(key)) {
        templateList.push({type: key, repo: template[key]})
      }
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
    const projectPath = `${project.path}/${project.name}`
    if (isExist(projectPath)) {
      res.setHeader('Content-Type', 'application/json')
      res.json(super.successJson(project))
    } else {
      dbService.delete(this.modelName, project.id)
      res.setHeader('Content-Type', 'application/json')
      res.json(super.errorJson(-1, '该项目目录已经被删除'))
    }
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
  async remoteDetail(req, res) {
    const {empPath} = req.query
    const host = empPath?.split('/')?.slice(0, -1).join('/')
    const empJSON = `${host}/emp.json`
    const response = await fetch(empJSON).catch(() => '')

    if (response.status === 200) {
      // if (fetchEmp) content =
      res.json(
        super.successJson(
          Object.assign(
            {
              host,
              empPath: empPath,
              declarationPath: host + '/index.d.ts',
            },
            await response.json(),
          ),
        ),
      )
    } else {
      res.json(super.errorJson(-1, '远程基站读取失败'))
    }
  }
  async remoteComponentMd(req, res) {
    const {url} = req.query
    if (url) {
      const response = await fetch(url).catch(() => '')
      if (response.status === 200) {
        const content = await response.text()
        res.json(super.successJson(content))
      } else {
        res.json(super.errorJson(-1, '获取基站组件文档失败'))
      }
    }
  }
}
const project = new ProjectRest('project')
module.exports = project
