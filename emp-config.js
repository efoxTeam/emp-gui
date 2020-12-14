const path = require('path')
const packagePath = path.join(path.resolve('./'), 'package.json')
const {dependencies} = require(packagePath)
const withESbuild = require('@efox/emp-esbuild')
module.exports = withESbuild(({config, env, empEnv}) => {
  // console.log('empEnv===> 部署环境变量 serve模式不需要该变量', empEnv, env)
  const port = 8002
  const projectName = 'emp-gui'
  const publicPath = `http://localhost:${port}/`
  const remoteEntry = 'https://emp-antd-base.yy.com/emp.js'
  config.resolve.alias.set('@', path.resolve('./', 'src'))
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        name: projectName,
        library: {type: 'var', name: projectName},
        filename: 'emp.js',
        remotes: {
          '@emp-antd/base': 'empBase',
        },
        exposes: {},
        shared: {
          react: {eager: true, singleton: true, requiredVersion: '^16.13.1'},
          'react-dom': {eager: true, singleton: true, requiredVersion: '^16.13.1'},
          'react-router-dom': {requiredVersion: '^5.1.2'},
        },
      },
    }
    return args
  })
  config.output.publicPath(publicPath)
  config.devServer.port(port)
  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        title: 'EMP - Project',
        files: {
          js: [remoteEntry],
        },
      },
    }
    return args
  })
})
