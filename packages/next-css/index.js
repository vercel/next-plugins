const cssLoaderConfig = require('./css-loader-config')

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

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

      options.defaultLoaders.css = cssLoaderConfig(config, {
        extensions: ['css'],
        cssModules: false,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer
      })

      options.defaultLoaders.cssModule = cssLoaderConfig(config, {
        extensions: ['css'],
        cssModules: true,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer
      })

      config.module.rules.push({
        test: cssRegex,
        exclude: cssModuleRegex,
        issuer(issuer) {
          if (issuer.match(/pages[\\/]_document\.js$/)) {
            throw new Error(
              'You can not import CSS files in pages/_document.js, use pages/_app.js instead.'
            )
          }
          return true
        },
        use: options.defaultLoaders.css
      },{
        test: cssModuleRegex,
        issuer(issuer) {
          if (issuer.match(/pages[\\/]_document\.js$/)) {
            throw new Error(
              'You can not import CSS files in pages/_document.js, use pages/_app.js instead.'
            )
          }
          return true
        },
        use: options.defaultLoaders.cssModule
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
