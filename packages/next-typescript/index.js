module.exports = (nextConfig = {}) => {
  if (!nextConfig.pageExtensions) {
    nextConfig.pageExtensions = ['jsx', 'js']
  }

  if (nextConfig.pageExtensions.indexOf('ts') === -1) {
    nextConfig.pageExtensions.unshift('ts')
  }

  if (nextConfig.pageExtensions.indexOf('tsx') === -1) {
    nextConfig.pageExtensions.unshift('tsx')
  }

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const path = require('path')
      const findUp = require('find-up')
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dir, defaultLoaders, dev, isServer } = options

      config.resolve.extensions.push('.ts', '.tsx')

      // find tsconfig.json and extract baseUrl setting
      const tsconfigPath = findUp.sync('tsconfig.json')
      if (tsconfigPath !== null) {
        const tsconfig = require(tsconfigPath)

        // if baseUrl is set, push it to webpacks module resolver so babel also knows about it
        if (tsconfig && tsconfig.compilerOptions && tsconfig.compilerOptions.baseUrl) {
          const prefix = path.dirname(tsconfigPath)
          const baseUrl = path.resolve(`${prefix}/${tsconfig.compilerOptions.baseUrl}`)
          config.resolve.modules.push(baseUrl)
        }
      }

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
            options: Object.assign(
              {},
              {
                transpileOnly: true
              },
              nextConfig.typescriptLoaderOptions
            )
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
