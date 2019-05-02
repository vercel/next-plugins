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
      const { cssModules, cssLoaderOptions, postcssLoaderOptions, moduleExtension, moduleLoaderOptions } = nextConfig

      options.defaultLoaders.css = cssLoaderConfig(config, {
        extensions: ['css'],
        cssModules: moduleExtension ? false : cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer
      })

      config.module.rules.push({
        test: /\.css$/,
        issuer(issuer) {
          if (issuer.match(/pages[\\/]_document\.js$/)) {
            throw new Error(
              'You can not import CSS files in pages/_document.js, use pages/_app.js instead.'
            )
          }
          return true
        },
        exclude: moduleExtension ? /\.module\.css$/ : /^$/,
        use: options.defaultLoaders.css
      })

      if (moduleExtension) {
        config.module.rules.push({
          test: /\.module\.css$/,
          issuer(issuer) {
            if (issuer.match(/pages[\\/]_document\.js$/)) {
              throw new Error(
                'You can not import CSS files in pages/_document.js, use pages/_app.js instead.'
              )
            }
            return true
          },
          use: cssLoaderConfig(config, {
            extensions: ['css'],
            cssModules: true,
            cssLoaderOptions: moduleLoaderOptions || {
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:8]'
            },
            postcssLoaderOptions,
            dev,
            isServer
          })
        });
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
