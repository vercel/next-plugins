module.exports = function withPreact(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const {dir, defaultLoaders} = options

      config.resolve.extensions.push('.ts', '.tsx')
      config.module.rules.push({
        test: /\.+(ts|tsx)$/,
        include: [dir],
        exclude: /node_modules/,
        use: [
          defaultLoaders.babel,
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      })
  
      if(typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
