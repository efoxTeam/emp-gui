const fs = require('fs')
const git = require('git-promise') // 运行git命令
function readDir(path = './'){
  const dir = []
  const files = fs.readdirSync(path)
  files.forEach(function (item, index) {
    let file = fs.lstatSync(path + item)
    if (file.isDirectory() === true) {
      dir.push(item)
    }
  })
  return  dir
}

function writeFile(path, content){
  fs.writeFile(path, content,function(err){
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
