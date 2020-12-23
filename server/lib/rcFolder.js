const fs = require('fs-extra')
const path = require('path')
const os = require('os')

let folder = path.resolve(__dirname, '../../live-test')

if (process.env.NODE_ENV !== 'production') {
  folder = path.resolve(__dirname, '../../live-test')
  // Clean DB
  // fs.removeSync(path.resolve(__dirname, folder))
} else {
  folder = path.join(os.homedir(), '.emp-cli-ui')
}
fs.ensureDirSync(path.resolve(__dirname, folder))

exports.rcFolder = folder
