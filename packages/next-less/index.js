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
      const { cssLoaderOptions, postcssLoaderOptions } = nextConfig
      let { lessLoaderOptions } = nextConfig
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
        if (!dev && !isServer) {
          config = commonsChunkConfig(config, /\.less$/)
        }
      }
      
      if (lessLoaderOptions instanceof Function) {
        lessLoaderOptions = lessLoaderOptions({ dev, isServer })
      }

      options.defaultLoaders.less = cssLoaderConfig(config, extractCSSPlugin, {
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [{
          loader: 'less-loader',
          options: lessLoaderOptions
        }]
      })

      config.module.rules.push({
        test: /\.less$/,
        use: options.defaultLoaders.less
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
