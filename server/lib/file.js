const fs = require('fs')
const path = require('path')
function readDir(pathname = './') {
  const dir = []
  // 判断当前是否是一个目录
  const stat = fs.existsSync(pathname)
  if (stat && fs.lstatSync(pathname).isDirectory() === true) {
    const files = fs.readdirSync(pathname)
    files.forEach(function (item, index) {
      const p = path.join(pathname, item)
      let file = fs.lstatSync(p)
      if (file.isDirectory() === true) {
        // 判断是否有读写权限
        try {
          fs.accessSync(p, fs.constants.R_OK | fs.constants.W_OK)
          dir.push(item)
        } catch (e) {}
      }
    })
  }
  return dir
}

function writeFile(path, content) {
  fs.writeFile(path, content, function (err) {
    if (err) {
      console.log(err)
    }
  })
}
function downloadRepo(repo, name) {
  require('@efox/emp-cli/helpers/downloadRepo')(repo, name, '')
}

module.exports = {
  readDir,
  writeFile,
  downloadRepo,
}
