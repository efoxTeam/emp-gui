const {dbService} = require('../data/index')
class Base {
  constructor(modelName) {
    this.modelName = modelName
    this.params = {}
    Object.getOwnPropertyNames(Base.prototype)
      .filter(propertyName => propertyName !== 'constructor')
      .forEach(method => (this[method] = this[method].bind(this)))
  }
  post(req, res) {
    const params = req.body || this.params
    const id = dbService.create(this.modelName, params)
    res.setHeader('Content-Type', 'application/json')
    res.json({code: 0, msg: 'success', data: {id}})
  }
  get(req, res) {
    console.log('get')
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
  successJson(data = {}) {
    return {code: 0, msg: 'success', data}
  }
  errorJson(code, msg, data = {}) {
    return {code, msg, data}
  }
}

module.exports = Base
