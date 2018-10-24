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

      const crateStyleConfig = (cssModules, disablePostcss) => cssLoaderConfig(config, {
        cssModules,
        cssLoaderOptions,
        dev,
        isServer,
        disablePostcss
      });

      options.defaultLoaders.css = crateStyleConfig(cssModules);

      config.module.rules.push({
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /CSSModulesDisbale/,
            use: crateStyleConfig(false, true)
          },
          {
            resourceQuery: /postCSSDisable/,
            use: crateStyleConfig(true, false)
          },
          {
            resourceQuery: /postCSSAndCSSModulesDisable/,
            use: crateStyleConfig(false, true)
          },
          {
            use: options.defaultLoaders.css
          }
        ]
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
