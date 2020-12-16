const fs = require('fs')
const path = require('path')
const git = require('git-promise') // 运行git命令
function readDir(path = './'){
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

function readFile(filePath){
  const content = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(content)
}

async function downloadRepo(repoPath, localPath) {
  const _branch = '--'
  const _repoPath = `clone ${_branch} ${repoPath} ${localPath}`
  if (!fs.existsSync(localPath)) {
    await git(_repoPath)
    await fs.rmdir(`${localPath}/.git`, {recursive: true}, err => {
      console.log(err)
    })
    return 1
  } else {
    console.log('已存在指定目录')
    return 0
  }
}

module.exports = {
  readDir,
  writeFile,
  downloadRepo,
  readFile
}
