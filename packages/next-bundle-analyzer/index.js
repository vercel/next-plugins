module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { analyzeServer, analyzeBrowser } = nextConfig
      const {
        bundleAnalyzerConfig: { browser = {}, server = {} } = {}
      } = nextConfig
      const { isServer } = options

      if ((isServer && analyzeServer) || (!isServer && analyzeBrowser)) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin(
            Object.assign(
              {},
              {
                analyzerMode: 'server',
                analyzerPort: isServer ? 8888 : 8889,
                openAnalyzer: true
              },
              isServer ? server : browser
            )
          )
        )
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    }
  })
}
