const fs = require('fs')
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
function downloadRepo(repo, name){
  require('@efox/emp-cli/helpers/downloadRepo')('https://github.com/efoxTeam/emp-react-template.git', name, '')
}

module.exports = {
  readDir,
  writeFile,
  downloadRepo
}
