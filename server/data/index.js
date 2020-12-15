const {db} = require('./db')
const moment = require('moment')

function modal(name) {
  return db.get(name)
}
class Service {
  retrieve(name, parmas = {}) {
    const list = modal(name).find(parmas).value() || []
    const total = modal(name).size().value()
    return {list, total}
  }
  create(name, parmas) {
    parmas.id = moment().format('YYYYMMDDHHmmss') + Math.random().toString().substring(2, 6)
    parmas.createTime = moment().valueOf()
    modal(name).push(parmas).write()
  }
  update(name, parmas) {
    if(!parmas.id) return
    parmas.updateTime = moment().valueOf()
    modal(name).find({id: parmas.id}).assign(parmas).write()
  }
  delete(name, id) {
    if(!id) return
    modal(name).remove({id: id}).write()
  }
}
const dbService = new Service()
module.exports = {
  dbService,
}
