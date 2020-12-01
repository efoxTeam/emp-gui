const {db} = require('../db')

function list(req, res) {
  const projects = db.get('projects')
  res.setHeader('Content-Type', 'application/json')
  res.json(projects)
}

function search(req, res) {
	const {id, name, template, technologyType } = req.query
	const query = Object.entries({id, name, template, technologyType}).reduce((pre, [k, v]) => {
		if (v !== undefined) {
			pre[k] = v
		}
		return pre
	}, {})
  const projects = db.get('projects').find(query)
  res.setHeader('Content-Type', 'application/json')
  res.json(projects)
}

function add(req, res) {
	const {projects = []} = req.body
	db.get('projects').concat(projects).write()
	res.setHeader('Content-Type', 'application/json')
  res.json(projects)
}

function del(req, res) {
	const {id} = req.body
}

function alter(req, res) {
	const {id, content} = req.body
}

module.exports = {
  list,
	search,
	add,
	del,
	alter
}
