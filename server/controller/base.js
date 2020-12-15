const {dbService} = require('../data/index')
class Base{
  constructor(modelName) {
    this.modelName = modelName
    Object.getOwnPropertyNames(Base.prototype)
      .filter((propertyName) => propertyName !== 'constructor')
      .forEach((method) => (this[method] = this[method].bind(this)))
  }
  post(req, res) {
    console.log(req.body)
    const params = {name: 'test', type: '1', path: 'test/test'}
    dbService.create(this.modelName, params)
    res.setHeader('Content-Type', 'application/json')
    res.json({code: 0, msg: 'success'})
  }
  get(req, res) {
    console.log('this', req)
    const params = {name: 'test', type: '1', path: 'test/test'}
    dbService.retrieve(this.modelName)
    res.setHeader('Content-Type', 'application/json')
    res.json({code: 0, msg: 'success'})
  }
  put(req, res) {
    const params = {name: 'test', type: '1', path: 'test/test'}
    dbService.create(this.modelName, params)
    res.setHeader('Content-Type', 'application/json')
    res.json({code: 0, msg: 'success'})
  }
  delete(req, res) {
    const params = {name: 'test', type: '1', path: 'test/test'}
    dbService.create(this.modelName, params)
    res.setHeader('Content-Type', 'application/json')
    res.json({code: 0, msg: 'success'})
  }
}

module.exports = Base
