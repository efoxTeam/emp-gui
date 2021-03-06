const {db} = require('./db')
const moment = require('moment')
const {params} = require('../controller/project')

function modal(name) {
  return db.get(name)
}
class Service {
  retrieve(name, parmas = {}) {
    const pageSize = parmas.pageSize || 10
    const page = parmas.page || 0
    delete parmas.pageSize
    delete parmas.page

    const filter = item => {
      if (parmas.name) {
        return item.name.indexOf(parmas.name) !== -1
      } else {
        return Object.keys(parmas).every(key => (key !== 'name' ? parmas[key] === item[key] : true))
      }
    }
    const list = modal(name).filter(filter).sortBy('createTime').take(pageSize).value() || []
    const total = modal(name).filter(filter).size().value()
    return {list, total, pageSize}
  }
  create(name, parmas) {
    parmas.id = moment().format('YYYYMMDDHHmmss') + Math.random().toString().substring(2, 6)
    parmas.createTime = moment().valueOf()
    modal(name).push(parmas).write()
    return parmas.id
  }
  update(name, parmas) {
    if (!parmas.id) return
    parmas.updateTime = moment().valueOf()
    modal(name).find({id: parmas.id}).assign(parmas).write()
  }
  delete(name, id) {
    if (!id) return
    modal(name).remove({id: id}).write()
  }
}
const dbService = new Service()
module.exports = {
  dbService,
}
