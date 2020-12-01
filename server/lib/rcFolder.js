const fs = require('fs-extra')
const path = require('path')

let folder = path.resolve(__dirname, '../../live-test')

if (process.env.NODE_ENV !== 'production') {
  folder = path.resolve(__dirname, '../../live-test')
  // Clean DB
  // fs.removeSync(path.resolve(__dirname, folder))
} else {
  folder = path.resolve(__dirname, '../../live')
}
fs.ensureDirSync(path.resolve(__dirname, folder))

exports.rcFolder = folder
