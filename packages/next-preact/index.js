module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      if (options.isServer) {
        config.externals = ['react', 'react-dom', ...config.externals]
      }

      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        'react/cjs/react.production.min.js': 'preact-compat/dist/preact-compat.min.js',
        'react-dom/cjs/react-dom.production.min.js': 'preact-compat/dist/preact-compat.min.js',
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
