const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const {
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        stylusLoaderOptions = {}
      } = nextConfig

      const getStylusConfig = isModule => {
        return {
          extensions: ['styl'],
          cssLoaderOptions,
          cssModules: isModule ? true : cssModules,
          postcssLoaderOptions,
          dev,
          isServer,
          loaders: [
            {
              loader: 'stylus-loader',
              options: stylusLoaderOptions,
            },
          ],
        }
      }

      options.defaultLoaders.stylus = getStylusConfig()
      options.defaultLoaders.stylus_module = getStylusConfig(true)

      config.module.rules.push({
        test: /(?<!\.module)\.styl$/,
        use: options.defaultLoaders.stylus,
      })
      config.module.rules.push({
        test: /\.module\.styl$/,
        use: options.defaultLoaders.stylus_module,
      })
      
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
