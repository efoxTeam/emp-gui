const demo = require('../controller/demo')
const Routes = [
  {
    path: '/demo/search/:id',
    method: demo.search
  },
  {
    path: '/demo/alert',
    method: demo.alert
  }
]
module.exports = {
  Routes
}
