
function search(req, res) {
  const {id, name, template, technologyType} = req.query
  const query = Object.entries({id, name, template, technologyType}).reduce((pre, [k, v]) => {
    if (v !== undefined) {
      pre[k] = v
    }
    return pre
  }, {})
  console.log('req.query', req.query)
  const projects = dbService.retrieve('projects', query)
  res.setHeader('Content-Type', 'application/json')
  res.json(projects)
}

const Base = require('./base')
class ProjectRest extends Base {
  constructor(...args) {
    super(...args)
  }
}
const project = new ProjectRest('project')
module.exports = project


