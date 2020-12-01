const path = require('path')
const {
  override,
  // addWebpackPlugin,
  addBundleVisualizer,
  addWebpackAlias,
  disableEsLint
} = require('customize-cra')

module.exports = {
  webpack: override(
    addWebpackAlias({
      ['@']: path.resolve(__dirname, 'src'),
    }),
    addBundleVisualizer(
      {
        analyzerMode: 'static',
        reportFilename: 'report.html',
      },
      true,
    ),
    disableEsLint()
  ),
  paths: function(paths, env) {
    paths.appBuild = path.resolve(__dirname, 'dist')
    return paths;
  },
}
