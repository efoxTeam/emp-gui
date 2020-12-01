const path = require('path')
const {
  override,
  // overrideDevServer,
  // fixBabelImports,
  addWebpackPlugin,
  disableEsLint,
  addBundleVisualizer,
  //addLessLoader,
  addWebpackAlias,
} = require('customize-cra')

module.exports = {
  webpack: override(
    addWebpackAlias({
      ['@']: path.resolve(__dirname, 'src'),
    }),
  ),
}
