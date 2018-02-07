const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = (awesomeTypescriptOptions = {}, nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dir, defaultLoaders } = options
      const { useCheckerPlugin, loaderOptions } = awesomeTypescriptOptions
      
      config.resolve.extensions.push('.ts', '.tsx')
      config.module.rules.push({
        test: /\.+(ts|tsx)$/,
        include: [dir],
        exclude: /node_modules/,
        use: [
          defaultLoaders.babel,
          { loader: 'awesome-typescript-loader', options: Object.assign({ transpileOnly: false }, loaderOptions) },
        ],
      })
      if (useCheckerPlugin)
        config.plugins.push(new CheckerPlugin())
      
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
