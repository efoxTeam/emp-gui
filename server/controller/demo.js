const Base = require('./base')
class DemoRest extends Base {
  constructor(...args) {
    super(...args)
  }
  test(){
    console.log('test func')
  }
}
const demo = new DemoRest('demo')
module.exports = demo
