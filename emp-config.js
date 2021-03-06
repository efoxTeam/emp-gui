const path = require('path')
const withESbuild = require('@efox/emp-esbuild')

module.exports = withESbuild(({config, env, empEnv}) => {
  console.log('empEnv===> 部署环境变量 serve模式不需要该变量', empEnv, env)
  const port = 8888
  const isPro = env === 'production'
  const publicPath = !isPro ? `http://localhost:${port}/` : './'

  config.resolve.alias.set('@', path.resolve('./', 'src'))
  config.output.publicPath(publicPath)

  config.module.rule('md').test(/\.md$/).use('raw-loader').loader('raw-loader')

  if (isPro) {
    config.devtool(false)
  } else {
    config.devServer.port(port)
  }
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
