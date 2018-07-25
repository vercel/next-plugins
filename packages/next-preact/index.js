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

      config.plugins.map(pluginInstance => {
        if (!pluginInstance.chunkNames) {
          return pluginInstance
        }
        if (pluginInstance.chunkNames.indexOf('main.js') !== -1) {
          if (!pluginInstance.minChunks) {
            return pluginInstance
          }
          const { sep } = require('path')
          const originalMinChunks = pluginInstance.minChunks
          pluginInstance.minChunks = (module, count) => {
            if (
              module.resource &&
              module.resource.includes(`${sep}preact${sep}`) &&
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

            return originalMinChunks(module, count)
          }
          return pluginInstance
        }
        return pluginInstance
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
