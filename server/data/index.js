const {db} = require('./db')
class Service {
  select(parmas){
    db.get('project').find(parmas)
  }
  insert(parmas){
    db.get('projects')
      .push(parmas)
      .write()
  }
  update(){}
}
const dbService = new Service()

module.exports = {
  dbService
}
