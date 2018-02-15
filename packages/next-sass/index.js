const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')

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
        sassLoaderOptions = {}
      } = nextConfig
      // Support the user providing their own instance of ExtractTextPlugin.
      // If extractCSSPlugin is not defined we pass the same instance of ExtractTextPlugin to all css related modules
      // So that they compile to the same file in production
      let extractCSSPlugin =
        nextConfig.extractCSSPlugin || options.extractCSSPlugin

      if (!extractCSSPlugin) {
        extractCSSPlugin = new ExtractTextPlugin({
          filename: 'static/style.css'
        })
        config.plugins.push(extractCSSPlugin)
        options.extractCSSPlugin = extractCSSPlugin
        if (!isServer) {
          config = commonsChunkConfig(config, /\.(scss|sass)$/)
        }
      }

      options.defaultLoaders.sass = cssLoaderConfig(config, extractCSSPlugin, {
        cssModules,
        cssLoaderOptions,
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
          test: /\.scss$/,
          use: options.defaultLoaders.sass
        },
        {
          test: /\.sass$/,
          use: options.defaultLoaders.sass
        }
      )

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
