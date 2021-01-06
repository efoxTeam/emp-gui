const fs = require('fs')
const path = require('path')
const os = require('os')
const exec = require('child_process').exec
const git = require('git-promise') // 运行git命令
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

function openDir(dirpath = '') {
  // exec('explorer.exe /select,"E:\\Workspace\\Java"')
  const platform = os.platform()
  let BIN = ''
  if (platform === 'win32') {
    BIN = `exploreor ${dirpath}`
  } else if (platform === 'linux') {
    BIN = `nautilus ${dirpath}`
  } else {
    BIN = `open ${dirpath}`
  }
  BIN && exec(BIN)
}

function writeJson(path, content) {
  if (typeof content !== 'object') return
  fs.writeFile(path, JSON.stringify(content, null, 2), 'utf-8', function (err) {
    if (err) {
      console.log(err)
    }
  })
}

function readFile(filePath) {
  const exist = fs.existsSync(filePath)
  if (exist) {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } else {
    return false
  }
}

async function getFiles(folderPath) {
  if (fs.existsSync(folderPath)) {
    return await fs.readdirSync(folderPath)
  } else {
    return []
  }
}

function isExist(path) {
  return fs.existsSync(path)
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
  openDir,
  writeJson,
  downloadRepo,
  readFile,
  getFiles,
  isExist,
}
