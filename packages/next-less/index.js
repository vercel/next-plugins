const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

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
        lessLoaderOptions = {}
      } = nextConfig

      options.defaultLoaders.less = cssLoaderConfig(config, {
        extensions: ['less'],
        cssModules: false,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions
          }
        ]
      })

      config.module.rules.push({
        test: lessRegex,
        exclude: lessModuleRegex,
        use: options.defaultLoaders.less
      })

      if (cssModules) {
        options.defaultLoaders.lessModule = cssLoaderConfig(config, {
          extensions: ['less'],
          cssModules: true,
          cssLoaderOptions,
          postcssLoaderOptions,
          dev,
          isServer,
          loaders: [
            {
              loader: 'less-loader',
              options: lessLoaderOptions
            }
          ]
        })
        config.module.rules.push({
          test: lessModuleRegex,
          exclude: /node_modules/,
          use: options.defaultLoaders.lessModule
        })
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
