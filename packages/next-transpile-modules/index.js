module.exports = (nextConfig = {}) => {

  const { transpileModules = [] } = nextConfig
  const includes = transpileModules.map(module => (new RegExp(`${module}(?!.*node_modules)`)))
  const excludes = transpileModules.map(module => (new RegExp(`node_modules(?!\/${module}(?!.*node_modules))`)))

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      config.resolve.symlinks = false
      config.externals = config.externals.map(external => {
        if (typeof external !== 'function') return external
        return (ctx, req, cb) =>
          (Boolean(includes.find(include => include.test(req))) ? cb() : external(ctx, req, cb))
      })
      
      config.module.rules.push({
        test: /\.+(js|jsx)$/,
        loader: defaultLoaders.babel,
        include: includes
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },

    webpackDevMiddleware(config) {
      const ignored = [config.watchOptions.ignored[0]].concat(excludes)
      config.watchOptions.ignored = ignored
      return config
    }
  })
}
