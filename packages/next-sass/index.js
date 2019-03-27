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
        sassLoaderOptions = {}
      } = nextConfig

      options.defaultLoaders.sass = cssLoaderConfig(config, {
        extensions: ['scss', 'sass'],
        cssModules,
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
          test: /\.s[ac]ss$/,
          issuer(issuer) {
            if (issuer.match(/pages[\\/]_document\.js$/)) {
              throw new Error(
                'You can not import scss files in pages/_document.js, use pages/_app.js instead.'
              )
            }
            return true
          },
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
