
const Lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const {rcFolder} = require('../lib/rcFolder')

const db = new Lowdb(new FileSync(path.resolve(rcFolder, 'data.json')))

// Seed an empty DB
db.defaults({
  projects: [],
  foldersFavorite: [],
  tasks: [],
  config: {},
}).write()

module.exports = {
  db,
}
