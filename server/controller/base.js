const {dbService} = require('../data/index')
class Base{
  constructor(modelName) {
    this.modelName = modelName
    this.params = {}
    Object.getOwnPropertyNames(Base.prototype)
      .filter((propertyName) => propertyName !== 'constructor')
      .forEach((method) => (this[method] = this[method].bind(this)))
  }
  post(req, res) {
    const params = req.body || this.params
    dbService.create(this.modelName, params)
    res.setHeader('Content-Type', 'application/json')
    res.json({code: 0, msg: 'success'})
  }
  get(req, res) {
    const params = req.query
    const data = dbService.retrieve(this.modelName, params)
    res.setHeader('Content-Type', 'application/json')
    res.json({code: 0, msg: 'success', data})
  }
  put(req, res) {
    const params = req.query
    dbService.update(this.modelName, params)
    res.setHeader('Content-Type', 'application/json')
    res.json({code: 0, msg: 'success'})
  }
  delete(req, res) {
    dbService.delete(this.modelName, req.query.id)
    res.setHeader('Content-Type', 'application/json')
    res.json({code: 0, msg: 'success'})
  }
}

module.exports = Base
