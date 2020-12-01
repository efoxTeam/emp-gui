const Lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const {rcFolder} = require('./rcFolder')

const db = new Lowdb(new FileSync(path.resolve(rcFolder, 'db.json')))

// 单个项目信息示例
const project = {
  id: '',
  name: '', // 项目名称
  template: '', // 使用模板
  technologyType: '', // react/。。
  saveWayType: 0 , // 0-本地文件夹储存 1-git地址储存
  localDisk: '' // 本地磁盘位置
}

// Seed an empty DB
db.defaults({
  projects: [],
  config: {}
}).write()

module.exports = {
  db,
}
