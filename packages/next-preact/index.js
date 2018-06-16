const { sep } = require('path')
const webpack = require('webpack')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      if (options.isServer) {
        config.externals = ['react', 'react-dom', ...config.externals]
      }

      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        react$: 'preact-compat',
        'react-dom$': 'preact-compat',
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      })

      const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
        name: 'main.js',
        filename: options.dev
          ? 'static/commons/main.js'
          : 'static/commons/main-[chunkhash].js',
        minChunks(module, count) {
          // React and React DOM are used everywhere in Next.js. So they should always be common. Even in development mode, to speed up compilation.
          if (
            module.resource &&
            module.resource.includes(`${sep}react-dom${sep}`) &&
            count >= 0
          ) {
            return true
          }

          if (
            module.resource &&
            module.resource.includes(`${sep}react${sep}`) &&
            count >= 0
          ) {
            return true
          }

          if (
            module.resource &&
            module.resource.includes(`${sep}preact-compat${sep}`) &&
            count >= 0
          ) {
            return true
          }

          if (
            module.resource &&
            module.resource.includes(`${sep}preact${sep}`) &&
            count >= 0
          ) {
            return true
          }

          // In the dev we use on-demand-entries.
          // So, it makes no sense to use commonChunks based on the minChunks count.
          // Instead, we move all the code in node_modules into each of the pages.
          if (options.dev) {
            return false
          }

          // Commons
          // If there are one or two pages, only move modules to common if they are
          // used in all of the pages. Otherwise, move modules used in at-least
          // 1/2 of the total pages into commons.
          if (options.totalPages <= 2) {
            return count >= options.totalPages
          }
          return count >= options.totalPages * 0.5
          // Commons end
        }
      })

      const plugins = options.isServer
        ? config.plugins
        : // Overrides common chunk plugin including preact
          config.plugins.map(plugin => {
            if (plugin.minChunks instanceof Function) {
              return commonsPlugin
            }

            return plugin
          })

      config.plugins = plugins

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
