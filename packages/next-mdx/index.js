module.exports = (nextConfig = {}) => {
  if (!nextConfig.pageExtensions) {
    nextConfig.pageExtensions = ['jsx', 'js']
  }

  if (nextConfig.pageExtensions.indexOf('mdx') === -1) {
    nextConfig.pageExtensions.unshift('mdx')
  }

  if (nextConfig.pageExtensions.indexOf('md') === -1) {
    nextConfig.pageExtensions.unshift('md')
  }

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const {mdxLoaderOptions = {}} = nextConfig

      config.resolve.extensions.push('.md', '.mdx')

      config.module.rules.push({
        test: /\.mdx?$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: mdxLoaderOptions
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
