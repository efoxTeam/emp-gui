const {db} = require('../data/db')
const {dbService} = require('../data/index')
function search(req, res) {
  const {id} = req.params
  const project = db.get('projects').find({ id: Number(id) })
  console.log('====project===', project)
  res.setHeader('Content-Type', 'application/json')
  res.json(project)
}

function alert(req, res) {
  const {id, name} = req.body
  const project = {
    id: '1',
    name: 'name'
  }
  dbService.insert(project)
  res.setHeader('Content-Type', 'application/json')
  res.json(project)
}

module.exports = {
  search,
  alert,
}
