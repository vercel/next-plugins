const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
      if (!config.__EXTRACT_CSS_INITIALIZED) {
        config.plugins.push(
          new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: dev
              ? 'static/css/[name].css'
              : 'static/css/[name].[contenthash:8].css',
            chunkFilename: dev
              ? 'static/css/[name].chunk.css'
              : 'static/css/[name].[contenthash:8].chunk.css'
          })
        )
        options.__EXTRACT_CSS_INITIALIZED = true
      }

      if (!isServer) {
        config.optimization.splitChunks.cacheGroups.styles = {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }

      options.defaultLoaders.css = cssLoaderConfig(
        config,
        MiniCssExtractPlugin,
        {
          cssModules,
          cssLoaderOptions,
          postcssLoaderOptions,
          dev,
          isServer
        }
      )

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
