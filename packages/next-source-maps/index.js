module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev } = options

      if (!dev) {
        config.devtool = 'source-map';

        for (const options of config.plugins) {
          if (options['constructor']['name'] === 'UglifyJsPlugin') {
            options.options.sourceMap = true;
            break;
          }
        }
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    }
  })
}
