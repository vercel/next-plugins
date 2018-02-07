const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade-next'
        )
      }

      const { dev, isServer } = options
      const { cssModules } = nextConfig
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
      }

      if (!extractCSSPlugin.options.disable) {
        extractCSSPlugin.options.disable = dev
      }

      options.defaultLoaders.sass = cssLoaderConfig(config, extractCSSPlugin, {
        cssModules,
        dev,
        isServer,
        loaders: ['sass-loader']
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
