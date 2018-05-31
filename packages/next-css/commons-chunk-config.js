module.exports = (
  config,
  test = /\.css$/,
  { dev, shouldMergeChunks, totalPages } = {}
) => {
  // Extend the default CommonsChunkPlugin config
  config.plugins = config.plugins.map(plugin => {
    if (
      plugin.constructor.name === 'CommonsChunkPlugin' &&
      typeof plugin.minChunks !== 'undefined'
    ) {
      const defaultMinChunks = plugin.minChunks
      plugin.minChunks = (module, count) => {
        if (module.resource && module.resource.match(test)) {
          // Move all styles to commons chunk so they can be extracted to a single file
          if (shouldMergeChunks) {
            return true
          }
          // Move common styles to commons chunk so they can be extracted to a single common file
          if (dev) {
            return false
          }
          if (totalPages <= 2) {
            return count >= totalPages
          }
          return count >= totalPages * 0.5
        }
        // Use default minChunks for non-style modules
        return typeof defaultMinChunks === 'function'
          ? defaultMinChunks(module, count)
          : count >= defaultMinChunks
      }
    }
    return plugin
  })
  return config
}
