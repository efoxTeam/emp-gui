const {db} = require('../db')

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
    id,
    name
  }
  db.get('projects')
  .push(project)
  .write()
  res.setHeader('Content-Type', 'application/json')
  res.json(project)
}

module.exports = {
  search,
  alert,
}
