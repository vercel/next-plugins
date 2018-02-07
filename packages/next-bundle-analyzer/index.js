const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }
      const { isServer } = options
      if (isServer) {
        let bundleAnalyzerPlugin =
          nextConfig.serverBundleAnalyzerPlugin ||
          options.serverBundleAnalyzerPlugin
        if (!bundleAnalyzerPlugin) {
          bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true
          })
        }
        if (nextConfig.serverBundleAnalyzerPlugin !== false) {
          config.plugins.push(bundleAnalyzerPlugin)
          options.bundleAnalyzerPlugin = bundleAnalyzerPlugin
        }
      }
      if (!isServer) {
        let bundleAnalyzerPlugin =
          nextConfig.browserBundleAnalyzerPlugin ||
          options.browserBundleAnalyzerPlugin
        if (!bundleAnalyzerPlugin) {
          bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8889,
            openAnalyzer: true
          })
        }
        if (nextConfig.browserBundleAnalyzerPlugin !== false) {
          config.plugins.push(bundleAnalyzerPlugin)
          options.bundleAnalyzerPlugin = bundleAnalyzerPlugin
        }
      }
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    }
  })
}
