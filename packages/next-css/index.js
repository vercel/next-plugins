module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const { cssModules, cssToString, cssAutomaticInjection } = nextConfig
      // Support the user providing their own instance of ExtractTextPlugin.
      // If extractCSSPlugin is not defined we pass the same instance of ExtractTextPlugin to all css related modules
      // So that they compile to the same file in production
      let extractCSSPlugin =
        nextConfig.extractCSSPlugin || options.extractCSSPlugin

      if (!extractCSSPlugin) {
        const ExtractTextPlugin = require('extract-text-webpack-plugin')
        extractCSSPlugin = new ExtractTextPlugin({
          filename: 'static/style.css'
        })
        config.plugins.push(extractCSSPlugin)
        options.extractCSSPlugin = extractCSSPlugin
      }

      if (!extractCSSPlugin.options.disable) {
        extractCSSPlugin.options.disable = dev
      }

      if (cssAutomaticInjection) {
        config.externals = config.externals.map(external => {
          if (typeof external === 'function') {
            return (context, request, callback) => {
              if (request === '@zeit/next-css/inline-style') {
                return callback()
              }

              return external(context, request, callback)
            }
          }
          return external
        })

        const path = require('path')
        config.module.rules.push({
          test: /\.js/,
          include: [path.join(__dirname, 'inline-style')],
          use: options.defaultLoaders.babel
        })

        config.module.rules = config.module.rules.map(rule => {
          if (
            typeof rule.use === 'object' &&
            rule.use.loader === 'babel-loader'
          ) {
            rule.use.options.plugins.push(path.join(__dirname, 'babel'))
          }

          return rule
        })
      }

      const cssLoaderConfig = require('./css-loader-config')
      options.defaultLoaders.css = cssLoaderConfig(config, extractCSSPlugin, {
        cssToString,
        cssModules,
        dev,
        isServer
      })

      config.module.rules.push({
        test: /\.css$/,
        use: options.defaultLoaders.css
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
