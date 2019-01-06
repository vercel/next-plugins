const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

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
        cssLoaderOptions,
        postcssLoaderOptions,
        sassLoaderOptions = {}
      } = nextConfig

      options.defaultLoaders.sass = cssLoaderConfig(config, {
        extensions: ['scss', 'sass'],
        cssModules: false,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'sass-loader',
            options: sassLoaderOptions
          }
        ]
      })
      options.defaultLoaders.sassModule = cssLoaderConfig(config, {
        extensions: ['scss', 'sass'],
        cssModules: true,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'sass-loader',
            options: sassLoaderOptions
          }
        ]
      })

      config.module.rules.push(
        {
          test: sassRegex,
					exclude: sassModuleRegex,
          use: options.defaultLoaders.sass
        },
        {
          test: sassModuleRegex,
          use: options.defaultLoaders.sassModule
        }
      )

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
