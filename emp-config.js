const path = require('path')
const withESbuild = require('@efox/emp-esbuild')

module.exports = withESbuild(({config, env, empEnv}) => {
  console.log('empEnv===> 部署环境变量 serve模式不需要该变量', empEnv, env)
  const port = 8002
  const isPro = env === 'production'
  const publicPath = !isPro ? `http://localhost:${port}/` : './'

  if (isPro) {
    // config.optimization.usedExports(true)
    // config.externals({
    //   react: 'react',
    //   antd: 'antd',
    //   ['@ant-design/icons']: '@ant-design/icons',
    // })
    // config.devtool('cheap-module-source-map')
  }

  config.resolve.alias.set('@', path.resolve('./', 'src'))

  config.output.publicPath(publicPath)
  config.devServer.port(port)
  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        title: 'EMP - Project',
        files: {
          js: [],
        },
      },
    }
    return args
  })
})
