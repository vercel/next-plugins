const cssLoaderConfig = require('./css-loader-config')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const { cssModules, cssLoaderOptions, postcssLoaderOptions } = nextConfig

      const crateStyleConfig = cssModules => cssLoaderConfig(config, {
        extensions: ['css'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer
      })

      options.defaultLoaders.css = crateStyleConfig(cssModules);

      config.module.rules.push({
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /cssModulesEnable/,
            use: crateStyleConfig(true)
          },
          {
            resourceQuery: /cssModulesDisbale/,
            use: crateStyleConfig(false)
          },
          {
            use: options.defaultLoaders.css
          }
        ]
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
