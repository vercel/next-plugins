module.exports = function withPreact(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if(options.isServer) {
        config.externals = ['react', 'react-dom', ...config.externals]
      }
  
      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      })
  
      if(typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
