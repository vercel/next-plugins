module.exports = (nextConfig = {}) => {

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const path = require('path')
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dir, defaultLoaders, dev, isServer } = options

      config.resolve.extensions.push('.ts', '.tsx')

      if (dev && !isServer) {
        config.module.rules.push({
          test: /\.(ts|tsx)(\?[^?]*)?$/,
          loader: 'hot-self-accept-loader',
          include: [path.join(dir, 'pages')]
        })
      }

      config.module.rules.push({
        test: /\.+(ts|tsx)$/,
        include: [dir],
        exclude: /node_modules/,
        use: [
          defaultLoaders.babel,
          {
            loader: 'ts-loader',
            options: Object.assign({}, {
              transpileOnly: true
            }, nextConfig.typescriptLoaderOptions)
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
