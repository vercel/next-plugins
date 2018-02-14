const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }
      const {
        cacheId,
        runtimeCaching = [],
        staticFileGlobs = ['static']
      } = nextConfig
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          cacheId: cacheId || 'nextjscache',
          filepath: 'static/sw.js',
          staticFileGlobs,
          minify: !options.dev,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching
        })
      )
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    }
  })
}
